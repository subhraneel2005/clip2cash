
import React from 'react'
import { Button } from '../ui/button';
import { ArrowRightIcon } from 'lucide-react';

export default function HeroSection() {
  
  return (
    <div className=' min-h-screen w-full flex flex-col items-center justify-center bg-[url("/gb.png")] bg-center bg-cover'>
      {/* Hero Texts 📝 */}
      <div 
        className='flex flex-col items-center justify-center text-center pt-10'>
          {/* Add your hero text here 👇 */}
          <h1 className="lg:max-w-6xl text-4xl py-3 px-6 lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text tracking-tighter text-transparent font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400 lg:mt-[50px]">
            Launch your product in a snap
          </h1>

          {/* Add your hero description here 👇 */}
          <p className='text-[14px] md:text-[15px] text-zinc-400 px-5 max-w-[500px] mb-5 pt-2'>
            The best fullstack kit with pre-built integrations. 
            Focus on your core idea. Increase the creativity.
          </p>

          {/* Add your CTA button here 👇 */}
          <Button className='mb-12'>
            <p>Get Started</p>
            <ArrowRightIcon/>
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
