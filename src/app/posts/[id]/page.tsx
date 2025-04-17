// app/posts/[id]/page.ts
import { notFound } from "next/navigation";
import { Post } from "@/types/post";
import { promises as fs } from "fs"; // Import fs từ Node.js
import path from "path";
import Link from "next/link";
import { getPost } from "@/app/action";

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public/data/posts.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const posts: Post[] = JSON.parse(fileContents);
  return posts.map((post) => ({ id: post.id.toString() }));
}
// Hàm lấy dữ liệu bài viết
// async function getPost(id: string): Promise<Post | undefined> {
//   const res = await fetch("http://localhost:3000/data/posts.json");
//   const posts: Post[] = await res.json();
//   return posts.find((p) => p.id === parseInt(id));
// }

// Tạo tham số tĩnh cho SSG
// export async function generateStaticParams() {
//   const res = await fetch("http://localhost:3000/data/posts.json");
//   const posts: Post[] = await res.json();
//   return posts.map((post) => ({ id: post.id.toString() }));
// }

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // Await Promise
  const post = await getPost(resolvedParams.id);

  if (!post) {
    notFound();
  }
  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/posts" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Quay lại danh sách bài viết
      </Link>

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">{post.date}</p>

      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
    </article>
  )
}


// Cấu hình revalidate (ISR)
export const revalidate = 60;