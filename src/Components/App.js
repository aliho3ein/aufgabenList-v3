import React from "react";
/* Style */
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

/* App */
function App() {
  const [state, despatch] = React.useReducer(todoReducer, {
    items: [],
    pos: "start",
    auth: false,
  });

  return (
    <AuthenticContext.Provider value={{ user: state.auth, despatch }}>
      <TodoLogin />
      {state.auth ? (
        <todoContext.Provider value={{ state, despatch }}>
          <TodoHeader />
          <main>
            <HeadMain />
          </main>
        </todoContext.Provider>
      ) : null}
    </AuthenticContext.Provider>
  );
}

export default App;
