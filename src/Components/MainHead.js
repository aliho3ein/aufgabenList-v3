import { useContext, useEffect } from "react";
import todoContext from "../Contexts/AppContext";
import MyItem from "./myItem";
/* variable */
let Item;
let listItm,
  proItem = 0;

function HeadMain() {
  let myCont = useContext(todoContext);

  /* when page get LogeIn must start list get class active */
  useEffect(() => {
    getTab("start");
  }, []);

  /* Get List Item */
  listItm = myCont.state.items.filter(
    (item) => !item.delete && !item.done && !item.process
  );

  /* Get Item in Progress */
  proItem = myCont.state.items.filter(
    (item) => !item.delete && !item.done && item.process
  );

  /* Send Items to show from Different Tabs */
  switch (myCont.state.pos) {
    case "progress":
      Item = proItem;
      break;
    case "done":
      Item = myCont.state.items.filter((item) => !item.delete && item.done);
      break;
    default:
      Item = listItm;
      break;
  }

  /* Send Data to MyItem and return an Object ready to show */
  let showMyItem = Item.map((item, index) => {
    return <MyItem key={index} item={item} tab={myCont.state.pos} />;
  });

  /* get the Tab */
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
            {listItm.length > 0 ? (
              <span className="countSpn">{listItm.length}</span>
            ) : null}
          </li>
          <li className="progress" onClick={() => getTab("progress")}>
            Im Gang
            {proItem.length > 0 ? (
              <span className="countSpn">{proItem.length}</span>
            ) : null}
          </li>
          <li className="done" onClick={() => getTab("done")}>
            Erledigt
          </li>
        </ul>
      </div>
      <div className="content">
        {showMyItem.length <= 0 ? (
          <span className="emMassage">Kein Plan in der Gegend zu zeigen</span>
        ) : (
          showMyItem
        )}
      </div>
    </>
  );
}

export default HeadMain;
