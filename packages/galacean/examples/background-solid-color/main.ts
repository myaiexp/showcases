// scene.background.mode = SolidColor and solidColor.set(r, g, b, a)
import { BackgroundMode, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 6] });
  const say = caption(stage);
  const { background } = stage.scene;
  background.mode = BackgroundMode.SolidColor;
  spin(add(root, PrimitiveMesh.createTorus(engine, 1, 0.4, 24, 48), pbr(engine, [0.95, 0.85, 0.7], 0.1, 0.4)).entity, [20, 35, 0]);
  const set = (r: number, g: number, b: number): void => {
    background.solidColor.set(r, g, b, 1);
    say(`solidColor.set(${r.toFixed(2)}, ${g.toFixed(2)}, ${b.toFixed(2)}, 1)`);
  };
  if (stage.preview) {
    tick(camera.entity, (_dt, t) => set(0.1 + 0.08 * Math.sin(t * 0.9), 0.12 + 0.1 * Math.sin(t * 0.9 + 2), 0.2 + 0.12 * Math.sin(t * 0.9 + 4)));
  } else {
    set(0.25, 0.25, 0.25);
    color(stage.bar, 'solidColor', [0.5, 0.5, 0.5], (c) => set(c[0] ** 2.2, c[1] ** 2.2, c[2] ** 2.2));
  }
  return stage.dispose;
};

export default mount;
