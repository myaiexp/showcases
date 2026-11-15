// SpotLight.penumbra softens the edge of the cone
import { PrimitiveMesh, SpotLight } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 7], target: [0, 0, 0], light: false });
  const say = caption(stage);
  add(root, PrimitiveMesh.createPlane(engine, 14, 9, 40, 40), blinn(engine, [0.85, 0.85, 0.85], 10), [0, 0, 0], 'wall').entity.transform.setRotation(90, 0, 0);
  const lamp = root.createChild('spot');
  lamp.transform.setPosition(0, 0, 6);
  const spot = lamp.addComponent(SpotLight);
  spot.angle = Math.PI / 5;
  spot.distance = 20;
  const apply = (v: number): void => {
    spot.penumbra = v;
    say(`angle 36°  penumbra ${((v * 180) / Math.PI).toFixed(0)}°`);
  };
  if (stage.preview) tick(camera.entity, (_dt, t) => apply((Math.PI / 5) * (0.5 + 0.5 * Math.sin(t * 0.8))));
  else {
    apply(0.2);
    slider(stage.bar, 'penumbra', 0, 36, 1, 11, (v) => apply((v * Math.PI) / 180), (v) => `${v}°`);
  }
  return stage.dispose;
};

export default mount;
