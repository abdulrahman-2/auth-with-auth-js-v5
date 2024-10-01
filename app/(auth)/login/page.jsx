"use client";

import GithubLogin from "@/components/GithubLogin";
import GoogleLogin from "@/components/GoogleLogin";
import { login } from "@/lib/actions"; // Ensure this is a client-side function
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await login(formData);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Logged in successfully!");
      e.target.reset();
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className="p-5 rounded-md bg-white shadow-md m-auto w-full md:w-[500px] lg:w-[600px]">
      <h1 className="text-3xl text-center text-black font-bold mb-10">Login</h1>
      <div className="mb-5">
        <GithubLogin />
        <GoogleLogin />
      </div>
      <div className="mb-5 flex items-center gap-5">
        <span className="w-full h-[2px] bg-black"></span>
        <span className="font-bold text-2xl">Or</span>
        <span className="w-full h-[2px] bg-black"></span>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="w-full p-3 bg-gray-400 outline-none text-black border-none rounded-md placeholder:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full p-3 bg-gray-400 outline-none text-black border-none rounded-md placeholder:text-white"
        />
        <button className="w-full text-white p-3 font-bold bg-black outline-none border-none rounded-md">
          Login
        </button>
      </form>
      <p className="text-black text-center mt-5 font-semibold">
        {`Don't have an account?`}{" "}
        <Link href="/register" className="font-bold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
