import {AutoTargetingScene} from "@avalon/Excalibur/Scene/AutoTargetingScene";
import {Engine} from "excalibur";

const canvasElement = document.createElement('canvas');
document.body.appendChild(canvasElement);

const engine = new Engine({
    canvasElement,
    scenes: {
        example: new AutoTargetingScene(),
    }
});

engine
    .start('example')
    .then(() => console.log('✅ Engine started!'));
