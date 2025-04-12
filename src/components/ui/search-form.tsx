"use client"

import type React from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Search } from "lucide-react"

export default function SearchForm({ defaultValue = "" }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(defaultValue)
  const [isPending, startTransition] = useTransition()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Tạo URL mới với tham số tìm kiếm
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set("q", searchTerm)
    } else {
      params.delete("q")
    }

    // Cập nhật URL và kích hoạt tải lại trang
    startTransition(() => {
      router.push(`/posts?${params.toString()}`)
    })
  }

  return (
    <form onSubmit={handleSearch} className="flex">
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 pr-10 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 flex items-center"
        disabled={isPending}
      >
        <Search className="w-4 h-4 mr-1" />
        {isPending ? "Đang tìm..." : "Tìm"}
      </button>
    </form>
  )
}
