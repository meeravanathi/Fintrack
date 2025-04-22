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
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Date</th>
          <th className="p-2">Description</th>
          <th className="p-2">Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id} className="border-t">
            <td className="p-2">{new Date(tx.date).toLocaleDateString()}</td>
            <td className="p-2">{tx.description}</td>
            <td className="p-2">₹{tx.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
