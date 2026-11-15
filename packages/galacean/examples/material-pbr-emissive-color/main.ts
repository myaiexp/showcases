// PBRMaterial.emissiveColor shows colour with no lighting at all
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';

const COLORS: [number, number, number][] = [[1, 0.2, 0.2], [1, 0.7, 0.1], [0.2, 1, 0.4], [0.2, 0.7, 1], [0.8, 0.3, 1]];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { env: false, light: false, sway: 0, hint: 'No light and no ambient: the colour is all emissiveColor.' });
  caption(stage, 'emissiveColor, no lights');
  const balls = ballRow(root, engine, 5, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(0.02, 0.02, 0.02, 1);
    m.emissiveColor.set(...lin(COLORS[i]!), 1);
    return m;
  });
  if (stage.preview) tick(root, (_dt, t) => balls.forEach((b, i) => b.material.emissiveColor.set(...lin(COLORS[i]!).map((c) => c * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2 + i)))) as [number, number, number], 1)));
  else color(stage.bar, 'first sphere', COLORS[0]!, (c) => balls[0]!.material.emissiveColor.set(...lin(c), 1));
  return stage.dispose;
};

export default mount;
