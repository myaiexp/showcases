// camera.lodDistanceScale trades detail for triangles: raise it and every mesh drops level sooner
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  DirectionalLight,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  Scene,
  TorusShape,
} from '@zephyr3d/scene';
import { slider } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(
  import.meta.url,
  async (stage) => {
    const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
    await myApp.ready();
    const scene = new Scene();
    scene.env.sky.skyType = 'none';
    const light = new DirectionalLight(scene);
    light.lookAt(new Vector3(1, 2, 2), Vector3.zero(), Vector3.axisPY());

    // Shapes generate their levels along with their geometry
    const ring = new TorusShape({
      outerRadius: 0.8,
      innerRadius: 0.25,
      numSlices: 96,
      numSegments: 32,
      lod: { lodMinTriangles: 60, lodReduction: 0.5, lodPixelError: 2 },
    });
    const material = new LambertMaterial();
    material.albedoColor = new Vector4(0.85, 0.85, 0.9, 1);
    for (let i = 0; i < 10; i++) {
      for (let j = -2; j <= 2; j++) {
        const m = new Mesh(scene, ring, material.createInstance());
        m.position.setXYZ(j * 2.4, 0, -i * 3.5);
        m.rotation.fromEulerAngle(Math.PI / 2.5, 0, 0);
      }
    }

    const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 300);
    scene.mainCamera = camera;
    camera.lookAt(new Vector3(0, 3, 6), new Vector3(0, 0, -12), Vector3.axisPY());
    camera.controller = new OrbitCameraController({ center: new Vector3(0, 0, -12) });
    getInput().use(camera.handleEvent, camera);
    getEngine().setRenderable(scene, 0);
    // Colour each mesh by its level (a debug view) so the switch distances show
    camera.lodColoration = true;

    const set = (v: number): void => {
      // Switch to coarser levels sooner on low-end devices
      camera.lodDistanceScale = v;
      stage.caption(`camera.lodDistanceScale = ${v}`);
    };
    set(1);
    if (stage.bar) slider(stage.bar, 'lodDistanceScale', [0.25, 6, 0.25], 1, set);
    else stage.every(1600, (i) => set([1, 2, 4, 2][i % 4]!));
    myApp.run();
  },
  { globals: { __ZEPHYR3D_DEBUG_VIEWS__: true } },
);
