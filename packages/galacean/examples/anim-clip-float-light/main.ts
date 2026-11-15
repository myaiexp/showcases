// A float curve on a child entity's component: the docs' DirectLight "color.r" at path "/light"
import { AnimationClip, AnimationFloatCurve, DirectLight } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, cube, say } = await cubeStage(el, ctx, { light: false });
  stage.scene.ambientLight.diffuseIntensity = 0.1;
  const holder = root.createChild('holder');
  cube.parent.removeChild(cube);
  holder.addChild(cube);
  const lamp = holder.createChild('light');
  lamp.transform.setRotation(-40, -35, 0);
  const light = lamp.addComponent(DirectLight);
  light.color.set(0, 0.7, 0.7, 1);
  const clip = new AnimationClip('color');
  const curve = new AnimationFloatCurve();
  keys(curve, [[0, 0], [2, 1], [4, 0]]);
  clip.addCurveBinding('/light', DirectLight, 'color.r', curve);
  playClip(engine, holder, clip);
  say('addCurveBinding("/light", DirectLight, "color.r", curve)');
  return stage.dispose;
};

export default mount;
