import { useState } from "react";
import "./App.css";

function AddDrone(props: any) {
  const [droneType, setDroneType] = useState("none");

  const renderer = () => {
    return (
      <div>
        {droneType === "Tello" ? (
          <div>Not Supported Yet!</div>
        ) : droneType === "DJI" ? (
          <div>Not Supported Yet!</div>
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
