// MaskPass and ClearMaskPass: an effect that only runs inside a stencil shape
import { ClearMaskPass, CopyPass, EffectComposer, EffectPass, MaskPass, PixelationEffect, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { keepUnmasked, maskShapes, STENCIL_STAGE } from '../../shared/stencil.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, STENCIL_STAGE);
  const subject = showroom(stage.scene);
  const shapes = maskShapes();
  shapes.b.visible = false;

  // stencilBuffer: true gives the composer's buffers a stencil; the stage's renderer has one too.
  const composer = stage.own(new EffectComposer(stage.renderer, { stencilBuffer: true }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The MaskPass draws its scene into the stencil only; everything after it renders inside the shape.
  // keepUnmasked() copies the scene into the second buffer first: 6.39.6's composer loses the
  // pixels outside the mask after a masked pass (see shared/traps.md).
  composer.addPass(keepUnmasked());
  const maskPass = new MaskPass(shapes.scene, stage.camera);
  composer.addPass(maskPass);
  composer.addPass(new EffectPass(stage.camera, new PixelationEffect(12)));
  // ClearMaskPass switches the stencil test off again. It draws nothing, so a CopyPass ends the chain.
  composer.addPass(new ClearMaskPass());
  composer.addPass(new CopyPass());

  const label = overlay(stage.box);
  const set = (inverted: boolean): void => {
    maskPass.inverted = inverted;
    label.textContent = `MaskPass.inverted = ${inverted}: pixelation ${inverted ? 'outside' : 'inside'} the sphere`;
  };
  set(false);
  if (stage.bar) checkbox(stage.bar, 'inverted', false, set);
  else {
    let on = false;
    stage.every(2500, () => set((on = !on)));
  }

  stage.run((dt, t) => {
    subject.update(t);
    shapes.update(t);
    composer.render(dt);
  });
  stage.onDispose(() => shapes.dispose());
  return () => stage.dispose();
};

export default mount;
