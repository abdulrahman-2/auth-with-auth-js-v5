"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Links from "./links/Links";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="h-[100px] flex items-center justify-between">
      <Link href="/" className="logo text-4xl font-bold text-white">
        Logo
      </Link>
      <div className="links">
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
