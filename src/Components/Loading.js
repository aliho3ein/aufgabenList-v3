import { useState } from "react";

function ListLoading(props) {
  let [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(() => {
      return false;
    });
  }, 3000);

  return (
    <>
      {load ? (
        <div className="lds-hourglass"></div>
      ) : (
        <span className="emMassage">
          Es gibt noch keine Plan in der Gegend zu zeigen
        </span>
      )}
    </>
  );
}

export default ListLoading;
