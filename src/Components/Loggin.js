import { useContext } from "react";
import AuthenticContext from "../Contexts/AuthContext";
import { useLocation, NavLink, Link, useNavigate } from "react-router-dom";

/* Top header Area - Control Login and Logout */
function TodoLogin() {
  let userOn = useContext(AuthenticContext);

  const location = useLocation();
  const Nav = useNavigate();

  return (
    <div className="loginArea">
      <nav className="Navigation">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/list">My Todo List</NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: "/about",
                search: "?username=ahmadi",
                hash: "#myPage",
              }}
            >
              About Todo
            </NavLink>
          </li>
          <li>
            <NavLink to={`/contact` + location.search}>Contact</NavLink>
          </li>
        </ul>
      </nav>

      {!userOn.user ? (
        <Link to="/logIn" className="LogInUser">
          {
            <button
              className="btn LogInBtn"
              /*onClick={() =>userOn.despatch({ type: "toggleUser", payload: "" })*/
            >
              LogIn
            </button>
          }
        </Link>
      ) : (
        <Link to="/" className="LogInUser">
          <button
            className="btn LogOutBtn"
            onClick={() => {
              window.location.reload(false);
              /*userOn.despatch({ type: "toggleUser", payload: { key: "" } });*/
            }}
          >
            LogOut
          </button>
        </Link>
      )}
    </div>
  );
}

export default TodoLogin;
