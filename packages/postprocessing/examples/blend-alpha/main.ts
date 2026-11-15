// ALPHA and NORMAL on a layer with a soft alpha edge
import { BlendFunction, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { showroom } from '../../shared/scenes.ts';
import { blendLayer, blendPicker, type BlendName } from '../../shared/blend-rig.ts';

const NAMES: BlendName[] = ['ALPHA', 'NORMAL'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  // The layer is a picture painted on a canvas; the effect blends it over the rendered scene.
  const texture = stage.own(blendLayer(true));
  const effect = new TextureEffect({ blendFunction: BlendFunction[NAMES[0]!], texture });
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  blendPicker(stage, effect, NAMES, 1);

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
