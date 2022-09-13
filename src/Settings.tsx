import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import "./App.css";
import { webServerUrl } from "./constants";

function Settings(props: any) {
  const user = useContext(UserContext);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    setSettings(
      typeof user.settings === "string"
        ? JSON.parse(user.settings)
        : (user.settings as any)
    );
  }, []);

  const renderSettings = () => {
    if (!settings) {
      return null;
    }

    const keys = Object.keys(settings);

    if (keys?.length > 0) {
      return (
        <div>
          {keys.map(function (val, i) {
            return (
              <div key={i}>
                <label>{val}</label>
                <input
                  value={settings[val]}
                  onChange={(e) => {
                    const newSettings = { ...(settings as any) };
                    newSettings[val] = e.target.value;
                    setSettings(newSettings);
                  }}
                ></input>
                <br />
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>No Settings Found!</div>;
    }
  };

  const connectNearWallet = async () => {};

  const back = async () => {
    props.back();
  };

  const save = async () => {
    user.settings = settings as any;
    console.log("user.settings:", user);
    const resp = await axios.post(webServerUrl + "/set_settings", {
      username: user.username,
      settings: JSON.stringify(user.settings),
    });
    console.log(resp.data);
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderSettings()}
        <br />
        <button onClick={save}>Save</button>
        <br />
        <button onClick={connectNearWallet}>Connect NEAR Wallet</button>
        <br />
        <button onClick={back}>Back</button>
      </header>
    </div>
  );
}

export default Settings;