// Scaffolding for the post-processing examples: PBR materials, an orbit camera, a floor with a sun
import { Vector3, Vector4 } from '@zephyr3d/base';
import {
  BoxShape,
  DirectionalLight,
  getEngine,
  getInput,
  Mesh,
  OrbitCameraController,
  PBRMetallicRoughnessMaterial,
  PerspectiveCamera,
  PlaneShape,
  SphereShape,
  type Scene,
} from '@zephyr3d/scene';

/** A PBR material of one colour; `glow` > 0 makes it emit that colour at emissiveStrength = glow. */
export function pbr(r: number, g: number, b: number, metallic = 0, roughness = 0.6, glow = 0): PBRMetallicRoughnessMaterial {
  const m = new PBRMetallicRoughnessMaterial();
  m.albedoColor = new Vector4(r, g, b, 1);
  m.metallic = metallic;
  m.roughness = roughness;
  if (glow > 0) {
    m.emissiveColor = new Vector3(r, g, b);
    m.emissiveStrength = glow;
  }
  return m;
}

/** The docs' camera wiring (PerspectiveCamera, OrbitCameraController, setRenderable), HDR on by default. */
export function orbitCamera(scene: Scene, eye: Vector3, center = Vector3.zero(), hdr = true): PerspectiveCamera {
  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 300);
  scene.mainCamera = camera;
  camera.lookAt(eye, center, Vector3.axisPY());
  camera.HDR = hdr;
  camera.controller = new OrbitCameraController({ center });
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);
  return camera;
}

/** A sun and a grey floor at y = 0. */
export function sunAndFloor(scene: Scene, floorColor = 0.5, size = 60): DirectionalLight {
  const sun = new DirectionalLight(scene);
  sun.lookAt(new Vector3(6, 12, 8), Vector3.zero(), Vector3.axisPY());
  new Mesh(scene, new PlaneShape({ size }), pbr(floorColor, floorColor, floorColor * 0.96, 0, 0.85));
  return sun;
}

/** A small room open to the camera: red and green side walls, white floor, back wall and ceiling, one box and one sphere. */
export function colorRoom(scene: Scene): { box: Mesh; ball: Mesh } {
  const white = pbr(0.85, 0.85, 0.85, 0, 0.9);
  const wall = (m: PBRMetallicRoughnessMaterial, sx: number, sy: number, sz: number, x: number, y: number, z: number) => {
    new Mesh(scene, new BoxShape({ sizeX: sx, sizeY: sy, sizeZ: sz }), m).position.setXYZ(x, y, z);
  };
  wall(white, 8, 0.2, 8, 0, -0.1, 0); // floor
  wall(white, 8, 0.2, 8, 0, 8.1, 0); // ceiling
  wall(white, 8, 8, 0.2, 0, 4, -4.1); // back
  wall(pbr(0.9, 0.12, 0.1, 0, 0.9), 0.2, 8, 8, -4.1, 4, 0); // left
  wall(pbr(0.12, 0.8, 0.2, 0, 0.9), 0.2, 8, 8, 4.1, 4, 0); // right
  const box = new Mesh(scene, new BoxShape({ sizeX: 2, sizeY: 3.4, sizeZ: 2 }), white);
  box.position.setXYZ(-1.4, 1.7, -1.2);
  const ball = new Mesh(scene, new SphereShape({ radius: 1.1 }), white);
  ball.position.setXYZ(1.5, 1.1, 0.6);
  return { box, ball };
}
