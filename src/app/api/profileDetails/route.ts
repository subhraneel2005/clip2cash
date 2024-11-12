import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { name, bio } = await req.json()

    // Validate required fields
    if (!name || !bio) {
      return new NextResponse("Name and bio are required", { status: 400 })
    }

    const dbUser = await prisma.user.findUnique({
        where: {
            email: user.email!
        }
    })
    // Update if exists, create if doesn't
    const snippetCard = await prisma.snippetCard.create({
        data: {
            userId: dbUser?.id!,
            name,
            bio,
            banner: "",
            twitter: "",
            github: "",
            linkedin: "",
            website: "",
            instagram: "",
            youtube: "",
            peerlist: "",
            magicLinks: [],
        }
    })

    return NextResponse.json(snippetCard)
  } catch (error) {
    console.log('Error in snippet-card API:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}