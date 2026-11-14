// Refraction: index, thickness, absorption and dispersion
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';
import { canvasTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 7.5, pitch: -6, yaw: 0, autoRotate: 0 });
  const { app, stage } = rig;

  // Something to see through the glass: a striped backdrop and a few coloured shapes.
  const stripes = rig.own(
    canvasTexture(stage.device, (g, s) => {
      for (let i = 0; i < 12; i++) {
        g.fillStyle = i % 2 ? '#f2f2f2' : ['#e8794a', '#4ab3e8', '#7bc67b'][(i >> 1) % 3]!;
        g.fillRect((i * s) / 12, 0, s / 12, s);
      }
    }),
  );
  const backdrop = pbrMaterial('#ffffff', { diffuseMap: stripes, gloss: 0.1, emissive: new pc.Color(0.4, 0.4, 0.4), emissiveMap: stripes });
  addMesh(app, 'plane', backdrop, [0, 0, -2.5], [9, 1, 5]).setLocalEulerAngles(90, 0, 0);

  // refraction = 1 turns the surface into glass; useDynamicRefraction shows the objects behind it
  // (the grab pass), instead of just the environment.
  const glass = pbrMaterial('#ffffff', { gloss: 1, refraction: 1, refractionIndex: 1 / 1.5, thickness: 1.5, useDynamicRefraction: true, attenuation: new pc.Color(0.4, 0.8, 1), attenuationDistance: 4 });
  const sphere = addMesh(app, 'sphere', glass, [-1.3, 0, 0], 2.4);
  const cap = addMesh(app, 'capsule', glass, [1.5, 0, 0], [1.4, 2.6, 1.4]);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    sphere.setLocalPosition(-1.3 + Math.sin(t * 0.7) * 0.4, 0, 0);
    cap.setLocalEulerAngles(0, 0, 25 * Math.sin(t * 0.5));
  });
  const apply = (): void => glass.update();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('IOR (refractionIndex = 1/IOR)', 1, 2.4, 0.01, 1.5, (v) => {
      glass.refractionIndex = 1 / v;
      apply();
    });
    panel.slider('thickness', 0, 4, 0.05, 1.5, (v) => {
      glass.thickness = v;
      apply();
    });
    panel.slider('dispersion', 0, 5, 0.05, 0, (v) => {
      glass.dispersion = v;
      apply();
    });
    panel.slider('attenuationDistance', 0.2, 10, 0.1, 4, (v) => {
      glass.attenuationDistance = v;
      apply();
    });
    panel.check('useDynamicRefraction', true, (on) => {
      glass.useDynamicRefraction = on;
      apply();
    });
  }
  return () => rig.dispose();
};

export default mount;
