// A float curve on Camera.fieldOfView zooms the view
import { AnimationClip, AnimationFloatCurve, Camera } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { spin } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, camera, cube, say } = await cubeStage(el, ctx, { size: 1.5 });
  spin(cube, [20, 35, 0]);
  const clip = new AnimationClip('zoom');
  const curve = new AnimationFloatCurve();
  keys(curve, [[0, 60], [2, 25], [4, 90], [6, 60]]);
  clip.addCurveBinding('', Camera, 'fieldOfView', curve);
  playClip(engine, camera.entity, clip);
  say('addCurveBinding("", Camera, "fieldOfView", AnimationFloatCurve)');
  return stage.dispose;
};

export default mount;
