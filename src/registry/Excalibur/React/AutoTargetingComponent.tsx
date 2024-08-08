"use client";

import {loadExample} from "@avalon/Excalibur/Example/Utility/loadExample";
import {AutoTargetingScene} from "@avalon/Excalibur/Scene/AutoTargetingScene";

// export class AutoTargetingScene extends Scene {
//     onInitialize() {
//         this.backgroundColor = Color.Red;
//     }
// }

const component = loadExample(new AutoTargetingScene());

export default component;