'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FaInstagram, FaYoutube, FaTwitter, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa'
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentPlatform, setCurrentPlatform] = useState<{ id: string; name: string } | null>(null)
  const [socialUrls, setSocialUrls] = useState<Record<string, string>>({})

  const platforms = [
    { id: 'website', name: 'Website', icon: FaGlobe, color: 'bg-emerald-600' },
    { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: 'bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500' },
    { id: 'youtube', name: 'YouTube', icon: FaYoutube, color: 'bg-red-600' },
    { id: 'twitter', name: 'X', icon: FaTwitter, color: 'bg-blue-400' },
    { id: 'github', name: 'GitHub', icon: FaGithub, color: 'bg-gray-900' },
    { id: 'linkedin', name: 'LinkedIn', icon: FaLinkedin, color: 'bg-blue-600' },
  ]

  const router = useRouter()

  const togglePlatform = (platform: { id: string; name: string }) => {
    setCurrentPlatform(platform)
    setDialogOpen(true)
  }

  const handleSubmitUrl = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const url = formData.get('socialUrl') as string

    if (currentPlatform) {
      setSocialUrls(prev => ({ ...prev, [currentPlatform.id]: url }))
      setSelectedPlatforms(prev => {
        if (!prev.includes(currentPlatform.id)) {
          return [...prev, currentPlatform.id]
        }
        return prev
      })
    }
    setDialogOpen(false)
  }

  const handleContinue = async () => {
    try {
      const response = await fetch('/api/social-platforms', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website: socialUrls.website || '',
          twitter: socialUrls.twitter || '',
          youtube: socialUrls.youtube || '',
          github: socialUrls.github || '',
          linkedin: socialUrls.linkedin || '',
          instagram: socialUrls.instagram || '',
          peerlist: '',
        }),
      })

      if (response.ok) {
        router.push('/urls')
      } else {
        console.log('Failed to save social platforms')
      }
    } catch (error) {
      console.log('Error saving social platforms:', error)
    }
  }

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl w-full lg:text-5xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black text-center py-1 mt-6 mb-6">Which platforms are you on?</h1>
          <p className="text-gray-600">
            Pick up to six to get started. You can update at any time.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {platforms.map((platform) => {
            const isSelected = selectedPlatforms.includes(platform.id)
            return (
              <button
                key={platform.id}
                onClick={() => togglePlatform(platform)}
                className={`aspect-square rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all ${
                  isSelected ? platform.color + ' text-white' : 'bg-white hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <platform.icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-black'}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-black'}`}>{platform.name}</span>
              </button>
            )
          })}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className={`${currentPlatform ? platforms.find(p => p.id === currentPlatform.id)?.color : ''}`}>
            <DialogHeader>
              <DialogTitle className="text-white">
                Add your {currentPlatform?.name} URL
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitUrl}>
              <div className="grid gap-4 py-4">
                <Input
                  id="socialUrl"
                  name="socialUrl"
                  placeholder={`Enter your ${currentPlatform?.name} URL`}
                  defaultValue={currentPlatform ? socialUrls[currentPlatform.id] || '' : ''}
                  required
                  className="bg-white text-zinc-900"
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="mt-6">
          <Button 
            onClick={handleContinue}
            className="w-full py-6 mt-6 text-lg bg-[#30F116] hover:bg-[#27C112]"
            disabled={selectedPlatforms.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}