// EyeMaterial on one eyeball mesh: iris parallax, pupil, limbal ring and cornea highlight
import { Vector3 } from '@zephyr3d/base';
import type { Texture2D } from '@zephyr3d/device';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { Application, DirectionalLight, EyeMaterial, getEngine, Mesh, Scene } from '@zephyr3d/scene';
import { animScene } from '../../shared/anim-kit.ts';
import { eyeball, irisTexture } from '../../shared/char-kit.ts';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { memoryFiles } from '../../shared/vfs.ts';

const COLORS = { brown: [150, 95, 50], blue: [70, 120, 190], green: [80, 145, 90] } as const;

export default zephyrExample(import.meta.url, async (stage) => {
  const VFS = await memoryFiles({
    '/textures/iris-brown.png': irisTexture([...COLORS.brown]),
    '/textures/iris-blue.png': irisTexture([...COLORS.blue]),
    '/textures/iris-green.png': irisTexture([...COLORS.green]),
  });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const scene = new Scene();
  // Constant ambient light, so the eye is not dominated by reflections of the sky
  scene.env.light.type = 'constant';
  animScene(scene, { eye: new Vector3(0, 1.0, 1.9), target: new Vector3(0, 0.95, 0), floorSize: 4, shadows: false });
  const lamp = new DirectionalLight(scene);
  lamp.intensity = 3;

  const resources = getEngine().resourceManager;
  const material = new EyeMaterial();
  // Normals and tangents are required for the refraction; the eyeball primitive has both
  material.vertexNormal = true;
  material.vertexTangent = true;
  const load = async (name: keyof typeof COLORS): Promise<void> => {
    material.irisTexture = await resources.fetchTexture<Texture2D>(`/textures/iris-${name}.png`);
  };
  await load('brown');
  const eye = new Mesh(scene, eyeball(0.5), material);
  eye.position.setXYZ(0, 1, 0);

  const describe = (): void => stage.caption(`irisDepth ${material.irisDepth.toFixed(2)}, ior ${material.ior.toFixed(2)}, pupilRadius ${material.pupilRadius.toFixed(2)}`);
  describe();
  if (stage.bar) {
    const bar = stage.bar;
    select(bar, 'iris texture', Object.keys(COLORS) as (keyof typeof COLORS)[], 'brown', (v) => void load(v));
    slider(bar, 'irisDepth', [0, 0.25, 0.005], material.irisDepth, (v) => ((material.irisDepth = v), describe()));
    slider(bar, 'ior', [1, 2, 0.01], material.ior, (v) => ((material.ior = v), describe()));
    slider(bar, 'irisRadius', [0.1, 0.4, 0.01], material.irisRadius, (v) => (material.irisRadius = v));
    slider(bar, 'pupilRadius', [0.1, 0.8, 0.01], material.pupilRadius, (v) => ((material.pupilRadius = v), describe()));
    slider(bar, 'pupilDilation', [-0.6, 0.6, 0.01], material.pupilDilation, (v) => (material.pupilDilation = v));
    slider(bar, 'limbalRingWidth', [0, 0.4, 0.01], material.limbalRingWidth, (v) => (material.limbalRingWidth = v));
    slider(bar, 'limbalRingStrength', [0, 1.5, 0.05], material.limbalRingStrength, (v) => (material.limbalRingStrength = v));
    slider(bar, 'corneaSpecularStrength', [0, 3, 0.05], material.corneaSpecularStrength, (v) => (material.corneaSpecularStrength = v));
    slider(bar, 'corneaRoughness', [0.01, 0.5, 0.01], material.corneaRoughness, (v) => (material.corneaRoughness = v));
  }
  const out = stage.readout();
  if (out) out.textContent = 'The eye looks around so the iris shifts against the cornea (parallax); the light circles for the cornea highlight.';
  myApp.on('tick', (_dt: number, elapsed: number) => {
    const t = elapsed / 1000;
    // Gaze: a slow look left and right, up and down
    eye.rotation.fromEulerAngle(0.12 * Math.sin(t * 0.7), 0.3 * Math.sin(t * 0.9), 0);
    if (!stage.bar) material.pupilDilation = 0.35 * Math.sin(t * 1.4);
    lamp.lookAt(new Vector3(2 * Math.cos(t * 0.8), 1.8, 2 * Math.sin(t * 0.8) + 1), new Vector3(0, 1, 0), Vector3.axisPY());
  });
  myApp.run();
});
