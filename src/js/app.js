import ContinuumEngine from "../lib/continuum-engine/src/js/engine.js"
import UI from "./ui.js";

export default class App {
    constructor() {
        this.engine = new ContinuumEngine();
        this.ui = new UI();

        this.ticker = PIXI.ticker.shared;
        this.ticker.add(this.onTick, this);
    }

    onTick(dt) {
        this.engine.onTick(dt);
        this.ui.update(dt);
    }
}

window.onload = function () {
    new App();
};