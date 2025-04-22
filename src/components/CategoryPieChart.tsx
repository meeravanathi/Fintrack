"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#845EC2", "#D65DB1", "#FF6F91", "#FF9671", "#FFC75F"];

interface CategoryData {
  name: string;
  value: number;
}

interface Category {
  id: string;
  name: string;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category?: Category;
  categoryId?: string;
}

export default function CategoryPieChart() {
  const [data, setData] = useState<CategoryData[]>([]);
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
      .then((transactions: Transaction[]) => {
        const map = new Map<string, number>();
        transactions.forEach((t: Transaction) => {
          const name = t.category?.name || "Uncategorized";
          map.set(name, (map.get(name) || 0) + t.amount);
        });
        setData([...map.entries()].map(([name, value]) => ({ name, value })));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading chart data...</div>;
  }

  if (data.length === 0) {
    return <div className="flex justify-center items-center h-64">No category data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={(entry) => ` $${entry.value.toFixed(2)}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}