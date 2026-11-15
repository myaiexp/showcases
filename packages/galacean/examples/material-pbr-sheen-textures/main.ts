// PBRMaterial.sheenColorTexture and sheenRoughnessTexture vary the sheen by UV
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';
import { pixelTexture, rampMask } from '../../shared/mat-maps.ts';

const BANDS: [number, number, number][] = [[255, 60, 60], [255, 200, 40], [60, 255, 90], [40, 220, 255], [80, 90, 255], [255, 70, 220]];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'Left: sheenColorTexture (bands). Right: sheenRoughnessTexture (ramp).' });
  caption(stage, 'sheenColorTexture | sheenRoughnessTexture');
  const bands = pixelTexture(engine, (u) => [...BANDS[Math.floor(u * 6)]!, 255], { srgb: true });
  const ramp = rampMask(engine);
  const balls = ballRow(root, engine, 2, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.08, 0.08, 0.14]), 1);
    m.metallic = 0;
    m.roughness = 0.9;
    m.sheenColor.set(1, 1, 1, 1);
    if (i === 0) m.sheenColorTexture = bands;
    else m.sheenRoughnessTexture = ramp;
    return m;
  }, { gap: 1 });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 20 * dt, 0)));
  return stage.dispose;
};

export default mount;
