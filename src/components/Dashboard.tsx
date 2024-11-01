"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

function Dashboard() {
    const {data: session} = useSession()
  return (
    <>
        {session ? (
            <>  
                <img src={session.user?.image as string} alt="profileimage" className='rounded-full h-16 w-16'/>
                <h1 className='text-3xl font-bold'>Welcome Back <strong className='text-green-500'>{session.user?.name}</strong> </h1>
                <p className='text-2xl font-semibold'>{session.user?.email}</p>

                <button onClick={() => signOut()} className='border border-black bg-red-400 rounded-lg px-5 py-1'>Sign Out</button>
            </>
        ) : (
            <>
                <h1 className='text-3xl text-red-500'>You're not logged in</h1>
                <div className='flex space-x-5'>
                    <button onClick={() => signIn("google")} className='border border-black rounded-lg px-5 py-1'>Sign In with Google</button>
                    <button onClick={() => signIn("github")} className='border border-black rounded-lg px-5 py-1'>Sign In with Github</button>
                </div>
            </>
        )}
    </>
  )
}

export default Dashboard