import React, { useState } from "react";
/* Style */
import "./background.css";
import "./main.css";
/* Context */
import todoContext from "./../Contexts/AppContext";
import AuthenticContext from "./../Contexts/AppContext";
/* Reducer */
import todoReducer from "../Reducer/AppReducer";
/* Components */
import TodoLogin from "./Loggin";
import TodoHeader from "./Header";
import HeadMain from "./MainHead";
import ListLoading from "./Loading";
/* Json */
import instance from "./../Api/todoApi";

/* App */
function App() {
  const [state, despatch] = React.useReducer(todoReducer, {
    items: [],
    pos: "start",
    auth: false,
  });

  /* Loading Effect */
  const [load, setLoading] = useState();

  React.useEffect(() => {
    setLoading(true);
    instance
      .get("/MyList.json")
      .then((response) => {
        JsonHandle(response.data);
      })
      .catch((err) => console.log("Error On App"));
  }, [state.auth]);

  let JsonHandle = (data) => {
    /* Object.values */
    let newItem = Object.entries(data).map(([key, value]) => {
      return { ...value, key };
    });
    despatch({
      payload: { type: "init_data", newItem },
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthenticContext.Provider value={{ user: state.auth, despatch }}>
      <TodoLogin />
      {state.auth ? (
        <todoContext.Provider value={{ state, despatch }}>
          <TodoHeader />
          <main>{load ? <ListLoading /> : <HeadMain />}</main>
        </todoContext.Provider>
      ) : null}
    </AuthenticContext.Provider>
  );
}

export default App;
