import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    // Map _id to id if needed (Prisma does it automatically usually)
    const mappedCategories = categories.map(({ id, name }) => ({
      id,
      name,
    }));

    return NextResponse.json(mappedCategories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
