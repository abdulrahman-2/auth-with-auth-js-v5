import UserList from "@/components/users/UserList";
import { getUsers } from "@/lib/data";

const Dashboard = async () => {
  const users = await getUsers();

  return (
    <div className="my-10 md:my-20 flex items-start flex-col xl:flex-row gap-24">
      <UserList users={users} />
    </div>
  );
};

export default Dashboard;
