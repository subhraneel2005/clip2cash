'use client'

import { useEffect, useState } from 'react'
import SnippetCard from '../base-components/SnippetCard'
import { Loader2 } from 'lucide-react'

interface MagicLink {
  name: string
  url: string
}

interface SnippetData {
  id: string
  name: string
  bio: string
  banner: string
  twitter: string
  github: string
  linkedin: string
  website: string
  youtube: string
  peerlist: string
  instagram: string
  magicLinks: MagicLink[]
  userImage: string
  createdAt: string
}

export default function SnippetDashboard() {
  const [snippetData, setSnippetData] = useState<SnippetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSnippetData = async () => {
      try {
        const response = await fetch('/api/getUserSnippet')
        if (!response.ok) {
          throw new Error('Failed to fetch snippet data')
        }
        const data = await response.json()
        
        // Process the data to ensure all fields are present
        const processedData = {
          ...data,
          // Add the full path for banner image
          banner: `/cards/${data.banner}`,
          // Ensure empty strings for optional social links
          youtube: data.youtube || '',
          peerlist: data.peerlist || '',
          // Ensure magicLinks is always an array
          magicLinks: Array.isArray(data.magicLinks) ? data.magicLinks : []
        }
        
        setSnippetData(processedData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchSnippetData()
  }, [])

  if (loading) {
    return (
      <div className='bg-white flex flex-col justify-center items-center min-h-screen w-full'>
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-white flex flex-col justify-center items-center min-h-screen w-full'>
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (!snippetData) {
    return (
      <div className='bg-white flex flex-col justify-center items-center min-h-screen w-full'>
        <p className="text-gray-500">No snippet data found</p>
      </div>
    )
  }

  return (
    <div className='bg-white flex flex-col justify-center items-center min-h-screen w-full'>
      <SnippetCard {...snippetData} />
    </div>
  )
}