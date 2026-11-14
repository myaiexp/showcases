// Parallax mapping: offset versus occlusion, depth and zero level
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { bricks, colorMap, normalMap, scalarMap } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';

const MODES = ['offset', 'occlusion'] as const;

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 8.5, pitch: -6, yaw: 0 });
  const { app, stage } = rig;
  sway(app, rig.orbit, 38, 0.45);

  // One height function drives the height map, the normal map and the colours.
  const height = rig.own(scalarMap(stage.device, bricks, 256, 'height'));
  const normals = rig.own(normalMap(stage.device, bricks, 3, 256, 'normals'));
  const colour = rig.own(
    colorMap(stage.device, (u, v, o) => {
      const b = bricks(u, v);
      o[0] = b > 0.5 ? 0.62 : 0.3;
      o[1] = b > 0.5 ? 0.28 : 0.28;
      o[2] = b > 0.5 ? 0.2 : 0.26;
    }),
  );
  const material = pbrMaterial('#ffffff', { diffuseMap: colour, normalMap: normals, heightMap: height, gloss: 0.25, parallaxMode: pc.PARALLAX_OFFSET, heightMapFactor: 0.5 });
  addMesh(app, 'plane', material, [-1.9, 0, 0], [3.6, 1, 3.6]).setLocalEulerAngles(90, 0, 0);
  addMesh(app, 'sphere', material, [2.2, 0, 0], 3.2);
  rig.sunLight?.setEulerAngles(30, 55, 0);

  const apply = (): void => material.update();
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('parallaxMode', MODES, 'offset', (m) => {
      material.parallaxMode = m === 'offset' ? pc.PARALLAX_OFFSET : pc.PARALLAX_OCCLUSION;
      apply();
    });
    panel.slider('heightMapFactor', 0, 2, 0.05, 0.5, (v) => {
      material.heightMapFactor = v;
      apply();
    });
    panel.slider('heightMapBase (zero level)', 0, 1, 0.05, 0.5, (v) => {
      material.heightMapBase = v;
      apply();
    });
    panel.check('heightMap', true, (on) => {
      material.heightMap = on ? height : null;
      apply();
    });
    panel.readout('drag to view the wall at a slant');
  }
  return () => rig.dispose();
};

export default mount;
