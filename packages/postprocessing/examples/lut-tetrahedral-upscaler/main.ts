// A 4x4x4 grade expanded with TetrahedralUpscaler.expand into LookupTextures of growing size
import { EffectComposer, EffectPass, LUT3DEffect, LookupTexture, RenderPass, TetrahedralUpscaler } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider, overlay } from '../../shared/controls.ts';
import { colorShowroom } from '../../shared/color-scene.ts';
import { fillLut, grades } from '../../shared/grading.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = colorShowroom(stage.scene);
  stage.own(subject.panorama);

  const source = stage.own(LookupTexture.createNeutral(4));
  fillLut(source, grades.duotone);
  let lut = new LookupTexture(TetrahedralUpscaler.expand(source.image.data!, 4), 4);
  stage.onDispose(() => lut.dispose());
  const effect = new LUT3DEffect(lut);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, effect));

  const label = stage.bar ? null : overlay(stage.box, '');
  const expand = (size: number): void => {
    // expand() returns new data of the same array type; wrap it in a fresh LookupTexture.
    const next = new LookupTexture(TetrahedralUpscaler.expand(source.image.data!, size), size);
    effect.lut = next;
    lut.dispose();
    lut = next;
    if (label) label.textContent = `expand(data, ${size})`;
  };
  if (stage.bar) slider(stage.bar, 'size', 4, 32, 1, 4, expand);
  let last = -1;

  stage.run((dt, t) => {
    subject.update(t);
    if (label) {
      const size = [4, 6, 10, 16][Math.floor(t / 1.6) % 4]!;
      if (size !== last) {
        last = size;
        expand(size);
      }
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
