// OutlineEffect patternTexture and patternScale: a pattern fills the selected objects
import { EffectComposer, EffectPass, OutlineEffect, RenderPass } from 'postprocessing';
import type { Texture } from 'three';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, select, slider } from '../../shared/controls.ts';
import { outlineScene, patternTexture } from '../../shared/outline.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = outlineScene(stage.scene);

  const textures = { stripes: stage.own(patternTexture('stripes')), dots: stage.own(patternTexture('dots')) };
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const outline = new OutlineEffect(stage.scene, stage.camera, {
    edgeStrength: 3,
    visibleEdgeColor: 0xffffff,
    patternTexture: textures.stripes,
    patternScale: 4,
  });
  composer.addPass(new EffectPass(stage.camera, outline));
  outline.selection.set([subject.knot, ...subject.balls]);

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `patternScale ${outline.patternScale.toFixed(1)}`;
  };
  if (stage.bar) {
    select(stage.bar, 'patternTexture', ['stripes', 'dots', 'none'] as const, (k) => {
      // null switches the pattern off (the typings only admit a Texture, hence the cast).
      outline.patternTexture = k === 'none' ? (null as unknown as Texture) : textures[k];
    }, 'stripes');
    slider(stage.bar, 'patternScale', 0.5, 20, 0.1, 4, (v) => ((outline.patternScale = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (!stage.bar) outline.patternScale = wave(t, 2, 10, 8);
    composer.render(dt);
    note();
  });
  return () => stage.dispose();
};

export default mount;
