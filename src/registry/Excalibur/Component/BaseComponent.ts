import {
    Actor,
    ActorEvents,
    Component,
    EventKey,
    Ray,
    RayCastHit,
    RayCastOptions,
    Subscription,
    Vector
} from "excalibur";

export type OwnerHandler<EventType> = (event: EventType & { owner: Actor }) => void;

export abstract class BaseComponent extends Component {
    declare owner?: Actor;

    private readonly callbacks = new Map<EventKey<ActorEvents>, OwnerHandler<ActorEvents[EventKey<ActorEvents>]>[]>();

    private readonly subscriptions: Subscription[] = [];

    onAdd(owner: Actor): void {
        for (const event of this.callbacks.keys() as unknown as EventKey<ActorEvents>[]) {
            const handlers = this.callbacks.get(event) ?? [];
            for (const handler of handlers) {
                const subscription = owner.on(event, event => {
                    // @ts-expect-error Dirty but required.
                    event.owner = owner;
                    // @ts-expect-error Same here
                    handler(event);
                });
                this.subscriptions.push(subscription);
            }
        }
    }

    onRemove(): void {
        for (const subscription of this.subscriptions) {
            subscription.close();
        }
    }

    protected on<TEventName extends EventKey<ActorEvents>>(eventName: TEventName, handler: OwnerHandler<ActorEvents[TEventName]>): void {
        if (!this.callbacks.has(eventName)) {
            this.callbacks.set(eventName, []);
        }

        this.callbacks.get(eventName)?.push(handler as OwnerHandler<ActorEvents[EventKey<ActorEvents>]>);
    }

    protected moveInDirection(direction: Vector, speed?: number, maxDistance?: number): void {
        if (this.owner === undefined) {
            return;
        }

        if (direction.x === 0 && direction.y === 0) {
            // this.owner.vel.x = direction.x;
            // this.owner.vel.y = direction.y;
            return;
        }

        if (speed !== undefined || maxDistance !== undefined) {
            direction = direction.normalize();
            if (speed !== undefined) {
                direction = direction.scale(Math.min(speed, maxDistance ?? speed));
            }
        }

        this.owner.pos.x += direction.x;
        this.owner.pos.y += direction.y;
    }

    protected rayCast(position: Vector, direction: Vector, options?: RayCastOptions): RayCastHit[] {
        const physics = this.owner?.scene?.physics;
        if (!physics) {
            throw new Error('Can\'t rayCast without physics.');
        }

        return physics.rayCast(
            new Ray(position, direction),
            options,
        );
    }

    protected rayCastTo(position: Vector, target: Vector, options?: RayCastOptions): RayCastHit[] {
        return this.rayCast(position, target.sub(position), options);
    }
}