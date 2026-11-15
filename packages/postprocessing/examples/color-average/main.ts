// A ColorAverageEffect greyscale faded in over the scene, with a choice of blend functions
import { BlendFunction, ColorAverageEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';

const FUNCTIONS = ['NORMAL', 'ADD', 'MULTIPLY', 'SCREEN', 'DIFFERENCE', 'OVERLAY'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The blend function is the one constructor argument.
  const grey = new ColorAverageEffect(BlendFunction.NORMAL);
  composer.addPass(new EffectPass(stage.camera, grey));

  let animate = true;
  if (stage.bar) {
    select(stage.bar, 'blend', FUNCTIONS, (name) => (grey.blendMode.blendFunction = BlendFunction[name]));
    slider(stage.bar, 'opacity', 0, 1, 0.01, 1, (v) => {
      animate = false;
      grey.blendMode.opacity.value = v;
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (animate) grey.blendMode.opacity.value = 0.5 + 0.5 * Math.sin(t * 1.1);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
