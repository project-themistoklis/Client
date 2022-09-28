export default class fire_holder {
    static instance: fire_holder

    activeFires: any[] = []

    constructor() {
        fire_holder.instance = this;
    }

    addFire(fire: any) {
        this.activeFires.push(fire);
    }
}