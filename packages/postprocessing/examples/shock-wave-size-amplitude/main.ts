// ShockWaveEffect: waveSize is the ring's thickness, amplitude how hard it bends the image
import { Vector3 } from 'three';
import { EffectComposer, EffectPass, RenderPass, ShockWaveEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';
import { tune } from '../../shared/tune.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const wave = new ShockWaveEffect(stage.camera, new Vector3(0, 1.35, 0), { speed: 1.2, maxRadius: 1.2, waveSize: 0.25, amplitude: 0.06 });
  composer.addPass(new EffectPass(stage.camera, wave));

  const update = tune(stage, [
    { name: 'waveSize', min: 0.02, max: 0.8, step: 0.01, value: 0.25, sweep: [0.05, 0.6, 12], set: (v) => (wave.waveSize = v) },
    { name: 'amplitude', min: 0, max: 0.3, step: 0.005, value: 0.06, sweep: [0.02, 0.2, 8], digits: 3, set: (v) => (wave.amplitude = v) },
  ]);
  if (stage.bar) button(stage.bar, 'explode()', () => wave.explode());
  wave.explode();
  stage.every(3200, () => wave.explode());

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
