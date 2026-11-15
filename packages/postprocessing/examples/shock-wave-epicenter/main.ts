// ShockWaveEffect: position moves the epicenter, and the ring follows it on screen
import { Vector3 } from 'three';
import { EffectComposer, EffectPass, RenderPass, ShockWaveEffect } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, overlay, slider } from '../../shared/controls.ts';
import { showroom } from '../../shared/scenes.ts';

// Spots in the showroom: the knot, the three balls' resting places, a crate.
const SPOTS = [new Vector3(0, 1.35, 0), new Vector3(2.4, 0.4, 0.5), new Vector3(-2, 0.4, -1.8), new Vector3(-1, 0.4, 2.3), new Vector3(3.8, 0.3, 0)];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { orbit: false, position: [0, 3, 8], target: [0, 0.8, 0] });
  const subject = showroom(stage.scene);

  const composer = stage.own(new EffectComposer(stage.renderer));
  composer.addPass(new RenderPass(stage.scene, stage.camera));
  const wave = new ShockWaveEffect(stage.camera, SPOTS[0]!.clone(), { speed: 1.5, maxRadius: 0.6, waveSize: 0.25, amplitude: 0.07 });
  composer.addPass(new EffectPass(stage.camera, wave));

  // The position is a world-space Vector3, so the wave stays on the object when the camera moves.
  let spot = 0;
  const label = overlay(stage.box);
  const fire = (): void => {
    wave.position.copy(SPOTS[spot++ % SPOTS.length]!);
    wave.explode();
    label.textContent = `position (${wave.position.x}, ${wave.position.y}, ${wave.position.z})`;
  };
  fire();
  if (!stage.bar) stage.every(2400, fire);
  if (stage.bar) {
    button(stage.bar, 'next epicenter', fire);
    // The full view places it freely: each slider move restarts the wave at the new spot.
    const move = (axis: 'x' | 'z') => (v: number) => {
      wave.position[axis] = v;
      wave.explode();
      label.textContent = `position (${wave.position.x}, ${wave.position.y}, ${wave.position.z})`;
    };
    slider(stage.bar, 'position.x', -5, 5, 0.1, wave.position.x, move('x'));
    slider(stage.bar, 'position.z', -5, 5, 0.1, wave.position.z, move('z'));
  }

  stage.run((dt, t) => {
    subject.update(t);
    // Moving the camera does not break the wave: it re-projects the position each frame.
    stage.camera.position.x = Math.sin(t * 0.3) * 1.5;
    stage.camera.lookAt(0, 0.8, 0);
    composer.render(dt);
  });
  return () => stage.dispose();
};

export default mount;
