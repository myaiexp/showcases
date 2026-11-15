// Debug views: wireframe and per-level colours show which LOD each sphere draws as you fly in
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
  SphereShape,
} from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
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

    // One shape with generated levels; the field of copies reaches far into the distance
    const sphere = new SphereShape({
      radius: 0.8,
      verticalDetail: 48,
      horizonalDetail: 96,
      lod: { lodMinTriangles: 60, lodReduction: 0.5, lodPixelError: 1 },
    });
    const material = new LambertMaterial();
    material.albedoColor = new Vector4(0.8, 0.8, 0.85, 1);
    for (let i = 0; i < 14; i++) {
      for (let j = -3; j <= 3; j++) {
        const m = new Mesh(scene, sphere, material.createInstance());
        m.position.setXYZ(j * 2.2, 0, -i * 4);
      }
    }

    const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 300);
    scene.mainCamera = camera;
    camera.lookAt(new Vector3(0, 3, 8), new Vector3(0, 0, -10), Vector3.axisPY());
    camera.controller = new OrbitCameraController({ center: new Vector3(0, 0, -10) });
    getInput().use(camera.handleEvent, camera);
    getEngine().setRenderable(scene, 0);

    // Level colours: 0 white, 1 red, 2 green, 3 blue, 4 yellow, 5 fuchsia, 6 cyan, 7 purple
    camera.lodColoration = true;
    camera.wireframe = false;
    const label = (): void => stage.caption(`lodColoration ${camera.lodColoration}, wireframe ${camera.wireframe}`);
    label();
    if (stage.bar) {
      toggle(stage.bar, 'camera.lodColoration', true, (v) => ((camera.lodColoration = v), label()));
      toggle(stage.bar, 'camera.wireframe', false, (v) => ((camera.wireframe = v), label()));
    } else {
      // Fly the camera in and out and alternate the two views
      myApp.on('tick', (_dt, ms) => {
        const z = 8 - 30 * (0.5 - 0.5 * Math.cos(ms * 0.0004));
        camera.lookAt(new Vector3(0, 3, z), new Vector3(0, 0, z - 18), Vector3.axisPY());
      });
      stage.every(3000, (i) => {
        camera.wireframe = i % 2 === 1;
        label();
      });
    }
    myApp.run();
  },
  // Debug views exist only when this is set before the engine loads
  { globals: { __ZEPHYR3D_DEBUG_VIEWS__: true } },
);
