// Opacity dithering: screen patterns instead of blending
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial, sway } from '../../shared/pbr.ts';

const PATTERNS = [pc.DITHER_BAYER2, pc.DITHER_BAYER4, pc.DITHER_BAYER8, pc.DITHER_BAYER16, pc.DITHER_BLUENOISE, pc.DITHER_IGNNOISE];

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 11, pitch: -24, yaw: 0 });
  const { app } = rig;
  sway(app, rig.orbit, 14, 0.4);
  const sun = rig.sunLight!.light!;
  sun.castShadows = true;
  sun.shadowDistance = 25;
  sun.shadowResolution = 1024;
  sun.normalOffsetBias = 0.05;

  const ground = addMesh(app, 'plane', pbrMaterial('#7d8696', { gloss: 0.2 }), [0, -0.5, 0], 20);
  ground.render!.castShadows = false;

  // BLEND_NONE with an opacity below 1 and a dither pattern: the surface stays in the opaque
  // pass, so there is no sorting, and the pattern discards the right share of pixels.
  const materials = PATTERNS.map((pattern, i) => {
    const m = pbrMaterial('#e8794a', { opacity: 0.5, blendType: pc.BLEND_NONE, opacityDither: pattern, opacityShadowDither: pattern });
    addMesh(app, 'sphere', m, [(i - 2.5) * 1.5, 0.2, 0], 1.3);
    return m;
  });

  // A fade in and out, the use the docs suggest for level-of-detail transitions.
  let t = 0;
  let fading = true;
  const setOpacity = (v: number): void =>
    materials.forEach((m) => {
      m.opacity = v;
      m.update();
    });
  app.on('update', (dt: number) => {
    if (!fading) return;
    t += dt;
    setOpacity(0.5 + 0.4 * Math.sin(t * 0.9));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.check('animate opacity', true, (on) => (fading = on));
    panel.slider('opacity', 0.05, 1, 0.01, 0.5, (v) => {
      fading = false;
      setOpacity(v);
    });
    panel.select('opacityShadowDither', [pc.DITHER_NONE, ...PATTERNS], PATTERNS[0]!, (p) =>
      materials.forEach((m) => {
        m.opacityShadowDither = p;
        m.update();
      }),
    );
    panel.readout('spheres left to right: bayer2, bayer4, bayer8, bayer16, bluenoise, ignnoise');
  }
  return () => rig.dispose();
};

export default mount;
