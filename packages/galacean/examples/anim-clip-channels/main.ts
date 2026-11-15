// A property path can reach one channel: three float curves on color.r, color.g and color.b of a light
import { AnimationClip, AnimationFloatCurve, DirectLight } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, cube, say } = await cubeStage(el, ctx, { light: false, size: 1.6 });
  stage.scene.ambientLight.diffuseIntensity = 0.08;
  cube.transform.setRotation(25, 35, 0);
  const holder = root.createChild('holder');
  const lamp = holder.createChild('lamp');
  lamp.transform.setRotation(-45, -30, 0);
  lamp.addComponent(DirectLight);
  const clip = new AnimationClip('rainbow');
  (['r', 'g', 'b'] as const).forEach((channel, i) => {
    const curve = new AnimationFloatCurve();
    // Each channel peaks a third of the loop later than the one before.
    keys(curve, [[0, i === 0 ? 1 : 0], [1, i === 1 ? 1 : 0], [2, i === 2 ? 1 : 0], [3, i === 0 ? 1 : 0]]);
    clip.addCurveBinding('lamp', DirectLight, `color.${channel}`, curve);
  });
  playClip(engine, holder, clip);
  say('"color.r", "color.g", "color.b": one float curve per channel');
  return stage.dispose;
};

export default mount;
