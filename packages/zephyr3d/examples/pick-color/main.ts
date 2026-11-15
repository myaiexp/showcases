// GPU colour picking: camera.pickAsync once per frame, pixel-exact, highlights the hit object
import { Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import {
  Application,
  DirectionalLight,
  getEngine,
  getInput,
  Mesh,
  OrbitCameraController,
  PBRMetallicRoughnessMaterial,
  PerspectiveCamera,
  Scene,
  TorusShape,
  SceneNode,
} from '@zephyr3d/scene';
import { zephyrExample } from '../../shared/frame.ts';

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  const scene = new Scene();
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(1, 2, 2), Vector3.zero(), Vector3.axisPY());

  // Interlocking tori: their bounding boxes overlap, so only a per-pixel test tells them apart
  const ring = new TorusShape({ numSlices: 48, numSegments: 16, outerRadius: 1.2, innerRadius: 0.25 });
  const rings: Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const m = new PBRMetallicRoughnessMaterial();
    m.albedoColor = new Vector4(0.2 + 0.13 * i, 0.4, 1 - 0.13 * i, 1);
    m.metallic = 0.3;
    m.roughness = 0.4;
    const mesh = new Mesh(scene, ring, m);
    mesh.position.setXYZ((i - 2.5) * 1.5, 0, 0);
    mesh.rotation.fromEulerAngle(i % 2 ? Math.PI / 2 : 0, 0, 0);
    rings.push(mesh);
  }

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 100);
  scene.mainCamera = camera;
  camera.lookAt(new Vector3(0, 3, 8), Vector3.zero(), Vector3.axisPY());
  camera.controller = new OrbitCameraController();
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  let lastPickResult: SceneNode | null = null;
  let x = 0;
  let y = 0;
  // Update the picking position when the pointer moves
  myApp.on('pointermove', (ev) => {
    x = ev.offsetX;
    y = ev.offsetY;
  });
  const out = stage.readout();
  // Picking renders a 1×1 target and reads it back asynchronously, once per frame
  myApp.on('tick', (_dt, elapsed) => {
    if (stage.preview) {
      const t = elapsed * 0.0006;
      x = stage.canvas.clientWidth * (0.5 + 0.42 * Math.sin(t));
      y = stage.canvas.clientHeight * (0.5 + 0.08 * Math.sin(t * 3));
    }
    for (const [i, r] of rings.entries()) r.rotation.fromEulerAngle(i % 2 ? Math.PI / 2 : 0, elapsed * 0.0004 * (i % 2 ? 1 : -1), 0);
    void camera.pickAsync(x, y).then((pickResult) => {
      const node = pickResult?.target.node ?? null;
      if (lastPickResult !== node) {
        if (lastPickResult instanceof Mesh) (lastPickResult.material as PBRMetallicRoughnessMaterial).emissiveColor = Vector3.zero();
        if (node instanceof Mesh) (node.material as PBRMetallicRoughnessMaterial).emissiveColor = new Vector3(1, 1, 0);
        lastPickResult = node;
      }
      if (out && pickResult) {
        const p = pickResult.intersectedPoint;
        out.textContent = `distance: ${pickResult.distance.toFixed(2)}\nintersectedPoint: ${p ? `${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}` : '-'}`;
      } else if (out) out.textContent = 'no hit';
    });
  });
  stage.caption(stage.preview ? 'camera.pickAsync(x, y) every tick' : 'Move the pointer over the rings');
  myApp.run();
});
