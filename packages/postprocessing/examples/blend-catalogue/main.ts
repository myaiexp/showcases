// Every BlendFunction over one layer, cycled
import { BlendFunction, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { showroom } from '../../shared/scenes.ts';
import { blendLayer, blendPicker, type BlendName } from '../../shared/blend-rig.ts';

const NAMES: BlendName[] = ['ADD', 'ALPHA', 'AVERAGE', 'COLOR', 'COLOR_BURN', 'COLOR_DODGE', 'DARKEN', 'DIFFERENCE', 'DIVIDE', 'EXCLUSION', 'HARD_LIGHT', 'HARD_MIX', 'HUE', 'INVERT', 'INVERT_RGB', 'LIGHTEN', 'LINEAR_BURN', 'LINEAR_DODGE', 'LINEAR_LIGHT', 'LUMINOSITY', 'MULTIPLY', 'NEGATION', 'NORMAL', 'OVERLAY', 'PIN_LIGHT', 'REFLECT', 'SATURATION', 'SCREEN', 'SOFT_LIGHT', 'SUBTRACT', 'VIVID_LIGHT'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // The layer is a picture painted on a canvas; the effect blends it over the rendered scene.
  const texture = stage.own(blendLayer());
  const effect = new TextureEffect({ blendFunction: BlendFunction[NAMES[0]!], texture });
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  blendPicker(stage, effect, NAMES, 1, 1500);

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
