import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import { socket, SocketContext } from "./socketio_client";
import { generateUuid } from "./utils";
import { storage_prefix } from "./constants";

export const UserContext = React.createContext({
  username: "",
  settings: {},
  uuid: "",
});

function App() {
  const [user, setUser] = useState({ username: "", settings: {}, uuid: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let uuid = localStorage.getItem(storage_prefix + "uuid");
    if (!uuid || uuid?.length <= 0) {
      uuid = generateUuid();
      localStorage.setItem(storage_prefix + "uuid", uuid as any);
    }
    user.uuid = uuid as any;

    setLoggedIn(user.username?.length > 0);
    console.log("loggedIn", loggedIn, "username:", user.username?.length);
  }, []);

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <UserContext.Provider value={user}>
          <header className="App-header">
            {loggedIn === false ? (
              <LoginPage
                loginHandler={(res: boolean) => {
                  setLoggedIn(res);
                }}
              />
            ) : (
              <MainPage />
            )}
          </header>
        </UserContext.Provider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
