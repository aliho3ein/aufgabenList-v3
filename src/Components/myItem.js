import React, { useContext } from "react";
import todoContext from "../Contexts/AppContext";
import instance from "./../Api/todoApi";

/* Shows Items - every Item has two bottom */
function MyItem(props) {
  let { despatch } = useContext(todoContext);
  let { item, tab } = props;

  /* let letStart = (type, act) => {
    instance.put(
      `/MyList/${item.key}.json`,
      { ...item, ${act}: true }
    );

    despatch({ payload: { type: type, key: item.key } });
  };*/

  let letStart = () => {
    let newItem = {
      done: item.done,
      delete: item.delete,
      text: item.text,
      process: true,
    };

    instance
      .put(`/MyList/${item.key}.json`, newItem)
      .then((response) => {
        despatch({ payload: { type: "startItem", key: item.key } });
      })
      .catch((err) => {
        console.warn("Error");
      });
  };

  let letDone = () => {
    let newItem = {
      done: true,
      delete: item.delete,
      text: item.text,
      process: item.process,
    };

    instance
      .put(`/MyList/${item.key}.json`, newItem)
      .then((response) => {
        despatch({ payload: { type: "doneItem", key: item.key } });
      })
      .catch((err) => {
        console.warn("Error");
      });
  };

  let letDel = () => {
    let newItem = {
      done: item.done,
      delete: true,
      text: item.text,
      process: item.process,
    };
    instance
      .put(`/MyList/${item.key}.json`, newItem)
      .then((response) => {
        despatch({ payload: { type: "deleteItem", key: item.key } });
      })
      .catch((err) => {
        console.warn("Error");
      });
  };

  return (
    <div key={item.key} className="item">
      <span>{item.text}</span>
      {tab === "start" ? (
        <button
          className="btn btnStart btnLeft"
          onClick={() => letStart("startItem", "process")}
        >
          Start
        </button>
      ) : null}
      {tab === "progress" ? (
        <button
          className="btn btnDone btnLeft"
          onClick={() => letDone("doneItem", "done")}
        >
          Erledigt
        </button>
      ) : null}
      {tab === "done" ? (
        <button
          className="btn btnReturn btnLeft"
          onClick={() => letStart("startItem", "start")}
        >
          zurück
        </button>
      ) : null}
      <button
        className="btn btnDelete"
        onClick={() => letDel("deleteItem", "delete")}
      >
        Löschen
      </button>
    </div>
  );
}

export default MyItem;
