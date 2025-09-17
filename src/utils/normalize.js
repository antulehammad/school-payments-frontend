// src/utils/normalize.js
export function normalizeTransaction(tx = {}) {
  return {
    _id: tx._id || tx.id || Math.random().toString(36).slice(2, 9),

    collect_id: tx.collect_id || tx.custom_order_id || tx.order_id || "-",

    school_id: tx.school_id || "-",
    gateway: tx.gateway || tx.gateway_name || tx.payment_mode || "-",

    order_amount: Number(tx.order_amount ?? 0),
    transaction_amount: Number(tx.transaction_amount ?? 0),

    status: (tx.status || "UNKNOWN").toString().toLowerCase(),

    custom_order_id: tx.custom_order_id || "-",

    payment_time:
      tx.payment_time ||
      tx.createdAt ||
      tx.updatedAt ||
      null,

    raw: tx,
  };
}
