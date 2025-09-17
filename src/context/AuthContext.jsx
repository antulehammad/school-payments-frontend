import React, { createContext, useContext, useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'))
  const navigate = useNavigate()

  const login = async ({ username, password }) => {
    try {
      const res = await api.post('/auth/login', { username, password })
      const access_token = res.data.access_token
      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify({ username }))
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      setToken(access_token)
      setUser({ username })
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err?.response?.data?.message || err.message }
    }
  }

  const register = async ({ username, password }) => {
    try {
      const res = await api.post('/auth/register', { username, password })
      return { ok: true, data: res.data }
    } catch (err) {
      return { ok: false, error: err?.response?.data?.message || err.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setToken(null); setUser(null);
    navigate('/login')
  }

  return <AuthContext.Provider value={{ token, user, login, register, logout }}>{children}</AuthContext.Provider>
}
export function useAuth(){ return useContext(AuthContext) }
