// AnimationQuaternionCurve on rotationQuaternion: keys are quaternions, blended along the shortest arc
import { AnimationClip, AnimationQuaternionCurve, Quaternion, Transform } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, cube, say } = await cubeStage(el, ctx, { size: 1.4 });
  const q = (x: number, y: number, z: number): Quaternion => {
    const out = new Quaternion();
    Quaternion.rotationEuler(x, y, z, out);
    return out;
  };
  const clip = new AnimationClip('tumble');
  const curve = new AnimationQuaternionCurve();
  keys(curve, [[0, q(0, 0, 0)], [1, q(0.9, 0.5, 0)], [2, q(0, 1.8, 1.2)], [3, q(-0.8, 0.4, 2.4)], [4, q(0, 0, 0)]]);
  clip.addCurveBinding('', Transform, 'rotationQuaternion', curve);
  playClip(engine, cube, clip);
  say('addCurveBinding("", Transform, "rotationQuaternion", AnimationQuaternionCurve)');
  return stage.dispose;
};

export default mount;
