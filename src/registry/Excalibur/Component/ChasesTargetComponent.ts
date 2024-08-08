import {BaseComponent} from "@avalon/Excalibur/Component/BaseComponent";
import {HasTargetComponent} from "@avalon/Excalibur/Component/HasTargetComponent";
import {Actor} from "excalibur";

export class ChasesTargetComponent extends BaseComponent {
    constructor(
        private readonly getSpeed: () => number,
    ) {
        super();

        this.on('preupdate', this.onPreUpdate.bind(this));
    }

    onPreUpdate(): void {
        const target = this.owner?.get(HasTargetComponent)?.target;
        if (!target || !this.owner) {
            return;
        }

        this.moveInDirection(target.pos.sub(this.owner?.pos), this.getSpeed());
    }

}