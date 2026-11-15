// CPU ray picking: a ray from the camera through the pointer, tested against bounding boxes
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  BoxShape,
  DirectionalLight,
  getEngine,
  getInput,
  PBRMetallicRoughnessMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  PlaneShape,
  Scene,
  SphereShape,
  UnlitMaterial,
} from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 1.5), Vector3.zero(), Vector3.axisPY());

  // A 4×3 grid of boxes and spheres, each with its own material so one can glow alone
  const shapes = [new BoxShape({ size: 1.2 }), new SphereShape({ radius: 0.7 })];
  for (let i = 0; i < 12; i++) {
    const m = new PBRMetallicRoughnessMaterial();
    m.roughness = 0.6;
    m.albedoColor = new Vector4(0.3 + (i % 4) * 0.15, 0.5, 0.9 - (i % 3) * 0.2, 1);
    const mesh = new Mesh(scene, shapes[i % 2]!, m);
    mesh.name = `${i % 2 ? 'sphere' : 'box'} ${i}`;
    mesh.position.setXYZ(((i % 4) - 1.5) * 2.2, 0.7, (Math.floor(i / 4) - 1) * 2.2);
  }
  const floor = new Mesh(scene, new PlaneShape({ size: 14 }), new PBRMetallicRoughnessMaterial());
  floor.name = 'floor';

  // A small marker at the hit point. pickable = false keeps the ray from hitting the marker itself.
  const markerMaterial = new UnlitMaterial();
  markerMaterial.albedoColor = new Vector4(1, 0.2, 0.2, 1);
  const marker = new Mesh(scene, new SphereShape({ radius: 0.12 }), markerMaterial);
  marker.pickable = false;

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 7, 9), Vector3.zero(), Vector3.axisPY());
  camera.controller = new OrbitCameraController();
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  const out = stage.readout();
  let lit: Mesh | null = null;
  const pick = (x: number, y: number): void => {
    // (x, y) are relative to the top-left of the viewport
    const ray = camera.constructRay(x, y);
    const hit = scene.raycast(ray);
    const node = hit?.target.node instanceof Mesh && hit.target.node !== floor ? hit.target.node : null;
    if (node !== lit) {
      if (lit) (lit.material as PBRMetallicRoughnessMaterial).emissiveColor = Vector3.zero();
      if (node) (node.material as PBRMetallicRoughnessMaterial).emissiveColor = new Vector3(0.6, 0.5, 0);
      lit = node;
    }
    marker.showState = hit ? 'visible' : 'hidden';
    if (hit) marker.position.set(hit.point);
    if (out) out.textContent = hit ? `target.node: ${hit.target.node.name}\ndist: ${hit.dist.toFixed(2)}\npoint: ${hit.point.x.toFixed(2)}, ${hit.point.y.toFixed(2)}, ${hit.point.z.toFixed(2)}` : 'no hit';
  };
  myApp.on('pointermove', (ev) => pick(ev.offsetX, ev.offsetY));

  if (stage.preview) {
    // No pointer in a card: sweep a virtual pointer across the view instead
    myApp.on('tick', (_dt, elapsed) => {
      const t = elapsed * 0.0007;
      pick(stage.canvas.clientWidth * (0.5 + 0.4 * Math.sin(t)), stage.canvas.clientHeight * (0.55 + 0.25 * Math.sin(t * 1.7)));
    });
  }
  stage.caption(stage.preview ? 'scene.raycast(camera.constructRay(x, y))' : 'Move the pointer over the objects');
  myApp.run();
});
