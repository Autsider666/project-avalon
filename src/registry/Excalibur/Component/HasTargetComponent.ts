import {BaseComponent} from "@/registry/Excalibur/BaseComponent";
import {Actor} from "excalibur";

export class HasTargetComponent extends BaseComponent {
    constructor(public readonly target: Actor) {
        super();

        this.on('preupdate', this.onPreUpdate.bind(this));
    }

    private onPreUpdate(): void {
        if (this.target.isKilled()) {
            this.owner?.removeComponent(HasTargetComponent);
        }
    }
}