// One-shot particle bursts with newParticle(count, worldMatrix) over a trickle of continuous emission
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, getEngine, ParticleSystem, Scene } from '@zephyr3d/scene';
import { button, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { flameRamp, sparkAlpha } from '../../shared/basic-sprites.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/particles/spark-alpha.png': png(64, 64, sparkAlpha), '/particles/flame-ramp.png': png(64, 4, flameRamp) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const resources = getEngine().resourceManager;

  const scene = new Scene();
  scene.env.light.type = 'none';
  // A dark backdrop: additive particles wash out against the default sky
  scene.env.sky.skyType = 'none';

  const particles = new ParticleSystem(scene);
  particles.maxParticleCount = 600;
  // A slow trickle: one particle a second. The bursts are what you see.
  particles.emitInterval = 1000;
  particles.emitCount = 1;
  particles.emitterShape = 'sphere';
  particles.emitterShapeSizeMin = new Vector3(0.1, 0.1, 0.1);
  particles.emitterShapeSizeMax = new Vector3(0.2, 0.2, 0.2);
  particles.particleLifeMin = 0.8;
  particles.particleLifeMax = 1.6;
  particles.particleVelocityMin = 1.5;
  particles.particleVelocityMax = 4;
  particles.particleSize1Min = 0.4;
  particles.particleSize1Max = 0.6;
  particles.particleSize2Min = 0.02;
  particles.particleSize2Max = 0.08;
  particles.gravity = new Vector3(0, -2.5, 0);
  particles.airResistence = true;
  particles.material!.alphaMap = await resources.fetchTexture<Texture2D>('/particles/spark-alpha.png', { linearColorSpace: true });
  particles.material!.rampMap = await resources.fetchTexture<Texture2D>('/particles/flame-ramp.png');
  particles.material!.blendMode = 'additive';

  orbitCamera(scene, new Vector3(0, 1, 8), 100, new Vector3(0, 0.5, 0));

  let count = 80;
  let burstNo = 0;
  const burst = (): void => {
    // Spawn `count` particles at once, placed by the world matrix you pass
    particles.position.setXYZ(((burstNo % 3) - 1) * 2.4, 0.5 + (burstNo % 2) * 1.2, 0);
    particles.newParticle(count, particles.worldMatrix!);
    burstNo++;
  };

  if (stage.bar) {
    slider(stage.bar, 'particles per burst', [10, 300, 10], count, (v) => (count = v));
    button(stage.bar, 'newParticle(count, worldMatrix)', burst);
    stage.caption('press the button: bursts at three spots');
    burst();
  } else {
    stage.caption('newParticle(80, particles.worldMatrix)');
    burst();
    stage.every(1100, burst);
  }
  myApp.run();
});
