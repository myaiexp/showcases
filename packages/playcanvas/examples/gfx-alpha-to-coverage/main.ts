// Alpha to coverage: MSAA samples quantise opacity, and soften cutout edges
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { scalarMap, tileNoise } from '../../shared/pbr-maps.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';

const OPACITIES = [0.15, 0.3, 0.5, 0.7, 0.85];

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 10, pitch: -12, yaw: 0, deviceOptions: { antialias: true }, target: new pc.Vec3(0, 0.3, 0) });
  const { app, stage } = rig;
  sway(app, rig.orbit, 16, 0.4);

  // The coverage mask is built from the fragment's alpha, so the render target must be multisampled.
  const samples = stage.device.samples;

  // Top row: BLEND_NONE with alphaToCoverage and a fixed opacity each.
  const covered = OPACITIES.map((opacity, i) => {
    const m = pbrMaterial('#4ab3e8', { opacity, blendType: pc.BLEND_NONE, alphaToCoverage: true });
    addMesh(app, 'sphere', m, [(i - 2) * 1.5, 1.1, 0], 1.3);
    return m;
  });
  // Bottom row: the same opacities with ordinary blending, for comparison.
  OPACITIES.forEach((opacity, i) => addMesh(app, 'sphere', pbrMaterial('#4ab3e8', { opacity, blendType: pc.BLEND_NORMAL }), [(i - 2) * 1.5, -0.3, 0], 1.3));

  // A cutout card: alphaToCoverage softens the stair-stepped edge that alpha test leaves.
  const mask = rig.own(scalarMap(stage.device, (u, v) => Math.min(1, Math.max(0, (1 - Math.hypot(u - 0.5, v - 0.5) * 2 + (tileNoise(u, v, 5) - 0.5) * 0.3) * 6)), 128, 'cutout'));
  const card = pbrMaterial('#e8c14e', { opacityMap: mask, alphaTest: 0.5, alphaToCoverage: true, cull: pc.CULLFACE_NONE });
  addMesh(app, 'plane', card, [0, -2.1, 0.5], 2.2).setLocalEulerAngles(80, 0, 0);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('alphaToCoverage', true, (on) => {
      for (const m of [...covered, card]) {
        m.alphaToCoverage = on;
        m.update();
      }
    });
    panel.readout(`MSAA samples on this device: ${samples}. With ${samples}x, opacity quantises to ${samples + 1} steps.`);
  }
  return () => rig.dispose();
};

export default mount;
