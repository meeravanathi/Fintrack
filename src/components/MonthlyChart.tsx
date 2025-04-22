"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface Transaction {
  id: string;
  amount: number;
  date: string;
}

export default function MonthlyChart() {
  const [data, setData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions: Transaction[]) => {
        const grouped: Record<string, number> = {};

        transactions.forEach((tx) => {
          const month = format(new Date(tx.date), "MMM yyyy");
          grouped[month] = (grouped[month] || 0) + tx.amount;
        });

        const chartData = Object.entries(grouped).map(([month, total]) => ({ month, total }));
        setData(chartData);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#7c3aed" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
