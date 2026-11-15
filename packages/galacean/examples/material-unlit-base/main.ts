// UnlitMaterial.baseColor x baseTexture, drawn flat whatever the lights do
import { PrimitiveMesh, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { matDemo } from '../../shared/mat-demo.ts';
import { bricks, canvasTexture } from '../../shared/textures.ts';

const TINTS: [number, number, number][] = [[1, 1, 1], [1, 0.5, 0.5], [0.5, 1, 0.6], [0.5, 0.7, 1], [1, 0.9, 0.4]];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { env: false, sway: 0, hint: 'baseColor x baseTexture, five tints.' });
  caption(stage, 'UnlitMaterial: baseColor x baseTexture');
  const texture = canvasTexture(engine, bricks(), { size: 256 });
  const mesh = PrimitiveMesh.createCuboid(engine, 1.5, 1.5, 1.5);
  const mats = TINTS.map((tint, i) => {
    const m = new UnlitMaterial(engine);
    m.baseTexture = texture;
    m.baseColor.set(...lin(tint), 1);
    const { entity } = add(root, mesh, m, [(i - 2) * 2.1, 0, 0]);
    tick(entity, (dt) => entity.transform.rotate(10 * dt, 30 * dt, 0));
    return m;
  });
  if (!stage.preview) color(stage.bar, 'tint all', [1, 1, 1], (c) => mats.forEach((m) => m.baseColor.set(...lin(c), 1)));
  return stage.dispose;
};

export default mount;
