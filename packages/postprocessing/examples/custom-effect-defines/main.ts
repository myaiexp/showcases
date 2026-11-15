// Custom defines: change a macro at runtime, call setChanged(), and the pass recompiles
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { PosterizeEffect } from './PosterizeEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const posterize = new PosterizeEffect(4);
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, posterize));

  const label = overlay(stage.box);
  const show = (): void => {
    label.textContent = `defines LEVELS = ${posterize.defines.get('LEVELS')}  MODE = ${posterize.defines.get('MODE')}\nrecompiles ${posterize.recompiles}`;
  };
  show();
  if (stage.bar) {
    slider(stage.bar, 'LEVELS', 2, 16, 1, 4, (v) => {
      posterize.setLevels(v);
      show();
    });
    checkbox(stage.bar, 'luminance only (MODE 1)', false, (on) => {
      posterize.setGreyscale(on);
      show();
    });
  } else {
    // Each step recompiles the shader, so cards step through a few values.
    const steps = [3, 5, 8, 12];
    let i = 0;
    stage.every(1500, () => {
      posterize.setLevels(steps[++i % steps.length]!);
      show();
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
