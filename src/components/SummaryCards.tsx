"use client";

import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryId?: string;
}

export default function SummaryCards() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/transactions")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }
        return res.json();
      })
      .then((data: Transaction[]) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, []);

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="p-4 shadow-xl bg-gray-900 rounded-xl ">
        <h2 className="text-lg font-bold ">Total Expenses</h2>
        {loading ? (
          <p className="text-xl">Loading...</p>
        ) : (
          <p className="text-xl">₹{total.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}