// A HueSaturationEffect with a hue slider in radians and a saturation slider
import { EffectComposer, EffectPass, HueSaturationEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const hs = new HueSaturationEffect({ hue: 0, saturation: 0 });
  composer.addPass(new EffectPass(stage.camera, hs));

  let label: HTMLElement | null = null;
  if (stage.bar) {
    slider(stage.bar, 'hue (rad)', -Math.PI, Math.PI, 0.01, 0, (v) => (hs.hue = v));
    slider(stage.bar, 'saturation', -1, 1, 0.01, 0, (v) => (hs.saturation = v));
  } else {
    label = overlay(stage.box, '');
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      hs.hue = t * 0.9;
      hs.saturation = 0.3 * Math.sin(t * 0.5);
      label.textContent = `hue ${(((hs.hue * 180) / Math.PI) % 360).toFixed(0)} deg`;
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
