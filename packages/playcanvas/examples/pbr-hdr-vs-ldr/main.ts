// HDR versus LDR environment: highlights above 1.0 or clamped
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, buildEnvironment, createRig, daySky, equirectTexture, pbrMaterial, sway } from '../../shared/pbr.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 8.5, pitch: -6, yaw: 0 });
  const { app, stage } = rig;
  sway(app, rig.orbit, 30);

  // Two environments from one shader. The LDR one clamps every channel, the way an 8-bit image
  // would: the sun and softboxes become plain white and carry no more light than the sky.
  const hdr = buildEnvironment(equirectTexture(stage.device, daySky({ sun: 40 })), 128);
  const ldr = buildEnvironment(equirectTexture(stage.device, daySky({ sun: 40, clamp: true })), 128);
  hdr.apply(app.scene);

  [hdr, ldr].forEach((env, col) =>
    [1, 0.55].forEach((gloss, row) => {
      const m = pbrMaterial('#c8ccd4', { metalness: 1, gloss, envAtlas: env.atlas });
      addMesh(app, 'sphere', m, [(col - 0.5) * 3.4, (0.5 - row) * 2.4, 0], 2.2);
    }),
  );

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('exposure', 0.1, 2, 0.05, 1, (v) => (app.scene.exposure = v));
    panel.readout('left: HDR atlas (sun = 40), right: the same sky clamped to 1.0');
  }
  return () => {
    ldr.dispose();
    hdr.dispose();
    rig.dispose();
  };
};

export default mount;
