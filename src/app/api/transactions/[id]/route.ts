// src/app/api/transactions/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const TransactionSchema = z.object({
  amount: z.coerce.number().positive(),
  description: z.string(),
  date: z.string().transform((str) => new Date(str)),
});

type ParamsPromise = { params: Promise<{ id: string }> };

export async function GET(
  req: Request,
  { params }: ParamsPromise
) {
  const { id } = await params;                     // ← await the promise to get `{ id }`
  const transaction = await prisma.transaction.findUnique({
    where: { id },
  });

  if (!transaction) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(transaction);
}

export async function PUT(
  req: Request,
  { params }: ParamsPromise
) {
  const { id } = await params;
  const body = await req.json();
  const parsed = TransactionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const updated = await prisma.transaction.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: ParamsPromise
) {
  const { id } = await params;
  await prisma.transaction.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
