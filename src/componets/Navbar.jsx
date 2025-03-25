import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-8">
        <li>
          <NavLink
            className="text-white hover:text-purple-400 transition duration-300"
            to={"/games"}
          >
            All Games
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-white hover:text-purple-400 transition duration-300"
            to={"/posts"}
          >
            Game Pictures
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-white hover:text-purple-400 transition duration-300"
            to={"/new-post"}
          >
            Upload Game Pictures
          </NavLink>
        </li>
        <li>
          <NavLink
            className="text-white hover:text-purple-400 transition duration-300"
            to={"/create"}
          >
            Add Game
          </NavLink>
        </li>
        {localStorage.getItem("gamer_token") !== null ? (
          <li>
            <button
              className="text-white hover:text-purple-400 transition duration-300"
              onClick={() => {
                localStorage.removeItem("gamer_token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink
                className="text-white hover:text-purple-400 transition duration-300"
                to={"/login"}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-white hover:text-purple-400 transition duration-300"
                to={"/register"}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
