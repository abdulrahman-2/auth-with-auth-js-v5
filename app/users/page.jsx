import { getUsers } from "@/lib/data";
import Link from "next/link";

const Users = async () => {
  const users = await getUsers();
  return (
    <div>
      <h1 className="text-3xl text-white font-bold text-center">Users</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
