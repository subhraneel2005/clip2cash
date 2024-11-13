"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AnimatedShinyTextDemo } from "../base-components/AnimatedShinyTextDemo";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/getUserSnippet');
      
      if (response.ok) {
        // User has a snippet, redirect to dashboard
        router.push('/dashboard');
      } else if (response.status === 404) {
        // User doesn't have a snippet, redirect to create one
        router.push('/profile-details');
      } else if (response.status === 401) {
        toast.error('Please sign in first');
      }
    } catch (error) {
      console.error('Error checking snippet:', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center px-4 py-8">
        <AnimatedShinyTextDemo />
        <h2 className="mb-0 text-4xl w-full lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400 py-1 mt-6">
          Create <span className="text-[#30F116] px-1 italic">engaging</span>{" "}
          snippets
        </h2>
        <h2 className="-mt-2 text-4xl w-full lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400 py-1">
          from your{" "}
          <span className="text-instagram-gradient px-1 italic">socials</span>
        </h2>
        <p className="lg:max-w-[550px] max-w-[275px] px-3 bio text-[12px] lg:text-[18px] mt-6 mb-6">
          Share cool snippets of your socials with your friends and followers.
        </p>
        <Button 
          onClick={handleClick}
          disabled={isLoading}
          className="w-full lg:w-auto bg-[#30F116] hover:bg-[#27C112] text-black font-semibold px-8"
        >
          {isLoading ? "Please wait..." : "Get your snippet"}
        </Button>
      </div>
    </div>
  );
}
