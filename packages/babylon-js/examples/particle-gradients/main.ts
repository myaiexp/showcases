// ParticleSystem with colour and size gradients over each particle's lifetime
import { ArcRotateCamera, Color4, HemisphericLight, ParticleSystem, Vector3 } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { createFlareTexture } from './flare.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.2, 7, new Vector3(0, 1.4, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  scene.clearColor = new Color4(0.03, 0.03, 0.06, 1);

  // The bare minimum: a capacity, a texture, an emitter and start().
  const system = new ParticleSystem('flame', ctx.preview ? 500 : 2000, scene);
  system.particleTexture = createFlareTexture(scene);
  system.emitter = Vector3.Zero();
  system.blendMode = ParticleSystem.BLENDMODE_ADD;

  system.createConeEmitter(0.5, Math.PI / 8);
  system.emitRate = ctx.preview ? 90 : 220;
  system.minLifeTime = 0.6;
  system.maxLifeTime = 1.3;
  system.minEmitPower = 1;
  system.maxEmitPower = 1.8;
  system.gravity = new Vector3(0, 0.5, 0);
  system.minAngularSpeed = -2;
  system.maxAngularSpeed = 2;

  // Gradients are keyed by the fraction of the particle's lifetime (0 = born, 1 = dead).
  system.addColorGradient(0, new Color4(1, 0.95, 0.5, 0));
  system.addColorGradient(0.15, new Color4(1, 0.75, 0.2, 0.7));
  system.addColorGradient(0.6, new Color4(0.9, 0.25, 0.05, 0.5));
  system.addColorGradient(1, new Color4(0.25, 0.05, 0.25, 0));
  system.addSizeGradient(0, 0.2);
  system.addSizeGradient(0.3, 0.6);
  system.addSizeGradient(1, 0.1);
  system.start();

  stage.run(() => {
    if (ctx.preview) camera.alpha += 0.004;
  });

  return () => {
    system.stop();
    system.dispose();
    stage.dispose();
  };
};

export default mount;
