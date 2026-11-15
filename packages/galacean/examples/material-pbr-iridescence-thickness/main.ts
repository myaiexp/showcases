// PBRMaterial.iridescenceThicknessRange sets the thin-film thickness
import { PBRMaterial, Vector2 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';
import { rampMask, stripeMask } from '../../shared/mat-maps.ts';

const RANGES: [number, number][] = [[100, 150], [100, 400], [300, 800]];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { sway: 3, hint: 'Ranges 100-150, 100-400, 300-800 nm; then a thickness ramp texture; then an iridescence stripe mask.' });
  caption(stage, 'range 100-150 | 100-400 | 300-800 | thickness tex | mask tex');
  const ramp = rampMask(engine);
  const stripes = stripeMask(engine, 6, false);
  const balls = ballRow(root, engine, 5, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.9, 0.9, 0.92]), 1);
    m.metallic = 1;
    m.roughness = 0.1;
    m.iridescence = 1;
    const range = RANGES[i] ?? [100, 800];
    m.iridescenceThicknessRange = new Vector2(range[0], range[1]);
    if (i === 3) m.iridescenceThicknessTexture = ramp;
    if (i === 4) m.iridescenceTexture = stripes;
    return m;
  }, { radius: 0.7, gap: 0.3 });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 20 * dt, 0)));
  return stage.dispose;
};

export default mount;
