// CopyPass saves each frame; a TextureEffect blends the saved frame into the next one for trails
import { HalfFloatType } from 'three';
import { BlendFunction, CopyPass, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tune } from '../../shared/tune.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: 0.9 });
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer, { frameBufferType: HalfFloatType }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The saved frame is last frame's finished picture. Blending it back in at some opacity
  // makes older frames fade out geometrically.
  const save = new CopyPass();
  const previous = new TextureEffect({ blendFunction: BlendFunction.NORMAL, texture: save.texture });
  composer.addPass(new EffectPass(stage.camera, previous));
  composer.addPass(save);
  // A CopyPass renders to its own target unless it is last; this second one puts the picture on screen.
  composer.addPass(new CopyPass());

  const update = tune(
    stage,
    [{ name: 'opacity (persistence)', min: 0, max: 0.97, step: 0.01, value: 0.85, sweep: [0.3, 0.95, 8], set: (v) => (previous.blendMode.opacity.value = v) }],
    'CopyPass.texture fed back',
  );

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
