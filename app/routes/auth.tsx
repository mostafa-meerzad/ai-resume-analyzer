import { usePuterStore } from "~/lib/puter";
import { Link, useLocation, useNavigate } from "react-router";

export const meta = () => [
  {
    title: "Resumind | Auth",
    name: "description",
    content: "Log into your account",
  },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();

  return (
    <main
      className={
        "bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center"
      }
    >
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className={"!font-semibold capitalize"}>
              {auth.isAuthenticated ? "you're signed in" : "get started now"}
            </h1>
            <h2 className={"font-medium !text-gray-500"}>
              {auth.isAuthenticated
                ? "Ready to continue your job journey"
                : "Sign in to continue your job journey"}
            </h2>
          </div>
          <div>
            {isLoading ? (
              <button className={"auth-button animate-pulse"}>
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className={"auth-button"} onClick={auth.signOut}>
                    <p>Sign Out</p>
                  </button>
                ) : (
                  <button className={"auth-button"} onClick={auth.signIn}>
                    Sign In
                  </button>
                )}
              </>
            )}
          </div>
          <Link
            to={"/"}
            className={
              "font-semibold text-lg text-blue-950 hover:text-gray-700 "
            }
          >
            Back to home
          </Link>
        </section>
      </div>
    </main>
  );
};
export default Auth;
