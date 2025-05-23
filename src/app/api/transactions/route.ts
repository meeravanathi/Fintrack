import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const TransactionSchema = z.object({
  amount: z.number(),
  description: z.string(),
  date: z.string().transform((str) => new Date(str)),
  categoryId: z.string().optional(), // ✅ Add this line
});

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    include: {
      category: true,
    },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = TransactionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const transaction = await prisma.transaction.create({
    data: {
      ...parsed.data,
      categoryId: parsed.data.categoryId, // ✅ Ensure it's included in Prisma create
    },
  });

  return NextResponse.json(transaction, { status: 201 });
}
