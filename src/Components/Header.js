import { useContext, useState } from "react";
import todoContext from "../Contexts/AppContext";
import instance from "./../Api/todoApi";

/* Header Area - Get Item from User */
function TodoHeader() {
  let getCon = useContext(todoContext);

  /* Create todo */
  /*const [nAme, setnAme] = useState(getCon.state.userName);
   useEffect(() => {
    setnAme(() => {
      return getCon.state.userName;
    });
  }, [getCon.state.auth]);
  console.log("out of getData : " + nAme);*/

  let getNewData = () => {
    let title = document.querySelector(".inText");
    if (title.value.length >= 3) {
      let thisItem = {
        text: title.value,
        done: false,
        process: false,
        delete: false,
      };
      /*console.log("inside of getData : " + nAme);*/

      /* Ajax */
      instance
        .post(`/MyList/${getCon.state.userName}.json`, thisItem)
        .then((response) => {
          getCon.despatch({
            type: "create_item",
            payload: {
              newItem: { ...thisItem, key: response.data.name },
            },
          });
        })
        .catch((err) => console.log("Error create Data"));

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
        <button className="btn btnAdd" onClick={() => getNewData()}>
          hinzufügen
        </button>
      </div>
    </header>
  );
}

export default TodoHeader;
