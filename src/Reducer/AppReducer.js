function todoReducer(state, action) {
  let { type } = action;
  let { key, tab, newItem, act } = action.payload;

  switch (type) {
    case "init_data":
      return {
        ...state,
        items: newItem,
      };

    case "create_item":
      return {
        ...state,
        items: [...state.items, newItem],
      };

    case "doItem":
      ItemsOption(state, key, act);
      return { ...state };

    case "toggleUser":
      return { ...state, auth: !state.auth, userName: key };

    default:
      return { ...state, pos: tab };
  }
}

export default todoReducer;

function ItemsOption(state, key, act) {
  switch (act) {
    case "start":
      let Item = state.items.find((el) => el.key === key);
      Item.process = true;
      Item.done = false;
      break;
    case "done":
      state.items.find((el) => el.key === key).done = true;
      break;
    default:
      state.items.find((el) => el.key === key).delete = true;
      break;
  }
}
