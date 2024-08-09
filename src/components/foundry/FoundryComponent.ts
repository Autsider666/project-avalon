"use client";

import {BaseComponent} from "@avalon/Excalibur/Component/BaseComponent";
import {Actor, Color} from "excalibur";
import GUI from "lil-gui";

export class FoundryComponent extends BaseComponent {
    private gui?: GUI;

    constructor() {
        super();

        this.on('kill', () => this.gui?.destroy());
    }

    onAdd(owner: Actor) {
        super.onAdd(owner);
        this.gui = new GUI({
            title: owner.name,
            container: document.getElementById('pane-container') ?? undefined,
        });

        this.gui.addColor({color: owner.color.toHex()}, 'color').onChange((color: string) => {
            owner.color = Color.fromHex(color);
        });

        const position = this.gui.addFolder('Position');
        position.add(owner.pos, 'x', 0, 700);
        position.add(owner.pos, 'y', 0, 500);
    }

    onRemove() {
        super.onRemove();

        this.gui?.destroy();
    }
}