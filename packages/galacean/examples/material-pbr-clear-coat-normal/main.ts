// PBRMaterial.clearCoatNormalTexture: the coat gets its own normal map
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';
import { domeNormals, ridgeNormals } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'normalTexture only | clearCoatNormalTexture only | both.' });
  caption(stage, 'base normal | coat normal | both');
  const domes = domeNormals(engine, 4);
  const ridges = ridgeNormals(engine, 10);
  const balls = ballRow(root, engine, 3, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.15, 0.4, 0.2]), 1);
    m.metallic = 0.5;
    m.roughness = 0.5;
    m.clearCoat = 1;
    m.clearCoatRoughness = 0.04;
    if (i !== 1) m.normalTexture = domes;
    if (i !== 0) m.clearCoatNormalTexture = i === 1 ? domes : ridges;
    return m;
  }, { gap: 0.8 });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 20 * dt, 0)));
  return stage.dispose;
};

export default mount;
