import { useContext } from "react";
import AuthenticContext from "../Contexts/AppContext";

/* Top header Area - Control Login and Logout */
function TodoLogin() {
  let userOn = useContext(AuthenticContext);
  return (
    <div className="loginArea">
      <span>Aufgabenlist</span>
      {!userOn.user ? (
        <button
          className="btn LogInBtn"
          onClick={() => userOn.despatch({ payload: { type: "toggleUser" } })}
        >
          LogIn
        </button>
      ) : (
        <button
          className="btn LogOutBtn"
          onClick={() => userOn.despatch({ payload: { type: "toggleUser" } })}
        >
          LogOut
        </button>
      )}
    </div>
  );
}

export default TodoLogin;
