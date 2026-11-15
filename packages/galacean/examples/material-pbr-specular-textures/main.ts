// PBRMaterial.specularIntensityTexture and specularColorTexture vary specular by UV
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';
import { pixelTexture } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'Left to right: none, specularIntensityTexture (alpha), specularColorTexture (rgb).' });
  caption(stage, 'none | intensity texture | colour texture');
  const intensity = pixelTexture(engine, (_u, v) => [255, 255, 255, Math.floor(v * 8) % 2 ? 255 : 0]);
  const tint = pixelTexture(engine, (u) => {
    const band = Math.floor(u * 6);
    return [[255, 60, 60], [255, 200, 40], [60, 255, 90], [40, 220, 255], [80, 90, 255], [255, 70, 220]][band]!.concat(255) as [number, number, number, number];
  }, { srgb: true });
  const balls = ballRow(root, engine, 3, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.06, 0.07, 0.1]), 1);
    m.metallic = 0;
    m.roughness = 0.12;
    if (i === 1) m.specularIntensityTexture = intensity;
    if (i === 2) m.specularColorTexture = tint;
    return m;
  }, { gap: 0.8 });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 20 * dt, 0)));
  return stage.dispose;
};

export default mount;
