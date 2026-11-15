// Editing a pipeline: remove() built-in modules and read has() and module.type back
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  createForwardPlusPipeline,
  DirectionalLight,
  ForwardPlusModules,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  PlaneShape,
  Scene,
  SphereShape,
  TorusShape,
} from '@zephyr3d/scene';
import { toggle } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';

type ModuleKey = keyof typeof ForwardPlusModules;
// The modules whose removal changes the picture
const REMOVABLE: ModuleKey[] = ['ShadowMaps', 'SkyPass', 'HiZ'];

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const sun = new DirectionalLight(scene);
  sun.rotation.fromEulerAngle(-Math.PI / 4, Math.PI / 4, 0);
  sun.castShadow = true;
  const floorMaterial = new LambertMaterial();
  floorMaterial.albedoColor = new Vector4(0.75, 0.75, 0.78, 1);
  new Mesh(scene, new PlaneShape({ size: 60 }), floorMaterial).position.setXYZ(-30, -6, -30);
  const shapeMaterial = new LambertMaterial();
  shapeMaterial.albedoColor = new Vector4(0.85, 0.5, 0.25, 1);
  const sphere = new Mesh(scene, new SphereShape({ radius: 4 }), shapeMaterial);
  sphere.position.setXYZ(-3, -2, 0);
  const torus = new Mesh(scene, new TorusShape(), shapeMaterial);
  torus.scale.setXYZ(3, 3, 3);
  torus.position.setXYZ(6, 0, 1);

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 1, 200);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 6, 24), new Vector3(0, -2, 0), Vector3.axisPY());
  camera.controller = new OrbitCameraController({ center: new Vector3(0, -2, 0) });
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  const removed = new Set<ModuleKey>();
  const out = stage.readout();
  const rebuild = (): void => {
    // The default pipeline is shared: edit a pipeline of this camera's own
    const pipeline = createForwardPlusPipeline();
    for (const key of removed) pipeline.remove(ForwardPlusModules[key]);
    camera.renderPipeline = pipeline;
    if (out) {
      const rows = (Object.keys(ForwardPlusModules) as ModuleKey[]).map((key) => {
        const type = ForwardPlusModules[key].type;
        return `${pipeline.has(type) ? '[x]' : '[ ]'} ${key.padEnd(24)} type '${type}'`;
      });
      out.textContent = `${pipeline.modules.length} modules in this pipeline\n${rows.join('\n')}`;
    }
  };
  rebuild();

  myApp.on('tick', (_dt, ms) => {
    torus.rotation.fromAxisAngle(Vector3.axisPX(), ms * 0.0008);
    sphere.position.y = -2 + Math.sin(ms * 0.0012) * 1.2;
  });
  if (stage.bar) {
    for (const key of REMOVABLE) {
      toggle(stage.bar, `keep ${key}`, true, (keep) => {
        if (keep) removed.delete(key);
        else removed.add(key);
        rebuild();
      });
    }
  } else {
    stage.every(2500, (i) => {
      removed.clear();
      const key = REMOVABLE[i % (REMOVABLE.length + 1)];
      if (key) removed.add(key);
      rebuild();
      stage.caption(key ? `pipeline.remove(ForwardPlusModules.${key})` : 'the default modules, all in');
    });
  }
  myApp.run();
});
