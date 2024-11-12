import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { banner } = await req.json()

    // Validate required fields
    if (!banner) {
      return new NextResponse("Banner is required", { status: 400 })
    }

    const dbUser = await prisma.user.findUnique({
        where: {
            email: user.email!
        }
    })
    
    const snippetCard = await prisma.snippetCard.update({
        where: {
            userId: dbUser?.id!
        },
        data: {
            banner
        }
    })

    return NextResponse.json(snippetCard)
  } catch (error) {
    console.error('Error in banner API:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
