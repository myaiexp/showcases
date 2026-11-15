// An AnimationClip made in code: Vector3 curves on Transform position and rotation
import { AnimationClip, AnimationVector3Curve, Transform, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, cube, say } = await cubeStage(el, ctx);
  // The docs' custom clip: a rotation curve, here with a position curve beside it.
  const clip = new AnimationClip('move');
  const rotate = new AnimationVector3Curve();
  keys(rotate, [[0, new Vector3(0, 0, 0)], [4, new Vector3(0, 360, 0)]]);
  clip.addCurveBinding('', Transform, 'rotation', rotate);
  const move = new AnimationVector3Curve();
  keys(move, [[0, new Vector3(-2.5, 0, 0)], [2, new Vector3(2.5, 1.2, 0)], [4, new Vector3(-2.5, 0, 0)]]);
  clip.addCurveBinding('', Transform, 'position', move);
  playClip(engine, cube, clip);
  say(`addCurveBinding("", Transform, "rotation" | "position", AnimationVector3Curve)\nclip length ${clip.length} s, ${clip.curveBindings.length} curves`);
  return stage.dispose;
};

export default mount;
