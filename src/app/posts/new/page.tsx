"use client";
import { createPost } from "@/app/action";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";


export default function NewPost() {
  const [error, setError] = useState<string | null>(null);
  const { pending } = useFormStatus();

  async function handleSubmit(formData: FormData) {
    try {
      await createPost(formData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Đã xảy ra lỗi khi tạo bài viết");
      } else {
        // Xử lý các trường hợp lỗi không phải Error
        setError("Đã xảy ra lỗi khi tạo bài viết");
      }
    }
  }
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tạo Bài Viết Mới</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form action={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Tiêu đề
          </label>
          <input id="title" name="title" type="text" className="w-full px-3 py-2 border rounded-md" required />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Nội dung
          </label>
          <textarea id="content" name="content" rows={12} className="w-full px-3 py-2 border rounded-md" required />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Ảnh bài viết
          </label>
          <input id="image" name="image" type="file" accept="image/*" className="w-full px-3 py-2 border rounded-md" />
          <p className="text-sm text-gray-500 mt-1">Chọn ảnh đại diện cho bài viết. Định dạng hỗ trợ: JPG, PNG, GIF.</p>
        </div>

        <div className="flex justify-end space-x-4">
          <Link href="/posts" className="px-4 py-2 border rounded-md hover:bg-gray-100 inline-block">
            Hủy
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {pending ? "Đang xử lý..." : "Đăng bài"}
          </button>
        </div>
      </form>
    </div>
  )
}
