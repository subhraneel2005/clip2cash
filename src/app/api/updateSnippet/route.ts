import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await req.json()

    // Remove any undefined values
    Object.keys(data).forEach(key => {
      if (data[key] === undefined) {
        delete data[key]
      }
    })

    const updatedUser = await prisma.user.update({
      where: {
        email: user.email!
      },
      data: {
        snippet: {
          update: {
            banner: data.banner,
            twitter: data.twitter,
            github: data.github,
            linkedin: data.linkedin,
            website: data.website,
            youtube: data.youtube,
            peerlist: data.peerlist,
            instagram: data.instagram,
            magicLinks: data.magicLinks,
          }
        }
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

    if (!updatedUser.snippet) {
      return new NextResponse("Snippet not found", { status: 404 })
    }

    // Combine user image with snippet data
    const responseData = {
      ...updatedUser.snippet,
      userImage: updatedUser.image
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error updating user snippet:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 