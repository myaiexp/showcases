// PBRMaterial.anisotropyRotation turns the stretch direction, in degrees
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'anisotropy 1; rotation runs 0, 45, 90, 135 degrees along the row.', sway: 1 });
  const say = caption(stage, 'anisotropyRotation 0, 45, 90, 135');
  const balls = ballRow(root, engine, 4, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.9, 0.75, 0.5]), 1);
    m.metallic = 1;
    m.roughness = 0.3;
    m.anisotropy = 1;
    m.anisotropyRotation = t * 135;
    return m;
  });
  if (stage.preview) tick(root, (_dt, t) => balls.forEach((b, i) => (b.material.anisotropyRotation = (t * 45 + i * 45) % 180)));
  else {
    slider(stage.bar, 'rotation offset', 0, 180, 1, 0, (v) => {
      balls.forEach((b, i) => (b.material.anisotropyRotation = i * 45 + v));
      say(`anisotropyRotation ${[0, 1, 2, 3].map((i) => i * 45 + v).join(', ')}`);
    });
  }
  return stage.dispose;
};

export default mount;
