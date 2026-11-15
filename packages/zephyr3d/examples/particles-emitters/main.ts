// ParticleSystem emitter shapes (point, sphere, box, cylinder, cone) and surface or volume behaviour
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, getEngine, ParticleSystem, Scene, type EmitterBehavior, type EmitterShape } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { sparkAlpha } from '../../shared/basic-sprites.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { png, ramp } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

const SHAPES: EmitterShape[] = ['point', 'sphere', 'box', 'cylinder', 'cone'];

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({
    '/particles/spark-alpha.png': png(64, 64, sparkAlpha),
    '/particles/spark-ramp.png': png(64, 4, ramp([[255, 240, 160], [255, 160, 60], [255, 70, 60]])),
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const resources = getEngine().resourceManager;

  const scene = new Scene();
  scene.env.light.type = 'none';
  // A dark backdrop: additive particles wash out against the default sky
  scene.env.sky.skyType = 'none';

  const particles = new ParticleSystem(scene);
  particles.position.setXYZ(0, 0, 0);
  particles.maxParticleCount = stage.preview ? 300 : 600;
  particles.emitInterval = 30;
  particles.emitCount = 4;
  particles.emitterShape = 'sphere';
  particles.emitterBehavior = 'volume';
  // The size of the emitter shape is drawn between these two vectors
  particles.emitterShapeSizeMin = new Vector3(1, 1, 1);
  particles.emitterShapeSizeMax = new Vector3(1.5, 1.5, 1.5);
  particles.particleLifeMin = 1.2;
  particles.particleLifeMax = 1.8;
  particles.particleVelocityMin = 0.2;
  particles.particleVelocityMax = 0.5;
  particles.particleSize1Min = 0.3;
  particles.particleSize1Max = 0.4;
  particles.particleSize2Min = 0.1;
  particles.particleSize2Max = 0.2;
  particles.material!.alphaMap = await resources.fetchTexture<Texture2D>('/particles/spark-alpha.png', { linearColorSpace: true });
  particles.material!.rampMap = await resources.fetchTexture<Texture2D>('/particles/spark-ramp.png');
  particles.material!.blendMode = 'additive';

  orbitCamera(scene, new Vector3(0, 2, 7), 100, new Vector3(0, 0, 0));

  const caption = (): void => stage.caption(`emitterShape '${particles.emitterShape}', emitterBehavior '${particles.emitterBehavior}'`);
  caption();
  if (stage.bar) {
    select(stage.bar, 'emitterShape', SHAPES, 'sphere', (v) => {
      particles.emitterShape = v;
      caption();
    });
    select(stage.bar, 'emitterBehavior', ['volume', 'surface'] as EmitterBehavior[], 'volume', (v) => {
      particles.emitterBehavior = v;
      caption();
    });
    slider(stage.bar, 'shape size', [0.2, 3, 0.1], 1.25, (v) => {
      particles.emitterShapeSizeMin = new Vector3(v * 0.8, v * 0.8, v * 0.8);
      particles.emitterShapeSizeMax = new Vector3(v, v, v);
    });
    slider(stage.bar, 'cone radius max', [0, 1, 0.05], particles.emitterConeRadiusMax, (v) => (particles.emitterConeRadiusMax = v));
  } else {
    stage.every(2200, (i) => {
      particles.emitterShape = SHAPES[i % SHAPES.length]!;
      particles.emitterBehavior = Math.floor(i / SHAPES.length) % 2 ? 'surface' : 'volume';
      caption();
    });
  }
  myApp.run();
});
