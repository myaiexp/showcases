// A cube moved, turned and stretched with the Transform setters, read back through its properties
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { lit, PALETTE, phong, solid, tick, v3 } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Nine sliders drive setPosition, setRotation and setScale.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 9]);
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1, 1, 1), phong(engine, PALETTE.amber));
  const { transform } = cube;
  const info = panel(stage);

  const v = { px: 0, py: 0, pz: 0, rx: 20, ry: 30, rz: 0, sx: 1, sy: 1, sz: 1 };
  const apply = (): void => {
    transform.setPosition(v.px, v.py, v.pz);
    transform.setRotation(v.rx, v.ry, v.rz);
    transform.setScale(v.sx, v.sy, v.sz);
  };
  apply();
  if (!stage.preview) {
    type Key = keyof typeof v;
    const add = (key: Key, min: number, max: number, step: number): void => {
      slider(stage.bar, key, min, max, step, v[key], (x) => {
        v[key] = x;
        apply();
      });
    };
    for (const k of ['px', 'py', 'pz'] as const) add(k, -3, 3, 0.1);
    for (const k of ['rx', 'ry', 'rz'] as const) add(k, -180, 180, 1);
    for (const k of ['sx', 'sy', 'sz'] as const) add(k, 0.2, 2.5, 0.05);
  }
  tick(root, (_dt, t) => {
    if (stage.preview) {
      v.px = Math.sin(t) * 2;
      v.py = Math.cos(t * 1.3) * 0.8;
      v.rx = t * 40;
      v.ry = t * 25;
      v.sx = 1 + 0.4 * Math.sin(t * 2);
      v.sy = 2 - v.sx;
      apply();
    }
    info.text(`position ${v3(transform.position)}\nrotation ${v3(transform.rotation, 0)}\nscale    ${v3(transform.scale)}`);
  });
  return stage.dispose;
};

export default mount;
