// BoundingBox: fromCenterAndExtent, fromPoints, fromSphere, transform and merge, drawn as wireframes
import { BoundingBox, BoundingSphere, Matrix, Quaternion, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { lit, marker, PALETTE, tick, unlit, wireBox, wireSphere } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['fromCenterAndExtent', 'fromPoints', 'fromSphere', 'transform', 'merge'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Amber is the result box, cyan the input.' });
  const { engine, root } = stage;
  lit(stage, [4, 3.5, 8]);
  const result = wireBox(root, unlit(engine, PALETTE.amber), 0.035);
  const input = wireBox(root, unlit(engine, PALETTE.cyan), 0.025);
  const input2 = wireBox(root, unlit(engine, PALETTE.cyan), 0.025);
  const ball = wireSphere(root, unlit(engine, PALETTE.cyan), 0.02);
  const dots = Array.from({ length: 10 }, () => marker(root, unlit(engine, PALETTE.white), 0.14));
  const info = panel(stage);
  const box = new BoundingBox();
  const other = new BoundingBox();
  const src = new BoundingBox(new Vector3(-1, -1, -1), new Vector3(1, 1, 1));
  const sphere = new BoundingSphere(new Vector3(), 1);
  const matrix = new Matrix();
  const turn = new Quaternion();
  const center = new Vector3();
  const extent = new Vector3();
  const points = Array.from({ length: 10 }, () => new Vector3());
  let mode: Mode = MODES[0];
  let auto = true;
  if (!stage.preview) select(stage.bar, 'method', MODES, (m) => ((auto = false), (mode = m)));
  tick(root, (_dt, t) => {
    if (auto) mode = MODES[Math.floor(t / 3) % MODES.length]!;
    const s = Math.sin(t * 1.5);
    for (const m of dots) m.entity.isActive = mode === 'fromPoints';
    ball.entity.isActive = mode === 'fromSphere';
    input.entity.isActive = mode === 'transform' || mode === 'merge';
    input2.entity.isActive = mode === 'merge';
    let code = '';
    if (mode === 'fromCenterAndExtent') {
      BoundingBox.fromCenterAndExtent(center.set(0, 0, 0), extent.set(1.2 + 0.5 * s, 1, 1.4), box);
      code = 'fromCenterAndExtent(center, extent, out)';
    } else if (mode === 'fromPoints') {
      points.forEach((p, i) => {
        p.set(Math.sin(i * 2.3 + t * 0.6) * 2, Math.cos(i * 1.7) * 1.2, Math.sin(i * 3.1) * 1.5);
        dots[i]!.set(p);
      });
      BoundingBox.fromPoints(points, box);
      code = 'fromPoints(points, out)';
    } else if (mode === 'fromSphere') {
      sphere.center.set(Math.sin(t) * 0.5, 0, 0);
      sphere.radius = 1.4 + 0.4 * s;
      ball.set(sphere.center, sphere.radius);
      BoundingBox.fromSphere(sphere, box);
      code = 'fromSphere(sphere, out)';
    } else if (mode === 'transform') {
      Quaternion.rotationEuler(0, 0.4 + t * 0.5, 0, turn);
      Matrix.affineTransformation(center.set(1.2 + 0.4 * s, 1, 1), turn, extent.set(1, 0.5, -1), matrix);
      input.set(src.min, src.max);
      BoundingBox.transform(src, matrix, box);
      code = 'BoundingBox.transform(box, matrix, out)  // the AABB of the turned box';
    } else {
      other.min.set(1 + s, -0.5, -1);
      other.max.set(3 + s, 1.5, 1);
      input.set(src.min, src.max);
      input2.set(other.min, other.max);
      BoundingBox.merge(src, other, box);
      code = 'BoundingBox.merge(box1, box2, out)';
    }
    result.set(box.min, box.max);
    box.getCenter(center);
    box.getExtent(extent);
    info.text(`${code}\ncenter ${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)}\nextent ${extent.x.toFixed(2)}, ${extent.y.toFixed(2)}, ${extent.z.toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;
