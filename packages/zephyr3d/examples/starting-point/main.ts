// The docs' starting point: scattering sky, IBL ambient, a shadowing sun and HDR post effects
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  DirectionalLight,
  getEngine,
  getInput,
  Mesh,
  OrbitCameraController,
  PBRMetallicRoughnessMaterial,
  PerspectiveCamera,
  PlaneShape,
  Scene,
  SphereShape,
} from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

function pbr(r: number, g: number, b: number, metallic: number, roughness: number): PBRMetallicRoughnessMaterial {
  const m = new PBRMetallicRoughnessMaterial();
  m.albedoColor = new Vector4(r, g, b, 1);
  m.metallic = metallic;
  m.roughness = roughness;
  return m;
}

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();

  // Environment
  scene.env.sky.skyType = 'scatter'; // atmospheric scattering sky
  scene.env.light.type = 'ibl'; // ambient lighting
  scene.env.light.strength = 0.6;

  // Main light + shadows
  const sun = new DirectionalLight(scene);
  sun.lookAt(new Vector3(0, 15, -10), Vector3.zero(), Vector3.axisPY());
  sun.castShadow = true;

  // Something to light: a floor, a row of spheres from rough to polished, a gold box
  new Mesh(scene, new PlaneShape({ size: 40 }), pbr(0.5, 0.5, 0.48, 0, 0.9));
  const ball = new SphereShape({ radius: 0.8 });
  for (let i = 0; i < 5; i++) {
    const s = new Mesh(scene, ball, pbr(0.9, 0.25, 0.2, i / 4, 1 - i * 0.22));
    s.position.setXYZ(-4 + i * 2, 0.8, 0);
  }
  const box = new Mesh(scene, new BoxShape({ size: 1.6 }), pbr(1, 0.78, 0.35, 1, 0.25));
  box.position.setXYZ(0, 0.8, -3);

  // Camera post-processing
  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 500);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 3.5, 9), new Vector3(0, 0.8, 0), Vector3.axisPY());
  camera.HDR = true;
  camera.toneMap = true;
  camera.bloom = true;
  camera.FXAA = true;
  camera.controller = new OrbitCameraController({ center: new Vector3(0, 0.8, 0) });
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  // The sun sweeps low across the sky, so the scattering colours change with its height
  myApp.on('tick', (_dt, elapsed) => {
    const t = elapsed * 0.00025;
    sun.lookAt(new Vector3(Math.sin(t) * 12, 4 + 8 * Math.abs(Math.cos(t)), -10), Vector3.zero(), Vector3.axisPY());
  });
  if (stage.bar) {
    toggle(stage.bar, 'toneMap', true, (v) => (camera.toneMap = v));
    toggle(stage.bar, 'bloom', true, (v) => (camera.bloom = v));
    toggle(stage.bar, 'FXAA', true, (v) => (camera.FXAA = v));
    toggle(stage.bar, 'IBL ambient', true, (v) => (scene.env.light.type = v ? 'ibl' : 'none'));
    toggle(stage.bar, 'sun shadow', true, (v) => (sun.castShadow = v));
  }
  myApp.run();
});
