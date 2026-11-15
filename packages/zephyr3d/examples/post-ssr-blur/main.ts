// SSR blur and denoise: scale, depth cutoff, kernel size and deviation, plus the docs' presets
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, Scene } from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { orbitCamera } from '../../shared/post-scene.ts';
import { reflectionScene } from '../../shared/post-ssr-scene.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  // A semi-rough floor, so there is something for the blur to do
  const { balls } = reflectionScene(scene, 0.35);

  const camera = orbitCamera(scene, new Vector3(0, 2.6, 9), new Vector3(0, 0.8, -1));
  camera.toneMap = true;
  camera.SSR = true;
  camera.HiZ = true;
  camera.ssrMaxRoughness = 0.9;
  camera.ssrBlurScale = 0.05;
  camera.ssrBlurKernelSize = 9;
  camera.ssrBlurStdDev = 6;

  myApp.on('tick', (_dt, ms) => {
    balls.forEach((b, i) => b.position.setXYZ(-4 + i * 2, 0.8 + 0.4 * (0.5 + 0.5 * Math.sin(ms * 0.002 + i)), 0));
  });
  if (stage.bar) {
    const sliders = {
      ssrBlurScale: slider(stage.bar, 'ssrBlurScale', [0, 0.2, 0.005], 0.05, (v) => (camera.ssrBlurScale = v)),
      ssrBlurDepthCutoff: slider(stage.bar, 'ssrBlurDepthCutoff', [0.1, 8, 0.1], camera.ssrBlurDepthCutoff, (v) => (camera.ssrBlurDepthCutoff = v)),
      ssrBlurKernelSize: slider(stage.bar, 'ssrBlurKernelSize', [1, 31, 2], 9, (v) => (camera.ssrBlurKernelSize = v)),
      ssrBlurStdDev: slider(stage.bar, 'ssrBlurStdDev', [1, 20, 1], 6, (v) => (camera.ssrBlurStdDev = v)),
    };
    // The "Recommended Settings" rows of the docs' SSR page
    const presets: Record<string, () => void> = {
      'soft (water, glass)': () => Object.assign(camera, { ssrBlurScale: 0.05, ssrBlurKernelSize: 9, ssrBlurStdDev: 6 }),
      'high quality desktop': () => Object.assign(camera, { HiZ: true, ssrBlurKernelSize: 17, ssrBlurDepthCutoff: 1.5 }),
      'mobile': () => Object.assign(camera, { HiZ: true, ssrIterations: 60, ssrCalcThickness: false }),
      'sharp mirror': () => Object.assign(camera, { ssrBlurScale: 0, ssrBlurKernelSize: 1 }),
    };
    select(stage.bar, 'preset', Object.keys(presets), 'soft (water, glass)', (k) => {
      presets[k]?.();
      for (const [name, input] of Object.entries(sliders)) {
        input.value = String((camera as unknown as Record<string, number>)[name]);
        input.dispatchEvent(new Event('input'));
      }
    });
  } else {
    stage.caption('ssrBlurKernelSize 1, 9, 17, 31');
    myApp.on('tick', (_dt, ms) => {
      camera.ssrBlurKernelSize = [1, 9, 17, 31][Math.floor(ms / 1800) % 4] ?? 9;
    });
  }
  myApp.run();
});
