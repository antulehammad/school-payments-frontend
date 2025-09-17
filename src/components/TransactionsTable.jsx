import React from 'react';
import { normalizeTransaction } from "../utils/normalize";


function CopyButton({ text }) {
  const onCopy = async () => {
    try { await navigator.clipboard.writeText(text); alert('Copied'); } catch { alert('Copy failed'); }
  };
  return <button onClick={onCopy} className="ml-2 text-xs px-2 py-1 rounded border bg-white dark:bg-slate-700">Copy</button>;
}

export default function TransactionsTable({ data, onSort, sortField, sortOrder }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left cursor-pointer" onClick={()=>onSort('custom_order_id')}>Order ID {sortField==='custom_order_id' ? (sortOrder==='asc'?'↑':'↓'):''}</th>
            <th className="p-3 text-left">School</th>
            <th className="p-3 text-left">Gateway</th>
            <th className="p-3 text-right">Order Amt</th>
            <th className="p-3 text-right">Txn Amt</th>
            <th className="p-3">Status</th>
            <th className="p-3">Payment Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={r.custom_order_id || i} className="group transition-transform hover:-translate-y-1 hover:shadow-lg">
              <td className="p-3 align-top">{i+1}</td>
              <td className="p-3 align-top">
                <div className="flex items-center">
                  <div className="truncate max-w-xs">{r.custom_order_id || r.collect_id || '-'}</div>
                  <div className="ml-2">
                    <CopyButton text={r.custom_order_id || r.collect_id || ''} />
                  </div>
                </div>
              </td>
              <td className="p-3 align-top">{r.school_id || '-'}</td>
              <td className="p-3 align-top">{r.gateway || '-'}</td>
              <td className="p-3 align-top text-right">₹{r.order_amount ?? '-'}</td>
              <td className="p-3 align-top text-right">₹{r.transaction_amount ?? '-'}</td>
              <td className="p-3 align-top">
                <span className={`px-2 py-1 rounded text-xs ${r.status==='success'? 'bg-green-100 text-green-700' : r.status==='pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{r.status ?? '-'}</span>
              </td>
              <td className="p-3 align-top">{r.payment_time ? new Date(r.payment_time).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
