'use client'
import React from 'react'
import { Button } from '../ui/button';
import { ArrowRightIcon } from 'lucide-react';
import {motion} from "framer-motion"
import AnimatedShinyText from '../ui/animated-shiny-text';
import Link from 'next/link';
import { AnimatedShinyTextDemo } from '../base-components/AnimatedShinyTextDemo';

export default function HeroSection() {
  
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-[url("/gb.png")] bg-center bg-cover'>
      {/* Hero Texts 📝 */}
      <div 
        className='flex flex-col items-center justify-center text-center pt-10'>
            {/* Self Promotion 😋  */}
            <AnimatedShinyTextDemo/>
          {/* Add your hero text here 👇 */}
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:max-w-6xl text-4xl py-3 px-6 lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text tracking-tighter text-transparent font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400"
            >
            Your awesome hero text here
          </motion.h1>

          {/* Add your hero description here 👇 */}
          <p className='text-[14px] md:text-[15px] text-zinc-400 px-5 max-w-[500px] mb-5 pt-2'>
            The hero description goes here. This is a great place to tell your story and showcase your brand. Your awesome description.
          </p>
          {/* Add your CTA button here 👇 */}
          <Button className='mb-12 group flex items-center gap-2'>
            <p>Get Started</p>
            <div className="transition-transform transform group-hover:translate-x-1 duration-500">
              <ArrowRightIcon/>
            </div>
          </Button>
      </div>
      <div className='px-3'>
      <video
        className="rounded-xl border-2 border-zinc-600 max-w-[360px] lg:max-w-[800px]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
