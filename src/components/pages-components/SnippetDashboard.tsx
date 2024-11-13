'use client'

import { useEffect, useState } from 'react'
import SnippetCard from '../base-components/SnippetCard'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Loader2, Plus, Minus, Edit2, Save, Share2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FaTwitter, FaGithub, FaLinkedin, FaGlobe, FaInstagram } from 'react-icons/fa'
import { SocialMediaGraphs } from '../base-components/SocialMediaGraphs'

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

const bannerOptions = Array.from({ length: 20 }, (_, i) => `/cards/b${i + 1}.png`)

export default function SnippetDashboard() {
  const [snippetData, setSnippetData] = useState<SnippetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<Partial<SnippetData> | null>(null)

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

  const handleEditMagicLinks = (links: MagicLink[]) => {
    if (links.length > 6) {
      toast.error('Maximum 6 magic links allowed')
      return
    }
    setEditedData(prev => ({ ...prev, magicLinks: links }))
  }

  const handleEditSocialLinks = (field: string, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }))
  }

  const handleEditBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.includes('image')) {
      toast.error('Please upload an image file')
      return
    }

    const formData = new FormData()
    formData.append('banner', file)

    try {
      const response = await fetch('/api/uploadBanner', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Failed to upload banner')

      const { bannerPath } = await response.json()
      setEditedData(prev => ({ ...prev, banner: bannerPath }))
      toast.success('Banner updated successfully')
    } catch (error) {
      toast.error('Failed to upload banner')
    }
  }

  const saveChanges = async () => {
    if (!editedData) return

    try {
      const response = await fetch('/api/updateSnippet', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editedData,
          banner: editedData.banner?.replace('/cards/', '')
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error)
      }

      const updatedData = await response.json()
      
      // Process the response to ensure banner has full path
      const processedData = {
        ...updatedData,
        banner: `/cards/${updatedData.banner}`,
      }

      setSnippetData(processedData)
      setIsEditing(false)
      setEditedData(null)
      toast.success('Changes saved successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save changes')
    }
  }

  const handleBannerSelect = (value: string) => {
    setEditedData(prev => ({ ...prev, banner: value }))
  }

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
    <div className='bg-white flex flex-col justify-center items-center min-h-screen w-full gap-4'>
       <h2 className="mb-0 text-3xl w-full lg:text-5xl tracking-tighter font-black text-center py-3 mt-6">
          <span className="ml-2">✨</span>
          <span className="bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
            Preview
          </span>
          <span className="ml-2">✨</span>
        </h2>
      <SnippetCard {...snippetData} />
      
      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Edit2 className="h-4 w-4" />
              Edit Snippet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Your Snippet</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
            <div className="space-y-2">
                  <label className="text-sm font-medium">Banner Style</label>
                  <Select 
                    value={editedData?.banner || snippetData?.banner} 
                    onValueChange={handleBannerSelect}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {(editedData?.banner || snippetData?.banner)?.split('/').pop()?.replace('.png', '')}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {bannerOptions.map((banner) => (
                          <SelectItem key={banner} value={banner}>
                            <div className="flex flex-col items-center">
                              <img 
                                src={banner} 
                                alt="Banner preview" 
                                className="w-32 h-16 object-cover rounded-md"
                              />
                              <span className="text-xs mt-1">
                                {banner.split('/').pop()?.replace('.png', '')}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Social Links</label>
                {Object.entries({
                  twitter: { label: 'Twitter', icon: <FaTwitter className="h-5 w-5 text-[#1DA1F2]" /> },
                  github: { label: 'GitHub', icon: <FaGithub className="h-5 w-5 text-[#333]" /> },
                  linkedin: { label: 'LinkedIn', icon: <FaLinkedin className="h-5 w-5 text-[#0A66C2]" /> },
                  website: { label: 'Website', icon: <FaGlobe className="h-5 w-5 text-[#2563eb]" /> },
                  instagram: { label: 'Instagram', icon: <FaInstagram className="h-5 w-5 text-[#E4405F]" /> }
                }).map(([key, { label, icon }]) => (
                  <div key={key} className="flex items-center gap-2">
                    {icon}
                    <Input
                      placeholder={label}
                      value={editedData?.[key as keyof Omit<SnippetData, 'magicLinks'>] || snippetData?.[key as keyof Omit<SnippetData, 'magicLinks'>] || ''}
                      onChange={(e) => handleEditSocialLinks(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Magic Links</label>
                <div className="space-y-2">
                  {(editedData?.magicLinks || snippetData?.magicLinks || []).map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Name"
                        value={link.name}
                        onChange={(e) => {
                          const newLinks = [...(editedData?.magicLinks || snippetData?.magicLinks || [])]
                          newLinks[index] = { ...newLinks[index], name: e.target.value }
                          handleEditMagicLinks(newLinks)
                        }}
                      />
                      <Input
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...(editedData?.magicLinks || snippetData?.magicLinks || [])]
                          newLinks[index] = { ...newLinks[index], url: e.target.value }
                          handleEditMagicLinks(newLinks)
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newLinks = (editedData?.magicLinks || snippetData?.magicLinks || []).filter((_, i) => i !== index)
                          handleEditMagicLinks(newLinks)
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {(editedData?.magicLinks || snippetData?.magicLinks || []).length < 6 && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const newLinks = [...(editedData?.magicLinks || snippetData?.magicLinks || []), { name: '', url: '' }]
                        handleEditMagicLinks(newLinks)
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Magic Link
                    </Button>
                  )}
                </div>
              </div>

              <Button onClick={saveChanges} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Snippet
        </Button>
      </div>

      <h2 className="mb-0 text-3xl w-full lg:text-5xl tracking-tighter font-black text-center py-3 pt-32">
          <span className="bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
            Daily Clicks
          </span>
          <span className="ml-2">🔄</span>
        </h2>
      <SocialMediaGraphs/>
    </div>
  )
}