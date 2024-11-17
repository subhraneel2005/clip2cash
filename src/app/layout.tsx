import type { Metadata } from "next";
import "./globals.css";
import SessionProviderWrapper from "@/lib/SessionProviderWrapper"
export const metadata: Metadata = {
  title: "Clip2Cash",
  description: "Create viral content in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" data-theme="acid">
        <body>
          <SessionProviderWrapper>
            {children}
          </SessionProviderWrapper>
        </body>
      </html>
  );
}
