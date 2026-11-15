// KHR_texture_transform: scale and offset in the glTF set the material's tilingOffset
import type { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { NOOP, materialsOf, pngBytes, rig } from '../../shared/model-kit.ts';
import { texturedGlb } from '../../shared/model-gltf.ts';
import { uvGrid } from '../../shared/textures.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const png = await pngBytes(uvGrid, 128);
  // The block under baseColorTexture.extensions: tiles the image 3 x 2 and shifts it a quarter.
  const r = await rig(el, ctx, () => texturedGlb(png, { scale: [3, 2], offset: [0.25, 0] }), { camera: [0, 1.8, 4.5], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, model } = r;
  const material = materialsOf(model)[0] as PBRMaterial;
  const info = panel(stage);
  let scroll = 0;
  let auto = true;
  tick(model, (dt) => {
    model.transform.rotate(0, 20 * dt, 0);
    if (auto) material.tilingOffset.z += dt * 0.15;
    const t = material.tilingOffset;
    info.text(`tilingOffset (${t.x}, ${t.y}, ${t.z.toFixed(2)}, ${t.w})\nscale [3, 2], offset [0.25, 0] from the file`);
  });
  if (!stage.preview) slider(stage.bar, 'u offset', 0, 1, 0.01, scroll, (v) => ((auto = false), (scroll = v), (material.tilingOffset.z = v)));
  return stage.dispose;
};

export default mount;
