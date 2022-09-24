import Dexie from "dexie";
//@ts-ignore
import JMuxer from "jmuxer";

const min_axe = 0.1;
const max_axe = 0.9;

export default class tello_drone {
  db = new Dexie("tello");

  public_axes = [];
  public_axes_actions = [];
  public_buttons = [];
  public_buttons_prev = [];
  public_cmd_prev = "";
  public_buttons_actions = [];

  ws: WebSocket;

  constructor(wsAddress = "ws://localhost:8080") {
    this.ws = new WebSocket(wsAddress);
    this.ws.addEventListener("open", (e) => {
      this.ws.send(JSON.stringify({ action: "command", data: "command" }));
    });
    this.ws.addEventListener("message", (e) => {
      const _data = JSON.parse(e.data);
      if (_data.hasOwnProperty("status")) {
        const status = _data.status;
        const battery = _data.status.battery;
      } else if (_data.hasOwnProperty("video")) {
        const buffer = new Uint8Array(_data.video.data);
        //duration: 100
      }
    });
    this.ws.addEventListener("error", (e) => {
      console.log("Socket Error:", e);
    });
    this.ws.addEventListener("close", (e) => {
      console.log("socket closed");
    });
  }

  sendData() {}
}
