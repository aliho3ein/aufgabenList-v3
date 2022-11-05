function todoReducer(state, action) {
  let { type, key, tab, newItem } = action.payload;
  //let { type1 } = action;
  let Item;
  //state.items.nLoading = false;
  switch (type) {
    case "init_data":
      return {
        ...state,
        items: newItem,
      };

    case "Create":
      return {
        ...state,
        items: [...state.items, newItem],
      };

    case "deleteItem":
      Item = state.items.find((el) => el.key === key);
      Item.delete = true;
      return { ...state };

    case "startItem":
      Item = state.items.find((el) => el.key === key);
      Item.process = true;
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
