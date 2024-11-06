import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  try {
    const { email } = await request.json();

    // if the email already exists in the BetaUsers table
    const existingUser = await prisma.betaUsers.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Insert new email into the BetaUsers table
    const newUser = await prisma.betaUsers.create({
      data: { email },
    });

    return NextResponse.json({ message: "User added successfully", newUser });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add user", error: error },
      { status: 500 }
    );
  }
}
