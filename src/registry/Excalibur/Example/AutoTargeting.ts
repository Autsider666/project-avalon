import {Color, Engine} from "excalibur";

const canvasElement = document.createElement('canvas');
document.body.appendChild(canvasElement);

console.log(canvasElement, canvasElement.getContext('2d'));

// console.log(new HasTargetComponent(new Actor()));

console.log('setting timeout');
setTimeout(() => {
    console.log('timeout');
    const engine = new Engine({
        backgroundColor: Color.Black,
        canvasElement,
    });

    engine.start();

    console.log('started');
}, 2000);