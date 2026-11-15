// clip.clearEvents() removes every event of a clip; the Script stops hearing them
import { AnimationClip, AnimationVector3Curve, Script, Transform, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, cycle, keys, playClip } from '../../shared/anim-kit.ts';
import { tick } from '../../shared/gfx-kit.ts';

class Counter extends Script {
  hits = 0;
  hit(): void {
    this.hits++;
    this.entity.transform.setScale(1.4, 1.4, 1.4);
  }
  override onUpdate(dt: number): void {
    const s = this.entity.transform.scale.x;
    this.entity.transform.setScale(s + (1 - s) * Math.min(1, dt * 8), 1, 1);
  }
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, cube, say } = await cubeStage(el, ctx, { size: 1.2 });
  const counter = cube.addComponent(Counter);
  const clip = new AnimationClip('slide');
  const curve = new AnimationVector3Curve();
  keys(curve, [[0, new Vector3(-3, 0, 0)], [2, new Vector3(3, 0, 0)], [4, new Vector3(-3, 0, 0)]]);
  clip.addCurveBinding('', Transform, 'position', curve);
  const add = (): void => [0.5, 1, 1.5, 2, 2.5, 3, 3.5].forEach((t) => clip.addEvent('hit', t, {}));
  add();
  playClip(engine, cube, clip);
  cycle(stage, root, [
    ['add events', () => (clip.clearEvents(), add())],
    ['clearEvents()', () => clip.clearEvents()],
  ], 5);
  tick(root, () => say(`events on the clip: ${clip.events.length}\nhit() calls heard: ${counter.hits}`));
  return stage.dispose;
};

export default mount;
