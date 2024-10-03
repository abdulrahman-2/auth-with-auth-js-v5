"use client";

import DeleteUser from "./DeleteUser";
import { useState } from "react";
import EditUser from "./EditUser";

const UserList = ({ users }) => {
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited

  const handleEdit = (user) => {
    setEditingUser(user); // Set the user to be edited
  };

  return (
    <div className="w-full xl:flex-1">
      {/* Conditionally show EditUserForm if a user is being edited */}
      {editingUser ? (
        <EditUser
          user={editingUser}
          onCancel={() => setEditingUser(null)} // Allow canceling edit
        />
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            className="shadow-lg p-5 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-start md:items-center gap-0 md:gap-5 flex-col md:flex-row">
              <h1 className="text-2xl font-bold text-white">{user.username}</h1>
              <h3 className="text-[14px] md:text-xl font-bold text-gray-400">
                {user.email}
              </h3>
            </div>
            <div className="flex items-center gap-2 md:gap-5 text-white">
              <button
                className="p-1 md:p-2 bg-blue-600 text-white font-bold rounded-md border-none"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <DeleteUser id={user._id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
