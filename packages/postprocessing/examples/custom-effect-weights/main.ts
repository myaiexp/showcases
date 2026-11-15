// The smallest custom effect: a fragment shader and one vec3 uniform, merged by an EffectPass
import { EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { WeightsEffect } from './WeightsEffect.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const weights = new WeightsEffect();
  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  composer.addPass(new EffectPass(stage.camera, weights));

  const label = overlay(stage.box);
  const show = (): void => {
    const w = weights.weights;
    label.textContent = `weights ${w.x.toFixed(2)} ${w.y.toFixed(2)} ${w.z.toFixed(2)}`;
  };
  show();
  if (stage.bar) {
    const bar = stage.bar;
    (['x', 'y', 'z'] as const).forEach((axis, i) => {
      slider(bar, ['red', 'green', 'blue'][i]!, 0, 2, 0.01, 1, (v) => {
        weights.weights[axis] = v;
        show();
      });
    });
  }

  stage.run((dt, t) => {
    subject.update(t);
    // Cards turn the three weights up and down out of phase, so the tint drifts.
    if (stage.preview) {
      weights.weights.set(1 + 0.9 * Math.sin(t * 0.9), 1 + 0.9 * Math.sin(t * 0.9 + 2.1), 1 + 0.9 * Math.sin(t * 0.9 + 4.2));
      show();
    }
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
