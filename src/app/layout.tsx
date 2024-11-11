import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/lib/SessionProviderWrapper"
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "TinySnippet",
  description: "Create engaging snippets from long form content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className="dark">
          <SessionProviderWrapper>
            <Toaster richColors position="top-right"/>
            {children}
          </SessionProviderWrapper>
        </body>
      </html>
  );
}
