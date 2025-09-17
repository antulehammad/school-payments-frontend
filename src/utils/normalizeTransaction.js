// src/utils/normalizeTransaction.js
export const normalizeTransaction = (tx) => ({
  id: tx._id,
  order_id: tx.custom_order_id || "-",
  school: tx.school_name || tx.school || "-",
  gateway: tx.payment_mode || tx.gateway || "-",
  order_amount: tx.order_amount ? `₹${tx.order_amount}` : "₹-",
  transaction_amount: tx.transaction_amount ? `₹${tx.transaction_amount}` : "₹-",
  status: tx.status || "-",
  payment_time: tx.payment_time
    ? new Date(tx.payment_time).toLocaleString()
    : tx.createdAt
    ? new Date(tx.createdAt).toLocaleString()
    : "-",
});
