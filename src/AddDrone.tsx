import { useState } from "react";
import AddDJIDrone from "./AddDJIDrone";
import AddTelloDrone from "./AddTelloDrone";
import "./App.css";

function AddDrone(props: any) {
  const [droneType, setDroneType] = useState("none");

  const renderer = () => {
    return (
      <div>
        {droneType === "Tello" ? (
          <AddTelloDrone />
        ) : droneType === "DJI" ? (
          <AddDJIDrone />
        ) : (
          <div>
            <button
              onClick={() => {
                setDroneType("Tello");
              }}
            >
              Tello
            </button>
            <button
              onClick={() => {
                setDroneType("DJI");
              }}
            >
              DJI
            </button>
          </div>
        )}
        <br />
        <button onClick={back}>Back</button>
      </div>
    );
  };

  const back = async () => {
    if (droneType === "Tello" || droneType === "DJI") {
      setDroneType("none");
    } else {
      props.back();
    }
  };

  return (
    <div className="App">
      <header className="App-header">{renderer()}</header>
    </div>
  );
}

export default AddDrone;
