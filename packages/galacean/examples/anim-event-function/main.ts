// An AnimationEvent calls a Script method at a chosen time of the clip
import { AnimationClip, AnimationEvent, AnimationVector3Curve, Script, Transform, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { lin, tick } from '../../shared/gfx-kit.ts';

class Flasher extends Script {
  beats = 0;
  flash(): void {
    this.beats++;
    this.entity.transform.setScale(1.5, 1.5, 1.5);
  }
  override onUpdate(dt: number): void {
    const s = this.entity.transform.scale.x;
    const next = s + (1 - s) * Math.min(1, dt * 8);
    this.entity.transform.setScale(next, next, next);
  }
}

const mount: Mount = async (el, ctx) => {
  const { stage, engine, cube, material, say } = await cubeStage(el, ctx, { size: 1.2 });
  const script = cube.addComponent(Flasher);
  const clip = new AnimationClip('travel');
  const curve = new AnimationVector3Curve();
  keys(curve, [[0, new Vector3(-3, 0, 0)], [3, new Vector3(3, 0, 0)]]);
  clip.addCurveBinding('', Transform, 'position', curve);
  // The docs' snippet: functionName names the method, time is in seconds.
  for (const time of [0.5, 1.5, 2.5]) {
    const event = new AnimationEvent();
    event.functionName = 'flash';
    event.time = time;
    clip.addEvent(event);
  }
  playClip(engine, cube, clip);
  material.baseColor.set(...lin([0.4, 0.8, 0.9]), 1);
  tick(cube, () => say(`events at 0.5 s, 1.5 s, 2.5 s call Flasher.flash()\nflash() calls so far: ${script.beats}`));
  return stage.dispose;
};

export default mount;
