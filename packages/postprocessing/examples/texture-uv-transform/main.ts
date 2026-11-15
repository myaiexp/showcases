// TextureEffect uv transform: offset, repeat, rotation and center of the texture itself
import { BlendFunction, EffectComposer, EffectPass, RenderPass, TextureEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { gridTexture } from '../../shared/texture-art.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const texture = stage.own(gridTexture());
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The deprecated aspectCorrection option is replaced by the texture's own offset, repeat,
  // rotation and center. The effect updates the texture matrix every frame while matrixAutoUpdate is on.
  const effect = new TextureEffect({ blendFunction: BlendFunction.NORMAL, texture });
  effect.blendMode.opacity.value = 0.7;
  composer.addPass(new EffectPass(stage.camera, effect));
  texture.center.set(0.5, 0.5);

  let fit = false;
  const label = overlay(stage.box);
  const note = (): void => {
    const { offset, repeat, rotation, center } = texture;
    label.textContent = `offset (${offset.x.toFixed(2)}, ${offset.y.toFixed(2)})  repeat (${repeat.x.toFixed(2)}, ${repeat.y.toFixed(2)})\nrotation ${rotation.toFixed(2)}  center (${center.x.toFixed(2)}, ${center.y.toFixed(2)})`;
  };
  if (stage.bar) {
    slider(stage.bar, 'offset.x', -1, 1, 0.01, 0, (v) => (texture.offset.x = v));
    slider(stage.bar, 'offset.y', -1, 1, 0.01, 0, (v) => (texture.offset.y = v));
    slider(stage.bar, 'repeat.x', 0.25, 6, 0.05, 1, (v) => (texture.repeat.x = v));
    slider(stage.bar, 'repeat.y', 0.25, 6, 0.05, 1, (v) => (texture.repeat.y = v));
    slider(stage.bar, 'rotation', -3.14, 3.14, 0.01, 0, (v) => (texture.rotation = v));
    slider(stage.bar, 'center.x', 0, 1, 0.01, 0.5, (v) => (texture.center.x = v));
    slider(stage.bar, 'center.y', 0, 1, 0.01, 0.5, (v) => (texture.center.y = v));
    checkbox(stage.bar, 'square tiles (repeat.x = canvas aspect)', false, (on) => (fit = on));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) {
      texture.rotation = t * 0.5;
      texture.repeat.setScalar(1.5 + Math.sin(t * 0.8));
      texture.offset.set(Math.sin(t * 0.6) * 0.3, 0);
    }
    if (fit) texture.repeat.x = stage.size.width / stage.size.height;
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
