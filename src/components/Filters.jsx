import React from 'react';

export default function Filters({ status, setStatus, schools, school, setSchool, from, setFrom, to, setTo }) {
  const common = "px-3 py-2 border rounded bg-white dark:bg-slate-700 dark:text-slate-100";
  return (
    <div className="flex flex-wrap gap-3 items-center mb-4">
      <select className={common} value={status} onChange={e=>setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="success">Success</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>
      <select className={common} value={school} onChange={e=>setSchool(e.target.value)}>
        <option value="">All Schools</option>
        {schools.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <label className="text-sm">From</label>
      <input type="date" className={common} value={from} onChange={e=>setFrom(e.target.value)} />
      <label className="text-sm">To</label>
      <input type="date" className={common} value={to} onChange={e=>setTo(e.target.value)} />
    </div>
  );
}
