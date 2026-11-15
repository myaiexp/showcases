// BlinnPhongMaterial.specularColor times specularTexture gives the final specular
import { BlinnPhongMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { ballRow, matDemo } from '../../shared/mat-demo.ts';
import { stripeMask } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'specularColor white | gold | white x specularTexture stripes.' });
  caption(stage, 'specularColor | specularTexture');
  const stripes = stripeMask(engine, 8, false);
  const balls = ballRow(root, engine, 3, (_t, i) => {
    const m = new BlinnPhongMaterial(engine);
    m.baseColor.set(...lin([0.15, 0.2, 0.35]), 1);
    m.shininess = 50;
    m.specularColor.set(...(i === 1 ? lin([1, 0.75, 0.2]) : [1, 1, 1]) as [number, number, number], 1);
    if (i === 2) m.specularTexture = stripes;
    return m;
  }, { gap: 0.8 });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 25 * dt, 0)));
  return stage.dispose;
};

export default mount;
