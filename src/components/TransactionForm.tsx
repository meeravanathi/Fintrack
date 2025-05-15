"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
  amount: z.coerce.number().positive(),
  description: z.string().min(1),
  date: z.string(),
  categoryId: z.string().min(1),
});

type TransactionInput = z.infer<typeof schema>;

type Category = {
  id: string;
  name: string;
};

export default function TransactionForm() {
  const form = useForm<TransactionInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
      description: "",
      date: "",
      categoryId: "",
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) {
        console.error("Failed to fetch categories:", await res.text());
        return;
      }
      const data = await res.json();
      setCategories(data);
      console.log("Categories from API:", data);
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: TransactionInput) => {
    await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-bold">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-white">Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="font-bold rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </FormControl>
              <FormMessage className="font-bold text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-white">Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="font-bold rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </FormControl>
              <FormMessage className="font-bold text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-white">Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  className="font-bold rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </FormControl>
              <FormMessage className="font-bold text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-white">Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="font-bold rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="font-bold bg-gray-800 text-white">
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id} className="font-bold">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="font-bold text-red-400" />
            </FormItem>
          )}
        />
        <Button type="submit" className="font-bold bg-purple-700 hover:bg-purple-800">
          Add Transaction
        </Button>
      </form>
    </Form>
  );
}
