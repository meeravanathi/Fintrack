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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
  <SelectTrigger>
    <SelectValue placeholder="Select a category">
      {categories.find(cat => cat.id === field.value)?.name}
    </SelectValue>
  </SelectTrigger>
  <SelectContent>
    {categories.map(cat => (
      <SelectItem key={cat.id} value={cat.id}>
        {cat.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Transaction</Button>
      </form>
    </Form>
  );
}
