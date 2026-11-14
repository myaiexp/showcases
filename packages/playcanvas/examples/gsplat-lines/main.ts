// GsplatLines: gradient lines, arrows and a wireframe box made of splats
import * as pc from 'playcanvas';
// @ts-expect-error untyped module
import { GSplatLines } from 'playcanvas/scripts/esm/gsplat/gsplat-lines.mjs';
import type { Mount } from '@/types.ts';
import { createSplatScene, hue, rng } from '../../shared/gsplat.ts';
import { createPanel } from '../../shared/panel.ts';

interface Lines {
  addLine(a: pc.Vec3, b: pc.Vec3, ca: pc.Color, cb: pc.Color, thickness: number): number;
  addLineSimple(a: pc.Vec3, b: pc.Vec3, c: pc.Color, thickness: number): number;
  addArrow(a: pc.Vec3, b: pc.Vec3, c: pc.Color, thickness: number, headSize?: number): number;
  addAABB(min: pc.Vec3, max: pc.Vec3, c: pc.Color, thickness: number): number;
  removePrimitive(handle: number): boolean;
  clear(): void;
  readonly primitiveCount: number;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createSplatScene(el, ctx, { distance: 7, pitch: -25, autoRotate: 18 });
  const { app } = scene;

  const entity = new pc.Entity('lines');
  app.root.addChild(entity);
  entity.addComponent('script');
  const lines = entity.script!.create(GSplatLines) as unknown as Lines;

  const v = (x: number, y: number, z: number): pc.Vec3 => new pc.Vec3(x, y, z);
  const c = (r: number, g: number, b: number): pc.Color => new pc.Color(r, g, b);

  // Axes as arrows, a box as an AABB, and one gradient line across the middle.
  lines.addArrow(v(0, 0, 0), v(2.5, 0, 0), c(1, 0.3, 0.3), 0.03, 0.2);
  lines.addArrow(v(0, 0, 0), v(0, 2.5, 0), c(0.3, 1, 0.4), 0.03, 0.2);
  lines.addArrow(v(0, 0, 0), v(0, 0, 2.5), c(0.4, 0.55, 1), 0.03, 0.2);
  lines.addAABB(v(-1.2, -1.2, -1.2), v(1.2, 1.2, 1.2), c(1, 0.85, 0.3), 0.02);
  lines.addLine(v(-1.2, -1.2, -1.2), v(1.2, 1.2, 1.2), c(1, 0.2, 0.6), c(0.2, 0.9, 1), 0.04);

  if (ctx.preview) {
    // The card keeps adding and removing a line: the script rebuilds when primitives change.
    let t = 0;
    let handle = -1;
    const r = rng(4);
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 0.8) {
        t = 0;
        if (handle >= 0) lines.removePrimitive(handle);
        const a = v(r() * 2.4 - 1.2, r() * 2.4 - 1.2, r() * 2.4 - 1.2);
        const b = v(r() * 2.4 - 1.2, r() * 2.4 - 1.2, r() * 2.4 - 1.2);
        handle = lines.addLineSimple(a, b, c(...hue(r())), 0.035);
      }
    });
  } else {
    const handles: number[] = [];
    const r = rng(9);
    const panel = createPanel(el);
    const count = panel.readout();
    const show = (): void => void (count.textContent = `primitiveCount ${lines.primitiveCount}`);
    panel.button('Add a line', () => {
      const a = v(r() * 4 - 2, r() * 4 - 2, r() * 4 - 2);
      const b = v(r() * 4 - 2, r() * 4 - 2, r() * 4 - 2);
      const kind = handles.length % 3;
      const colour = c(...hue(r()));
      handles.push(kind === 0 ? lines.addLineSimple(a, b, colour, 0.03) : kind === 1 ? lines.addArrow(a, b, colour, 0.03) : lines.addLine(a, b, colour, c(1, 1, 1), 0.03));
      show();
    });
    panel.button('Remove the last one', () => {
      const h = handles.pop();
      if (h !== undefined) lines.removePrimitive(h);
      show();
    });
    panel.button('clear()', () => {
      handles.length = 0;
      lines.clear();
      show();
    });
    show();
  }

  return () => scene.dispose();
};

export default mount;
