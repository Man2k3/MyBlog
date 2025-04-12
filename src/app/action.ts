"use server";
import { redirect } from "next/navigation";
import path from "path";
import { promises as fs } from "fs";
import { Post } from "@/types/post";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function  createPost(formData: FormData) {

  
    const session = await auth();
    // Đọc file JSON hiện có
    const filePath = path.join(process.cwd(), "public","data", "posts.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const posts: Post[] = JSON.parse(fileContents);
    
    // Kiểm tra xác thực
    if (!session?.user) {
      redirect("/login");
    }
  
    // Lấy dữ liệu từ form
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    // Xử lý ảnh (nếu có)
    let imagePath = "/data/new-book-1.png";
    if (imageFile && imageFile.size > 0) {
      // Kiểm tra định dạng ảnh
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(imageFile.type)) {
        throw new Error("Chỉ hỗ trợ định dạng JPG, PNG, GIF");
      }

      // Kiểm tra kích thước (ví dụ: tối đa 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (imageFile.size > maxSize) {
        throw new Error("Ảnh không được vượt quá 5MB");
      }

      // Tạo tên file duy nhất
      const timestamp = Date.now();
      const extension = imageFile.name.split(".").pop();
      const fileName = `post-image-${timestamp}.${extension}`;
      const filePath = path.join(process.cwd(), "public", "data", fileName);

      // Lưu file vào public/data/
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      // Cập nhật đường dẫn ảnh
      imagePath = `/data/${fileName}`;
    }
  
    // Kiểm tra dữ liệu
    if (!title || title.trim().length < 3) {
        throw new Error("Tiêu đề phải có ít nhất 3 ký tự");
    }
  
    if (!content || content.trim().length < 10) {
        throw new Error("Nội dung phải có ít nhất 10 ký tự");
    }
  
    try {
      const newPost = {
        id: posts.length + 1,
        title: title,
        content: content,
        excerpt: content.substring(0, 150) + "...",
        date: new Date().toLocaleDateString("vi-VN"),
        image: imagePath,
        author: {
          name: session.user.name || "Unknown User",
          avatar: session.user.image || "/data/avt.jpg",
        },
      }
  
        // Thêm vào danh sách và ghi lại file
      posts.push(newPost);
      await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf8");
  
  
      // Cập nhật cache để hiển thị bài viết mới
      revalidatePath("/posts")
  
      // Chuyển hướng đến trang danh sách bài viết
      redirect("/posts")
    } catch (error) {
      throw error;
    }



  // const newPost: Post = {
  //   id: posts.length + 1, // ID tự tăng (giả lập)
  //   title: title as string,
  //   content: content as string,
  //   date: new Date().toISOString() as string,
  //   excerpt: content.substring(0, 100) + "...",
  //   image: "https://via.placeholder.com/150", // Hình ảnh giả lập
  //   author: {
  //     name: "Nguyễn Văn A",
  //     avatar: "https://via.placeholder.com/50",
  //   }
  // };

}