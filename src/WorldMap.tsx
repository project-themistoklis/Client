import { useEffect, useState } from "react";
import "./App.css";
//@ts-ignore
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import fire_holder from "./handlers/fire_holder";

function Map(props: any) {
  const [fireData, setFireData] = useState([]);

  useEffect(() => {
    setFireData(fire_holder.instance.activeFires as any);
    setInterval(() => {
      setFireData(fire_holder.instance.activeFires as any);
    }, 10000);
    console.log("fires:", fireData);
  }, []);

  const renderMap = () => {
    return (
      <div>
        {" "}
        <ComposableMap style={{ width: "650px", height: "auto" }}>
          <Geographies geography="/map_data.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {fireData.map((data, i) => {
            return (
              <Marker key={i} coordinates={(data as any).longlat}>
                <circle r={(data as any).size} fill="#F53" />
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    );
  };

  const back = async () => {
    props.back();
  };
  return (
    <div className="App">
      <header className="App-header">
        {renderMap()}
        <br />
        <button onClick={back}>Back</button>
      </header>
    </div>
  );
}

export default Map;
