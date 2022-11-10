import { useReducer, useState, lazy, Suspense } from "react";
/* Style */
import "./../Styles/background.css";
import "./../Styles/main.css";
import "./../Styles/LogIn.css";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";

/* Context */
import todoContext from "./../Contexts/AppContext";
import AuthenticContext from "./../Contexts/AuthContext";
/* Reducer */
import todoReducer from "../Reducer/AppReducer";
/* Components */
import MyList from "../Router/list";
/*import TodoLogin from "./Loggin";

import AboutMe from "../Router/about";
import ContactMe from "../Router/contact";
import MyHome from "./../Router/home";
import SingleItem from "./../Router/singleItem";*/

/* Router */
import { Routes, Route } from "react-router-dom";

/* Lazy */
const SingleItem = lazy(() => import("./../Router/singleItem"));
const MyHome = lazy(() => import("./../Router/home"));
const ContactMe = lazy(() => import("../Router/contact"));
const AboutMe = lazy(() => import("../Router/about"));
//const MyList = lazy(() => import("../Router/list"));
const TodoLogin = lazy(() => import("./Loggin"));
const Uslogin = lazy(() => import("../Router/user-login"));

defineElement(lottie.loadAnimation);
/* App */
function App() {
  const [state, despatch] = useReducer(todoReducer, {
    items: [],
    pos: "start",
    auth: false,
    userName: "",
    name: "",
  });

  /* Loading Effect */
  const [load, setLoading] = useState();

  /* Change User */
  /*const [userNm, setuserNm] = useState(state.userName);
  useEffect(() => {
    setuserNm(() => {
      return state.userName;
    });
  }, [state.auth]);*/

  return (
    <AuthenticContext.Provider value={{ state, user: state.auth, despatch }}>
      <Suspense>
        <TodoLogin />
      </Suspense>
      <todoContext.Provider value={{ state, despatch, load, setLoading }}>
        <Routes>
          <Route
            path="/list"
            element={
              state.auth ? (
                <MyList />
              ) : (
                <div className="aboutMain">Please LogIn to your Account</div>
              )
            }
          />
          <Route
            path="/:id"
            element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <SingleItem />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense>
                <MyHome />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense>
                <AboutMe />
              </Suspense>
            }
          />
          <Route
            path="/logIn"
            element={
              <Suspense>
                <Uslogin />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense>
                <ContactMe />
              </Suspense>
            }
          />
        </Routes>
        <div className={state.name ? "welcomeMas showMas" : "welcomeMas"}>
          <span className="msgStart">Hi , {state.name} </span>
          <lord-icon
            src="https://cdn.lordicon.com/pithnlch.json"
            trigger="loop"
            delay="2000"
            class="lord-smile"
          ></lord-icon>
        </div>
      </todoContext.Provider>
    </AuthenticContext.Provider>
  );
}

export default App;

/*<TodoHeader />
<main>{load ? <ListLoading /> : <HeadMain />}</main>*/
