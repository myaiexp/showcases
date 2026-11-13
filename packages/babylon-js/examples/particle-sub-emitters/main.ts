// Fireworks from SubEmitter: a rocket particle spawns a burst system where it dies
import { ArcRotateCamera, Color4, ParticleSystem, SubEmitter, SubEmitterType, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createFlareTexture } from './flare.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.1, 16, new Vector3(0, 3, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  scene.clearColor = new Color4(0.02, 0.02, 0.05, 1);
  const texture = createFlareTexture(scene);

  // The burst: a sphere of particles emitted all at once (manualEmitCount) at the spot where the rocket dies.
  const burst = new ParticleSystem('burst', ctx.preview ? 120 : 400, scene);
  burst.particleTexture = texture;
  burst.emitter = Vector3.Zero();
  burst.blendMode = ParticleSystem.BLENDMODE_ADD;
  burst.createSphereEmitter(0.2);
  burst.manualEmitCount = ctx.preview ? 80 : 250;
  burst.emitRate = 0;
  burst.minLifeTime = 0.8;
  burst.maxLifeTime = 1.6;
  burst.minEmitPower = 4;
  burst.maxEmitPower = 8;
  burst.minSize = 0.15;
  burst.maxSize = 0.3;
  burst.gravity = new Vector3(0, -3, 0);
  burst.color1 = new Color4(1, 0.6, 0.2, 1);
  burst.color2 = new Color4(1, 0.2, 0.6, 1);
  burst.colorDead = new Color4(0.1, 0, 0.2, 0);
  burst.targetStopDuration = 0.2;
  burst.disposeOnStop = true;

  // The rocket: a slow stream of fast, upward particles. END means "spawn the burst when a particle dies".
  const rocket = new ParticleSystem('rocket', 20, scene);
  rocket.particleTexture = texture;
  rocket.emitter = new Vector3(0, -2, 0);
  rocket.blendMode = ParticleSystem.BLENDMODE_ADD;
  rocket.createBoxEmitter(new Vector3(-0.6, 1, -0.2), new Vector3(0.6, 1, 0.2), Vector3.Zero(), Vector3.Zero());
  rocket.emitRate = 1.2;
  rocket.minLifeTime = 1.4;
  rocket.maxLifeTime = 2;
  rocket.minEmitPower = 6;
  rocket.maxEmitPower = 9;
  rocket.minSize = 0.2;
  rocket.maxSize = 0.3;
  rocket.gravity = new Vector3(0, -3, 0);
  rocket.color1 = new Color4(1, 1, 0.8, 1);
  rocket.color2 = new Color4(1, 0.8, 0.4, 1);
  rocket.colorDead = new Color4(1, 0.8, 0.4, 0);

  const subEmitter = new SubEmitter(burst);
  subEmitter.type = SubEmitterType.END;
  subEmitter.inheritDirection = false;
  rocket.subEmitters = [subEmitter];
  rocket.start();

  stage.run();

  return () => {
    rocket.stop();
    for (const sub of rocket.activeSubSystems) sub.dispose();
    rocket.dispose();
    burst.dispose();
    stage.dispose();
  };
};

export default mount;
