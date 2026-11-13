// The docs' starter scene: camera, light, sphere and ground on a hand-made Engine
import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  // Outside the Playground you create the canvas and the Engine yourself.
  const canvas = document.createElement('canvas');
  canvas.className = 'stage';
  el.append(canvas);
  const engine = new Engine(canvas, true, { adaptToDeviceRatio: !preview });

  // createScene, as the docs write it: a scene, a camera and a light must always be present.
  const createScene = (): Scene => {
    const scene = new Scene(engine);
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    // Previews take no pointer input, so only the full view attaches camera controls.
    if (!preview) camera.attachControl(canvas, true);

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;
    MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
    return scene;
  };
  const scene = createScene();

  // The Playground runs this part for you: render every frame and follow canvas resizes.
  engine.runRenderLoop(() => scene.render());
  const observer = new ResizeObserver(() => engine.resize());
  observer.observe(canvas);

  return () => {
    observer.disconnect();
    engine.stopRenderLoop();
    scene.dispose();
    engine.dispose();
  };
};

export default mount;
