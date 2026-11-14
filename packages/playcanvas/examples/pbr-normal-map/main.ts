// A normal map generated from a height function, with bumpiness and tiling
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { bricks, bumps, grooves, normalMap, type HeightFn } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const PATTERNS: Record<string, HeightFn> = { bumps, bricks, grooves };

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 7, pitch: -15, yaw: 0, autoRotate: 8 });
  const { app, stage } = rig;

  const material = pbrMaterial('#b9855a', { gloss: 0.55, bumpiness: 1.2 });
  addMesh(app, 'sphere', material, [-1.5, 0, 0], 2.6);
  addMesh(app, 'box', material, [1.6, 0, 0], 2.2);

  // The map is data, not colour: it is stored linear (srgb false) and read as a tangent-space normal.
  let current: pc.Texture | null = null;
  const setPattern = (name: string): void => {
    const next = rig.own(normalMap(stage.device, PATTERNS[name]!, name === 'grooves' ? 2 : 5));
    material.normalMap = next;
    material.update();
    current?.destroy();
    current = next;
  };
  setPattern('bumps');
  material.normalMapTiling = new pc.Vec2(2, 2);
  material.update();

  // Light rakes across the surface so the relief is visible.
  rig.sunLight?.setEulerAngles(35, 70, 0);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('pattern', Object.keys(PATTERNS), 'bumps', setPattern);
    panel.slider('bumpiness', 0, 3, 0.05, 1.2, (v) => {
      material.bumpiness = v;
      material.update();
    });
    panel.slider('tiling', 1, 8, 1, 2, (v) => {
      material.normalMapTiling = new pc.Vec2(v, v);
      material.update();
    });
    panel.check('normal map', true, (on) => {
      material.normalMap = on ? current : null;
      material.update();
    });
  }
  return () => rig.dispose();
};

export default mount;
