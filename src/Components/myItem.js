import React, { useContext } from "react";
import todoContext from "../Contexts/AppContext";

/* Shows Items - every Item has two bottom */
function MyItem(props) {
  let { despatch } = useContext(todoContext);
  let { item, tab } = props;
  return (
    <div key={item.key} className="item">
      <span>{item.text}</span>
      {tab === "start" ? (
        <button
          className="btn btnStart"
          onClick={() =>
            despatch({ payload: { type: "startItem", key: item.key } })
          }
        >
          Start
        </button>
      ) : null}
      {tab === "progress" ? (
        <button
          className="btn btnDone"
          onClick={() =>
            despatch({ payload: { type: "doneItem", key: item.key } })
          }
        >
          Erledigt
        </button>
      ) : null}
      {tab === "done" ? (
        <button
          className="btn btnReturn"
          onClick={() =>
            despatch({ payload: { type: "startItem", key: item.key } })
          }
        >
          zurück
        </button>
      ) : null}
      <button
        className="btn btnDelete"
        onClick={() =>
          despatch({ payload: { type: "deleteItem", key: item.key } })
        }
      >
        Löschen
      </button>
    </div>
  );
}

export default MyItem;
