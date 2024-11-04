'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { FaGithub, FaGoogle } from "react-icons/fa"

export function LogIn() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
    <Button onClick={(e) => {
      e.preventDefault();
      signIn('github', {callbackUrl:"/"})}}>Github</Button>
    <Button onClick={(e) => {
      e.preventDefault();
      signIn('google', {callbackUrl:"/"})}}>Google</Button>
    </div>
  )
}