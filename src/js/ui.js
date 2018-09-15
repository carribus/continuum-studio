// import Split from 'split.js';
import * as PIXI from "pixi.js";

export default class UI {
    constructor(app) {
        this.app = app;

        this.pixiApp = new PIXI.Application({
            // width: 1024,
            // height: 768,
            antialias: true,
            resolution: 1,
            backgroundColor: 0x202020
        });
        this.pixiApp.view.id = "canvas";
        document.getElementById('workspace').appendChild(this.pixiApp.view);
        // ensure that the canvas always resizes to fill the available area
        // this.pixiApp.renderer.view.style.position = "absolute";
        // this.pixiApp.renderer.view.style.display = "block";
        // this.pixiApp.renderer.autoResize = true;
        // this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
        // window.onresize = (e) => {
        this.pixiApp.view.onresize = (e) => {
            console.log(e);
//            this.pixiApp.renderer.resize(window.innerWidth, window.innerHeight);
            this.repositionSprites();
        }

        // Split(["#tree", "#canvas"], {
        //     direction: "horizontal",
        //     sizes: [25, 75],
        //     // minSize: 200,
        //     /*
        //     elementStyle: function (dimension, size, gutterSize) {
        //         return {
        //             'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'
        //         }
        //     },
        //     gutterStyle: function (dimension, gutterSize) {
        //         return {
        //             'flex-basis': gutterSize + 'px'
        //         }
        //     }
        //     */
        // });
    }

    init() {
    }

    repositionSprites() {

    }

    update(dt) {
        // console.log(`${this.pixiApp.view.width}, ${this.pixiApp.view.height}`);
    }
}