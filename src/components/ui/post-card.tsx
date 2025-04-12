import Link from "next/link"
import Image from "next/image"

import { Post } from "@/types/post"

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6 flex">
        <div className="flex-shrink-0 mr-4">
          <Image
            src={post.image }
            alt={post.title}
            width={120}
            height={80}
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">{post.author.name}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">
            <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">{post.excerpt}</p>
          <Link href={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
            Đọc tiếp →
          </Link>
        </div>
      </div>
    </div>
  )
}
