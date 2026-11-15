// PBRMaterial.sheenColor adds a fabric-like glow at grazing angles
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';

const COLORS: [number, number, number][] = [[0, 0, 0], [1, 0.3, 0.3], [0.3, 1, 0.5], [0.4, 0.5, 1], [1, 1, 1]];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'sheenColor: none, red, green, blue, white.' });
  caption(stage, 'sheenColor');
  const balls = ballRow(root, engine, 5, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.12, 0.06, 0.2]), 1);
    m.metallic = 0;
    m.roughness = 0.9;
    m.sheenColor.set(...lin(COLORS[i]!), 1);
    m.sheenRoughness = 0.4;
    return m;
  });
  if (!stage.preview) color(stage.bar, 'sheenColor (all)', [1, 1, 1], (c) => balls.forEach((b) => b.material.sheenColor.set(...lin(c), 1)));
  return stage.dispose;
};

export default mount;
