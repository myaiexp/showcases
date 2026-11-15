// PBRMaterial.normalTexture with normalTextureIntensity gives bumps without geometry
import { PBRMaterial, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';
import { domeNormals } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'normalTextureIntensity 0, 0.5, 1, 2 along the row.' });
  const say = caption(stage, 'normalTextureIntensity 0, 0.5, 1, 2');
  const normals = domeNormals(engine, 3);
  const levels = [0, 0.5, 1, 2];
  const balls = ballRow(root, engine, 4, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.7, 0.72, 0.8]), 1);
    m.metallic = 0.3;
    m.roughness = 0.4;
    m.normalTexture = normals;
    m.normalTextureIntensity = levels[i]!;
    m.tilingOffset = new Vector4(2, 1, 0, 0);
    return m;
  });
  tick(root, (dt) => balls.forEach((b) => b.entity.transform.rotate(0, 18 * dt, 0)));
  if (stage.preview) pingPong(root, 5, (t) => balls[3]!.material.normalTextureIntensity = 0.5 + 2 * t);
  else slider(stage.bar, 'last sphere intensity', 0, 3, 0.01, 2, (v) => { balls[3]!.material.normalTextureIntensity = v; say(`normalTextureIntensity 0, 0.5, 1, ${v.toFixed(2)}`); });
  return stage.dispose;
};

export default mount;
