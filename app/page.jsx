import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  return (
    <div className="grid place-items-center">
      <h1 className="p-5 rounded-md text-white border text-3xl font-bold">
        {session ? (
          <p>Welcome To Home Page, Your Email Is {session?.user?.email}</p>
        ) : (
          <p>Welcome To Home Page, Please Login First</p>
        )}
      </h1>
    </div>
  );
};

export default Home;
