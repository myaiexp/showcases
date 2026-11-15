// ParticleSystem simulation settings: rate, life, velocity, size over life, gravity, wind, air resistance
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, getEngine, ParticleSystem, Scene } from '@zephyr3d/scene';
import { slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { smokeAlpha, fadeRamp } from '../../shared/basic-sprites.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/particles/smoke-alpha.png': png(128, 128, smokeAlpha), '/particles/smoke-ramp.png': png(64, 4, fadeRamp) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const resources = getEngine().resourceManager;

  const scene = new Scene();
  scene.env.light.type = 'none';
  // A dark backdrop: additive particles wash out against the default sky
  scene.env.sky.skyType = 'none';

  const particles = new ParticleSystem(scene);
  particles.position.setXYZ(0, -1.5, 0);
  particles.maxParticleCount = 512;
  particles.emitInterval = 24;
  particles.emitCount = 4;
  particles.emitterShape = 'sphere';
  particles.emitterBehavior = 'volume';
  particles.emitterShapeSizeMin = new Vector3(0.2, 0.2, 0.2);
  particles.emitterShapeSizeMax = new Vector3(0.5, 0.5, 0.5);
  particles.particleLifeMin = 0.8;
  particles.particleLifeMax = 1.8;
  particles.particleVelocityMin = 1.5;
  particles.particleVelocityMax = 3.2;
  particles.particleSize1Min = 0.2;
  particles.particleSize1Max = 0.35;
  particles.particleSize2Min = 0.7;
  particles.particleSize2Max = 1.1;
  particles.gravity = new Vector3(0, 0.8, 0);
  particles.wind = new Vector3(0.4, 0, 0);
  particles.airResistence = true;
  particles.material!.alphaMap = await resources.fetchTexture<Texture2D>('/particles/smoke-alpha.png', { linearColorSpace: true });
  particles.material!.rampMap = await resources.fetchTexture<Texture2D>('/particles/smoke-ramp.png');
  particles.material!.blendMode = 'blend';

  orbitCamera(scene, new Vector3(0, 0.5, 8), 100, new Vector3(0, 0.5, 0));

  if (stage.bar) {
    const v3 = (x: number, y: number, z: number): Vector3 => new Vector3(x, y, z);
    slider(stage.bar, 'emitInterval ms', [8, 200, 4], particles.emitInterval, (v) => (particles.emitInterval = v));
    slider(stage.bar, 'emitCount', [1, 12, 1], particles.emitCount, (v) => (particles.emitCount = v));
    slider(stage.bar, 'life max s', [0.5, 4, 0.1], particles.particleLifeMax, (v) => {
      particles.particleLifeMax = v;
      particles.particleLifeMin = Math.min(particles.particleLifeMin, v);
    });
    slider(stage.bar, 'velocity max', [0, 8, 0.2], particles.particleVelocityMax, (v) => {
      particles.particleVelocityMax = v;
      particles.particleVelocityMin = Math.min(particles.particleVelocityMin, v);
    });
    slider(stage.bar, 'size1 (start) max', [0.02, 0.6, 0.02], particles.particleSize1Max, (v) => (particles.particleSize1Max = v));
    slider(stage.bar, 'size2 (end) max', [0.02, 1.5, 0.02], particles.particleSize2Max, (v) => (particles.particleSize2Max = v));
    slider(stage.bar, 'gravity y', [-4, 4, 0.1], particles.gravity.y, (v) => (particles.gravity = v3(0, v, 0)));
    slider(stage.bar, 'wind x', [-3, 3, 0.1], particles.wind.x, (v) => (particles.wind = v3(v, 0, 0)));
    slider(stage.bar, 'particleAccel max', [-1, 1, 0.05], particles.particleAccelMax, (v) => (particles.particleAccelMax = v));
    slider(stage.bar, 'rotation max', [0, 6.28, 0.2], 0, (v) => (particles.particleRotationMax = v));
    toggle(stage.bar, 'airResistence', true, (v) => (particles.airResistence = v));
  } else {
    stage.caption('gravity up, wind right, air resistance, size1 to size2');
    // A card cannot drag sliders: swing the wind back and forth so the plume sways
    myApp.on('tick', (_dt, ms) => {
      particles.wind = new Vector3(Math.sin(ms * 0.0007) * 1.6, 0, 0);
    });
  }
  myApp.run();
});
