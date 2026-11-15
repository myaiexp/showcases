// getColliderLayerCollision for every pair of four layers, switched at will
import { Layer } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rain, rnd, world } from '../../shared/phys-kit.ts';

const LAYERS = [Layer.Layer1, Layer.Layer2, Layer.Layer3, Layer.Layer4];
const COLORS = [PALETTE.red, PALETTE.green, PALETTE.blue, PALETTE.amber];
const SCRIPT: [number, number][][] = [[], [[0, 1]], [[0, 1], [2, 3]], [[0, 2], [1, 3]], [[0, 1], [0, 2], [0, 3]]];

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 3, 10], target: [0, 2.2, 0], hint: 'Layers 1 to 4; the floor is on Layer0 and keeps colliding with everything.' });
  const { physics } = w;
  const reset = (): void => {
    for (const a of LAYERS) for (const b of LAYERS) physics.setColliderLayerCollision(a, b, true);
  };
  reset();
  w.stage.own(reset);
  const table = panel(w.stage, 'tr');
  tick(w.root, (_dt, t) => {
    if (w.stage.preview) {
      const step = Math.floor(t / 4) % SCRIPT.length;
      if (Math.floor((t - 0.016) / 4) % SCRIPT.length !== step || t < 0.1) {
        reset();
        for (const [a, b] of SCRIPT[step]!) physics.setColliderLayerCollision(LAYERS[a]!, LAYERS[b]!, false);
      }
    }
    const rows = LAYERS.map((a, i) => `L${i + 1} ` + LAYERS.map((b) => (physics.getColliderLayerCollision(a, b) ? '#' : '.')).join(' '));
    table.text(`    L1 L2 L3 L4\n${rows.map((r) => r.replace(/ /g, ' ')).join('\n')}\n# collide   . ignore`);
  });
  rain(w, 0.4, 14, (n, parent) => {
    const i = n % 4;
    const b = ball(parent, [rnd(n) * 0.5, 6, 0], 0.45, COLORS[i]!);
    b.body.collisionLayer = LAYERS[i]!;
    return b.entity;
  });
  if (!w.stage.preview) {
    for (const [a, b] of [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]] as const) {
      checkbox(w.stage.bar, `L${a + 1}-L${b + 1}`, true, (v) => physics.setColliderLayerCollision(LAYERS[a]!, LAYERS[b]!, v));
    }
  }
  return w.stage.dispose;
};

export default mount;
