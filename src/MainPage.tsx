import "./App.css";
import { UserContext } from "./App";
import { useContext, useState } from "react";
import axios from "axios";

function MainPage() {
  const [pin, setPin] = useState("");

  const user = useContext(UserContext);

  const _setPin = async () => {
    const resp = await axios.post(process.env.SERVER_URL + "/setPin", {
      username: user.username,
      pin: pin,
      uuid: user.uuid,
    });

    if (resp.data.success) {
    } else {
      console.log(resp.data.error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button>Logged In</button>
      </header>
    </div>
  );
}

export default MainPage;
