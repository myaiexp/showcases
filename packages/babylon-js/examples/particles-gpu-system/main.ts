// GPUParticleSystem: a fountain of up to 300k particles animated on the GPU
import {
  ArcRotateCamera,
  Color4,
  GPUParticleSystem,
  HemisphericLight,
  MeshBuilder,
  ParticleSystem,
  Vector3,
  type IParticleSystem,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createFlareTexture } from '../../shared/flare.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas, engine } = stage;
  scene.clearColor = new Color4(0.02, 0.02, 0.05, 1);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, 1.25, 26, new Vector3(0, 6, 0), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  MeshBuilder.CreateGround('ground', { width: 30, height: 30 }, scene);

  const capacity = ctx.preview ? 30000 : 300000;
  // GPU particles need WebGL2 transform feedback; the CPU system shares the API as a fallback.
  const gpu = GPUParticleSystem.IsSupported;
  const system: IParticleSystem & { start(): void; stop(): void; dispose(): void } = gpu
    ? new GPUParticleSystem('particles', { capacity, randomTextureSize: 4096 }, scene)
    : new ParticleSystem('particles', Math.min(capacity, 20000), scene);

  system.particleTexture = createFlareTexture(scene);
  system.emitter = new Vector3(0, 0.5, 0);
  system.createConeEmitter(0.4, 0.25);
  system.blendMode = ParticleSystem.BLENDMODE_ADD;
  system.emitRate = gpu ? capacity / 4 : 4000;
  system.minLifeTime = 2;
  system.maxLifeTime = 4;
  system.minEmitPower = 9;
  system.maxEmitPower = 12;
  system.minSize = 0.04;
  system.maxSize = 0.12;
  system.gravity = new Vector3(0, -9.8, 0);
  system.color1 = new Color4(0.3, 0.7, 1, 1);
  system.color2 = new Color4(0.9, 0.4, 1, 1);
  system.colorDead = new Color4(0, 0, 0.2, 0);
  system.start();

  if (!ctx.preview) {
    const panel = createPanel(el);
    const info = panel.readout(gpu ? 'GPUParticleSystem (WebGL2)' : 'WebGL2 unavailable: ParticleSystem fallback');
    if (system instanceof GPUParticleSystem) {
      // activeParticleCount caps how many of the capacity are simulated and drawn.
      panel.slider('activeParticleCount', 1000, capacity, 1000, capacity, (v) => (system.activeParticleCount = v));
    }
    panel.slider('emitRate', 1000, 200000, 1000, system.emitRate, (v) => (system.emitRate = v));
    panel.slider('maxEmitPower', 2, 20, 0.5, system.maxEmitPower, (v) => (system.maxEmitPower = v));
    stage.run(() => {
      info.textContent = `${gpu ? 'GPUParticleSystem' : 'ParticleSystem fallback'} · ${engine.getFps().toFixed(0)} fps`;
      camera.alpha += 0.001;
    });
  } else {
    stage.run(() => (camera.alpha += 0.003));
  }

  return () => {
    // stop() only stops emitting on the GPU; dispose() is what ends it.
    system.dispose();
    stage.dispose();
  };
};

export default mount;
