// A 6-bit ColorDepthEffect whose blendMode.opacity fades it over the scene
import { ColorDepthEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const depth = new ColorDepthEffect({ bits: 6 });
  composer.addPass(new EffectPass(stage.camera, depth));

  let animate = true;
  if (stage.bar) {
    slider(stage.bar, 'opacity', 0, 1, 0.01, 1, (v) => {
      animate = false;
      depth.blendMode.opacity.value = v;
    });
    slider(stage.bar, 'bits', 1, 24, 1, 6, (v) => (depth.bitDepth = v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (animate) depth.blendMode.opacity.value = 0.5 + 0.5 * Math.sin(t * 1.2);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
