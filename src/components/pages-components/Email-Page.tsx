'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function EmailPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen flex items-center justify-center bg-[url('/gb.png')] bg-center bg-cover">
      <div className="w-full flex flex-col justify-center items-center px-4 py-8">
        <h2 className="mb-3 text-4xl py-3 w-full lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text tracking-tighter text-transparent font-black text-center dark:from-white dark:via-gray-200 dark:to-gray-400">Early access page for your users</h2>
        <p className="lg:max-w-[550px] max-w-[375px] px-3 bio text-[14px] lg:text-[18px] mb-8">
          Give your users early access to your awesome products. With the power of fast database and backend.
        </p>
        <form className="space-y-4 w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="lg:max-w-[500px] max-w-[360px] px-3"
            />
          <Button type="submit" className="max-w-xs">Get Early Access</Button>
        </form>
      </div>
    </div>
  );
}
