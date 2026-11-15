// PBRMaterial.blendMode picks Normal or Additive blending when transparent
import { BlendMode, PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { backdrop, ballRow, matDemo } from '../../shared/mat-demo.ts';
import { steps } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'Left spheres Normal, right spheres Additive; alpha 0.6.' });
  caption(stage, 'BlendMode.Normal | BlendMode.Additive');
  backdrop(root, engine);
  const balls = ballRow(root, engine, 4, (t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.2 + t * 0.6, 0.45, 1 - t * 0.6]), 0.6);
    m.metallic = 0;
    m.roughness = 0.3;
    m.isTransparent = true;
    m.blendMode = i < 2 ? BlendMode.Normal : BlendMode.Additive;
    return m;
  });
  if (stage.preview) steps(root, 2.5, 2, (i) => balls.forEach((b, k) => (b.material.blendMode = (k < 2) === (i === 0) ? BlendMode.Normal : BlendMode.Additive)));
  else select(stage.bar, 'blendMode of all', ['Normal', 'Additive', 'mixed'] as const, (v) => balls.forEach((b, k) => (b.material.blendMode = v === 'Normal' || (v === 'mixed' && k < 2) ? BlendMode.Normal : BlendMode.Additive)), 'mixed');
  return stage.dispose;
};

export default mount;
