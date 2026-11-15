// PBRMaterial.anisotropyTexture: direction in RG, strength in B
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';
import { swirlDirections } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'Left: anisotropy 1 alone. Right: with anisotropyTexture (RG direction, B strength).' });
  caption(stage, 'no texture | anisotropyTexture');
  const map = swirlDirections(engine);
  const balls = ballRow(root, engine, 2, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.8, 0.82, 0.9]), 1);
    m.metallic = 1;
    m.roughness = 0.3;
    m.anisotropy = 1;
    if (i === 1) m.anisotropyTexture = map;
    return m;
  }, { gap: 1 });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 25 * dt, 0)));
  return stage.dispose;
};

export default mount;
