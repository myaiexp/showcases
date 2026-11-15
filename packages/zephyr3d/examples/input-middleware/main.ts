// Input middleware: a UI layer, a scene layer and the camera, tried in order until one returns true
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  DirectionalLight,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  Scene,
} from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

const COLORS = [new Vector4(1, 0.3, 0.2, 1), new Vector4(0.3, 0.9, 0.4, 1), new Vector4(0.3, 0.5, 1, 1)];

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();

  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(Vector3.one(), Vector3.zero(), Vector3.axisPY());
  const material = new LambertMaterial();
  material.albedoColor = COLORS[0]!;
  const box = new Mesh(scene, new BoxShape({ size: 2 }), material);

  scene.mainCamera = new PerspectiveCamera(scene, Math.PI / 3, 1, 100);
  scene.mainCamera.lookAt(new Vector3(3, 2.5, 5), Vector3.zero(), new Vector3(0, 1, 0));
  scene.mainCamera.controller = new OrbitCameraController();

  let spinning = true;
  let colorIndex = 0;
  const out = stage.readout();
  const log: string[] = [];
  const note = (who: string, type: string): void => {
    if (type === 'pointermove') return;
    log.unshift(`${type.padEnd(12)} -> ${who}`);
    log.length = Math.min(log.length, 6);
    if (out) out.textContent = log.join('\n');
  };

  // 1. The "UI" layer sees every event first. It owns the left third of the view and
  //    returns true for anything pressed there, so nothing below it runs.
  getInput().use((evt, type) => {
    const inPanel = 'offsetX' in evt && evt.offsetX < stage.canvas.clientWidth / 3;
    if (inPanel && (type === 'pointerdown' || type === 'pointermove' || type === 'pointerup')) {
      if (type === 'pointerdown') spinning = !spinning;
      note('UI layer (handled)', type);
      return true;
    }
    return false;
  });
  // 2. The scene layer only wants pointerdown; every other event falls through to the camera.
  getInput().use((evt, type) => {
    if (type === 'pointerdown') {
      colorIndex = (colorIndex + 1) % COLORS.length;
      material.albedoColor = COLORS[colorIndex]!;
      note('scene layer (handled)', type);
      return true;
    }
    return false;
  });
  // 3. Last in line: the camera controller drags, pans and zooms with what is left.
  getInput().use(scene.mainCamera.handleEvent, scene.mainCamera);
  getEngine().setRenderable(scene, 0);

  let angle = 0;
  myApp.on('tick', (dt) => {
    if (spinning) angle += dt * 0.0008;
    box.rotation.fromEulerAngle(0.3, angle, 0);
  });

  if (stage.preview) {
    // Cards get no pointer: send pointerdown events to the canvas, alternately in and out of the UI zone.
    stage.every(900, (i) => {
      const r = stage.canvas.getBoundingClientRect();
      const x = i % 3 === 0 ? r.width * 0.15 : r.width * 0.65;
      stage.canvas.dispatchEvent(new PointerEvent('pointerdown', { clientX: r.left + x, clientY: r.top + r.height / 2, bubbles: true }));
    });
    stage.caption('left third: UI layer toggles spin; elsewhere: scene layer recolours');
  } else {
    stage.caption('left third of the view: UI layer (spin). Elsewhere: click recolours, drag orbits.');
    if (out) out.textContent = 'Click or drag in the view';
  }
  myApp.run();
});
