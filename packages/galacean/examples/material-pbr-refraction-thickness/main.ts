// PBRMaterial.thickness bends the view through a transmissive sphere
import { PBRMaterial, RefractionMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { backdrop, ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await matDemo(el, ctx, { hint: 'transmission 1; thickness 0, 0.5, 1, 1.5, 2 (refractionMode Sphere).' });
  camera.opaqueTextureEnabled = true;
  const say = caption(stage, 'thickness 0 .. 2');
  backdrop(root, engine);
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.95, 0.97, 1]), 1);
    m.metallic = 0;
    m.roughness = 0.03;
    m.transmission = 1;
    m.refractionMode = RefractionMode.Sphere;
    m.thickness = 2 * t;
    return m;
  });
  const scale = (v: number): void => {
    balls.forEach((b, i) => (b.material.thickness = (i / 4) * v));
    say(`thickness 0 .. ${v.toFixed(1)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => scale(0.5 + 2 * t));
  else slider(stage.bar, 'thickness at right end', 0, 3, 0.05, 2, scale);
  return stage.dispose;
};

export default mount;
