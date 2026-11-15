// rotateByAxis turns a cube around an axis you choose, drawn as an arrow
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { arrow, lit, PALETTE, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Aim the axis with the sliders; the cube turns around it every frame.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 8]);
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), phong(engine, PALETTE.blue));
  cube.transform.setRotation(15, 25, 0);
  const shaft = arrow(root, unlit(engine, PALETTE.amber));
  const axis = new Vector3(1, 1, 0);
  let relative = false;
  const info = panel(stage);
  const origin = new Vector3();
  const tip = new Vector3();
  if (!stage.preview) {
    slider(stage.bar, 'x', -1, 1, 0.05, axis.x, (v) => (axis.x = v));
    slider(stage.bar, 'y', -1, 1, 0.05, axis.y, (v) => (axis.y = v));
    slider(stage.bar, 'z', -1, 1, 0.05, axis.z, (v) => (axis.z = v));
    checkbox(stage.bar, 'relativeToLocal', false, (v) => (relative = v));
  }
  tick(root, (dt, t) => {
    if (stage.preview) axis.set(Math.sin(t * 0.5), Math.cos(t * 0.35), 0.4);
    if (axis.length() < 0.01) return;
    const unit = axis.clone().normalize();
    cube.transform.rotateByAxis(unit, 120 * dt, relative);
    shaft.set(origin, tip.copyFrom(unit).scale(2.6));
    info.text(`axis ${unit.x.toFixed(2)}, ${unit.y.toFixed(2)}, ${unit.z.toFixed(2)}\nrotateByAxis(axis, ${(120 * dt).toFixed(1)}, ${relative})`);
  });
  return stage.dispose;
};

export default mount;
