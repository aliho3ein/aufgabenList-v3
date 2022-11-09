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
        <button
          className="btn btnStart btnLeft"
          onClick={() => doItem("start")}
        >
          Start
        </button>
      ) : null}
      {tab === "progress" ? (
        <button className="btn btnDone btnLeft" onClick={() => doItem("done")}>
          Erledigt
        </button>
      ) : null}
      {tab === "done" ? (
        <button
          className="btn btnReturn btnLeft"
          onClick={() => doItem("start")}
        >
          zurück
        </button>
      ) : null}
      <button className="btn btnDelete" onClick={() => doItem("delete")}>
        Löschen
      </button>
    </div>
  );
}

export default MyItem;
