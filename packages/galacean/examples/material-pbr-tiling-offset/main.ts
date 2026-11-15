// PBRMaterial.tilingOffset repeats and scrolls the main textures
import { PBRMaterial, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, quadMesh, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { matDemo } from '../../shared/mat-demo.ts';
import { canvasTexture, uvGrid } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { sway: 1, hint: 'tilingOffset = (n, n, offset, 0): tiling 1, 2, 3, 4 along the row.' });
  const say = caption(stage, 'tilingOffset (n, n, offsetX, 0)');
  const texture = canvasTexture(engine, uvGrid, { size: 256 });
  const quad = quadMesh(engine, 2, 2);
  const mats = [1, 2, 3, 4].map((n, i) => {
    const m = new PBRMaterial(engine);
    m.baseTexture = texture;
    m.metallic = 0;
    m.roughness = 0.6;
    m.tilingOffset = new Vector4(n, n, 0, 0);
    add(root, quad, m, [(i - 1.5) * 2.3, 0, 0]);
    return m;
  });
  const slide = (x: number): void => {
    mats.forEach((m, i) => (m.tilingOffset = new Vector4(i + 1, i + 1, x, 0)));
    say(`tilingOffset (n, n, ${x.toFixed(2)}, 0)`);
  };
  if (stage.preview) tick(root, (_dt, t) => slide((t * 0.2) % 1));
  else slider(stage.bar, 'offset x', 0, 1, 0.01, 0, slide);
  return stage.dispose;
};

export default mount;
