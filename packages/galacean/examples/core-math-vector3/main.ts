// Vector3 arithmetic as arrows: static add, instance add, length, normalize
import { Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { arrow, lit, PALETTE, tick, unlit } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'v2 turns around the Y axis. Adjust v1 with the sliders.' });
  const { engine, root } = stage;
  const camera = lit(stage, [3.5, 4, 9], [0.5, 1, 0]);
  const tag = labels(stage, camera);
  const mk = (rgb: readonly [number, number, number], width = 0.05) => arrow(root, unlit(engine, rgb), width);
  const a1 = mk(PALETTE.red);
  const a2 = mk(PALETTE.blue);
  const aSum = mk(PALETTE.amber, 0.07);
  const aUnit = mk(PALETTE.white, 0.035);
  const aShift = mk(PALETTE.blue, 0.015);
  const l1 = tag.add('v1', '#ee5a5a');
  const l2 = tag.add('v2', '#6b8eff');
  const l3 = tag.add('sum', '#ffc247');
  const info = panel(stage, 'tl');
  const v1 = new Vector3(1, 2, 2);
  const v2 = new Vector3();
  const out = new Vector3();
  const unit = new Vector3();
  const origin = new Vector3();
  if (!stage.preview) {
    for (const k of ['x', 'y', 'z'] as const) slider(stage.bar, `v1.${k}`, -3, 3, 0.1, v1[k], (v) => (v1[k] = v));
  }
  tick(root, (_dt, t) => {
    if (stage.preview) v1.set(1.2 + Math.sin(t * 0.6), 2 + Math.cos(t * 0.5) * 0.6, 1.4);
    v2.set(Math.cos(t * 0.8) * 2.2, 0.8, Math.sin(t * 0.8) * 2.2);
    Vector3.add(v1, v2, out); // static: v1 and v2 stay as they are
    const instance = v1.clone().add(v2); // instance: changes the vector it is called on
    unit.copyFrom(v1).normalize();
    a1.set(origin, v1);
    a2.set(origin, v2);
    aShift.set(v1, v2);
    aSum.set(origin, out);
    aUnit.set(origin, unit);
    l1.at(v1);
    l2.at(v2);
    l3.at(out);
    info.text(`v1.length()  ${v1.length().toFixed(2)}\nstatic add   ${out.x.toFixed(2)}, ${out.y.toFixed(2)}, ${out.z.toFixed(2)}\ninstance add ${instance.x.toFixed(2)}, ${instance.y.toFixed(2)}, ${instance.z.toFixed(2)}\nnormalized   length ${unit.length().toFixed(2)} (white arrow)`);
  });
  return stage.dispose;
};

export default mount;
