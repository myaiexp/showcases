// PBRMaterial.alphaCutoff discards fragments whose alpha is below the cutoff
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { backdrop, ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';
import { pixelTexture } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'alphaCutoff 0, 0.25, 0.5, 0.75 on a radial-alpha dot texture.' });
  const say = caption(stage, 'alphaCutoff 0, 0.25, 0.5, 0.75');
  backdrop(root, engine);
  const dots = pixelTexture(engine, (u, v) => {
    const r = Math.hypot(((u * 4) % 1) - 0.5, ((v * 4) % 1) - 0.5) * 2;
    return [255, 190, 90, Math.round(Math.max(0, 1 - r) * 255)];
  }, { srgb: true });
  const cuts = [0, 0.25, 0.5, 0.75];
  const balls = ballRow(root, engine, 4, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([1, 1, 1]), 1);
    m.baseTexture = dots;
    m.metallic = 0;
    m.roughness = 0.5;
    m.alphaCutoff = cuts[i]!;
    return m;
  });
  const shift = (v: number): void => {
    balls.forEach((b, i) => (b.material.alphaCutoff = Math.min(0.98, cuts[i]! * v)));
    say(`alphaCutoff x ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 5, (t) => shift(0.2 + 1.3 * t));
  else slider(stage.bar, 'cutoff scale', 0, 1.3, 0.01, 1, shift);
  return stage.dispose;
};

export default mount;
