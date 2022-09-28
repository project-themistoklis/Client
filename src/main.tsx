import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { near_contract_name } from "./constants";
import drone_holder from "./handlers/drone_holder";
import { NearHandler } from "./handlers/near_interface";
import { Wallet } from "./handlers/near_wallet";
import "./index.css";
import { Buffer } from "buffer";
import fire_holder from "./handlers/fire_holder";

globalThis.Buffer = Buffer;

new fire_holder();
new drone_holder();
export const wallet = new Wallet({
  createAccessKeyFor: near_contract_name as any,
});
export const nearHandler = new NearHandler({
  contractId: near_contract_name,
  walletToUse: wallet,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
