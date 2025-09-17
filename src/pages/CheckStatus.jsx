// src/pages/CheckStatus.jsx
import { useState } from "react";
import axios from "../api";

export default function CheckStatus() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);

  const checkStatus = async () => {
    try {
      const res = await axios.get(`/transactions/status/${orderId}`);
      setStatus(res.data);
    } catch (error) {
      console.error("Error checking status:", error);
      alert("Failed to fetch status.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Check Transaction Status</h1>
      <div className="mb-4">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter custom order ID"
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={checkStatus}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Check Status
        </button>
      </div>
      {status && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold">Transaction Status:</h2>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
