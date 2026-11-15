// AnimationBoolCurve on a renderer's enabled flag makes it blink
import { AnimationBoolCurve, AnimationClip, MeshRenderer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, cube, say } = await cubeStage(el, ctx, { size: 1.6 });
  const clip = new AnimationClip('blink');
  const curve = new AnimationBoolCurve();
  keys(curve, [[0, true], [0.8, false], [1.1, true], [1.5, false], [1.7, true], [3, true]]);
  clip.addCurveBinding('cube', MeshRenderer, 'enabled', curve);
  // The Animator sits on the cube's parent so it keeps running while the renderer is off.
  const holder = cube.parent.createChild('holder');
  holder.addChild(cube);
  playClip(engine, holder, clip);
  say('addCurveBinding("cube", MeshRenderer, "enabled", AnimationBoolCurve)');
  return stage.dispose;
};

export default mount;
