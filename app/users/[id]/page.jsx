import { getUser } from "@/lib/data";

const singleUser = async ({ params }) => {
  const { id } = params;

  const user = await getUser(id);

  return (
    <div className="bg-white text-black rounded-lg text-center p-5">
      <h1 className="text-3xl font-bold text-center">{user.username}</h1>
      <h1 className="mt-5 text-3xl font-bold text-center">{user.email}</h1>
      <h1 className="mt-5 text-3xl font-bold text-center">
        {`Is Admin: ${user.isAdmin.toString()}`}
      </h1>
    </div>
  );
};

export default singleUser;
