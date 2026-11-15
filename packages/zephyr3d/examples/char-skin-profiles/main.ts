// One SSSProfile preset per sphere, lit from behind: what the profile contributes without diffusion
import { Vector3, Vector4 } from '@zephyr3d/base';
import type { Texture2D } from '@zephyr3d/device';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, getDevice, getEngine, Mesh, Scene, SphereShape, SSSMaterial, type SSSProfilePreset } from '@zephyr3d/scene';
import { animScene } from '../../shared/anim-kit.ts';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { png } from '../../shared/textures.ts';
import { memoryFiles } from '../../shared/vfs.ts';

const PRESETS: SSSProfilePreset[] = ['skin', 'skin_pale', 'skin_tan', 'skin_dark', 'wax', 'jade', 'marble'];
const TINT: Record<SSSProfilePreset, [number, number, number]> = {
  skin: [0.85, 0.55, 0.45], skin_pale: [0.92, 0.72, 0.65], skin_tan: [0.75, 0.5, 0.35], skin_dark: [0.4, 0.25, 0.18],
  wax: [0.95, 0.9, 0.7], jade: [0.35, 0.7, 0.5], marble: [0.9, 0.9, 0.92],
};

export default zephyrExample(import.meta.url, async (stage) => {
  // A subsurface map that is skin everywhere (R) with mid thickness (B)
  const VFS = await memoryFiles({ '/textures/mask.png': png(4, 4, (px) => px.forEach((_, i) => (px[i] = i % 4 === 3 ? 255 : i % 4 === 1 ? 128 : i % 4 === 0 ? 255 : 110))) });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  const camera = animScene(scene, { eye: new Vector3(0, 1.1, 5), target: new Vector3(0, 0.45, 0), floorSize: 8, shadows: false });
  const back = new DirectionalLight(scene);
  back.lookAt(new Vector3(0, 1.6, -2), Vector3.zero(), Vector3.axisPY());
  back.intensity = 6;

  const mask = await getEngine().resourceManager.fetchTexture<Texture2D>('/textures/mask.png', { linearColorSpace: true });
  const materials = PRESETS.map((preset, i) => {
    const m = new SSSMaterial();
    m.albedoColor = new Vector4(...TINT[preset], 1);
    m.subsurfaceTexture = mask;
    m.roughness = 0.5;
    m.transmissionStrength = 1.5;
    // Each material owns a profile; the preset sets scatter ratios, tints and transmission
    m.subsurfaceProfile.preset = preset;
    const ball = new Mesh(scene, new SphereShape({ radius: 0.4 }), m);
    ball.position.setXYZ((i - 3) * 0.95, 0.45, 0);
    return m;
  });
  camera.SSS = true;

  let extinction = 1;
  let distribution = 0.3;
  const apply = (): void => {
    for (const m of materials) {
      m.subsurfaceProfile.extinctionScale = extinction;
      m.subsurfaceProfile.scatteringDistribution = distribution;
    }
    stage.caption(`extinctionScale ${extinction.toFixed(1)}, scatteringDistribution ${distribution.toFixed(2)}`);
  };
  const out = stage.readout();
  if (out) out.textContent = `${PRESETS.join(', ')}\n${getDevice().type}: screen-space diffusion (profile radii) needs WebGPU; transmission uses the profile's tint and extinction`;
  if (stage.bar) {
    slider(stage.bar, 'extinctionScale', [0.1, 4, 0.1], extinction, (v) => ((extinction = v), apply()));
    slider(stage.bar, 'scatteringDistribution', [-1, 1, 0.05], distribution, (v) => ((distribution = v), apply()));
  } else {
    myApp.on('tick', (_dt: number, elapsed: number) => {
      extinction = 0.5 + 1.5 * (0.5 + 0.5 * Math.sin(elapsed / 1000));
      apply();
    });
    stage.caption('SSSProfile presets');
  }
  apply();
  myApp.run();
});
