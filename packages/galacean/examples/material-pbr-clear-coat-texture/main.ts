// PBRMaterial.clearCoatTexture and clearCoatRoughnessTexture vary the coat by UV
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';
import { rampMask, stripeMask } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'Left: clearCoatTexture (stripes). Right: clearCoatRoughnessTexture (ramp).' });
  caption(stage, 'clearCoatTexture | clearCoatRoughnessTexture');
  const stripes = stripeMask(engine, 6, false);
  const ramp = rampMask(engine);
  const balls = ballRow(root, engine, 2, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.7, 0.15, 0.1]), 1);
    m.metallic = 0.7;
    m.roughness = 0.65;
    m.clearCoat = 1;
    if (i === 0) {
      m.clearCoatTexture = stripes;
      m.clearCoatRoughness = 0;
    } else {
      m.clearCoatRoughness = 1;
      m.clearCoatRoughnessTexture = ramp;
    }
    return m;
  }, { gap: 1 });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 20 * dt, 0)));
  return stage.dispose;
};

export default mount;
