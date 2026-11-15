// PBRMaterial.specularColor tints the specular reflection of a non-metal
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';

const COLORS: [number, number, number][] = [[1, 1, 1], [1, 0.2, 0.2], [0.2, 1, 0.3], [0.3, 0.4, 1], [1, 0.8, 0.2]];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'specularColor: white, red, green, blue, gold.' });
  caption(stage, 'specularColor');
  const balls = ballRow(root, engine, 5, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.08, 0.08, 0.1]), 1);
    m.metallic = 0;
    m.roughness = 0.15;
    m.specularColor.set(...lin(COLORS[i]!), 1);
    return m;
  });
  if (!stage.preview) color(stage.bar, 'specularColor (all)', [1, 1, 1], (c) => balls.forEach((b) => b.material.specularColor.set(...lin(c), 1)));
  return stage.dispose;
};

export default mount;
