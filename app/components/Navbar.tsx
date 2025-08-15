import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth, isLoading } = usePuterStore();
  return (
    <nav className={"navbar"}>
      <Link to={"/"} className={" text-xl font-bold text-gradient"}>
        Resumind
      </Link>
      <div className={"flex items-center gap-4"}>
        {auth.isAuthenticated && (
          <p
            className={
              " text-lg text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-[130px] md:max-w-[220px]"
            }
            onClick={auth.signOut}
          >
            {auth.user?.username}
          </p>
        )}
        <Link to={"/auth"} className={" secondary-button w-fit py-1"}>
          {auth.isAuthenticated ? "Sign Out" : "Sign In"}
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
