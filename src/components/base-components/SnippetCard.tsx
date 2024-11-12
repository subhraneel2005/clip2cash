'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from 'react-icons/fa'
import { RiTwitterXFill } from "react-icons/ri";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export default function SnippetCard() {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
      style={{
        filter: 'drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.5))'
      }}
      className='relative md:w-[650px] md:h-[350px] w-[350px] h-[350px] rounded-[36px] border-2 border-gray-400 bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url("/cards/b8.png")] bg-cover bg-center'
    >
      <div className='flex flex-col justify-between items-center h-full py-3'>
        <div className='flex flex-col items-center'>
          <div className='flex justify-center items-center gap-1'>
              <Avatar className='border-2 border-white size-8 shadow-xl'>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className='text-white text-sm font-semibold'>subhraneel</p>
          </div>
          <p className='text-gray-200 max-w-[300px] text-xs font-semibold text-center mt-4'>
            Software Developer from India. Building solutions, making people's lives easy
          </p>
          
          <div className="flex gap-4 mt-4">
            <motion.a
              href="https://twitter.com/yourusername"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-200 hover:text-blue-400 transition-colors"
            >
              <RiTwitterXFill size={20} />
            </motion.a>
            <motion.a
              href="https://github.com/yourusername"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-200 hover:text-gray-400 transition-colors"
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/yourusername"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-200 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.a
              href="https://yourwebsite.com"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-200 hover:text-emerald-400 transition-colors"
            >
              <FaGlobe size={20} />
            </motion.a>
            <motion.a
              href="https://instagram.com/yourusername"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-200 hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={20} />
            </motion.a>
          </div>
        </div>

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
            <DropdownMenuItem>Button 1</DropdownMenuItem>
            <DropdownMenuItem>Button 2</DropdownMenuItem>
            <DropdownMenuItem>Button 3</DropdownMenuItem>
            <DropdownMenuItem>Button 4</DropdownMenuItem>
            <DropdownMenuItem>Button 5</DropdownMenuItem>
            <DropdownMenuItem>Button 6</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
