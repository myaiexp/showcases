// scene.shadowDistance and scene.shadowFadeBorder
import { PrimitiveMesh, ShadowType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, caption, demo, floor, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [0, 3, 5], target: [0, 1, -14] });
  const say = caption(stage);
  floor(root, engine, 0, 80, blinn(engine, [0.62, 0.64, 0.7], 6));
  for (let i = 0; i < 14; i++) for (const side of [-1, 1]) add(root, PrimitiveMesh.createCuboid(engine, 0.9, 2.2, 0.9), blinn(engine, [0.9, 0.55, 0.4], 30), [side * 2.4, 1.1, -i * 2.5], 'post');
  light.entity.transform.setRotation(-35, -55, 0);
  light.shadowType = ShadowType.SoftLow;
  const { scene } = stage;
  scene.shadowFadeBorder = 0.4;
  const apply = (d: number, f: number): void => {
    scene.shadowDistance = d;
    scene.shadowFadeBorder = f;
    say(`shadowDistance ${d.toFixed(0)}  shadowFadeBorder ${f.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => apply(18 + 12 * Math.sin(t * 0.7), 0.4));
  else {
    let d = 25;
    let f = 0.4;
    apply(d, f);
    slider(stage.bar, 'shadowDistance', 4, 60, 1, d, (v) => apply((d = v), f));
    slider(stage.bar, 'shadowFadeBorder', 0, 1, 0.01, f, (v) => apply(d, (f = v)));
  }
  return stage.dispose;
};

export default mount;
