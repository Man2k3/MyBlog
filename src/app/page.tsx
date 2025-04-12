import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 ">Chào mừng đến với Blog Của Tôi</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Khám phá các bài viết thú vị và những hiểu biết sâu sắc về nhiều chủ đề khác nhau.
        </p>
        <Link href="/posts" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Xem Bài Viết
        </Link>
      </section>
    </div>
  )
}
