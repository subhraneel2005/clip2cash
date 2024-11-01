
import React from 'react'
import { Button } from '../ui/button';
import { ArrowRightIcon } from 'lucide-react';

export default function HeroSection() {
  
  return (
    <div className='relative min-h-screen w-full flex flex-col items-center justify-center'>

      {/* Hero Image 📷 */}
      <img
        src={'/main hero.png'}
        className='w-full h-auto mx-auto object-cover'
        alt='Hero Image'
      />

      {/* Hero Texts 📝 */}
      <div 
        className='absolute max-h-[500px] inset-0 flex flex-col items-center justify-center space-y-7 text-center xl:pb-0 pb-[60px]'>
          {/* Add your hero text here 👇 */}
          <h1 className="max-w-6xl text-4xl px-6 xl:text-6xl bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
            Getstart is the new way to streamline your side projects
          </h1>

          {/* Add your hero description here 👇 */}
          <p className='max-w-[450px] bio text-[18px]'>
            The best fullstack kit with pre-built integrations. 
            Focus on your core idea. Increase the creativity.
          </p>

          {/* Add your CTA button here 👇 */}
          <Button variant={'secondary'}>
            <p>Get Started</p>
            <ArrowRightIcon/>
          </Button>
      </div>

    </div>
  );
}
