import { useState } from "react";
import tello_drone from "./handlers/tello_drone";

function AddTelloDrone(props: any) {
  const [host, setHost] = useState("192.168.10.1");
  const [port, setPort] = useState(8889);
  const [statePort, setStatePort] = useState(8890);
  const [videoPort, setVideoPort] = useState(11111);

  const addDrone = async () => {
    const drone = new tello_drone({
      address: host,
      commandPort: port,
      statePort: statePort,
      videoPort: videoPort,
    });
  };

  return (
    <div>
      <label>Add Tello Drone</label>
      <br />
      <br />
      <label>Host: </label>
      <input value={host} onChange={(e) => setHost(e.target.value)}></input>
      <br />
      <label>Port: </label>
      <input
        value={port}
        onChange={(e) => setPort(parseInt(e.target.value))}
      ></input>
      <br />
      <label>State Port: </label>
      <input
        value={statePort}
        onChange={(e) => setStatePort(parseInt(e.target.value))}
      ></input>
      <br />
      <label>Video Port: </label>
      <input
        value={videoPort}
        onChange={(e) => setVideoPort(parseInt(e.target.value))}
      ></input>
      <br />
      <br />
      <button onClick={addDrone}>Add</button>
    </div>
  );
}

export default AddTelloDrone;
