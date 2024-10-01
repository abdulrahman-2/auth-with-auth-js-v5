"use client";

import { useState } from "react";
import Image from "next/image";
import NavLink from "./navLink/NavLink";
import Logout from "../Logout";

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const links = [
    { title: "Home", path: "/" },
    { title: "Users", path: "/users" },
  ];

  return (
    <div className="flex items-center">
      <div className="hidden md:flex items-center gap-[10px]">
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}

        {session?.user ? (
          <>
            {session.user.isAdmin && (
              <NavLink link={{ title: "Dashboard", path: "/dashboard" }} />
            )}
            <Logout />
          </>
        ) : (
          <NavLink link={{ title: "Login", path: "/login" }} />
        )}
      </div>

      {/* Mobile menu toggle */}
      <Image
        className="block md:hidden cursor-pointer"
        src="/menu.png"
        alt="menu"
        width={30}
        height={30}
        onClick={handleOpen}
      />

      {open && (
        <div className="absolute z-10 top-[100px] right-0 h-[calc(100vh-100px)] w-[250px] shadow-lg bg-bg transition-transform duration-300 ease-in-out bg-black">
          <div className="flex flex-col items-center justify-center mt-6 md:mt-0 gap-10">
            {links.map((link) => (
              <NavLink link={link} key={link.title} />
            ))}
            {session?.user ? (
              <>
                {session.user.isAdmin && (
                  <NavLink link={{ title: "Dashboard", path: "/dashboard" }} />
                )}
                <Logout />
              </>
            ) : (
              <NavLink link={{ title: "Login", path: "/login" }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;
