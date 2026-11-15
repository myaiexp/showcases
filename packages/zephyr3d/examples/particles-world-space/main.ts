// ParticleSystem.worldSpace: particles left behind by a moving emitter, or dragged along with it
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, BoxShape, getEngine, Mesh, ParticleSystem, Scene, UnlitMaterial } from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { flameRamp, smokeAlpha } from '../../shared/basic-sprites.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({ '/particles/smoke-alpha.png': png(128, 128, smokeAlpha), '/particles/flame-ramp.png': png(64, 4, flameRamp) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const resources = getEngine().resourceManager;

  const scene = new Scene();
  scene.env.light.type = 'none';
  // A dark backdrop: additive particles wash out against the default sky
  scene.env.sky.skyType = 'none';

  const particles = new ParticleSystem(scene);
  particles.maxParticleCount = 400;
  particles.emitInterval = 20;
  particles.emitCount = 2;
  particles.particleLifeMin = 1.4;
  particles.particleLifeMax = 1.8;
  particles.particleVelocityMin = 0.1;
  particles.particleVelocityMax = 0.3;
  particles.particleSize1Min = 0.5;
  particles.particleSize1Max = 0.7;
  particles.particleSize2Min = 0.05;
  particles.particleSize2Max = 0.1;
  particles.material!.alphaMap = await resources.fetchTexture<Texture2D>('/particles/smoke-alpha.png', { linearColorSpace: true });
  particles.material!.rampMap = await resources.fetchTexture<Texture2D>('/particles/flame-ramp.png');
  particles.material!.blendMode = 'additive';
  // true: already emitted particles stay where they are when the node moves; false: they ride along
  particles.worldSpace = true;

  // A marker cube on the emitter
  const mat = new UnlitMaterial();
  mat.albedoColor = new Vector4(1, 1, 1, 1);
  const cube = new Mesh(scene, new BoxShape({ size: 0.25 }), mat);
  cube.parent = particles;

  orbitCamera(scene, new Vector3(0, 1.5, 9), 100, new Vector3(0, 0, 0));

  myApp.on('tick', (_dt, ms) => {
    const t = ms * 0.0011;
    // The emitter flies a figure of eight
    particles.position.setXYZ(Math.sin(t) * 3.2, Math.sin(t * 2) * 1.2, 0);
  });

  const show = (): void => stage.caption(`worldSpace = ${particles.worldSpace}`);
  show();
  if (stage.bar) {
    toggle(stage.bar, 'worldSpace', true, (v) => {
      particles.worldSpace = v;
      show();
    });
  } else {
    stage.every(4500, (i) => {
      particles.worldSpace = i % 2 === 0;
      show();
    });
  }
  myApp.run();
});
