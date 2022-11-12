function tutorReducer(item, despatch) {
  let { type, payload } = despatch;
  if (type === "sendData") {
    return { umfrage: payload, showResult: true };
  }
}

export default tutorReducer;
