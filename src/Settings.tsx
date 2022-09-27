import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import "./App.css";
import { wallet_connect_contract_id, webServerUrl } from "./constants";
import { wallet } from "./main";

import {getState, walletLogin} from './DeployContract';

function Settings(props: any) {
  const user = useContext(UserContext);
  const [settings, setSettings] = useState(null);

  // console.log(wallet.wallet);
  const sendData = () => {
    getState(wallet, [0]);
    // sendTransactions(wallet);
  }

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

  const connectNearWallet = async () => {
    const isSignedIn = await wallet.startUp();
    console.log("isSignedIn:", isSignedIn);

    if (!isSignedIn) {
      console.log("signing in");
      wallet.signIn();
    } else {
      console.log("signing out");
      wallet.signOut();
      user.nearSignedIn = false;
    }
  };
  
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
        <button onClick={sendData}>send</button>
        <button onClick={walletLogin}>Wallet-Login</button>
        <br />
        <button onClick={save}>Save</button>
        <br />
        <button onClick={connectNearWallet}>
          {user.nearSignedIn ? "Disconnect Near Wallet" : "Connect NEAR Wallet"}
        </button>
        <br />
        <button onClick={back}>Back</button>
      </header>
    </div>
  );
}

export default Settings;
