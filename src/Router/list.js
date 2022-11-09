import { useContext, useEffect, useState } from "react";
/* context */
import todoContext from "../Contexts/AppContext";
/* compo */
import TodoHeader from "../Components/Header";
import HeadMain from "../Components/MainHead";
import ListLoading from "../Components/Loading";
/* axios  */
import instance from "../Api/todoApi";

function MyList() {
  let mCont = useContext(todoContext);
  let { state, despatch, load, setLoading } = mCont;
  //let [userNm, setUser] = useState(state.userName);

  useEffect(() => {
    setLoading(true);
    instance
      .get(`/MyList/${state.userName}.json`)
      .then((response) => {
        JsonHandle(response.data);
      })
      .catch((err) => {
        console.log("Error On App - no data");
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [state.auth]);

  let JsonHandle = (data) => {
    /*  */ // Object.values
    let newItem = Object.entries(data).map(([key, value]) => {
      return { ...value, key };
    });
    despatch({ type: "init_data", payload: { newItem } });
  };

  return (
    <todoContext.Provider value={{ state, despatch }}>
      <TodoHeader />
      <main>{load ? <ListLoading type={false} /> : <HeadMain />}</main>
    </todoContext.Provider>
  );
}

export default MyList;
