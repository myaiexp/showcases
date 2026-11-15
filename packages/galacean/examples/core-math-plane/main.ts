// A Plane from a normal and distance, and from three points
import { Plane, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { arrow, lit, marker, PALETTE, planeSheet, tick, unlit } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The plane is every point p where normal . p + distance = 0, so its centre sits at -distance along the normal.' });
  const { engine, root } = stage;
  lit(stage, [5, 4, 9]);
  const sheet = planeSheet(root, unlit(engine, PALETTE.cyan, 0.35));
  const normalArrow = arrow(root, unlit(engine, PALETTE.amber), 0.05);
  const pointMat = unlit(engine, PALETTE.white);
  const pts = [0, 1, 2].map(() => marker(root, pointMat, 0.2));
  const info = panel(stage);
  const plane = new Plane();
  const normal = new Vector3(0, 1, 0);
  const p = [new Vector3(-2, 1, -1), new Vector3(2, 0.2, -2), new Vector3(0, 1.5, 2)];
  let mode: 'normal + distance' | 'Plane.fromPoints' = 'normal + distance';
  let distance = -1;
  let auto = true;
  if (!stage.preview) {
    select(stage.bar, 'mode', ['normal + distance', 'Plane.fromPoints'], (m) => ((auto = false), (mode = m)));
    slider(stage.bar, 'distance', -3, 3, 0.1, distance, (v) => ((auto = false), (distance = v)));
  }
  tick(root, (_dt, t) => {
    if (auto) {
      mode = Math.floor(t / 4) % 2 === 0 ? 'normal + distance' : 'Plane.fromPoints';
      distance = -1 + Math.sin(t * 1.2);
    }
    if (mode === 'normal + distance') {
      normal.set(Math.sin(t * 0.5) * 0.5, 1, Math.cos(t * 0.4) * 0.4).normalize();
      plane.normal.copyFrom(normal);
      plane.distance = distance;
    } else {
      p[0]!.y = 1 + Math.sin(t) * 0.5;
      Plane.fromPoints(p[0]!, p[1]!, p[2]!, plane);
    }
    pts.forEach((m, i) => {
      m.entity.isActive = mode === 'Plane.fromPoints';
      m.set(p[i]!);
    });
    sheet.set(plane.normal, plane.distance);
    const centre = plane.normal.clone().scale(-plane.distance);
    normalArrow.set(centre, plane.normal.clone().scale(2));
    info.text(`${mode === 'normal + distance' ? 'new Plane(normal, distance)' : 'Plane.fromPoints(p0, p1, p2, plane)'}\nnormal   ${plane.normal.x.toFixed(2)}, ${plane.normal.y.toFixed(2)}, ${plane.normal.z.toFixed(2)}\ndistance ${plane.distance.toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;
