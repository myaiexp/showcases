// Rand: the same seed draws the same points; reset() replays the sequence
import { PrimitiveMesh, Rand, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, PALETTE, solid, tick, unlit } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const COUNT = 70;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Left and middle share a seed; the right uses another. Points arrive one per step; reset() starts over.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 5.5, 5.5], [0, 0, 0]);
  const tag = labels(stage, camera);
  const dot = PrimitiveMesh.createSphere(engine, 0.08, 8);
  const fields = [
    { x: -3.6, seed: [0, 0xf3857f6f] as const, material: unlit(engine, PALETTE.amber), label: 'new Rand(0, 0xf3857f6f)' },
    { x: 0, seed: [0, 0xf3857f6f] as const, material: unlit(engine, PALETTE.cyan), label: 'same seed' },
    { x: 3.6, seed: [0, 0x96aa4de3] as const, material: unlit(engine, PALETTE.violet), label: 'new Rand(0, 0x96aa4de3)' },
  ].map((f) => ({
    ...f,
    rand: new Rand(f.seed[0], f.seed[1]),
    dots: Array.from({ length: COUNT }, () => solid(root, dot, f.material)),
    tag: tag.add(f.label, '#cfd6e4'),
  }));
  const info = panel(stage);
  let shown = 0;
  const redraw = (): void => {
    for (const f of fields) {
      f.rand.reset(f.seed[0], f.seed[1]);
      f.dots.forEach((d, i) => {
        const x = f.rand.random() * 3 - 1.5;
        const z = f.rand.random() * 3 - 1.5;
        d.transform.setPosition(f.x + x, 0, z);
        d.isActive = i < shown;
      });
    }
  };
  redraw();
  if (!stage.preview) button(stage.bar, 'reset(seed0, seed1)', () => ((shown = 0), redraw()));
  let acc = 0;
  tick(root, (dt) => {
    acc += dt;
    if (acc > 0.05) {
      acc = 0;
      shown++;
      if (shown > COUNT + 12) shown = 0;
      fields.forEach((f) => f.dots.forEach((d, i) => (d.isActive = i < shown)));
    }
    fields.forEach((f) => f.tag.at(new Vector3(f.x, 0, -1.9)));
    const probe = new Rand(0, 0xf3857f6f);
    info.text(`points drawn ${Math.min(shown, COUNT)} of ${COUNT}\nnew Rand(0, 0xf3857f6f).randomInt32() -> ${probe.randomInt32()}\n                         .random()     -> ${probe.random().toFixed(6)}`);
  });
  return stage.dispose;
};

export default mount;
