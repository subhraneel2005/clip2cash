'use client'

import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { useSession } from "next-auth/react"

export default function EmailPage() {
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const handleGetStarted = () => {

    const isAuthenticated = user ? true : false; 

    if (!isAuthenticated) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); 
    } else {
      router.push("/create");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center px-4 py-8">

        <Link href={"https://getstart.site/"} target="_blank">
          <button className="btn btn-sm">
            Made with Getstart ✨
          </button>
        </Link>
        
        <h2 className="mb-0 text-5xl w-full lg:text-8xl md:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400 py-1 mt-6">
          Create viral <span className="text-[#FF0000] italic">shorts</span>
        </h2>
        <h2 className="-mt-2 text-5xl w-full lg:text-8xl md:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400 py-1">
          in seconds 
        </h2>
        <p className="lg:max-w-[450px] max-w-[275px] px-3 text-lg lg:text-xl text-zinc-500 font-semibold leading-6 text-center mt-6 mb-6">
          Grow your faceless channel. Generate viral shorts. Earn money from reels💰.
        </p>
        <button 
          onClick={handleGetStarted} 
          className="btn btn-success"
        >
          Get Started <img src="/zap.svg" alt="zap" className="w-4 h-4" />
        </button>

        {showToast && (
          <div className="toast toast-center">
            <div className="alert alert-warning">
                <span className="flex items-center gap-2">
                  <img src="/alert-triangle.svg" alt="warning" className="w-4 h-4" />
                  Not logged in
                </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
