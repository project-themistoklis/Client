import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import "./App.css";
import { wallet_connect_contract_id, webServerUrl } from "./constants";
import { wallet } from "./main";

import { getBalance, getState, walletLogin } from "./DeployContract";
import { sign } from "crypto";

function Settings(props: any) {
  const user = useContext(UserContext);
  const [settings, setSettings] = useState(null);
  const [balance, setBalance] = useState(0);

  // console.log(wallet.wallet);
  const sendData = () => {
    getState(wallet, [0, 0]);
    // sendTransactions(wallet);
  };

  const signin = () => {
    walletLogin(wallet.accountId);
    // const accountId = wallet.accountId;
  };

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

  useEffect(() => {
    setInterval(async () => {
      const balance = await getBalance();
      setBalance(balance);
    }, 5000);
  }, []);

  const connectNearWallet = async () => {
    const isSignedIn = await wallet.startUp();

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
        Balance: {balance}
        <br />
        <button onClick={sendData}>send</button>
        <button onClick={signin}>Wallet-Login</button>
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
