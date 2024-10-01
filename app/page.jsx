import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  return (
    <div className="grid place-items-center">
      <h1 className="p-3 md:p-5 rounded-md text-white border text-2xl md:text-3xl font-bold">
        {session ? (
          <>
            Welcome {session?.user?.username} <br />
            Email: {session?.user?.email}
          </>
        ) : (
          <>Welcome To Home Page, Please Login First</>
        )}
      </h1>
    </div>
  );
};

export default Home;
