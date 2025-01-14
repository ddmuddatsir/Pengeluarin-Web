// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// // Handler untuk GET (mengambil semua transaksi)
// export async function GET() {
//   try {
//     const transactions = await prisma.transaction.findMany();
//     console.log("Transactions fetched:", transactions); // Debugging log
//     return NextResponse.json(transactions);
//   } catch (error) {
//     console.error("Error fetching transactions:", error);
//     return NextResponse.error();
//   }
// }

// // Handler untuk POST (menambahkan transaksi baru)
// export async function POST(req: Request) {
//   try {
//     const { amount, date, description, category } = await req.json();
//     const transaction = await prisma.transaction.create({
//       data: {
//         amount,
//         date: new Date(date),
//         description,
//         category,
//       },
//     });
//     return NextResponse.json(transaction);
//   } catch (error) {
//     console.error("Error creating transaction:", error);
//     return NextResponse.error();
//   }
// }

// // Handler untuk DELETE (menghapus transaksi)
// export async function DELETE(req: Request) {
//   try {
//     const { id } = await req.json();
//     await prisma.transaction.delete({ where: { id } });
//     return NextResponse.json({ message: "Transaction deleted" });
//   } catch (error) {
//     console.error("Error deleting transaction:", error);
//     return NextResponse.error();
//   }
// }

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { amount, date, description, category } = await req.json();

    // Validasi input
    if (!amount || !date || !description || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        description,
        category,
      },
    });
    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    await prisma.transaction.delete({ where: { id } });
    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
