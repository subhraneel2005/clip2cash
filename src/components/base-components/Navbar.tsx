"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'

function Navbar() {
    const {data: session} = useSession()
  return (
    <div className='w-full px-10 py-4 items-center border-b border-zinc-800 flex justify-between bg-transparent'>
       <span className='text-[#fff] font-bold'>GetStart</span>
       {session ? <span className='flex gap-1'><img className='size-8 mr-4 rounded-full' src={session?.user?.image!} alt='user pfp'/><Button size={'sm'} variant={'secondary'} onClick={() => signOut()}>Sign out</Button></span> : <Button onClick={() => signIn("google")} size={'sm'} variant={'secondary'}>Sign In</Button>}
    </div>
  )
}

export default Navbar