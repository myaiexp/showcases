// BlinnPhongMaterial.normalTexture with normalIntensity
import { BlinnPhongMaterial, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';
import { domeNormals } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'normalIntensity 0, 0.5, 1, 2.' });
  const say = caption(stage, 'normalIntensity 0, 0.5, 1, 2');
  const normals = domeNormals(engine, 3);
  const levels = [0, 0.5, 1, 2];
  const balls = ballRow(root, engine, 4, (_t, i) => {
    const m = new BlinnPhongMaterial(engine);
    m.baseColor.set(...lin([0.75, 0.75, 0.8]), 1);
    m.shininess = 40;
    m.normalTexture = normals;
    m.normalIntensity = levels[i]!;
    m.tilingOffset = new Vector4(2, 1, 0, 0);
    return m;
  });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 18 * dt, 0)));
  if (stage.preview) pingPong(root, 5, (t) => (balls[3]!.material.normalIntensity = 3 * t));
  else slider(stage.bar, 'last sphere intensity', 0, 3, 0.01, 2, (v) => { balls[3]!.material.normalIntensity = v; say(`normalIntensity 0, 0.5, 1, ${v.toFixed(2)}`); });
  return stage.dispose;
};

export default mount;
