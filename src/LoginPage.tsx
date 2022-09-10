import { useContext, useEffect, useState } from "react";
//@ts-ignore
import axios from "axios";
import "./App.css";
import { UserContext } from "./App";
import { xor } from "./utils";
import { storage_prefix, webServerUrl } from "./constants";

const xor_key = "K";

function LoginPage(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saveCreds, setSaveCreds] = useState(false);
  const [hasPin, setHasPin] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const user = useContext(UserContext);

  useEffect(() => {
    useEffectHandler();
  }, []);

  const useEffectHandler = async () => {
    const resp = await axios.get(webServerUrl + "/user_has_pin", {
      params: { uuid: user.uuid },
      headers: { "Content-Type": "application/json" },
    });

    console.log(resp.data);

    if (resp.data.success) {
      setHasPin(true);
    } else {
      setHasPin(false);
      if (
        localStorage.getItem(storage_prefix + "username") &&
        localStorage.getItem(storage_prefix + "password") &&
        localStorage.getItem(storage_prefix + "saveCreds")
      ) {
        setUsername(
          xor(localStorage.getItem(storage_prefix + "username") + "", xor_key)
        );
        setUsername(
          xor(localStorage.getItem(storage_prefix + "password") + "", xor_key)
        );
        setSaveCreds(
          localStorage.getItem(storage_prefix + "saveCreds") === "true"
        );
      }
    }
  };

  const login = async () => {
    setError("");
    if (
      !username ||
      username?.length <= 0 ||
      !password ||
      password?.length <= 0
    ) {
      setError("Username or password is empty!");
      return;
    }

    const temp = username;
    const temp2 = password;
    const resp = await axios.post(webServerUrl + "/login", {
      username: username,
      password: password,
    });

    setUsername("");
    setPassword("");
    console.log("login resp:", resp.data);

    if (resp.data.success) {
      if (saveCreds) {
        localStorage.setItem(storage_prefix + "username", xor(temp, xor_key));
        localStorage.setItem(storage_prefix + "password", xor(temp2, xor_key));
        localStorage.setItem(
          storage_prefix + "saveCreds",
          saveCreds ? "true" : "false"
        );
      } else {
        localStorage.removeItem(storage_prefix + "username");
        localStorage.removeItem(storage_prefix + "password");
        localStorage.removeItem(storage_prefix + "saveCreds");
      }

      user.username = temp;
      user.settings = resp.data.settings;
      user.uuid = resp.data.uuid;
      props.loginHandler();
    } else {
      setError(resp.data.error);
      if (!saveCreds) {
        localStorage.removeItem(storage_prefix + "username");
        localStorage.removeItem(storage_prefix + "password");
        localStorage.removeItem(storage_prefix + "saveCreds");
      }
    }
  };

  const loginWithPin = async () => {
    const resp = await axios.post(webServerUrl + "/loginWithPin", {
      uuid: user.uuid,
      pin: pin,
    });

    if (resp.data.success) {
      user.settings = resp.data.settings;
      console.log("logged in");
      props.loginHandler();
    } else {
      setError(resp.data.error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
        {hasPin ? (
          <div>
            {" "}
            <label>PIN</label>
            <br />
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Pin"
            />
            <br />
            <br />
            <button onClick={() => loginWithPin()}>Login</button>
          </div>
        ) : (
          <div>
            {" "}
            <label>Username</label>
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <br />
            <br />
            <input
              type="checkbox"
              checked={saveCreds}
              onChange={(e) => setSaveCreds(e.target.checked)}
            />{" "}
            <label>Save</label>
            <br />
            <br />
            <button onClick={() => login()}>Login</button>
          </div>
        )}
        {error && <p color="red">{error}</p>}
      </header>
    </div>
  );
}

export default LoginPage;
