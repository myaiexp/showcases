// PBRMaterial.transmission shows the scene behind via the opaque texture
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { backdrop, ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await matDemo(el, ctx, { hint: 'transmission 0, 0.25, 0.5, 0.75, 1; camera.opaqueTextureEnabled = true.' });
  camera.opaqueTextureEnabled = true;
  const say = caption(stage, 'transmission 0 .. 1');
  backdrop(root, engine);
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.9, 0.95, 1]), 1);
    m.metallic = 0;
    m.roughness = 0.05;
    m.transmission = t;
    return m;
  });
  const rough = (v: number): void => {
    for (const b of balls) b.material.roughness = v;
    say(`transmission 0 .. 1   roughness ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => rough(0.02 + 0.3 * t));
  else slider(stage.bar, 'roughness', 0, 1, 0.01, 0.05, rough);
  return stage.dispose;
};

export default mount;
