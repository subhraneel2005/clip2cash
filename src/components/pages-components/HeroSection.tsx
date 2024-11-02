
import React from 'react'
import { Button } from '../ui/button';
import { ArrowRightIcon } from 'lucide-react';

export default function HeroSection() {
  
  return (
    <div className='relative min-h-screen w-full flex flex-col items-center justify-center'>

      {/* Hero Images */}
      <div className='w-full'>
        {/*Desktop Hero Image 📷 */}
        <img
          src={'/main hero.png'}
          className='w-full h-auto mx-auto object-cover hidden lg:flex'
          alt='Hero Image'
        />

        {/*Mobile Hero Image 📷 */}
        <img
          src={'/mobileHero.png'}
          className='w-full h-auto mx-auto object-cover flex lg:hidden'
          alt='Hero Image'
        />
      </div>

      {/* Hero Texts 📝 */}
      <div 
        className='absolute max-h-[500px] inset-0 flex flex-col items-center justify-center space-y-7 text-center xl:pb-0 pb-[60px] pt-10'>
          {/* Add your hero text here 👇 */}
          <h1 className="lg:max-w-6xl text-4xl py-3 px-6 lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text tracking-tighter text-transparent font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400">
            Launch your product in a snap
          </h1>

          {/* Add your hero description here 👇 */}
          <p className='lg:max-w-[450px] max-w-[375px] px-3 bio text-[14px] lg:text-[18px]'>
            The best fullstack kit with pre-built integrations. 
            Focus on your core idea. Increase the creativity.
          </p>

          {/* Add your CTA button here 👇 */}
          <Button>
            <p>Get Started</p>
            <ArrowRightIcon/>
          </Button>
      </div>

    </div>
  );
}
