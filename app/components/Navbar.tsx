import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useTheme } from "~/lib/theme";

const Navbar = () => {
  const { auth, isLoading } = usePuterStore();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={"navbar dark:bg-gray-800 dark:text-white"}>
      <Link to={"/"} className={" text-xl font-bold text-gradient"}>
        Resumind
      </Link>
      <div className={"flex items-center gap-4"}>
        {auth.isAuthenticated && (
          <p
            className={
              " text-lg text-gray-500 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap max-w-[130px] md:max-w-[220px]"
            }
            onClick={auth.signOut}
          >
            {auth.user?.username}
          </p>
        )}
        <Link to={"/auth"} className={" primary-button w-fit py-1"}>
          {auth.isAuthenticated ? "Sign Out" : "Sign In"}
        </Link>

        <button
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
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
