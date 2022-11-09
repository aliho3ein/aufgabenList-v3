import "./../Styles/LogIn.css"; /* Style */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import instance from "./../Api/todoApi";
import AuthenticContext from "./../Contexts/AuthContext";

/* Global Variable*/
let massage;

function Uslogin() {
  let cont = useContext(AuthenticContext);
  let isUser = true;
  const Nav = useNavigate();

  /* Login User */
  let checkUser = () => {
    let user = document.querySelector(".userName").value;
    let pass = document.querySelector(".passWord").value;
    massage = document.getElementById("funBtnMassage");

    instance
      .get("/users.json")
      .then((Response) => {
        let check = Object.values(Response.data).find(
          (item) => item.username === user && item.password === pass
        );
        if (check) {
          goLogIn(check.username);
        } else {
          massage.textContent = "Benutzername Oder kennwort ist Falsch";
          massage.style.display = "block";
        }
        return;
      })
      .catch((err) => console.log("Error checkuser"));
  };

  /* Create User */
  let CreateAccount = () => {
    let userName = document.querySelector(".createUsName");
    let pass = document.querySelector(".CreatePass");
    let RepPass = document.querySelector(".repPass");
    massage = document.getElementById("funBtnMassage");

    if (userName.value.length > 3) {
      let checkName = async () => {
        try {
          await instance.get("/users.json").then((Response) => {
            isUser = Object.values(Response.data).find(
              (item) => item.username === userName.value
            );
          });
        } catch {
          console.log("error in check name");
        }
      };

      if (userName.value && pass.value === RepPass.value) {
        checkName()
          .then(() => {
            if (!isUser) {
              instance
                .post("/users.json", {
                  username: userName.value,
                  password: pass.value,
                })
                .then(() => {
                  console.log("Create User");
                  goLogIn(userName.value);
                  pass.value = "";
                  userName.value = "";
                  RepPass.value = "";
                })
                .catch((err) => console.log("Error"));
            } else {
              massage.textContent = "Benutzername ist schon besetzt";
              massage.style.display = "block";
            }
          })
          .catch((err) => console.log("Err"));
      } else {
        massage.textContent = "Das Wiederholen des Passworts ist falsch";
        massage.style.display = "block";
      }
    } else {
      massage.textContent = "Kennwort muss mindestens 4 Zeichen lang sein";
      massage.style.display = "block";
    }
  };

  /* Going to List Page */
  let goLogIn = (user) => {
    cont.despatch({ type: "toggleUser", payload: { key: user } });
    Nav("/list");
    cont.state.userName = user;
  };

  /* Keyboard Enter */
  window.addEventListener("keydown", (key) => {
    if (key.code === "Enter") checkUser();
  });

  return (
    <div className="logMain">
      {/* Massage Area */}
      <div id="funBtnMassage"></div>

      {/* Login Area */}
      <div className="logAre">
        <input
          type="text"
          placeholder="Nutzername"
          className="userName usInput"
          required
        />
        <input
          type="password"
          placeholder="Kennwort"
          className="passWord usInput"
          required
        />
        <button className="lBtn LogBtn" onClick={checkUser}>
          LogIn
        </button>
        <span className="toggleUs" onClick={toggleUs}>
          noch Keine Konto ?
        </span>
      </div>

      {/* singIn Area */}
      <div className="sigAre">
        <input
          type="text"
          placeholder="Nutzername"
          className="createUsName usInput"
          required
        />
        <input
          type="password"
          placeholder="Kennwort"
          className="CreatePass usInput"
          required
        />
        <input
          type="password"
          placeholder="Kennwort wiederholen"
          className="repPass usInput"
          required
        />
        <button className="lBtn sigBtn" onClick={CreateAccount}>
          Sing Up
        </button>
        <span className="toggleUs" onClick={toggleUs}>
          Hast einen Konto ?
        </span>
      </div>
    </div>
  );
}

export default Uslogin;

/* Form Switch login/signIn */
let Konto = true;
function toggleUs() {
  if (Konto) {
    document.querySelector(".logAre").style.display = "none";
    document.querySelector(".sigAre").style.display = "flex";
  } else {
    document.querySelector(".logAre").style.display = "flex";
    document.querySelector(".sigAre").style.display = "none";
  }
  massage = document.getElementById("funBtnMassage");
  massage.style.display = "none";
  Konto = !Konto;
  signBtn();
}

/* singIn bottom Effect */
let btnPlace;
function signBtn() {
  let funBtn = document.querySelector(".sigBtn");
  let funPass = document.querySelector(".CreatePass");
  funBtn.addEventListener("mouseover", () => {
    if (funPass.value.length <= 4) {
      massage.textContent = "Das Kennwort muss mindestens 5 Zeichen lang sein";
      btnPlace
        ? (funBtn.style.marginLeft = "-100px")
        : (funBtn.style.marginLeft = "100px");
      btnPlace = !btnPlace;
      massage.style.display = "inline-block";
    } else {
      massage.style.display = "none";
    }
  });
}
