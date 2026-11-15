// Scaffolding shared by lighting and shadow examples: orbit camera, boxes, floor
import { Vector3, Vector4 } from '@zephyr3d/base';
import {
  BoxShape,
  getEngine,
  getInput,
  LambertMaterial,
  Mesh,
  OrbitCameraController,
  PerspectiveCamera,
  PlaneShape,
  type MeshMaterial,
  type Scene,
} from '@zephyr3d/scene';

/** The docs' camera wiring: a PerspectiveCamera with an OrbitCameraController, the scene made renderable. */
export function orbitCamera(scene: Scene, eye: Vector3, far = 600, center = Vector3.zero()): PerspectiveCamera {
  const camera = new PerspectiveCamera(scene, Math.PI / 3, 1, far);
  scene.mainCamera = camera;
  camera.lookAt(eye, center, new Vector3(0, 1, 0));
  camera.controller = new OrbitCameraController({ center });
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);
  return camera;
}

/** A Lambert material of one colour. */
export function lambert(r: number, g: number, b: number): LambertMaterial {
  const m = new LambertMaterial();
  m.albedoColor = new Vector4(r, g, b, 1);
  return m;
}

/**
 * The docs' scatter of boxes, on a fixed spiral instead of Math.random() so every visit looks the same.
 * Boxes sit on y = size / 2.
 */
export function boxField(scene: Scene, material: MeshMaterial, count = 16, size = 6, spread = 1.3): Mesh[] {
  const shape = new BoxShape({ size });
  const boxes: Mesh[] = [];
  for (let i = 0; i < count; i++) {
    const box = new Mesh(scene, shape, material);
    const a = i * 2.4;
    const r = size + i * spread;
    box.position.setXYZ(Math.cos(a) * r, size / 2, Math.sin(a) * r);
    boxes.push(box);
  }
  return boxes;
}

/** A square floor in the XZ plane at y = 0. */
export function floor(scene: Scene, material: MeshMaterial, size = 100): Mesh {
  return new Mesh(scene, new PlaneShape({ size }), material);
}
