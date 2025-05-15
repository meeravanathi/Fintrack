"use client";

import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border-collapse bg-gray-900 text-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-800 border-b border-gray-700">
            <th className="py-3 px-6 text-left uppercase font-semibold tracking-wide">Date</th>
            <th className="py-3 px-6 text-left uppercase font-semibold tracking-wide">Description</th>
            <th className="py-3 px-6 text-right uppercase font-semibold tracking-wide">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr
              key={tx.id}
              className={`border-b border-gray-700 ${
                i % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
              } hover:bg-gray-700 transition-colors duration-300`}
            >
              <td className="py-3 px-6">{new Date(tx.date).toLocaleDateString()}</td>
              <td className="py-3 px-6">{tx.description}</td>
              <td className="py-3 px-6 text-right font-medium text-green-400">
                ₹{tx.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
