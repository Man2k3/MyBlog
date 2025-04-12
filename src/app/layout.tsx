import { ReactNode } from "react";
import { Inter } from "next/font/google"
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Blog Của Tôi",
  description: "Blog đơn giản được xây dựng với Next.js",
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
      <SessionProvider>
          <Navbar initialSession={session} />
          <main className="container mx-auto px-4 py-8 min-h-screen">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
