// A second MaskPass with its stencil clear disabled adds its shape to the first one's
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

  const composer = stage.own(new EffectComposer(stage.renderer, { stencilBuffer: true }));
  composer.addPass(new RenderPass(stage.scene, stage.camera));

  // The sphere and the box live in one scene, so one MaskPass would take both. Here each gets its own pass.
  const sphereScene = shapes.scene.clone(false);
  sphereScene.add(shapes.a);
  const boxScene = shapes.scene.clone(false);
  boxScene.add(shapes.b);
  // keepUnmasked() copies the scene into the second buffer first: 6.39.6's composer loses the
  // pixels outside the mask after a masked pass (see shared/traps.md).
  composer.addPass(keepUnmasked());
  composer.addPass(new MaskPass(sphereScene, stage.camera));
  // The first mask is left open and closed again before the second begins: its stencil survives.
  composer.addPass(new ClearMaskPass());
  const second = new MaskPass(boxScene, stage.camera);
  composer.addPass(second);
  composer.addPass(new EffectPass(stage.camera, new PixelationEffect(12)));
  composer.addPass(new ClearMaskPass());
  composer.addPass(new CopyPass());

  const label = overlay(stage.box);
  const set = (clear: boolean): void => {
    second.clearPass.enabled = clear;
    label.textContent = clear
      ? 'second MaskPass clears the stencil: only the box is pixelated'
      : 'second MaskPass does not clear: sphere and box are pixelated';
  };
  set(false);
  if (stage.bar) checkbox(stage.bar, 'second MaskPass clears stencil', false, set);
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
