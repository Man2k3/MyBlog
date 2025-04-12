"use client"

import Link from "next/link"
import Image from "next/image"
import { LogOut, PlusCircle } from "lucide-react"
import {  useState } from "react"
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth"


export default function Navbar({ initialSession }: { initialSession: Session | null; }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const { data: session, status } = useSession();
  const currentSession = session || initialSession;
 
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Blog Của Tôi
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-gray-100">
              Trang chủ
            </Link>
            <Link href="/posts" className="px-3 py-2 rounded-md hover:bg-gray-100">
              Bài viết
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md hover:bg-gray-100">
              Giới thiệu
            </Link>

            {status === "loading" && !currentSession ? (
              <span>Đang tải...</span>
            ) : currentSession ? (
              <>
                <Link href="/posts/new" className="px-3 py-2 rounded-md hover:bg-gray-100 flex items-center">
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Thêm bài viết
                </Link>
                <div className="relative">
                  <button className="flex items-center space-x-2" onClick={() => setShowDropdown(!showDropdown)}>
                    <Image
                      src={session?.user?.image||"/data/avt.jpg" }
                      alt={session?.user?.name || "User Avatar"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>{session?.user?.name}</span>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <button
                        onClick={async () => {
                          await signOut({ redirect: true, callbackUrl: "/" })
                          setShowDropdown(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link href="/login" className="px-3 py-2 rounded-md hover:bg-gray-100">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
