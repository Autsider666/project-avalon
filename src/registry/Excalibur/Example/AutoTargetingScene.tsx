"use client";

import {loadExample} from "@/registry/Excalibur/Example/Utility/loadExample";
import {Color, Scene} from "excalibur";

class AutoTargetingScene extends Scene {
    onInitialize() {
        this.backgroundColor = Color.Red;
    }
}

const scene = loadExample(new AutoTargetingScene());

export default scene;