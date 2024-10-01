"use client";

import { register } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { toast } from "sonner"; // Import only toast

const Register = () => {
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // Collect form data

    const response = await register(formData); // Call the register function

    if (response?.error) {
      toast.error(response.error); // Show error toast notification
    } else {
      toast.success("User registered successfully!"); // Show success toast notification
      e.target.reset(); // Optionally, reset the form after success
      router.push("/login"); // Redirect to login page after success
    }
  };

  return (
    <div className="w-[600px] p-5 rounded-md bg-white shadow-md m-auto w-full md:w-[500px] lg:w-[600px]">
      <h1 className="text-3xl text-center text-black font-bold mb-10">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="w-full p-3 bg-gray-400 outline-none text-black border-none rounded-md placeholder:text-white"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-full p-3 bg-gray-400 outline-none text-black border-none rounded-md placeholder:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full p-3 bg-gray-400 outline-none text-black border-none rounded-md placeholder:text-white"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="w-full p-3 bg-gray-400 outline-none text-black border-none rounded-md placeholder:text-white"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-black font-bold outline-none border-none rounded-md text-white"
        >
          Register
        </button>
      </form>
      <p className="text-black text-center mt-5 font-semibold">
        {`Have an account?`}{" "}
        <Link href="/login" className="font-bold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
