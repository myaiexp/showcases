// Emissive map with emissiveIntensity: self-lit pixels that ignore the lights
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { colorMap } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  // A dim scene (no sun) so the glow carries the picture.
  const rig = await createRig(el, ctx, { sun: false, sky: (_x, y, _z, out) => (out[0] = out[1] = out[2] = 0.03 + 0.05 * Math.max(y, 0)), distance: 7, pitch: -14, autoRotate: 14 });
  const { app, stage } = rig;

  // Glowing circuit-like lines on a dark panel; black texels emit nothing.
  const glow = rig.own(
    colorMap(stage.device, (u, v, o) => {
      const line = Math.abs(((u * 8) % 1) - 0.5) < 0.05 || Math.abs(((v * 8) % 1) - 0.5) < 0.05;
      const node = Math.hypot(((u * 8) % 1) - 0.5, ((v * 8) % 1) - 0.5) < 0.14;
      const on = line || node ? 1 : 0;
      o[0] = on * (node ? 1 : 0.2);
      o[1] = on * (node ? 0.85 : 0.9);
      o[2] = on;
    }),
  );
  const material = pbrMaterial('#15181d', { gloss: 0.6, emissive: new pc.Color(0.2, 0.9, 1), emissiveMap: glow, emissiveIntensity: 2 });
  addMesh(app, 'sphere', material, [-1.5, 0, 0], 2.6);
  addMesh(app, 'box', material, [1.6, 0, 0], 2.2);

  // A plain emissive colour with no map, to compare.
  const lamp = pbrMaterial('#000000', { emissive: new pc.Color(1, 0.6, 0.2), emissiveIntensity: 1.5 });
  addMesh(app, 'cone', lamp, [0, -1.9, 0], 0.7);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('emissiveIntensity', 0, 6, 0.1, 2, (v) => {
      material.emissiveIntensity = v;
      material.update();
    });
    panel.select('emissive tint', ['cyan', 'magenta', 'lime', 'white'], 'cyan', (name) => {
      const c = { cyan: [0.2, 0.9, 1], magenta: [1, 0.2, 0.8], lime: [0.5, 1, 0.2], white: [1, 1, 1] }[name]!;
      material.emissive = new pc.Color(c[0], c[1], c[2]);
      material.update();
    });
    panel.check('emissiveMap', true, (on) => {
      material.emissiveMap = on ? glow : null;
      material.update();
    });
  }
  return () => rig.dispose();
};

export default mount;
