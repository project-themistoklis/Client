import { useEffect, useState } from "react";
import "./App.css";
//@ts-ignore
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

function Map(props: any) {
  const [fireData, setFireData] = useState([]);

  useEffect(() => {
    fetchFireData();
  }, []);

  const fetchFireData = async () => {
    const data = [
      { longlat: [-122.4194, 37.7749], size: 5 },
      { longlat: [-74.006, 40.7128], size: 10 },
    ];
    setFireData(data as any);
  };

  const renderMap = () => {
    return (
      <div>
        {" "}
        <ComposableMap 
  style={{ width: "650px", height: "auto" }} >
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
