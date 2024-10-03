"use client";

import { useState, useEffect } from "react";
import EditUserForm from "./EditUserForm";

const EditUser = ({ user, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    isAdmin: "false",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin ? "true" : "false",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full xl:flex-1 p-5 bg-slate-900 rounded-md">
      <h1 className="text-3xl font-bold text-white text-center mb-10">
        Edit {formData.username} User
      </h1>
      <div className="flex flex-col gap-5">
        <input type="hidden" name="id" value={formData.id} />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className="p-2 rounded-md bg-slate-300 border-none outline-none"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="p-2 rounded-md bg-slate-300 border-none outline-none"
        />
        <select
          name="isAdmin"
          value={formData.isAdmin}
          onChange={handleInputChange}
          className="p-2 rounded-md bg-slate-300 border-none outline-none"
        >
          <option value="false">Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <div className="flex gap-3">
          <EditUserForm formData={formData} onCancel={onCancel} />
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-md text-white font-bold bg-red-600 w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
