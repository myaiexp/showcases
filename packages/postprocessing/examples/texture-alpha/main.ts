// TextureEffect with an alpha channel: a transparent logo over the scene
import { BlendFunction, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { logoTexture } from '../../shared/texture-art.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const texture = stage.own(logoTexture());
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // NORMAL blending weighs the texture by its alpha channel, so the transparent corners show the scene.
  const effect = new TextureEffect({ blendFunction: BlendFunction.NORMAL, texture });
  composer.addPass(new EffectPass(stage.camera, effect));

  let zoom = 2;
  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `blendMode.opacity ${effect.blendMode.opacity.value.toFixed(2)}`;
  };
  if (stage.bar) {
    slider(stage.bar, 'opacity', 0, 1, 0.01, 1, (v) => ((effect.blendMode.opacity.value = v), note()));
    slider(stage.bar, 'repeat', 1, 4, 0.05, 2, (v) => (zoom = v));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) effect.blendMode.opacity.value = wave(t, 0.2, 1, 5);
    // A repeat above 1 shrinks the logo; the offset centres it and the aspect keeps it round.
    // The clamped texture edge is transparent, so everything around the badge shows the scene.
    const aspect = stage.size.width / stage.size.height;
    texture.repeat.set(zoom * aspect, zoom);
    texture.offset.set((1 - zoom * aspect) / 2, (1 - zoom) / 2);
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
