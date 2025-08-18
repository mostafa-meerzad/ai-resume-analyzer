import { usePuterStore } from "~/lib/puter";
import { Link, useLocation, useNavigate } from "react-router";
import React from "react";
import { motion } from "framer-motion";

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
      <motion.div
        className="back-button w-fit bg-white dark:bg-gray-700 dark:border-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src="/icons/back.svg"
            alt="back"
            className="size-2.5 dark:invert"
          />
          <span className="text-gray-800 dark:text-gray-200 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </motion.div>
      <section className="flex flex-col items-center justify-center gap-8 bg-white dark:bg-gray-800 rounded-2xl pt-20 pb-10">
        {/* Animate Title */}
        <motion.div
          className="flex flex-col items-center gap-7 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="capitalize px-4"
          >
            {auth.isAuthenticated ? "you're signed in" : "get started now"}
          </motion.h1>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="font-medium !text-gray-500 dark:!text-gray-300"
          >
            {auth.isAuthenticated
              ? "Ready to continue your job journey"
              : "Sign in to continue your job journey"}
          </motion.h2>
        </motion.div>

        {/* Animate Sign-In / Sign-Out Button */}
        <motion.div
          className="mt-3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          {isLoading ? (
            <motion.button
              className="auth-button animate-pulse"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p>Signing you in...</p>
            </motion.button>
          ) : (
            <>
              {auth.isAuthenticated ? (
                <motion.button
                  className="auth-button"
                  onClick={auth.signOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p>Sign Out</p>
                </motion.button>
              ) : (
                <motion.button
                  className="auth-button"
                  onClick={auth.signIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Sign In
                </motion.button>
              )}
            </>
          )}
        </motion.div>

        {/* Fade-in Information Text */}
        <motion.div
          className="flex flex-col justify-center items-center mt-20 text-center px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-gray-600 dark:text-gray-300">
            Your AI credits are provided by Puter. Track your usage or top up
            credits at{" "}
            <Link
              to={"https://puter.com"}
              className="text-blue-700 dark:text-blue-400"
            >
              puter.com
            </Link>
            .
          </p>
        </motion.div>
      </section>
      {/*</div>*/}
    </main>
  );
};
export default Auth;
