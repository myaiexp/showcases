// TiltShiftEffect: offset, rotation, focusArea and feather of the sharp band
import { EffectComposer, EffectPass, RenderPass, TiltShiftEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { wave } from '../../shared/bloom.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 4.2, 7.5], target: [0, 0.4, 0] });
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const tilt = new TiltShiftEffect({ offset: 0, rotation: 0, focusArea: 0.4, feather: 0.3 });
  composer.addPass(new EffectPass(stage.camera, tilt));

  const label = overlay(stage.box);
  const note = (): void => {
    label.textContent = `offset ${tilt.offset.toFixed(2)}, rotation ${tilt.rotation.toFixed(2)}, focusArea ${tilt.focusArea.toFixed(2)}, feather ${tilt.feather.toFixed(2)}`;
  };
  note();
  if (stage.bar) {
    slider(stage.bar, 'offset', -0.6, 0.6, 0.01, 0, (v) => ((tilt.offset = v), note()));
    slider(stage.bar, 'rotation', 0, 3.14, 0.01, 0, (v) => ((tilt.rotation = v), note()));
    slider(stage.bar, 'focusArea', 0, 1, 0.01, 0.4, (v) => ((tilt.focusArea = v), note()));
    slider(stage.bar, 'feather', 0, 1, 0.01, 0.3, (v) => ((tilt.feather = v), note()));
  }

  stage.run((dt, t) => {
    subject.update(t);
    if (stage.preview) {
      tilt.offset = wave(t, -0.35, 0.35, 5);
      tilt.rotation = wave(t, 0, 0.5, 9);
      note();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
