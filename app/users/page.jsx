import { User } from "@/lib/model";
import { connectDB } from "@/lib/mongodb";
import Link from "next/link";

const Users = async () => {
  let users = [];
  const getUsers = async () => {
    try {
      await connectDB();
      const users = await User.find();
      return users;
    } catch (err) {
      console.log(err);
    }
  };
  users = await getUsers();
  return (
    <div>
      <h1 className="text-3xl text-white font-bold text-center">Users</h1>
      <div className="mt-10 grid grid-cols-3 gap-10">
        {users.map((user) => (
          <Link href={`/users/${user.id}`} key={user.id}>
            <div className="bg-white text-black rounded-lg text-center p-5">
              <h2 className="">{user.username}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Users;
