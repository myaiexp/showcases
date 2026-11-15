// BlinnPhongMaterial.shininess focuses the specular highlight
import { BlinnPhongMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';

const SHININESS = [2, 8, 30, 80, 200];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'shininess 2, 8, 30, 80, 200.' });
  caption(stage, 'shininess 2 .. 200');
  const balls = ballRow(root, engine, 5, (_t, i) => {
    const m = new BlinnPhongMaterial(engine);
    m.baseColor.set(...lin([0.7, 0.25, 0.25]), 1);
    m.specularColor.set(1, 1, 1, 1);
    m.shininess = SHININESS[i]!;
    return m;
  });
  if (!stage.preview) color(stage.bar, 'specularColor', [1, 1, 1], (c) => balls.forEach((b) => b.material.specularColor.set(...lin(c), 1)));
  return stage.dispose;
};

export default mount;
