'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Plus, Minus } from "lucide-react"

interface MagicLink {
  name: string;
  url: string;
}

export default function MagicLinksPage() {
  const [links, setLinks] = useState<MagicLink[]>([{ name: '', url: '' }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const addLink = () => {
    if (links.length < 6) {
      setLinks([...links, { name: '', url: '' }])
    }
  }

  const removeLink = (index: number) => {
    if (links.length > 1) {
      const newLinks = links.filter((_, i) => i !== index)
      setLinks(newLinks)
    }
  }

  const updateLink = (index: number, field: 'name' | 'url', value: string) => {
    const newLinks = links.map((link, i) => {
      if (i === index) {
        return { ...link, [field]: value }
      }
      return link
    })
    setLinks(newLinks)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/magicLinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links }),
      })

      if (response.ok) {
        router.push('/chooseBanner')
      } else {
        console.log('Failed to save magic links')
      }
    } catch (error) {
      console.log('Error saving magic links:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white text-zinc-900 px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="mb-0 text-4xl w-full lg:text-6xl tracking-tighter font-black text-center py-1 mt-6">
          <span className="ml-2">✨</span>
          <span className="bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
            Add Magic Links
          </span>
          <span className="ml-2">✨</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <div className="space-y-4">
          <h2 className="text-base font-medium text-center text-gray-600">Add up to 6 links</h2>
          
          {links.map((link, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Link Name" 
                  value={link.name}
                  onChange={(e) => updateLink(index, 'name', e.target.value)}
                  className="bg-gray-200 border-0"
                  required
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeLink(index)}
                    className="shrink-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Input 
                placeholder="URL" 
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                className="bg-gray-200 border-0"
                required
                type="url"
              />
            </div>
          ))}
          
          {links.length < 6 && (
            <Button
              type="button"
              variant="outline"
              onClick={addLink}
              className="w-full text-gray-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Link
            </Button>
          )}
        </div>

        <div className="mt-8">
          <Button 
            type="submit"
            className="w-full text-lg bg-[#30F116] hover:bg-[#27C112]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : 'Continue'}
          </Button>
        </div>
      </form>
    </div>
  )
}
