import { connectDB } from "./mongodb";
import { User } from "./model";

// get all user
export const getUsers = async () => {
  try {
    await connectDB();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
  }
};

// get one user
export const getUser = async (id) => {
  try {
    await connectDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
  }
};
