import { usePuterStore } from "~/lib/puter";
import { Link, useLocation, useNavigate } from "react-router";
import React from "react";

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
        "bg-[url('/images/bg-auth.svg')] dark:bg-[url('/images/bg-auth-dark.svg')] bg-cover min-h-screen flex flex-col gap-8 "
      }
    >
      <Link to={"/"} className={"back-button w-fit dark:bg-gray-700 dark:border-gray-600"}>
        <img src="/icons/back.svg" alt="back" className={"size-2.5 dark:invert"} />
        <span className="text-gray-800 dark:text-gray-200 text-sm font-semibold">
          Back to Homepage
        </span>
      </Link>
      {/*<div className="gradient-border shadow-lg border-2 border-red-500 w-full h-[100vh]">*/}
      <section className="flex flex-col items-center justify-center gap-8 bg-white dark:bg-gray-800 rounded-2xl pt-20 pb-10">
        <div className="flex flex-col items-center gap-7 text-center">
          <h1 className={" capitalize px-4"}>
            {auth.isAuthenticated ? "you're signed in" : "get started now"}
          </h1>
          <h2 className={"font-medium !text-gray-500 dark:!text-gray-300"}>
            {auth.isAuthenticated
              ? "Ready to continue your job journey"
              : "Sign in to continue your job journey"}
          </h2>
        </div>
        {/*<div>*/}
        <div className={"mt-3"}>
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

        <div
          className="flex flex-col justify-center items-center mt-20 text-center
          px-10 "
        >
          <p className={"text-gray-600 dark:text-gray-300"}>
            Your AI credits are provided by Puter. Track your usage or top up
            credits at puter.com.
          </p>
          <Link to={"https://puter.com"} className={"text-blue-700 dark:text-blue-400"}>
            puter.con
          </Link>
        </div>
      </section>
      {/*</div>*/}
    </main>
  );
};
export default Auth;
