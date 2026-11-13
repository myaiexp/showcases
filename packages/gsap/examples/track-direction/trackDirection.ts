// The official trackDirection() helper, copied from the docs (typed only)
// Source: docs/v3/HelperFunctions/helpers/trackDirection
// Sets a `direction` property (1 forward, -1 backward) on any animation every time its playhead
// moves, and can call onToggle when the direction flips. Works however deeply the animation is
// nested, because it compares totalTime() between updates.
export type Directed = gsap.core.Animation & { direction?: number };
type DirectionCallback = (this: Directed, direction: number) => void;
export interface TrackOptions {
  animation?: Directed;
  onUpdate?: DirectionCallback;
  onToggle?: DirectionCallback;
}
type Tick = (this: Directed) => void;

export function trackDirection(animation: Directed): Directed; // assign to a tween or timeline
export function trackDirection(options: TrackOptions & { animation: Directed }): Directed;
export function trackDirection(options?: TrackOptions | DirectionCallback): Tick; // use as onUpdate
export function trackDirection(valueIn?: unknown): Tick | Directed {
  const value = (typeof valueIn !== 'object' ? { onUpdate: valueIn } : valueIn) as TrackOptions & { eventCallback?: unknown };
  let prevTime = 0;
  let prevReversed = false;
  const anim = (value.eventCallback ? (value as unknown as Directed) : value.animation) as Directed | undefined;
  const onUpdate = value.onUpdate;
  const onToggle = value.onToggle;
  return anim
    ? (anim.eventCallback('onUpdate', trackDirection({ onUpdate, onToggle })) as Directed)
    : function (this: Directed) {
        const time = this.totalTime();
        const reversed = time < prevTime;
        this.direction = reversed ? -1 : 1;
        if (reversed !== prevReversed) {
          onToggle && onToggle.call(this, this.direction);
          prevReversed = reversed;
        }
        prevTime = time;
        onUpdate && onUpdate.call(this, this.direction);
      };
}
