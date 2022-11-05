import { useContext } from "react";
import todoContext from "./../Contexts/AppContext";

function ListLoading() {
  const lodCont = useContext(todoContext);

  return <div className="lds-hourglass"></div>;
}

export default ListLoading;
