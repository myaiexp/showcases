// The componentIndex overload picks one of several components of the same type on an entity
import { AnimationClip, AnimationFloatCurve, PointLight } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, cube, say } = await cubeStage(el, ctx, { light: false, size: 1.5 });
  stage.scene.ambientLight.diffuseIntensity = 0.05;
  cube.transform.setRotation(20, 30, 0);
  const holder = root.createChild('lights');
  holder.transform.setPosition(0, 2, 2.5);
  const [red, blue] = [holder.addComponent(PointLight), holder.addComponent(PointLight)];
  red.color.set(1, 0.1, 0.1, 1);
  blue.color.set(0.1, 0.2, 1, 1);
  red.distance = blue.distance = 12;
  const clip = new AnimationClip('flash');
  [0, 1].forEach((index) => {
    const curve = new AnimationFloatCurve();
    keys(curve, index === 0 ? [[0, 1], [1, 0], [2, 1]] : [[0, 0], [1, 1], [2, 0]]);
    // (entityPath, type, componentIndex, propertyPath, curve): index 0 is the red light, 1 the blue one.
    clip.addCurveBinding('', PointLight, index, 'color.a', curve);
  });
  playClip(engine, holder, clip);
  say('addCurveBinding("", PointLight, 0 | 1, "color.a", curve)');
  return stage.dispose;
};

export default mount;
