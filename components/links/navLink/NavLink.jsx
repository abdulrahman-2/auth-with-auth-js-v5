"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }) => {
  const pathName = usePathname();

  return (
    <div>
      <Link
        href={link.path}
        className={`py-2 px-4 rounded-3xl text-gray-500 font-semibold ${
          pathName === link.path ? "bg-white text-black" : ""
        }`}
      >
        {link.title}
      </Link>
    </div>
  );
};

export default NavLink;
