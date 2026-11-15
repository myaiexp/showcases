// ShockWaveEffect: explode() sends a ripple out from a world position
import { Vector3 } from 'three';
import { EffectComposer, EffectPass, RenderPass, ShockWaveEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  // The wave starts at a world position (the torus knot) and is projected to the screen every frame.
  const wave = new ShockWaveEffect(stage.camera, new Vector3(0, 1.35, 0), { speed: 1.6, maxRadius: 0.7, waveSize: 0.25, amplitude: 0.06 });
  composer.addPass(new EffectPass(stage.camera, wave));

  // One wave runs at a time: calling explode() again restarts it from the centre.
  if (stage.bar) button(stage.bar, 'explode()', () => wave.explode());
  wave.explode();
  stage.every(2600, () => wave.explode());

  stage.run((dt, t) => {
    subject.update(t);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
