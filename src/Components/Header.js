import { useContext } from "react";
import todoContext from "../Contexts/AppContext";
import instance from "./../Api/todoApi";

/* Header Area - Get Item from User */
function TodoHeader() {
  let getCon = useContext(todoContext);

  /* Create todo */
  let getNewData = () => {
    let title = document.querySelector(".inText");
    if (title.value.length >= 3) {
      let thisItem = {
        text: title.value,
        done: false,
        process: false,
        delete: false,
      };

      /* Ajax */
      instance
        .post("/MyList.json", thisItem)
        .then((response) => {
          getCon.despatch({
            payload: {
              type: "Create",
              newItem: { ...thisItem, key: response.data.name },
            },
          });
        })
        .catch((err) => console.log("Error"));

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
