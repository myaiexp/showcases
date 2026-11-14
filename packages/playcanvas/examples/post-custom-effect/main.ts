// A custom CameraFrameEffect registered with addEffect or insertEffectBefore
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { buildTestScene, createPostRig } from '../../shared/posteffects.ts';
import { PixelationEffect } from './pixelation.ts';

const mount: Mount = async (el, ctx) => {
  const rig = await createPostRig(el, ctx, { distance: 11, pitch: -15, yaw: 25, autoRotate: 7 });
  const { app, frame } = rig;
  const scene = buildTestScene(app);
  let t = 0;

  // A strong violet vignette makes the order of the two effects at the same compose slot visible.
  frame.vignette.intensity = 0.8;
  frame.vignette.color.fromString('#7a1fff');
  frame.vignette.inner = 0.3;

  const effect = rig.addEffect(new PixelationEffect(app.graphicsDevice));
  effect.tilePixels = ctx.preview ? 6 : 10;
  effect.intensity = 0.7;
  rig.apply();

  app.on('update', (dt: number) => {
    scene.animate((t += dt));
    if (ctx.preview) {
      effect.tilePixels = 5 + (Math.sin(t * 0.9) * 0.5 + 0.5) * 12;
      rig.apply();
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('tilePixels', 2, 40, 1, effect.tilePixels, (v) => rig.tweak(() => (effect.tilePixels = v)));
    panel.slider('intensity', 0, 1, 0.05, effect.intensity, (v) => rig.tweak(() => (effect.intensity = v)));
    panel.check('enabled', true, (on) => rig.tweak(() => (effect.enabled = on)));
    // Effects at one compose slot run in the order they are registered; move it relative to the vignette.
    panel.select('order', ['after the vignette (addEffect)', 'before the vignette (insertEffectBefore)'] as const, 'after the vignette (addEffect)', (v) =>
      rig.tweak(() => {
        frame.removeEffect(effect);
        if (v.startsWith('before')) frame.insertEffectBefore(effect, 'vignette');
        else frame.addEffect(effect);
      }),
    );
    panel.readout('the chunk reads sceneTextureSize and returns a colour at COMPOSESLOT_LDR');
  }

  return () => rig.dispose();
};

export default mount;
