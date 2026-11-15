// Dense transparent particles and camera.oitMode: 'none' against weighted blended OIT
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import type { Texture2D } from '@zephyr3d/device';
import { Application, getEngine, ParticleSystem, Scene, type CameraOITMode } from '@zephyr3d/scene';
import { select } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { fadeRamp, smokeAlpha } from '../../shared/basic-sprites.ts';
import { orbitCamera } from '../../shared/light-world.ts';
import { png, ramp } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({
    '/particles/smoke-alpha.png': png(128, 128, smokeAlpha),
    '/particles/red-ramp.png': png(64, 4, ramp([[255, 70, 60], [200, 40, 40]])),
    '/particles/blue-ramp.png': png(64, 4, ramp([[60, 120, 255], [40, 70, 200]])),
    '/particles/fade.png': png(64, 4, fadeRamp),
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const resources = getEngine().resourceManager;
  const alpha = await resources.fetchTexture<Texture2D>('/particles/smoke-alpha.png', { linearColorSpace: true });

  const scene = new Scene();
  scene.env.light.type = 'none';
  // A dark backdrop: additive particles wash out against the default sky
  scene.env.sky.skyType = 'none';

  // Two overlapping clouds in different colours: where alpha blending must be sorted, mistakes show
  const cloud = async (x: number, rampPath: string): Promise<ParticleSystem> => {
    const p = new ParticleSystem(scene);
    p.position.setXYZ(x, -1, 0);
    p.maxParticleCount = stage.preview ? 150 : 300;
    p.emitInterval = 30;
    p.emitCount = 3;
    p.emitterShape = 'sphere';
    p.emitterBehavior = 'volume';
    p.emitterShapeSizeMin = new Vector3(0.6, 0.6, 0.6);
    p.emitterShapeSizeMax = new Vector3(1, 1, 1);
    p.particleLifeMin = 2;
    p.particleLifeMax = 3;
    p.particleVelocityMin = 0.2;
    p.particleVelocityMax = 0.6;
    p.particleSize1Min = 0.8;
    p.particleSize1Max = 1.1;
    p.particleSize2Min = 1;
    p.particleSize2Max = 1.4;
    p.gravity = new Vector3(0, 0.3, 0);
    p.material!.alphaMap = alpha;
    p.material!.rampMap = await resources.fetchTexture<Texture2D>(rampPath);
    p.material!.blendMode = 'blend';
    return p;
  };
  await cloud(-0.8, '/particles/red-ramp.png');
  await cloud(0.8, '/particles/blue-ramp.png');

  const camera = orbitCamera(scene, new Vector3(0, 1, 7), 100, new Vector3(0, 0.5, 0));
  const apply = (mode: CameraOITMode): void => {
    camera.oitMode = mode;
    stage.caption(`oitMode = '${mode}'`);
  };
  apply('none');
  myApp.on('tick', (_dt, ms) => {
    if (stage.preview) {
      const a = ms * 0.0004;
      camera.lookAt(new Vector3(Math.sin(a) * 7, 1, Math.cos(a) * 7), new Vector3(0, 0.5, 0), Vector3.axisPY());
    }
  });
  if (stage.bar) {
    select(stage.bar, 'camera.oitMode', ['none', 'weighted'] as CameraOITMode[], 'none', apply);
  } else {
    stage.every(3000, (i) => apply(i % 2 ? 'weighted' : 'none'));
  }
  myApp.run();
});
