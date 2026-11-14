// Parallax occlusion: sample budget and soft self shadowing from a raking light
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { bricks, colorMap, scalarMap } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  // No environment: a directional light is the only source, and self shadowing needs one.
  const rig = await createRig(el, ctx, { sky: false, distance: 6.5, pitch: -8, yaw: 0 });
  const { app, stage } = rig;
  sway(app, rig.orbit, 20, 0.4);
  app.scene.ambientLight = new pc.Color(0.12, 0.12, 0.14);

  const height = rig.own(scalarMap(stage.device, bricks, 256, 'height'));
  const colour = rig.own(
    colorMap(stage.device, (u, v, o) => {
      const on = bricks(u, v) > 0.5;
      o[0] = on ? 0.65 : 0.35;
      o[1] = on ? 0.35 : 0.33;
      o[2] = on ? 0.25 : 0.3;
    }),
  );
  const material = pbrMaterial('#ffffff', { diffuseMap: colour, heightMap: height, gloss: 0.2, parallaxMode: pc.PARALLAX_OCCLUSION, heightMapFactor: 1.2, parallaxSamples: 16, parallaxShadowSamples: 8 });
  addMesh(app, 'plane', material, [0, 0, 0], [5, 1, 5]).setLocalEulerAngles(90, 0, 0);

  // The light rakes across the rows of bricks from the side and a little above.
  const light = rig.sunLight!;
  light.light!.intensity = 2;
  light.setEulerAngles(30, 65, 0);
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    light.setEulerAngles(30 + Math.sin(t * 0.7) * 8, 65 + Math.sin(t * 0.5) * 25, 0);
  });

  const apply = (): void => material.update();
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('parallaxSamples', 2, 48, 1, 16, (v) => {
      material.parallaxSamples = v;
      apply();
    });
    panel.slider('parallaxShadowSamples (0 = off)', 0, 16, 1, 8, (v) => {
      material.parallaxShadowSamples = v;
      apply();
    });
    panel.slider('heightMapFactor', 0, 2, 0.05, 1.2, (v) => {
      material.heightMapFactor = v;
      apply();
    });
    panel.readout('self shadowing: directional lights only, PARALLAX_OCCLUSION only');
  }
  return () => rig.dispose();
};

export default mount;
