// Several point lights and spotlights at once, each its own colour
import { PointLight, PrimitiveMesh, SpotLight } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, demo, floor, tick, unlit } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 6, 9], target: [0, 0, 0], light: false });
  floor(root, engine, 0, 20, blinn(engine, [0.85, 0.85, 0.85], 20));
  add(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), blinn(engine, [0.9, 0.9, 0.9], 40), [0, 0.7, 0]);
  const colors: [number, number, number][] = [[1, 0.2, 0.2], [0.2, 1, 0.3], [0.3, 0.4, 1]];
  colors.forEach((c, i) => {
    const e = root.createChild(`point ${i}`);
    const p = e.addComponent(PointLight);
    p.color.set(...c, 1);
    p.distance = 7;
    add(e, PrimitiveMesh.createSphere(engine, 0.12), unlit(engine, c));
    tick(e, (_dt, t) => e.transform.setPosition(Math.sin(t * 0.7 + i * 2.1) * 4, 1.2, Math.cos(t * 0.7 + i * 2.1) * 4));
  });
  [-1, 1].forEach((side) => {
    const e = root.createChild('spot');
    e.transform.setPosition(side * 5, 5, 0);
    const s = e.addComponent(SpotLight);
    s.angle = Math.PI / 9;
    s.penumbra = Math.PI / 20;
    s.distance = 14;
    s.color.set(1, 0.9, 0.6, 1);
    tick(e, (_dt, t) => e.transform.setRotation(-60 + 15 * Math.sin(t + side), side * -25 + 20 * Math.cos(t * 0.8), 0));
  });
  return stage.dispose;
};

export default mount;
