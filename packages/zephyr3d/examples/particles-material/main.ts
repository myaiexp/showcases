// ParticleMaterial: alphaMap, rampMap, aspect, jitterPower, directional and blendMode
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, getEngine, ParticleSystem, Scene, type BlendMode } from '@zephyr3d/scene';
import { button, select, slider, toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { fadeRamp, flameRamp, smokeAlpha, sparkAlpha } from '../../shared/basic-sprites.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({
    '/particles/smoke-alpha.png': png(128, 128, smokeAlpha),
    '/particles/spark-alpha.png': png(64, 64, sparkAlpha),
    '/particles/flame-ramp.png': png(64, 4, flameRamp),
    '/particles/smoke-ramp.png': png(64, 4, fadeRamp),
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const resources = getEngine().resourceManager;
  const load = (path: string, linear: boolean): Promise<Texture2D> => resources.fetchTexture<Texture2D>(path, { linearColorSpace: linear });
  const alphaMaps = { smoke: await load('/particles/smoke-alpha.png', true), spark: await load('/particles/spark-alpha.png', true) };
  const rampMaps = { flame: await load('/particles/flame-ramp.png', false), smoke: await load('/particles/smoke-ramp.png', false) };

  const scene = new Scene();
  scene.env.light.type = 'none';
  // A dark backdrop: additive particles wash out against the default sky
  scene.env.sky.skyType = 'none';

  const particles = new ParticleSystem(scene);
  particles.position.setXYZ(0, -1.5, 0);
  particles.maxParticleCount = 400;
  particles.emitInterval = 24;
  particles.emitCount = 4;
  particles.emitterShape = 'cone';
  particles.emitterConeRadiusMax = 0.25;
  particles.particleLifeMin = 0.9;
  particles.particleLifeMax = 1.6;
  particles.particleVelocityMin = 1.5;
  particles.particleVelocityMax = 2.6;
  particles.particleSize1Min = 0.6;
  particles.particleSize1Max = 0.9;
  particles.particleSize2Min = 1.1;
  particles.particleSize2Max = 1.5;
  particles.gravity = new Vector3(0, 0.6, 0);

  const mat = particles.material!;
  mat.alphaMap = alphaMaps.smoke;
  mat.rampMap = rampMaps.flame;
  mat.aspect = 1;
  mat.jitterPower = 0.2;
  mat.directional = false;
  mat.blendMode = 'additive';

  orbitCamera(scene, new Vector3(0, 0.5, 8), 100, new Vector3(0, 0.5, 0));

  const preset = (name: 'flame' | 'smoke' | 'sparks'): void => {
    if (name === 'flame') {
      mat.alphaMap = alphaMaps.smoke;
      mat.rampMap = rampMaps.flame;
      mat.blendMode = 'additive';
    } else if (name === 'smoke') {
      mat.alphaMap = alphaMaps.smoke;
      mat.rampMap = rampMaps.smoke;
      mat.blendMode = 'blend';
    } else {
      mat.alphaMap = alphaMaps.spark;
      mat.rampMap = rampMaps.flame;
      mat.blendMode = 'additive';
    }
    stage.caption(`alphaMap + rampMap preset: ${name}, blendMode ${mat.blendMode}`);
  };
  preset('flame');

  if (stage.bar) {
    button(stage.bar, 'flame preset', () => preset('flame'));
    button(stage.bar, 'smoke preset', () => preset('smoke'));
    button(stage.bar, 'sparks preset', () => preset('sparks'));
    select(stage.bar, 'blendMode', ['additive', 'blend'] as BlendMode[], 'additive', (v) => (mat.blendMode = v));
    toggle(stage.bar, 'alphaMap', true, (v) => (mat.alphaMap = v ? alphaMaps.smoke : null));
    toggle(stage.bar, 'rampMap', true, (v) => (mat.rampMap = v ? rampMaps.flame : null));
    slider(stage.bar, 'aspect', [0.3, 3, 0.1], 1, (v) => (mat.aspect = v));
    slider(stage.bar, 'jitterPower', [0, 1, 0.05], 0.2, (v) => (mat.jitterPower = v));
    toggle(stage.bar, 'directional', false, (v) => (mat.directional = v));
  } else {
    const names = ['flame', 'smoke', 'sparks'] as const;
    stage.every(2600, (i) => preset(names[i % 3]!));
  }
  myApp.run();
});
