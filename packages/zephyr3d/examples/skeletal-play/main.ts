// A skinned figure loaded with fetchModel: play its clips and cross-fade between them
import { Vector3 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { GLTFImporter } from '@zephyr3d/loaders';
import {
  Application,
  DirectionalLight,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  PlaneShape,
  Scene,
} from '@zephyr3d/scene';
import { select, slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { figureGlb } from '../../shared/gltf/figure.ts';
import { memoryFiles } from '../../shared/vfs.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  // A generated stand-in for the docs' CesiumMan: a skinned humanoid with five clips
  const VFS = await memoryFiles({ '/models/figure.glb': figureGlb() });
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS } });
  await myApp.ready();
  const resources = getEngine().resourceManager;
  resources.setModelLoader('model/gltf-binary', new GLTFImporter());

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 2), Vector3.zero(), Vector3.axisPY());
  light.castShadow = true;
  new Mesh(scene, new PlaneShape({ size: 8 }), new LambertMaterial());

  // Load a model that contains skeletal animation
  const model = await resources.fetchModel('/models/figure.glb', scene);
  if (!model) throw new Error('figure.glb did not load');
  const animationNames = model.animationSet.getAnimationNames();

  const camera = new PerspectiveCamera(scene, Math.PI / 4, 0.05, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(2.2, 1.6, 3.2), new Vector3(0, 0.9, 0), Vector3.axisPY());
  camera.controller = new OrbitCameraController({ center: new Vector3(0, 0.9, 0) });
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  let current = '';
  let fade = 0.3;
  let speed = 1;
  const play = (name: string): void => {
    // stopAnimation's fadeOut with the next clip's fadeIn makes a cross-fade
    if (current) model.animationSet.stopAnimation(current, { fadeOut: fade });
    model.animationSet.playAnimation(name, {
      repeat: 0, // 0 loops for ever
      speedRatio: speed, // negative plays backwards
      weight: 1,
      fadeIn: fade,
    });
    current = name;
    stage.caption(`playAnimation('${name}', { fadeIn: ${fade} })`);
  };
  play(animationNames.includes('walk') ? 'walk' : animationNames[0]!);
  if (stage.bar) {
    select(stage.bar, 'clip', animationNames, current, play);
    slider(stage.bar, 'fade (s)', [0, 1.5, 0.1], fade, (v) => (fade = v));
    slider(stage.bar, 'speedRatio', [-2, 2, 0.1], speed, (v) => {
      speed = v;
      play(current);
    });
  } else {
    stage.every(2600, (i) => play(animationNames[i % animationNames.length]!));
  }
  const out = stage.readout();
  if (out) out.textContent = `getAnimationNames(): ${animationNames.join(', ')}`;
  myApp.run();
});
