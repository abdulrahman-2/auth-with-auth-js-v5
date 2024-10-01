"use client";

import { handleSignOut } from "@/lib/actions";
import { toast } from "sonner";

const Logout = () => {
  const handleLogout = async () => {
    await handleSignOut();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div onClick={handleLogout}>
      <button className="p-[10px] font-semibold cursor-pointer text-gray-200">
        Logout
      </button>
    </div>
  );
};

export default Logout;
