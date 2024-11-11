"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatedShinyTextDemo } from "../base-components/AnimatedShinyTextDemo";

export default function EmailPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/betaUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Thank you for signing up!");
        setEmail("");
      } else if (response.status === 400) {
        toast.error("Email already registered.");
      } else {
        toast.error("There was an error. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full flex flex-col justify-center items-center px-4 py-8">
        {/* Self Promotion 😋  */}
        <AnimatedShinyTextDemo />
        <h2 className="mb-0 text-4xl w-full lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400 py-1 mt-6">
          Create <span className="text-[#30F116] px-1 italic">engaging</span>{" "}
          snippets
        </h2>
        <h2 className="-mt-2 text-4xl w-full lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400 py-1">
          from your{" "}
          <span className="text-instagram-gradient px-1 italic">socials</span>
        </h2>
        <p className="lg:max-w-[550px] max-w-[275px] px-3 bio text-[12px] lg:text-[18px] mt-6 mb-3">
          Join the waitlist to be the first to get access to our beta.
        </p>
        <form
          className="space-y-4 w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="lg:max-w-[500px] max-w-[230px] px-3 border border-white bg-zinc-700"
          />
          <Button type="submit" className="max-w-xs" size="sm">
            Join waitlist
          </Button>
        </form>
      </div>
    </div>
  );
}
