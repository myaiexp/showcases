// BlinnPhongMaterial.tilingOffset on a lit surface
import { BlinnPhongMaterial, PrimitiveMesh, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { matDemo } from '../../shared/mat-demo.ts';
import { bricks, canvasTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { sway: 0, camera: [0, 4.5, 5], hint: 'tilingOffset = (scale, scale, offset, offset).' });
  const say = caption(stage);
  const m = new BlinnPhongMaterial(engine);
  m.baseTexture = canvasTexture(engine, bricks(), { size: 256 });
  m.shininess = 20;
  add(root, PrimitiveMesh.createPlane(engine, 6, 6), m);
  const set = (scale: number, offset: number): void => {
    m.tilingOffset = new Vector4(scale, scale, offset, offset);
    say(`tilingOffset (${scale.toFixed(1)}, ${scale.toFixed(1)}, ${offset.toFixed(2)}, ${offset.toFixed(2)})`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(2 + Math.sin(t * 0.6), (t * 0.1) % 1));
  else {
    let scale = 2;
    let offset = 0;
    slider(stage.bar, 'tiling', 0.5, 6, 0.1, scale, (v) => set((scale = v), offset));
    slider(stage.bar, 'offset', 0, 1, 0.01, offset, (v) => set(scale, (offset = v)));
    set(scale, offset);
  }
  return stage.dispose;
};

export default mount;
