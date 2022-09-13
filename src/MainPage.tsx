import "./App.css";
import { UserContext } from "./App";
import { useContext } from "react";
import { storage_prefix } from "./constants";

function MainPage(props: any) {
  const user = useContext(UserContext);

  const disconnect = async () => {
    localStorage.removeItem(storage_prefix + "is_logged_in");
    localStorage.removeItem(storage_prefix + "is_stored_pin");
    localStorage.removeItem(storage_prefix + "stored_username");
    localStorage.removeItem(storage_prefix + "stored_password");
    localStorage.removeItem(storage_prefix + "stored_uuid");
    props.disconnectHandler();
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => disconnect()}>Disconnect</button>
      </header>
    </div>
  );
}

export default MainPage;
