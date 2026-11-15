// ShockWaveEffect: speed and maxRadius set how fast and how far the ring travels
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
  const wave = new ShockWaveEffect(stage.camera, new Vector3(0, 1.35, 0), { speed: 1.6, maxRadius: 0.7, waveSize: 0.25, amplitude: 0.06 });
  composer.addPass(new EffectPass(stage.camera, wave));

  const update = tune(stage, [
    { name: 'speed', min: 0.2, max: 6, step: 0.1, value: 1.6, sweep: [0.4, 4, 14], digits: 1, set: (v) => (wave.speed = v) },
    { name: 'maxRadius', min: 0.1, max: 2.5, step: 0.05, value: 0.7, sweep: [0.3, 2, 9], set: (v) => (wave.maxRadius = v) },
  ]);
  if (stage.bar) button(stage.bar, 'explode()', () => wave.explode());
  wave.explode();
  stage.every(2800, () => wave.explode());

  stage.run((dt, t) => {
    subject.update(t);
    update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
