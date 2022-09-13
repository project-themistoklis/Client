import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import { socket, SocketContext } from "./handlers/socketio_client";
import { generateUuid } from "./utils";
import { storage_prefix } from "./constants";
import near_handler from "./handlers/near_handler";
import Map from "./WorldMap";

export const UserContext = React.createContext({
  username: "",
  settings: {},
  uuid: "",
});

function App() {
  const [user, setUser] = useState({ username: "", settings: {}, uuid: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const initUser = () => {
    let uuid = localStorage.getItem(storage_prefix + "uuid");
    if (!uuid || uuid?.length <= 0) {
      uuid = generateUuid();
      localStorage.setItem(storage_prefix + "uuid", uuid as any);
    }
    user.uuid = uuid as any;
  };

  const initNear = async () => {
    //new near_handler();
  };

  useEffect(() => {
    initUser();
    initNear();
  }, []);

  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <UserContext.Provider value={user}>
          <header className="App-header">
            {loggedIn === false ? (
              <div>
                {showMap === false ? (
                  <div>
                    <LoginPage
                      loginHandler={(res: boolean) => {
                        setLoggedIn(res);
                      }}
                    />
                    <br />
                    <button
                      onClick={() => {
                        setShowMap(true);
                      }}
                    >
                      Show Map
                    </button>
                  </div>
                ) : (
                  <div>
                    <Map
                      back={() => {
                        setShowMap(false);
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <MainPage
                disconnectHandler={() => {
                  setUser({ username: "", settings: {}, uuid: "" });
                  initUser();
                  setLoggedIn(false);
                }}
              />
            )}
          </header>
        </UserContext.Provider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
