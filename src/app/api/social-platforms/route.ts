import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export async function PUT(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { website, twitter, youtube, github, linkedin, instagram, peerlist } = await req.json()

    // Check if at least one social platform is provided
    if (!website && !twitter && !youtube && !github && !linkedin && !instagram && !peerlist) {
      return new NextResponse("At least one social platform is required", { status: 400 })
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
            twitter,
            github,
            linkedin,
            website,
            youtube,
            peerlist,
            instagram
        }
    })

    return NextResponse.json(snippetCard)
  } catch (error) {
    console.log('Error in snippet-card API:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}