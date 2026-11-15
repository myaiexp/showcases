// PBRMaterial.baseColor multiplies baseTexture to give the final base colour
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { canvasTexture, uvGrid } from '../../shared/textures.ts';

const TINTS: [number, number, number][] = [[1, 1, 1], [1, 0.4, 0.4], [0.4, 1, 0.5], [0.45, 0.6, 1], [1, 0.85, 0.3]];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'baseColor x baseTexture = final base colour.' });
  caption(stage, 'baseColor x baseTexture');
  const texture = canvasTexture(engine, uvGrid, { size: 256 });
  const balls = ballRow(root, engine, 5, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseTexture = texture;
    m.baseColor.set(...lin(TINTS[i]!), 1);
    m.metallic = 0;
    m.roughness = 0.5;
    return m;
  });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 20 * dt, 0)));
  if (!stage.preview) {
    color(stage.bar, 'tint all', [1, 1, 1], (c) => balls.forEach((b) => b.material.baseColor.set(...lin(c), 1)));
  }
  return stage.dispose;
};

export default mount;
