let position = "start";

function todoReducer(state, action) {
  let { type, text, key, tab } = action.payload;
  let Item;

  switch (type) {
    case "Create":
      return {
        ...state,
        items: [
          ...state.items,
          {
            key: Date.now(),
            text: text,
            done: false,
            process: false,
            delete: false,
          },
        ],
      };

    case "deleteItem":
      Item = state.items.find((el) => el.key === key);
      Item.delete = true;
      return { ...state };

    case "startItem":
      Item = state.items.find((el) => el.key === key);
      Item.start = true;
      Item.done = false;
      return { ...state };
    case "doneItem":
      Item = state.items.find((el) => el.key === key);
      Item.done = true;
      return { ...state };
    case "toggleUser":
      return { ...state, auth: !state.auth };
    default:
      return { ...state, pos: tab };
  }
}

export default todoReducer;

function ShowItem(state, action, position) {
  let { type, key } = action;
  let Item, newList;
  /*delete*/

  /* Start List */
  if (position === "start")
    newList = state.items.filter((el) => !el.delete && !el.done && !el.start);
  /* In process */ else if (position === "process")
    newList = state.items.filter((el) => !el.delete && !el.done && el.start);
  /* Done */ else if (position === "done")
    newList = state.items.filter((el) => !el.delete && el.done && !el.start);

  return { ...state };
}
