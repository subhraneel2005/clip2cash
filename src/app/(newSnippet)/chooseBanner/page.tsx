'use client'
import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ReactConfetti from 'react-confetti'
import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()

  const [selectedBanner, setSelectedBanner] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const banners = Array.from({ length: 20 }, (_, i) => i + 1)

  const handleBannerSubmit = async () => {
    if (!selectedBanner) return;
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/banner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ banner: `b${selectedBanner}.png` }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update banner')
      }
      
      setShowConfetti(true)
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error) {
      console.error('Error updating banner:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white text-zinc-900 px-4 py-8">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      
      <div className="text-center mb-8">
        <h2 className="mb-0 text-4xl w-full lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black text-center py-1 mt-6">
          Choose a banner you like
        </h2>
      </div>

      <div className="mt-8">
        <Button 
          onClick={handleBannerSubmit}
          className="w-full text-xl bg-[#30F116] hover:bg-[#27C112]"
          disabled={isSubmitting || !selectedBanner}
        >
          {isSubmitting ? 'Please wait...' : 'Complete profile'}
        </Button>
      </div>

      <RadioGroup
        defaultValue=""
        value={selectedBanner}
        onValueChange={setSelectedBanner}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14"
      >
        {banners.map((number) => (
          <div key={number} className="relative">
            <RadioGroupItem
              value={number.toString()}
              id={`banner-${number}`}
              className="sr-only"
            />
            <Label
              htmlFor={`banner-${number}`}
              className={`cursor-pointer block relative ${
                selectedBanner === number.toString() ? 'ring-4 ring-[#30F116] rounded-[34px]' : ''
              }`}
            >
              <img
                src={`/cards/b${number}.png`}
                alt={`Banner ${number}`}
                className="w-[400px] h-[200px] rounded-[34px] object-cover"
              />
              {selectedBanner === number.toString() && (
                <div className="absolute top-4 right-4 bg-[#30F116] p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
