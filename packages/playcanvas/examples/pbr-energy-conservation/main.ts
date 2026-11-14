// Energy conservation: small bright or large dim highlights by gloss
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  // No environment: only one point light, so the highlight is easy to read.
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 9, pitch: -20, autoRotate: 0 });
  const { app } = rig;
  app.scene.ambientLight = new pc.Color(0.03, 0.03, 0.04);

  const light = new pc.Entity('light');
  light.addComponent('light', { type: 'omni', range: 30, intensity: 2.5, color: new pc.Color(1, 0.96, 0.9) });
  light.setPosition(-2, 4, 5);
  app.root.addChild(light);

  // Same dielectric colour, gloss from 0.15 to 0.95: the highlight shrinks and brightens.
  const materials = [0.15, 0.35, 0.55, 0.75, 0.95].map((gloss, i) => {
    const m = pbrMaterial('#3a7bd5', { gloss });
    addMesh(app, 'sphere', m, [(i - 2) * 1.35, 0, 0], 1.2);
    return m;
  });

  // The camera drops towards the horizon and back: Fresnel makes grazing views more reflective.
  let t = 0;
  let auto = true;
  app.on('update', (dt: number) => {
    if (!auto) return;
    t += dt;
    rig.orbit.pitch = -20 + Math.sin(t * 0.6) * 18;
    rig.orbit.yaw = Math.sin(t * 0.3) * 12;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('light intensity', 0.5, 6, 0.1, 2.5, (v) => (light.light!.intensity = v));
    panel.check('metal', false, (on) =>
      materials.forEach((m) => {
        m.metalness = on ? 1 : 0;
        m.update();
      }),
    );
    panel.check('camera sweep (untick to drag)', true, (on) => (auto = on));
    panel.readout('light is fixed; look at the highlight on each gloss step');
  }
  return () => rig.dispose();
};

export default mount;
