import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { links } = await req.json()

    // Validate required fields
    if (!links || !Array.isArray(links) || links.length === 0) {
      return new NextResponse("At least one magic link is required", { status: 400 })
    }

    // Validate link structure
    const isValidLinks = links.every(link => 
      typeof link.name === 'string' && 
      typeof link.url === 'string' && 
      link.name.trim() !== '' && 
      link.url.trim() !== ''
    )

    if (!isValidLinks) {
      return new NextResponse("Invalid link format", { status: 400 })
    }

    // Validate maximum links
    if (links.length > 6) {
      return new NextResponse("Maximum 6 links allowed", { status: 400 })
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
        magicLinks: links.map(link => ({
          name: link.name.trim(),
          url: link.url.trim()
        }))
      }
    })

    return NextResponse.json(snippetCard)
  } catch (error) {
    console.error('Error in magic links API:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
