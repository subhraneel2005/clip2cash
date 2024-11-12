'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from 'react-icons/fa'
import { RiTwitterXFill } from "react-icons/ri"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface MagicLink {
  name: string
  url: string
}

interface SnippetCardProps {
  name: string
  bio: string
  banner: string
  twitter: string
  github: string
  linkedin: string
  website: string
  instagram: string
  magicLinks: MagicLink[]
  userImage: string
}

export default function SnippetCard({
  name,
  bio,
  banner,
  twitter,
  github,
  linkedin,
  website,
  instagram,
  magicLinks,
  userImage
}: SnippetCardProps) {
  console.log('Banner URL:', banner)
  console.log('Social Links:', { twitter, github, linkedin, website, instagram })
  console.log('Magic Links:', magicLinks)

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
      style={{
        filter: 'drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.5))',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative md:w-[650px] md:h-[350px] w-[350px] h-[350px] rounded-[36px] border-2 border-gray-400"
    >
      <div className='flex flex-col justify-between items-center h-full py-3'>
        <div className='flex flex-col items-center'>
          <div className='flex justify-center items-center gap-1'>
              <Avatar className='border-2 border-white size-8 shadow-xl'>
                  <AvatarImage src={userImage} alt={name} />
                  <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className='text-white text-sm font-semibold'>@{name}</p>
          </div>
          <p className='text-gray-200 max-w-[300px] text-xs font-semibold text-center mt-4'>
            {bio}
          </p>
          
          <div className="flex gap-4 mt-4">
            {twitter && twitter.trim() !== '' && (
              <motion.a
                href={twitter}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-200 hover:text-blue-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTwitterXFill size={20} />
              </motion.a>
            )}
            {github && github.trim() !== '' && (
              <motion.a
                href={github}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-200 hover:text-gray-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={20} />
              </motion.a>
            )}
            {linkedin && linkedin.trim() !== '' && (
              <motion.a
                href={linkedin}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-200 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={20} />
              </motion.a>
            )}
            {website && website.trim() !== '' && (
              <motion.a
                href={website}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-200 hover:text-emerald-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe size={20} />
              </motion.a>
            )}
            {instagram && instagram.trim() !== '' && (
              <motion.a
                href={instagram}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-gray-200 hover:text-pink-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </motion.a>
            )}
          </div>
        </div>

        {magicLinks && magicLinks.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="text-gray-200 hover:text-white bg-white/20 hover:bg-white/40 -mt-6"
              >
                Magic links✨
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {magicLinks.map((link, index) => (
                <DropdownMenuItem key={index} asChild>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    {link.name}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <span className="flex gap-2 items-center justify-center pb-2">
          <img src="/logo.png" alt="logo" className="size-5" />
          <p className="bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text tracking-tighter text-transparent text-sm font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400">
            TinySnippet
          </p>
        </span>
      </div>
    </motion.div>
  )
}
