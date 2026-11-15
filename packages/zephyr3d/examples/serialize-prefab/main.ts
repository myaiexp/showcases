// serializeObject writes a node tree into a .zprefab in the VFS; instantiatePrefab copies it
import { MemoryFS, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  CylinderShape,
  DirectionalLight,
  getEngine,
  getInput,
  Mesh,
  OrbitCameraController,
  PBRMetallicRoughnessMaterial,
  PerspectiveCamera,
  PlaneShape,
  Scene,
  SceneNode,
  SphereShape,
} from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

function pbr(r: number, g: number, b: number, emissive = 0): PBRMetallicRoughnessMaterial {
  const m = new PBRMetallicRoughnessMaterial();
  m.albedoColor = new Vector4(r, g, b, 1);
  m.roughness = 0.5;
  if (emissive) {
    m.emissiveColor = new Vector3(r, g, b);
    m.emissiveStrength = emissive;
  }
  return m;
}

export default zephyrExample(import.meta.url, async (stage) => {
  // Saving needs a writable VFS: a MemoryFS
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio, runtimeOptions: { VFS: new MemoryFS() } });
  await myApp.ready();
  const resources = getEngine().resourceManager;
  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 1), Vector3.zero(), Vector3.axisPY());
  new Mesh(scene, new PlaneShape({ size: 30 }), pbr(0.3, 0.32, 0.35));

  // A lamp post built in code: a node with three child meshes
  const lamp = new SceneNode(scene);
  new Mesh(scene, new BoxShape({ sizeX: 0.6, sizeY: 0.2, sizeZ: 0.6 }), pbr(0.2, 0.2, 0.22)).parent = lamp;
  const pole = new Mesh(scene, new CylinderShape({ topRadius: 0.06, bottomRadius: 0.09, height: 2.4 }), pbr(0.2, 0.2, 0.22));
  pole.parent = lamp;
  pole.position.y = 1.2;
  const bulb = new Mesh(scene, new SphereShape({ radius: 0.22 }), pbr(1, 0.8, 0.4, 3));
  bulb.parent = lamp;
  bulb.position.y = 2.5;

  // Serialize it into the prefab envelope and write it to the VFS
  const asyncTasks: Promise<unknown>[] = [];
  const data = await resources.serializeObject(lamp, null, asyncTasks);
  await Promise.all(asyncTasks);
  const prefab = { type: 'SceneNode', data };
  const text = JSON.stringify(prefab, null, 2);
  await getEngine().VFS.writeFile('/prefabs/lamp.zprefab', text, { encoding: 'utf8', create: true });
  // The original goes; every lamp from here on is an instance of the prefab file
  lamp.remove();

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 7, 11), new Vector3(0, 1, 0), Vector3.axisPY());
  camera.controller = new OrbitCameraController({ center: new Vector3(0, 1, 0) });
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  const out = stage.readout();
  if (out) out.textContent = `/prefabs/lamp.zprefab, ${text.length} bytes:\n${text.slice(0, 600)}…`;
  const lamps: SceneNode[] = [];
  const total = 12;
  // Place instances around a ring, one at a time; once the ring is full, start over
  stage.every(500, async (i) => {
    const k = (i - 1) % (total + 2);
    if (k >= total) {
      if (k === total + 1) for (const l of lamps.splice(0)) l.remove();
      return;
    }
    const node = await resources.instantiatePrefab(scene.rootNode, '/prefabs/lamp.zprefab');
    if (!node) return;
    const a = (k / total) * Math.PI * 2;
    node.position.setXYZ(Math.cos(a) * 5, 0, Math.sin(a) * 5);
    lamps.push(node);
    stage.caption(`instantiatePrefab(): ${lamps.length} lamps`);
  });
  myApp.run();
});
