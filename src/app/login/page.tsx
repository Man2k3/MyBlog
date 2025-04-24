"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("Sending signIn request:", { email, password });

    

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    
    if (result?.error) {
      console.log("Đăng nhập thất bại:", result.error);
      setError("Email hoặc mật khẩu không đúng");
      
    } else {
      console.log("Đăng nhập thành công");
      router.push("/");
    }
  };

return (
  <div className="max-w-md mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-center">Đăng Nhập</h1>

    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Mật khẩu
        </label>
        <input
          name="password"
          type="password"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
        Đăng Nhập
      </button>
    </form>
  </div>
)
}
