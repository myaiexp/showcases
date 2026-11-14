// Material environment: envAtlas, useSkybox, reflectivity, ambient
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, buildEnvironment, createRig, daySky, equirectTexture, pbrMaterial, sway } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sun: false, distance: 9, pitch: -6, yaw: 0, autoRotate: 0 });
  const { app, stage } = rig;

  // A second, very different environment: a warm sunset with a low sun.
  const sunset = buildEnvironment(
    equirectTexture(stage.device, daySky({ sun: 30, sunDir: [-0.6, 0.12, 0.5], zenith: [0.2, 0.1, 0.35], horizon: [1.6, 0.6, 0.25], ground: [0.12, 0.05, 0.04], panels: false })),
    128,
  );

  const base = { gloss: 0.85, metalness: 0 };
  // 1. No environment of its own: lit by the scene sky.
  const scene = pbrMaterial('#d8d8e0', base);
  // 2. Its own envAtlas: reflections, ambient light and refraction come from the sunset only.
  const own = pbrMaterial('#d8d8e0', { ...base, envAtlas: sunset.atlas });
  // 3. useSkybox off and no map: nothing to reflect, ambient falls back to the flat colour.
  const none = pbrMaterial('#d8d8e0', { ...base, useSkybox: false });
  app.scene.ambientLight = new pc.Color(0.15, 0.15, 0.18);
  // 4. Scene sky again, with reflectivity and ambient tint to play with.
  const tuned = pbrMaterial('#d8d8e0', { ...base, reflectivity: 0.5 });
  [scene, own, none, tuned].forEach((m, i) => addMesh(app, 'sphere', m, [(i - 1.5) * 2.2, 0, 0], 2));

  sway(app, rig.orbit, 30);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('sphere 3 useSkybox', false, (on) => {
      none.useSkybox = on;
      none.update();
    });
    panel.slider('sphere 4 reflectivity', 0, 1, 0.01, 0.5, (v) => {
      tuned.reflectivity = v;
      tuned.update();
    });
    panel.select('sphere 4 ambient', ['white', 'orange', 'blue'], 'white', (name) => {
      const c = { white: [1, 1, 1], orange: [1, 0.55, 0.2], blue: [0.3, 0.5, 1] }[name]!;
      tuned.ambient = new pc.Color(c[0], c[1], c[2]);
      tuned.update();
    });
    panel.readout('1 scene sky, 2 own sunset atlas, 3 no environment, 4 tuned');
  }
  return () => {
    sunset.dispose();
    rig.dispose();
  };
};

export default mount;
