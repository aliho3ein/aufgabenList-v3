import React, { useEffect, useState } from "react";
import "./styleTutor.css";
import instance from "./../Api/todoApi";

let Tutor = (props) => {
  let { tutor, desp } = props;
  let [result, setResult] = useState([]);
  let self = 1;
  /* Get Cookie */
  document.cookie = "17=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  let Us = document.cookie.split("=");
  useEffect(() => {
    if (Us[1]) {
      setData();
      self = 0;
    }
  }, []);

  /* Show Result after submit */
  useEffect(() => {
    let erg = [];
    let ergebnis = Object.values(tutor.umfrage);
    let user = ergebnis[13];
    for (let i = 0; i < 13; i++) {
      erg[i] = Math.floor((ergebnis[i] / user) * 100);
    }
    setResult(() => {
      return erg;
    });
  }, [tutor.showResult]);

  /* Get Data */
  let setData = async () => {
    let surv = document.querySelectorAll(".svInput");
    let title = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let i = 0;

    try {
      surv.forEach((item) => {
        if (item.checked) title[i] = 1;
        i++;
      });

      let result = 0;
      await instance.get("/Tutor.json").then((Response) => {
        result = Response.data;
      });

      let update = {
        hTag: result.hTag + title[0],
        hTab: result.hTab + title[1],
        cDis: result.cDis + title[2],
        cPos: result.cPos + title[3],
        cSud: result.cSud + title[4],
        cBc: result.cBc + title[5],
        cFn: result.cFn + title[6],
        cSh: result.cSh + title[7],
        cAtr: result.cAtr + title[8],
        git: result.git + title[9],
        lin: result.lin + title[10],
        ubu: result.ubu + title[11],
        new: result.new + title[12],
        user: result.user + self,
      };

      if (!Us[1]) {
        closeBtn();
        putData(update);
        setTimeout(() => {
          desp({ type: "sendData", payload: update });
          document
            .querySelectorAll(".svInput")
            .forEach((item) => (item.style.display = "none"));
          document
            .querySelectorAll("label span")
            .forEach((item) => (item.style.display = "inline"));
        }, 3200);
      } else {
        desp({ type: "sendData", payload: update });
        document
          .querySelectorAll(".svInput")
          .forEach((item) => (item.style.display = "none"));
        document
          .querySelectorAll("label span")
          .forEach((item) => (item.style.display = "inline"));
      }

      /* Cookie */
      document.cookie = "22=true;SameSite=None; Secure";
    } catch {}
  };

  /* Return */
  return (
    <div className="tutContainer">
      <h2>Was soll beim nächsten Tutor (22.11) wiederholt werden ?</h2>
      <label htmlFor="svHl-tag">
        <span>{result[0]}</span>
        <input type="checkbox" className="svInput" id="svHl-tag" /> Responsive
        (min-width , max-width , media Query){" "}
      </label>
      <label htmlFor="svHl-table">
        <span>{result[1]}</span>
        <input type="checkbox" className="svInput" id="svHl-table" /> FlexBox
        (flex , -flow , justify- , align- )
      </label>
      <label htmlFor="svCss-dis">
        <span>{result[2]}</span>
        <input type="checkbox" className="svInput" id="svCss-dis" /> CSS -
        Display (block , inline , inline-block , ... )
      </label>
      <label htmlFor="svCss-pos">
        <span>{result[3]}</span>
        <input type="checkbox" className="svInput" id="svCss-pos" /> CSS -
        Position (Absolute , Relative , fixed , ...)
      </label>
      <label htmlFor="svCss-sud">
        <span>{result[4]}</span>
        <input type="checkbox" className="svInput" id="svCss-sud" />
        CSS - pseudo Class (:after , :before)
      </label>
      <label htmlFor="svCss-bc">
        <span>{result[5]}</span>
        <input type="checkbox" className="svInput" id="svCss-bc" /> CSS - Grid
      </label>
      <label htmlFor="svCss-shad" className="disNone">
        <span>{result[7]}</span>
        <input type="checkbox" className="svInput" id="svCss-shad" /> CSS -
        shadow (text , box)
      </label>
      <label htmlFor="svCss-attr">
        <span>{result[8]}</span>
        <input type="checkbox" className="svInput" id="svCss-attr" /> CSS -
        Attribute selector
      </label>
      <label htmlFor="svGit">
        <span>{result[9]}</span>
        <input type="checkbox" className="svInput" id="svGit" /> Git (Remote ,
        Repository , Github)
      </label>
      <label htmlFor="svLinux" className="disNone">
        <span>{result[10]}</span>
        <input type="checkbox" className="svInput" id="svLinux" />
        Linux (Terminal , sudo Command)
      </label>
      <hr />
      <label htmlFor="ubung">
        <span>{result[11]}</span>
        <input type="checkbox" className="svInput" id="ubung" />
        aufgabe-64 (Responsive Ohne MediaQuery)
        <a id="aufgabe" href="https://ibb.co/xshbb5t" target="_blank">
          Link
        </a>
      </label>
      <label htmlFor="svCss-fnt">
        <span>{result[6]}</span>
        <input
          type="checkbox"
          className="svInput"
          id="svCss-fnt"
          defaultChecked
        />
        CSS Battle
        <a id="aufgabe" href="https://cssbattle.dev/play/115" target="_blank">
          Link
        </a>
      </label>
      <label htmlFor="newMeth">
        <span>{result[12]}</span>
        <input type="checkbox" className="svInput" id="newMeth" /> Neue CSS
        items
      </label>
      {!tutor.showResult ? (
        <div>
          <button onClick={setData} title="Einreichen" id="EinreichenBtn">
            <lord-icon
              src="https://cdn.lordicon.com/rhvddzym.json"
              trigger="loop"
              delay="500"
              class="lord-sur"
            ></lord-icon>
            <span className="btnName">Einreichen </span>
          </button>
        </div>
      ) : (
        <h2>Vielen Danke , Die Umfrage wurde erfolgreich gesendet</h2>
      )}
    </div>
  );
};

export default Tutor;

function putData(update) {
  instance
    .put("/Tutor.json", update)
    .then((e) => console.log(`%c ${"survey did done"}`, "color : green"))
    .catch((e) => console.log("Error"));
}

function closeBtn() {
  const btn = document.querySelector(".btnName");
  const lord = document.querySelector(".lord-sur");
  const EinBtn = document.getElementById("EinreichenBtn");
  EinBtn.classList.add("resBtn");
  let i = 0;
  setInterval(() => {
    i++;
    if (i <= 3) {
      btn.textContent += ".";
    } else {
      lord.style.left = "150px";
      lord.style.transform = "scale(1.8)";
      btn.style.left = "150px";
      clearInterval(this);
    }
  }, 500);
}
