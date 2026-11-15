// PBRMaterial.attenuationColor and attenuationDistance colour light inside glass
import { Color, PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { color, slider } from '../../shared/controls.ts';
import { backdrop, ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const DISTANCES = [100, 4, 2, 1, 0.5];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await matDemo(el, ctx, { hint: 'attenuationDistance 100, 4, 2, 1, 0.5 with thickness 1.' });
  camera.opaqueTextureEnabled = true;
  const say = caption(stage, 'attenuationDistance 100 .. 0.5');
  backdrop(root, engine);
  const balls = ballRow(root, engine, 5, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(1, 1, 1, 1);
    m.metallic = 0;
    m.roughness = 0.03;
    m.transmission = 1;
    m.thickness = 1.2;
    m.attenuationColor = new Color(...lin([0.9, 0.2, 0.35]), 1);
    m.attenuationDistance = DISTANCES[i]!;
    return m;
  });
  if (stage.preview) pingPong(root, 6, (t) => balls.forEach((b, i) => (b.material.attenuationDistance = DISTANCES[i]! * (0.4 + 1.2 * t))));
  else {
    color(stage.bar, 'attenuationColor', [0.9, 0.2, 0.35], (c) => balls.forEach((b) => b.material.attenuationColor.set(...lin(c), 1)));
    slider(stage.bar, 'distance scale', 0.2, 2, 0.01, 1, (v) => { balls.forEach((b, i) => (b.material.attenuationDistance = DISTANCES[i]! * v)); say(`attenuationDistance x ${v.toFixed(2)}`); });
  }
  return stage.dispose;
};

export default mount;
