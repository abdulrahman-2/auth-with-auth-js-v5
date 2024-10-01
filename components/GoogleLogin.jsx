import { socialLogin } from "@/lib/actions";
import Image from "next/image";

const GoogleLogin = () => {
  return (
    <div onClick={() => socialLogin("google")}>
      <button className="flex items-center justify-center text-white gap-5 p-3 w-full font-bold border-none rounded-md cursor-pointer bg-black">
        <div className="relative w-[20px] h-[20px]">
          <Image
            src="/Google__G__logo.svg.png"
            alt="Google logo"
            fill
            sizes="20px"
            className="object-contain"
          />
        </div>
        Login With Google
      </button>
    </div>
  );
};

export default GoogleLogin;
