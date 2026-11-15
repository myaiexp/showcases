// A ColorDepthEffect stepping its bit depth down, from 24 bits to 3
import { ColorDepthEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';

const STEPS = [24, 15, 12, 9, 6, 3];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // bits is the whole pixel: each of the three channels effectively gets bits / 3.
  const depth = new ColorDepthEffect({ bits: 24 });
  composer.addPass(new EffectPass(stage.camera, depth));

  let label: HTMLElement | null = null;
  if (stage.bar) {
    slider(stage.bar, 'bits', 1, 24, 1, 24, (v) => (depth.bitDepth = v));
  } else {
    label = overlay(stage.box, '');
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      depth.bitDepth = STEPS[Math.floor(t / 1.4) % STEPS.length]!;
      label.textContent = `bits: ${depth.bitDepth}`;
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
