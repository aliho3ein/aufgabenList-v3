import { useContext } from "react";
import todoContext from "../Contexts/AppContext";
import MyItem from "./myItem";
/* variable */
let Item;

function HeadMain() {
  let myCont = useContext(todoContext);

  switch (myCont.state.pos) {
    case "progress":
      Item = myCont.state.items.filter(
        (item) => !item.delete && !item.done && item.start
      );
      break;
    case "done":
      Item = myCont.state.items.filter((item) => !item.delete && item.done);
      break;
    default:
      Item = myCont.state.items.filter(
        (item) => !item.delete && !item.done && !item.start
      );
      break;
  }

  let showMyItem = Item.map((item) => {
    return <MyItem item={item} tab={myCont.state.pos} />;
  });

  let getTab = (item) => {
    document.querySelector(".active").classList.remove("active");
    document.querySelector(`.${item}`).classList.add("active");
    myCont.despatch({ payload: { type: "changeTab", tab: item } });
  };

  return (
    <>
      <div className="head">
        <ul>
          <li onClick={() => getTab("start")} className="start active">
            List
          </li>
          <li className="progress" onClick={() => getTab("progress")}>
            Im Gang
          </li>
          <li className="done" onClick={() => getTab("done")}>
            Erledigt
          </li>
        </ul>
      </div>
      <div className="content">
        {showMyItem.length <= 0 ? (
          <span className="emMassage">Keine Plan zu Zeigen</span>
        ) : (
          showMyItem
        )}
      </div>
    </>
  );
}

export default HeadMain;
