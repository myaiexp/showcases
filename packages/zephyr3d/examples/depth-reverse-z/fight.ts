// Two near-coplanar ground planes to the horizon: depth precision decides which one shows
import { Vector3, Vector4 } from '@zephyr3d/base';
import { DirectionalLight, LambertMaterial, Mesh, PerspectiveCamera, PlaneShape, Scene } from '@zephyr3d/scene';

function lambert(r: number, g: number, b: number): LambertMaterial {
  const m = new LambertMaterial();
  m.albedoColor = new Vector4(r, g, b, 1);
  return m;
}

/**
 * A red plane with a blue one 5 mm above it, 20 km across, under a camera with a near plane
 * of 0.05 and a far plane of 20 km. Exact depth shows only blue; red speckles in the
 * distance are z-fighting. The returned update moves the camera.
 */
export function fightScene(scene: Scene): { camera: PerspectiveCamera; update: (seconds: number) => void } {
  scene.env.light.type = 'none';
  const light = new DirectionalLight(scene);
  light.lookAt(new Vector3(0.3, 1, 0.5), Vector3.zero(), Vector3.axisPY());
  const ground = new PlaneShape({ size: 20000 });
  new Mesh(scene, ground, lambert(1, 0.15, 0.1));
  const top = new Mesh(scene, ground, lambert(0.15, 0.35, 0.9));
  top.position.y = 0.005;
  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.05, 20000);
  scene.mainCamera = camera;
  const update = (s: number): void => {
    const h = 1.5 + 1.2 * Math.sin(s * 0.4);
    camera.lookAt(new Vector3(0, h, 0), new Vector3(Math.sin(s * 0.1) * 30, 0, -300), Vector3.axisPY());
  };
  update(0);
  return { camera, update };
}
