import "./App.css";
import { UserContext } from "./App";
import { useContext, useState } from "react";
import { storage_prefix } from "./constants";
import AddDrone from "./AddDrone";
import HandleDrones from "./HandleDrones";
import Settings from "./Settings";

function MainPage(props: any) {
  const [currentPage, setCurrentPage] = useState("main");

  const renderer = () => {
    return (
      <div>
        {currentPage === "add_drone" ? (
          <div>
            <AddDrone back={back} />
          </div>
        ) : currentPage === "handle_drones" ? (
          <div>
            <HandleDrones back={back} />
          </div>
        ) : currentPage === "settings" ? (
          <div>
            <Settings back={back} />
          </div>
        ) : (
          <div>
            <button onClick={addDrone}>Add Drone</button>
            <br />
            <button onClick={handleDrones}>Handle Drones</button>
            <br />
            <button onClick={settings}>Settings</button>
            <br />
            <button onClick={disconnect}>Disconnect</button>
          </div>
        )}
      </div>
    );
  };

  const disconnect = async () => {
    localStorage.removeItem(storage_prefix + "is_logged_in");
    localStorage.removeItem(storage_prefix + "is_stored_pin");
    localStorage.removeItem(storage_prefix + "stored_username");
    localStorage.removeItem(storage_prefix + "stored_password");
    localStorage.removeItem(storage_prefix + "stored_uuid");
    props.disconnectHandler();
  };

  const addDrone = () => {
    setCurrentPage("add_drone");
  };

  const handleDrones = () => {
    setCurrentPage("handle_drones");
  };

  const settings = () => {
    setCurrentPage("settings");
  };

  const back = () => {
    setCurrentPage("main");
  };

  return (
    <div className="App">
      <header className="App-header">{renderer()}</header>
    </div>
  );
}

export default MainPage;
