import React from 'react';
export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex items-center justify-between mt-4">
      <div>Page {page} / {totalPages}</div>
      <div className="flex gap-2">
        <button onClick={()=>setPage(Math.max(1, page-1))} className="px-3 py-1 border rounded">Prev</button>
        <button onClick={()=>setPage(page+1)} className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  );
}
