export default class drone_holder {
  static instance: drone_holder;

  drones: any[] = [];

  constructor() {
    drone_holder.instance = this;
  }

  getDrones() {
    return this.drones;
  }

  getDrone(serial: any) {
    for(let i = 0; i < this.drones.length;i++) {
      if (this.drones[i].serial === serial) {
        return this.drones[i];
      }
    }

    return null;
  }

  addDrone(drone: any) {
    if (this.droneExists(drone.serial)) {
      return;
    }

    this.drones.push(drone);
  }

  droneExists(serial: any) {
    for (let i = 0; i < this.drones.length; i++) {
      if (this.drones[i].serial === serial) {
        return true;
      }
    }

    return false;
  }
}
