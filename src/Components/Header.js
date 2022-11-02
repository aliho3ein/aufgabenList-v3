import { useContext } from "react";
import todoContext from "../Contexts/AppContext";

/* Header Area - Get Item from User */
function TodoHeader() {
  let getCon = useContext(todoContext);
  let getNewData = () => {
    let title = document.querySelector(".inText");
    if (title.value.length >= 3) {
      getCon.despatch({ payload: { type: "Create", text: title.value } });
      title.value = "";
    }
  };
  /* Enter Key */
  window.addEventListener("keydown", (key) => {
    if (key.code === "Enter") getNewData();
  });

  return (
    <header>
      <span>Geben Sie Ihre Plan an </span>
      <div className="inputArea">
        <input type="text" className="inText" />
        <button className="btn btnAdd" onClick={getNewData}>
          hinzufügen
        </button>
      </div>
    </header>
  );
}

export default TodoHeader;
