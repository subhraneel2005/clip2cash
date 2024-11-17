"use client"

import { useState } from "react"
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

const useCases = [
  {
    title: "For Your Next Side Project",
    description: "Perfect for quickly launching small projects.",
  },
  {
    title: "Build & Launch Your SaaS",
    description: "Accelerate SaaS development with pre-built features.",
  },
  {
    title: "Focus on Core Features",
    description: "Skip repetitive setup and focus on what matters.",
  },
  {
    title: "Save 20+ Hours",
    description: "Cut down setup time with a ready-to-go template.",
  },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session } = useSession()

  return (
    <div className="navbar fixed top-0 z-10 px-6 lg:px-10 py-6">
      <div className="flex-1">
        <span className="flex gap-2 items-center">
          <h2 className="bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text tracking-tighter text-transparent text-sm lg:text-lg font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400">
            Clip2Cash
          </h2>
          <img src="/logo.png" alt="logo" className="size-6 lg:size-7" />
        </span>
      </div>

      <div className="flex-none gap-2">
        {session ? (
          <div className="flex gap-2 items-center">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={session?.user?.image!} alt="user pfp"/>
              </div>
            </div>
            <button 
              className="btn btn-sm btn-warning" 
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="btn btn-sm">
              Sign In
            </button>
          </Link>
        )}

        {/* Optional: Dropdown menu for mobile */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <Menu />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {useCases.map((useCase, index) => (
              <li key={index}>
                <a>
                  <h3 className="font-medium">{useCase.title}</h3>
                  <p className="text-sm opacity-75">{useCase.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
