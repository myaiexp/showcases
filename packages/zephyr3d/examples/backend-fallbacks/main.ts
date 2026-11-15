// WebGPU-only features turned on under WebGL2: nothing throws, the engine warns once and degrades
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  DirectionalLight,
  getDevice,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  PlaneShape,
  Scene,
  SphereShape,
} from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // Collect the engine's '[zephyr3d] … requires WebGPU' warnings (this iframe's own console)
  const warnings: string[] = [];
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    const text = args.map(String).join(' ');
    if (text.includes('[zephyr3d]')) warnings.push(text);
    warn.apply(console, args);
  };
  stage.own(() => (console.warn = warn));

  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const isWebGPU = getDevice().type === 'webgpu';

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 3, 2), Vector3.zero(), Vector3.axisPY());
  light.castShadow = true;
  new Mesh(scene, new PlaneShape({ size: 10 }), new LambertMaterial());
  const ball = new SphereShape({ radius: 0.7 });
  const balls: Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const m = new LambertMaterial();
    m.albedoColor = new Vector4(i === 0 ? 1 : 0.3, i === 1 ? 1 : 0.3, i === 2 ? 1 : 0.3, 0.5);
    m.blendMode = 'blend';
    balls.push(new Mesh(scene, ball, m));
  }
  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 3, 5), new Vector3(0, 0.7, 0), Vector3.axisPY());
  camera.controller = new OrbitCameraController({ center: new Vector3(0, 0.7, 0) });
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  // Two features from the docs' table: A-buffer OIT and deep opacity map shadows
  camera.oitMode = 'abuffer';
  light.shadow.mode = 'dom';

  const out = stage.readout();
  myApp.on('tick', (_dt, elapsed) => {
    const t = elapsed * 0.0008;
    balls.forEach((b, i) => b.position.setXYZ(Math.cos(t + i * 2.1) * 0.8, 0.7 + 0.3 * Math.sin(t * 2 + i), Math.sin(t + i * 2.1) * 0.8));
    // Serialized settings are not rewritten: the properties still read what was asked for
    const lines = [
      `device.type = '${getDevice().type}' (isWebGPU: ${isWebGPU})`,
      `camera.oitMode reads '${camera.oitMode}', light.shadow.mode reads '${light.shadow.mode}'`,
      '',
      `${warnings.length} [zephyr3d] warning(s), each logged once:`,
      ...warnings,
    ];
    if (out) out.textContent = lines.join('\n');
    stage.caption(warnings[0]?.replace('[zephyr3d] ', '') ?? 'waiting for the first frame…');
  });
  myApp.run();
});
