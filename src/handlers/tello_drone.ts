import { Drone, State } from "@node-tello/drone";
import { IDroneOptions } from "@node-tello/drone/dist/Drone";

export default class tello_drone {
  drone: Drone | null = null;
  initialized: boolean = false;
  isAirborn: boolean = false;

  constructor(options?: IDroneOptions) {
    this.initDrone(options);
  }

  initDrone = async (options?: IDroneOptions) => {
    this.drone = new Drone(options);

    await this.drone.initalise();
    this.initialized = true;
  };

  disconnectDrone = async () => {
    if (!this.drone || !this.initialized) {
      return;
    }

    await this.land();
    this.drone.disconnect();
    this.initialized = false;
    this.isAirborn = false;
  };

  getSerialNumber = async () => {
    if (!this.drone || !this.initialized) {
      return "";
    }

    return await this.drone?.getSerialNumber();
  };

  takeOff = async () => {
    if (!this.drone || !this.initialized || this.isAirborn) {
      return;
    }

    await this.drone.takeoff();
  };

  land = async () => {
    if (!this.drone || !this.initialized || !this.isAirborn) {
      return;
    }

    await this.drone.land();
  };

  getStats = async () => {
    const stats = {
      initialized: this.initialized,
      airborn: this.isAirborn,
      batery: "0",
      speed: "0",
      time: "0",
    };

    if (!this.drone || !this.initialized) {
      return;
    }

    stats.batery = await this.drone.getBattery();
    stats.speed = await this.drone.getSpeed();
    stats.time = await this.drone.getTime();

    return stats;
  };
}
