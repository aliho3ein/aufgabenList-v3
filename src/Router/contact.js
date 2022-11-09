import "./../Styles/contact.css";

function ContactMe() {
  return (
    <div className="contactArea">
      <form className="contAre" action="">
        <h1>Sag uns mehr</h1>
        <label htmlFor="firstName">Vorname</label>
        <input
          className="contAre"
          type="text"
          name=""
          id="firstName"
          placeholder="Vorname"
        />

        <label htmlFor="lastName">Nachname</label>
        <input
          className="contAre"
          type="text"
          name=""
          id="lastName"
          placeholder="Nachname"
        />

        <label htmlFor="Email">Deine Email</label>
        <input
          className="contAre"
          type="email"
          name=""
          id="Email"
          placeholder="Email"
        />

        <label htmlFor="about">Erzähl uns von dir</label>
        <textarea id="about" cols="30" rows="10"></textarea>

        <div className="checkArea">
          <label htmlFor="check" className="tCheck">
            Möchtest du mehr wissen?
          </label>
          <div className="checkBox">
            <input type="checkbox" id="check" onChange={change} />
          </div>
        </div>
        <input className="contAre" type="submit" disabled value="Submit" />
      </form>
    </div>
  );
}

export default ContactMe;

let co;
function change() {
  let check = document.querySelector(".checkBox");
  co
    ? (check.style.background = "#999")
    : (check.style.background = "rgb(222, 189, 43)");
  co = !co;
}
