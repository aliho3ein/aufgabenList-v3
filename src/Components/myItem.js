import React, { useContext } from "react";
import todoContext from "../Contexts/AppContext";
import instance from "./../Api/todoApi";
import { Link } from "react-router-dom";
/* Shows Items */
function MyItem(props) {
  let { despatch, state } = useContext(todoContext);
  let { item, tab } = props;

  /* Löschen , Start or Erledigt */
  let doItem = (value) => {
    switch (value) {
      case "start":
        item.done = false;
        item.process = true;
        break;
      case "done":
        item.done = true;
        break;
      default:
        item.delete = true;
        instance
          .delete(`/MyList/${state.userName}/${item.key}.json`)
          .then((response) => {
            despatch({
              type: "doItem",
              payload: { key: item.key, act: value },
            });
          })
          .catch((err) => console.log("Error on load list"));
        return;
    }
    instance
      .put(`/MyList/${state.userName}/${item.key}.json`, item)
      .then((response) => {
        despatch({
          type: "doItem",
          payload: { key: item.key, act: value },
        });
      })
      .catch((err) => {
        console.warn("Error");
      });
  };

  return (
    <div className="item">
      <span>
        <Link to={`/${item.key}`}> {item.text}</Link>
      </span>

      {tab === "start" ? (
        <lord-icon
          src="https://cdn.lordicon.com/wnkegycl.json"
          trigger="loop"
          delay="1000"
          class="lord-ic"
          title="Start"
          onClick={() => doItem("start")}
        ></lord-icon>
      ) : /* <button
          className="btn btnStart btnLeft"
          onClick={() => doItem("start")}
        >
          Start
        </button>*/
      null}
      {tab === "progress" ? (
        <lord-icon
          src="https://cdn.lordicon.com/hrqwmuhr.json"
          trigger="loop"
          delay="1000"
          class="lord-ic lord-don"
          title="Erledigt"
          onClick={() => doItem("done")}
        ></lord-icon>
      ) : /* <button className="btn btnDone btnLeft" onClick={() => doItem("done")}>
          Erledigt
        </button>*/
      null}
      {tab === "done" ? (
        <lord-icon
          src="https://cdn.lordicon.com/krmfspeu.json"
          trigger="hover"
          class="lord-ic"
          title="zurück im gang"
          onClick={() => doItem("start")}
        ></lord-icon>
      ) : /*  <button
          className="btn btnReturn btnLeft"
          onClick={() => doItem("start")}
        >
          zurück
        </button>*/
      null}
      {/* <button className="btn btnDelete" onClick={() => doItem("delete")}>
        <lord-icon
          src="https://cdn.lordicon.com/gsqxdxog.json"
          trigger="hover"
          className="lord-Ic"
        ></lord-icon>
      </button>*/}
      <lord-icon
        src="https://cdn.lordicon.com/gsqxdxog.json"
        trigger="hover"
        class="lord-ic lord-del"
        title="Löschen"
        onClick={() => doItem("delete")}
      ></lord-icon>
    </div>
  );
}

export default MyItem;
