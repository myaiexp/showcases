// SpotLight: angle, penumbra, distance, position and aim
import { PrimitiveMesh, SpotLight } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, floor, spin, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 5, 8], target: [0, 0, 0], light: false });
  const say = caption(stage);
  floor(root, engine, -1);
  [-2.6, 0, 2.6].forEach((x, i) => spin(add(root, [PrimitiveMesh.createSphere(engine, 0.9), PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), PrimitiveMesh.createTorus(engine, 0.8, 0.3)][i]!, blinn(engine, [0.9, 0.9, 0.9], 50), [x, 0, 0]).entity, [0, 25, 0]));
  const lamp = root.createChild('spot');
  lamp.transform.setPosition(0, 6, 3);
  const spot = lamp.addComponent(SpotLight);
  spot.angle = Math.PI / 6;
  spot.penumbra = Math.PI / 12;
  spot.distance = 16;
  spot.color.set(1, 0.95, 0.85, 1);
  let manual = false;
  tick(lamp, (_dt, t) => {
    if (!manual) lamp.transform.setRotation(-65 + 8 * Math.sin(t * 0.9), 25 * Math.sin(t * 0.6), 0);
    say(`angle ${((spot.angle * 180) / Math.PI).toFixed(0)}°  penumbra ${((spot.penumbra * 180) / Math.PI).toFixed(0)}°`);
  });
  if (!stage.preview) {
    slider(stage.bar, 'angle', 5, 80, 1, 30, (v) => (spot.angle = (v * Math.PI) / 180), (v) => `${v}°`);
    slider(stage.bar, 'penumbra', 0, 40, 1, 15, (v) => (spot.penumbra = (v * Math.PI) / 180), (v) => `${v}°`);
    slider(stage.bar, 'distance', 3, 25, 0.5, 16, (v) => (spot.distance = v));
    slider(stage.bar, 'aim', -40, 40, 1, 0, (v) => ((manual = true), lamp.transform.setRotation(-65, v, 0)));
  }
  return stage.dispose;
};

export default mount;
