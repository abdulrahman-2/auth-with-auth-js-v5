"use server";

import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/lib/model";
import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

// handleRegister
export const register = async (formData) => {
  try {
    await connectDB(); // Connect to MongoDB

    const { username, email, password, confirmPassword } =
      Object.fromEntries(formData);

    // Validate form data
    if (!username || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    return { message: "User registered successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

// handleLogin
export const login = async (formData) => {
  try {
    await connectDB(); // Connect to MongoDB

    const { email, password } = Object.fromEntries(formData);

    // Validate form data
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password");
    }

    // Sign in the user with NextAuth
    await signIn("credentials", {
      redirect: false, // Prevent NextAuth from performing any redirects
      email,
      password,
    });

    return { message: "logged in successfully" }; // Return user details if needed
  } catch (error) {
    return { error: error.message };
  }
};

// handleGithubLogin
export const socialLogin = async (provider) => {
  await signIn(provider, { redirectTo: "/" });
};

// handleLogOut
export async function handleSignOut() {
  try {
    await signOut({ redirect: false });
  } catch (err) {
    throw new Error(err || "Filed To logOut");
  }
}

// handle delete user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  revalidatePath("/dashboard");
};

// handle edit user
export const editUser = async (formData) => {
  const { username, email, isAdmin, id } = formData;

  try {
    await connectDB();

    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedData = { username, email, isAdmin };

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
  } catch (err) {
    console.error("Error updating user:", err);
  }
};
