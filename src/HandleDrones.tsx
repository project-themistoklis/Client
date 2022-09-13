import { useEffect, useState } from "react";
import "./App.css";
import drone_holder from "./handlers/drone_holder";

function HandleDrones(props: any) {
  const [drones, setDrones] = useState([]);
  const [settings, setSettings] = useState(null);
  const [selectedDrone, setSelectedDrone] = useState(null);

  useEffect(() => {
    setDrones(drone_holder.instance.getDrones() as any);
  }, []);

  const back = async () => {
    if (!selectedDrone) {
      props.back();
    } else {
      setSelectedDrone(null);
    }
  };

  const selectDrone = async (serial: any) => {
    if (serial?.length <= 0) {
      return;
    }

    setSettings(await drone_holder.instance.getDrone(serial)?.getSettings());
    setSelectedDrone(serial);
  };

  const renderDrones = () => {
    return (
      <div>
        {drones.map(function (drone, i) {
          return (
            <div key={i}>
              <button
                onClick={() => {
                  selectDrone(drone as any);
                }}
              >
                {(drone as any).type + " - " + (drone as any).serial}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSelectedDroneSettings = () => {
    if (!settings) {
      return <div>No settings found!</div>;
    }

    const keys = Object.keys(settings);
    return (
      <div>
        {keys.map(function (val, i) {
          return (
            <div key={i}>
              {val + ": "}
              {settings[val]}
              <br />
            </div>
          );
        })}
      </div>
    );
  };

  const renderSelectedDrone = () => {
    if (!selectedDrone) {
      return null;
    }

    const _drone = drone_holder.instance.getDrone(selectedDrone);
    if (!_drone) {
      setSelectedDrone(null);
      return null;
    }

    return (
      <div>
        {(_drone as any).type + " - " + (_drone as any).serial}
        <br />
        {renderSelectedDroneSettings()}
        Commands:
        <br />
        {_drone.renderCommands()} {/*buttons*/}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {selectedDrone ? renderDrones() : renderSelectedDrone()}
        <button onClick={back}>Back</button>
      </header>
    </div>
  );
}

export default HandleDrones;
