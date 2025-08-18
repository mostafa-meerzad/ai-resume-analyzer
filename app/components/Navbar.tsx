import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useTheme } from "~/lib/theme";
import { motion } from "motion/react";

const Navbar = () => {
  const { auth, isLoading } = usePuterStore();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.nav initial={{scale: .8, opacity:0}} whileInView={{scale: 1, opacity: 1}} transition={{
    ease: "easeInOut",
      duration: .5,

    }} className={"navbar dark:bg-gray-800 dark:text-white"}>
      <motion.div whileHover={{scale: 1.05}}>
        <Link to={"/"} className={" text-xl font-bold text-gradient"}>
          Resumind
        </Link>
      </motion.div>
      <div className={"flex items-center gap-4"}>
        {auth.isAuthenticated && (
          <p
            className={
              " text-lg text-gray-500 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap max-w-[130px] md:max-w-[220px]  hidden sm:block"
            }
            onClick={auth.signOut}
          >
            {auth.user?.username}
          </p>
        )}
        <motion.div
          className={"rounded-full"}
          whileHover={{
            scale: 1.05,
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            to={"/auth"}
            className={" primary-button w-fit py-1 hover:shadow-lg"}
          >
            {auth.isAuthenticated ? "Sign Out" : "Sign In"}
          </Link>
        </motion.div>

        <motion.button
          whileHover={{ rotate: -25, scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-500 transition-colors"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <img
              src="/icons/sun.svg"
              alt="Light mode"
              className="size-5 dark:invert"
            />
          ) : (
            <img src="/icons/moon.svg" alt="Dark mode" className="size-5" />
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
};
export default Navbar;
