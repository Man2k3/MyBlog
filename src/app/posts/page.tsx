import { PostCard } from "@/components/ui/post-card";
import SearchForm from "@/components/ui/search-form";
import type {Post} from "@/types/post";
import { promises as fs } from "fs"; // Import fs từ Node.js
import path from "path";
async function getPosts(): Promise<Post[]> {
  // const res = await fetch("http://localhost:3000/data/posts.json"); 
  // return res.json();
  const filePath = path.join(process.cwd(), "public/data/posts.json");
      const fileContents = await fs.readFile(filePath, "utf8");
      const posts: Post[] = JSON.parse(fileContents);
      return posts;
}
export default async function Post({searchParams,}: { searchParams: Promise<{ q?: string }> }) {
  const posts = await getPosts();
  const resolvedParams = await searchParams;
  const searchTerm = resolvedParams.q || ""

  // Lọc bài viết dựa trên từ khóa tìm kiếm
  const filteredPosts = searchTerm
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : posts

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tất cả Bài viết</h1>

        {/* Form tìm kiếm là Client Component */}
        <SearchForm defaultValue={searchTerm} />
      </div>

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center py-8 text-gray-500">Không tìm thấy bài viết nào phù hợp.</p>
        )}
      </div>
    </div>
  );
}
