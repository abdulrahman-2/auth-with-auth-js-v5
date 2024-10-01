"use client";
import { socialLogin } from "@/lib/actions";
import Image from "next/image";

const GithubLogin = () => {
  return (
    <div onClick={() => socialLogin("github")}>
      <button className="mb-5 flex items-center justify-center text-white gap-5 p-3 w-full font-bold border-none rounded-md cursor-pointer bg-black">
        <div className="relative w-[20px] h-[20px]">
          <Image
            src="/github-mark-white.png"
            alt="GitHub logo"
            fill
            sizes="20px"
            className="object-contain"
          />
        </div>
        Login With Github
      </button>
    </div>
  );
};

export default GithubLogin;
