// Events fire as the playhead crosses them, whichever way it runs: a negative speed plays backwards
import { AnimationClip, AnimationVector3Curve, Script, Transform, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';

class Counter extends Script {
  hits = [0, 0, 0];
  mark(i: number): void {
    this.hits[i] = (this.hits[i] ?? 0) + 1;
  }
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, cube, say } = await cubeStage(el, ctx, { size: 1.2 });
  const counter = cube.addComponent(Counter);
  const clip = new AnimationClip('slide');
  const curve = new AnimationVector3Curve();
  keys(curve, [[0, new Vector3(-3, 0, 0)], [3, new Vector3(3, 0, 0)]]);
  clip.addCurveBinding('', Transform, 'position', curve);
  [0.75, 1.5, 2.25].forEach((time, i) => clip.addEvent('mark', time, i));
  const animator = playClip(engine, cube, clip);
  tick(cube, (_dt, t) => {
    if (stage.preview) animator.speed = Math.floor(t / 4) % 2 ? -1 : 1;
    say(`speed ${animator.speed}   mark(i) counts: ${counter.hits.join(' ')}`);
  });
  if (!stage.preview) slider(stage.bar, 'speed', -2, 2, 0.1, 1, (v) => (animator.speed = v));
  return stage.dispose;
};

export default mount;
