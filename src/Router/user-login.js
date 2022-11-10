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
          console.log(check.name);
          goLogIn(check.username, check.name);
        } else {
          massage.textContent = "Benutzername Oder kennwort ist Falsch";
          massage.style.display = "block";
        }
        return;
      })
      .catch((err) => console.log("Error checkUser", err));
  };

  /* Create User */

  let CreateAccount = () => {
    let userName = document.querySelector(".createUsName");
    let usName = document.querySelector(".UsFullName");
    let pass = document.querySelector(".CreatePass");
    let RepPass = document.querySelector(".repPass");
    massage = document.getElementById("funBtnMassage");

    let space = userName.value.indexOf(" ");

    /* Conditions */
    if (space === -1) {
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

        if (pass.value === RepPass.value) {
          checkName()
            .then(() => {
              if (!isUser) {
                instance
                  .post("/users.json", {
                    username: userName.value,
                    password: pass.value,
                    name: usName.value,
                  })
                  .then(() => {
                    console.log("Create User");
                    goLogIn(userName.value, usName.value);
                    /*  pass.value = "";
                    userName.value = "";
                    RepPass.value = "";*/
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
        massage.textContent = "Nutzername muss mindestens 4 Zeichen lang sein";
        massage.style.display = "block";
      }
    } else {
      massage.textContent = "Der Nutzername darf keine Leerzeichen enthalten";
      massage.style.display = "block";
    }
  };

  /* Going to List Page */
  let goLogIn = (user, usName) => {
    cont.despatch({ type: "toggleUser", payload: { key: user } });
    cont.state.userName = user;
    Nav(`/list?${usName}`);
  };

  /* Keyboard Enter */
  window.addEventListener("keydown", (key) => {
    if (key.code === "Enter") checkUser();
  });

  return (
    <div className="signAre">
      <div className="logMain">
        {/* Massage Area */}
        <div id="funBtnMassage"></div>

        {/* Login Area */}
        <div className="logAre">
          <div className="absArea">
            <label htmlFor="userNam">Nutzername</label>
            <input
              type="text"
              className="userName usInput"
              required
              id="userNam"
              onFocus={inSelect}
            />
          </div>
          <div className="absArea">
            <label htmlFor="userPas">Kennwort</label>
            <input
              type="password"
              className="passWord usInput"
              required
              id="userPas"
              onFocus={inSelect}
            />
          </div>

          <button className="lBtn LogBtn" onClick={checkUser}>
            LogIn
          </button>
          <span className="toggleUs" onClick={toggleUs}>
            noch Keine Konto ?
          </span>
        </div>

        {/* singIn Area */}
        <div className="sigAre">
          <div className="absArea">
            <label htmlFor="UsFullName">Full Name</label>
            <input
              id="UsFullName"
              type="text"
              className="UsFullName usInput"
              required
              onFocus={inSelect}
            />
          </div>

          <div className="absArea">
            <label htmlFor="createUsName">Nutzername</label>
            <input
              id="createUsName"
              type="text"
              className="createUsName usInput"
              required
              onFocus={inSelect}
            />
          </div>

          <div className="absArea">
            <label htmlFor="CreatePass">Kennwort</label>
            <input
              id="CreatePass"
              type="password"
              className="CreatePass usInput"
              required
              onChange={getPassLength}
              onFocus={inSelect}
            />
          </div>

          <div className="absArea">
            <label htmlFor="repPass">Kennwort</label>
            <input
              id="repPass"
              type="password"
              className="repPass usInput"
              onFocus={inSelect}
              required
            />
          </div>

          <button className="lBtn sigBtn" onClick={CreateAccount}>
            Sing Up
          </button>
          <span className="toggleUs" onClick={toggleUs}>
            Hast du einen Konto ?
          </span>
        </div>
      </div>
    </div>
  );
}

export default Uslogin;

/* Form Switch login/signIn */
let Konto = true;
let funBtn;
function toggleUs() {
  funBtn = document.querySelector(".sigBtn");
  if (Konto) {
    document.querySelector(".logAre").style.display = "none";
    document.querySelector(".sigAre").style.display = "flex";
  } else {
    document.querySelector(".logAre").style.display = "flex";
    document.querySelector(".sigAre").style.display = "none";
  }
  massage = document.getElementById("funBtnMassage");

  /* */
  let aLabel = document.querySelectorAll("label");
  aLabel.forEach((e) => {
    e.style.transform = "translate(0px, 35px)";
    e.style.fontSize = "1rem";
  });
  /* Clear Inputs */
  let field = document.querySelectorAll(".usInput");
  field.forEach((item) => {
    item.value = "";
  });
  massage.style.display = "none";
  funBtn.style.transform = "translateX(0px)";

  Konto = !Konto;
  /* Run funBtn */
  signBtn();
}

/* singIn bottom Effect */
let btnPlace;
function signBtn() {
  funBtn = document.querySelector(".sigBtn");
  let funPass = document.querySelector(".CreatePass");
  funBtn.addEventListener("mouseover", () => {
    if (funPass.value.length <= 4) {
      massage.textContent = "Das Kennwort muss mindestens 5 Zeichen lang sein";
      btnPlace
        ? (funBtn.style.transform = "translateX(-60px)")
        : (funBtn.style.transform = "translateX(60px)");
      btnPlace = !btnPlace;
      massage.style.display = "inline-block";
    }
  });
}

function getPassLength() {
  let funPass = document.querySelector(".CreatePass").value.length;
  if (funPass > 4) {
    funBtn.style.transform = "translateX(0)";
    massage.style.display = "none";
  }
}

/* */
function inSelect(e) {
  const id = e.target.id;
  let aLabel = document.querySelectorAll("label");
  aLabel.forEach((e) => {
    let txt = document.getElementById(e.getAttribute("for")).value;
    if (txt.length <= 0) {
      e.style.transform = "translate(0px, 35px)";
      e.style.fontSize = "1rem";
    }
  });
  let label = document.querySelector(`label[for="${id}"]`);
  label.style.transform = "translate(-10px, 5px)";
  label.style.fontSize = "0.8rem";
}
