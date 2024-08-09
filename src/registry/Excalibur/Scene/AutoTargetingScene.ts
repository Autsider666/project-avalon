import {ChasesTargetComponent} from "@avalon/Excalibur/Component/ChasesTargetComponent";
import {SearchesTargetComponent} from "@avalon/Excalibur/Component/SearchesTargetComponent";
import {Actor, CollisionType, Color, Scene, Vector} from "excalibur";

const TargetTag = 'TARGET';

export class AutoTargetingScene extends Scene {
    constructor() {
        super();
        this.backgroundColor = Color.Gray;
    }

    onActivate() {
        const hunter = new Actor({
            name: 'Hunter',
            pos: new Vector(10, 10),
            width: 20,
            height: 20,
            color: Color.Red,
            collisionType: CollisionType.Active,
        });

        hunter.addComponent(new SearchesTargetComponent({queryTags: [TargetTag]}));

        hunter.addComponent(new ChasesTargetComponent(() => 1));

        this.add(hunter);

        for (let dX = 1; dX < 15; dX++) {
            for (let dY = 1; dY < 10; dY++) {
                const prey = new Actor({
                    name: 'Prey',
                    pos: new Vector(dX * 50, dY * 50),
                    radius: 15,
                    color: Color.Green,
                    collisionType: CollisionType.Active,
                });

                prey.on('collisionstart', () => prey.kill());

                prey.addTag(TargetTag);

                this.add(prey);
            }
        }
    }
}