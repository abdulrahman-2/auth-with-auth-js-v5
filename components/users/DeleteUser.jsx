"use client";

import { deleteUser } from "@/lib/actions";

const DeleteUser = ({ id }) => {
  return (
    <div>
      <button
        className="p-1 md:p-2 bg-red-500 text-white font-bold rounded-md border-none"
        onClick={() => deleteUser(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteUser;
