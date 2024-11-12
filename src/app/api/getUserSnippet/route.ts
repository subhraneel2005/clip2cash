import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email!
      },
      select: {
        id: true,
        image: true,
        snippet: {
          select: {
            id: true,
            name: true,
            bio: true,
            banner: true,
            twitter: true,
            github: true,
            linkedin: true,
            website: true,
            youtube: true,
            peerlist: true,
            instagram: true,
            magicLinks: true,
            createdAt: true
          }
        }
      }
    })

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 })
    }

    if (!dbUser.snippet) {
      return new NextResponse("Snippet card not found", { status: 404 })
    }

    // Combine user image with snippet data
    const responseData = {
      ...dbUser.snippet,
      userImage: dbUser.image
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching user snippet:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
