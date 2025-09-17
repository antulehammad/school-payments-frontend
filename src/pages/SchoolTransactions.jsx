import { useState, useEffect } from "react";
import api from "../api";
import { normalizeTransaction } from "../utils/normalizeTransaction";
import TransactionsTable from "../components/TransactionsTable";

export default function SchoolTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions"); // 👈 adjust endpoint
      const normalized = res.data.map((tx) => normalizeTransaction(tx));
      setTransactions(normalized);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert("Failed to fetch transactions.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);

    setTransactions((prev) =>
      [...prev].sort((a, b) => {
        if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
        if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">School Transactions</h1>
      {transactions.length > 0 ? (
        <TransactionsTable
          data={transactions}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      ) : (
        <p>No transactions to display.</p>
      )}
    </div>
  );
}
