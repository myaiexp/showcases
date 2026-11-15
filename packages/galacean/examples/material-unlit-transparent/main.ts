// UnlitMaterial with isTransparent and blendMode, as any BaseMaterial
import { BlendMode, PrimitiveMesh, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { backdrop, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { env: false, sway: 0, hint: 'isTransparent = true; alpha 0.5.' });
  const say = caption(stage, 'isTransparent, blendMode Normal');
  backdrop(root, engine);
  const mats = [0, 1, 2].map((i) => {
    const m = new UnlitMaterial(engine);
    m.baseColor.set(...lin([[1, 0.3, 0.3], [0.3, 1, 0.4], [0.3, 0.5, 1]][i] as [number, number, number]), 0.5);
    m.isTransparent = true;
    add(root, PrimitiveMesh.createSphere(engine, 1.3, 40), m, [(i - 1) * 1.6, i % 2 ? 0.5 : -0.4, 0]);
    return m;
  });
  const mode = (v: BlendMode): void => {
    mats.forEach((m) => (m.blendMode = v));
    say(`isTransparent, blendMode ${BlendMode[v]}`);
  };
  if (stage.preview) pingPong(root, 5, (t) => mats.forEach((m) => (m.baseColor.a = 0.15 + 0.7 * t)));
  else select(stage.bar, 'blendMode', ['Normal', 'Additive'] as const, (v) => mode(BlendMode[v]), 'Normal');
  return stage.dispose;
};

export default mount;
