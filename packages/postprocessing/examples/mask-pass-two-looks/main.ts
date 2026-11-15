// Two MaskPasses, one inverted: the shape gets one look and everything else gets another
import {
  BlendFunction,
  ClearMaskPass,
  CopyPass,
  EffectComposer,
  EffectPass,
  MaskPass,
  PixelationEffect,
  RenderPass,
  SepiaEffect,
} from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { keepUnmasked, maskShapes, STENCIL_STAGE } from '../../shared/stencil.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, STENCIL_STAGE);
  const subject = showroom(stage.scene);
  const shapes = maskShapes();
  shapes.b.visible = false;

  const composer = stage.own(new EffectComposer(stage.renderer, { stencilBuffer: true }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));

  // Inside the sphere: pixelation.
  // keepUnmasked() copies the scene into the second buffer first: 6.39.6's composer loses the
  // pixels outside the mask after a masked pass (see shared/traps.md).
  composer.addPass(keepUnmasked());
  composer.addPass(new MaskPass(shapes.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, new PixelationEffect(10)));
  composer.addPass(new ClearMaskPass());

  // Outside the sphere: the same shape, inverted, with a sepia look. Each MaskPass clears the stencil first.
  const outside = new MaskPass(shapes.scene, stage.camera);
  outside.inverted = true;
  composer.addPass(keepUnmasked());
  composer.addPass(outside);
  composer.addPass(new EffectPass(stage.camera, new SepiaEffect({ blendFunction: BlendFunction.NORMAL, intensity: 1 })));
  composer.addPass(new ClearMaskPass());
  composer.addPass(new CopyPass());

  overlay(stage.box, 'inside: PixelationEffect\noutside: SepiaEffect (inverted MaskPass)');

  stage.run((dt, t) => {
    subject.update(t);
    shapes.update(t);
    composer.render(dt);
  });
  stage.onDispose(() => shapes.dispose());
  return () => stage.dispose();
};

export default mount;
