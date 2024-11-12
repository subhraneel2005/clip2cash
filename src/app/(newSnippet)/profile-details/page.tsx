'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function Component() {
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const maxLength = 80
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/profileDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, bio }),
      })

      if (response.ok) {
        router.push('/choose-platform')
      } else {
        console.log('Failed to save profile details')
      }
    } catch (error) {
      console.log('Error saving profile details:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white text-zinc-900 px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="mb-0 text-4xl w-full lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black text-center py-1 mt-6">
          Add profile details
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-base font-medium text-center">Add name and bio</h2>
          
          <Input 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-200 border-0"
            required
          />
          
          <div className="relative">
            <Textarea 
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, maxLength))}
              className="w-full min-h-[120px] bg-gray-200 border-0 resize-none"
              required
            />
            <span className="absolute bottom-2 right-2 text-sm text-gray-400">
              {bio.length}/{maxLength}
            </span>
          </div>
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