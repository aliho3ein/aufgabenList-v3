import "./../Styles/about.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import instance from "./../Api/todoApi";
import ListLoading from "./../Components/Loading";
import AuthenticContext from "./../Contexts/AuthContext";

function SingleItem() {
  const Params = useParams();
  let tColor;
  let [Txt, setTxt] = useState({ text: "", type: false, page: true });
  const mUser = useContext(AuthenticContext);

  useEffect(() => {
    instance
      .get(`/MyList/${mUser.state.userName}/${Params.id}.json`)
      .then((response) => {
        response.data.text
          ? setTimeout(() => {
              setTxt(() => {
                return {
                  text: response.data.text,
                  type: response.data.process,
                  page: true,
                };
              });
            }, 2000)
          : console.log("Error 404");
      })
      .catch((err) =>
        setTxt({
          page: false,
        })
      );
  }, []);

  Txt.type ? (tColor = "GCol") : (tColor = "RCol");

  return Txt.page ? (
    <div className={`aboutMain  ${tColor}`}>
      {Txt.text ? Txt.text : <ListLoading type={true} />}
    </div>
  ) : (
    <div className="aboutMain">Error 404 -Page Not Exist</div>
  );
}

export default SingleItem;
