//@ts-ignore
import axios from "axios";
import React from "react";
import { connect } from "socket.io-client";
import { ip, port, webServerUrl } from "../constants";
import { getState } from "../DeployContract";
import { wallet } from "../main";
import fire_holder from "./fire_holder";

export const socket = connect(`http://${ip}:${port}`, {
  withCredentials: true,
  transports: ["websocket"],
  extraHeaders: { "Access-Control-Allow-Origin": "*" },
});
export const SocketContext = React.createContext(socket);

socket.on("connect", () => {
  console.log("Connected to client:", `http://${ip}:${port}!`);
});
socket.on("disconnect", () => {
  checkForServer();
});
socket.on("data", (data) => {
  console.log("received data:", data);
});
socket.on("fire_detected", (data) => {
  const fireData = data.info;
  console.log("fire detected:", fireData);
  fire_holder.instance.addFire(fireData);
  getState(wallet, fireData.longlat as any);
});
socket.on("fire_data", (data) => {
  console.log("fire data:", data);
  for (let i = 0; i < data.length; i++) {
    fire_holder.instance.addFire(data[i]);
  }
});

export const disconnect = () => {
  if (socket && socket.active) {
    socket.close();
  }
};

export const sendData = (packet: string, data: any) => {
  if (socket && socket.active) {
    socket.emit(packet, data);
  }
};

const checkForServer = async () => {
  try {
    const resp = await axios.get(webServerUrl + "/ping", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    if (resp.data === "ok") {
      socket.connect();
    }
  } catch (e) {
    checkForServer();
  }
};
