import React, { useEffect, useState } from 'react';
import api from '../api/api';
import TransactionsTable from '../components/TransactionsTable';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [limit] = useState(10);
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [school, setSchool] = useState(searchParams.get('school') || '');
  const [from, setFrom] = useState(searchParams.get('from') || '');
  const [to, setTo] = useState(searchParams.get('to') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const debSearch = useDebounce(search, 400);

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [schools, setSchools] = useState([]);
  const [sortField, setSortField] = useState(searchParams.get('sort') || 'payment_time');
  const [sortOrder, setSortOrder] = useState(searchParams.get('order') || 'desc');

  useEffect(()=> {
    const params = {};
    if (page) params.page = page;
    if (status) params.status = status;
    if (school) params.school = school;
    if (from) params.from = from;
    if (to) params.to = to;
    if (debSearch) params.search = debSearch;
    if (sortField) params.sort = sortField;
    if (sortOrder) params.order = sortOrder;
    setSearchParams(params, { replace: true });
  }, [page, status, school, from, to, debSearch, sortField, sortOrder]);

  useEffect(()=> {
    let mounted = true;
    const fetchData = async ()=> {
      try {
        const res = await api.get('/transactions', { params: { page, limit, status, school_id: school, from, to, search: debSearch, sort: sortField, order: sortOrder }});
        const payload = res.data.data || res.data;
        if (mounted) {
          setData(payload || []);
          const uniq = [...new Set((payload||[]).map(p => p.school_id).filter(Boolean))];
          setSchools(uniq);
          const tot = res.data.total || 1;
          setTotalPages(Math.max(1, Math.ceil(tot / limit)));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
    return ()=> mounted = false;
  }, [page, limit, status, school, from, to, debSearch, sortField, sortOrder]);

  const onSort = (field) => {
    if (sortField === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); else { setSortField(field); setSortOrder('desc'); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <input placeholder="Search order id..." value={search} onChange={e=>setSearch(e.target.value)} className="px-3 py-2 border rounded bg-white dark:bg-slate-700"/>
      </div>
      <Filters status={status} setStatus={setStatus} schools={schools} school={school} setSchool={setSchool} from={from} setFrom={setFrom} to={to} setTo={setTo} />
      <TransactionsTable data={data} onSort={onSort} sortField={sortField} sortOrder={sortOrder} />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
