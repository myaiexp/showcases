// BoundingSphere.fromPoints wraps a point cloud; fromBox wraps a box
import { BoundingBox, BoundingSphere, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { lit, marker, PALETTE, tick, unlit, wireBox, wireSphere } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Amber is the bounding sphere; the points or the box are its input.' });
  const { engine, root } = stage;
  lit(stage, [4, 3.5, 8]);
  const sphereLines = wireSphere(root, unlit(engine, PALETTE.amber), 0.035);
  const boxLines = wireBox(root, unlit(engine, PALETTE.cyan), 0.03);
  const dots = Array.from({ length: 10 }, () => marker(root, unlit(engine, PALETTE.white), 0.16));
  const info = panel(stage);
  const sphere = new BoundingSphere();
  const box = new BoundingBox();
  const points = Array.from({ length: 10 }, () => new Vector3());
  let mode: 'fromPoints' | 'fromBox' = 'fromPoints';
  let auto = true;
  if (!stage.preview) select(stage.bar, 'method', ['fromPoints', 'fromBox'], (m) => ((auto = false), (mode = m)));
  tick(root, (_dt, t) => {
    if (auto) mode = Math.floor(t / 4) % 2 === 0 ? 'fromPoints' : 'fromBox';
    for (const d of dots) d.entity.isActive = mode === 'fromPoints';
    boxLines.entity.isActive = mode === 'fromBox';
    if (mode === 'fromPoints') {
      points.forEach((p, i) => {
        p.set(Math.sin(i * 2.1 + t * 0.5) * 1.8, Math.cos(i * 1.3 + t * 0.3) * 1.2, Math.sin(i * 3.7) * 1.4);
        dots[i]!.set(p);
      });
      BoundingSphere.fromPoints(points, sphere);
    } else {
      const k = 1 + 0.4 * Math.sin(t * 1.2);
      box.min.set(-1.4 * k, -0.8, -1);
      box.max.set(1.4 * k, 0.8, 1);
      boxLines.set(box.min, box.max);
      BoundingSphere.fromBox(box, sphere);
    }
    sphereLines.set(sphere.center, sphere.radius);
    info.text(`BoundingSphere.${mode}(...)\ncenter ${sphere.center.x.toFixed(2)}, ${sphere.center.y.toFixed(2)}, ${sphere.center.z.toFixed(2)}\nradius ${sphere.radius.toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;
