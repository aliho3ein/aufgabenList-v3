import { useContext } from "react";
import AuthenticContext from "../Contexts/AuthContext";
import { useLocation, NavLink, Link, useNavigate } from "react-router-dom";

/* Top header Area - Control Login and Logout */
function TodoLogin() {
  let userOn = useContext(AuthenticContext);

  /* console.log(userOn.state.auth);*/

  const location = useLocation();
  const Nav = useNavigate();

  return (
    <div className="loginArea">
      <nav className="Navigation">
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to={userOn.state.auth ? "/list" : "/logIn"}>
              My Todo List
            </NavLink>
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
          <li>
            <NavLink to="/">Umfrage</NavLink>
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
        <button
          className="btn LogOutBtn"
          onClick={() => {
            Nav("/home");
            window.location.reload(false);
            /*userOn.despatch({ type: "toggleUser", payload: { key: "" } });*/
          }}
        >
          LogOut
        </button>
      )}
    </div>
  );
}

export default TodoLogin;
