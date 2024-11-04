'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EmailPage() {


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center px-4 py-8">
        <h2 className="mb-3 text-4xl py-3 w-full lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text tracking-tighter text-transparent font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400">Get Early Access</h2>
        <p className="lg:max-w-[450px] max-w-[375px] px-3 bio text-[14px] lg:text-[18px] mb-8">
          Be the first to experience our amazing new product!
        </p>
        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
          >Get Early Access
          </Button>
        </form>
      </div>
    </div>
  )
}