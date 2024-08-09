"use client";

import {FoundryComponent} from "@/components/foundry/FoundryComponent";
import {
    Actor,
    Color,
    Engine,
    EventEmitter,
    Random,
    Scene,
    SceneActivationContext,
    SceneEvents,
    Vector
} from "excalibur";
import 'client-only';
import GUI from "lil-gui";

type FoundryEvents = SceneEvents & {
    newActor: { actor: Actor },
}

export class FoundryScene extends Scene {
    events: EventEmitter<FoundryEvents> = new EventEmitter<FoundryEvents>();

    private readonly random = new Random();

    private guiData: {
        actors: number,
    } = {
        actors: 1,
    };

    onActivate(context: SceneActivationContext<unknown>) {
        const gui = new GUI({
            title: 'Scene',
            container: document.getElementById('pane-container') ?? undefined,
        });
        gui.add(this.guiData, 'actors', 0, 20, 1);
    }

    onPreUpdate(engine: Engine, delta: number) {
        const currentActors = this.actors.filter(actor => !actor.isKilled()).length;

        const requiredActors = this.guiData.actors - currentActors;
        if (requiredActors === 0) {
            return;
        }

        if (requiredActors > 0) {
            for (let i = 0; i < requiredActors; i++) {
                this.add(this.generateActor());
            }
        } else {
            for (let i = 0; i < Math.abs(requiredActors); i++) {
                this.actors[i].kill();
            }
        }
    }

    private generateActor(): Actor {
        const actor = new Actor({
            pos: new Vector(this.random.integer(0, this.engine.canvasWidth), this.random.integer(0, this.engine.canvasHeight)),
            radius: 20,
            color: Color.Red,
        });

        actor.addComponent(new FoundryComponent());

        return actor;
    }
}