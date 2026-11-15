// The minimal physics scene: static colliders, dynamic rigid bodies, boxes and balls falling
import { AABB, Quaternion, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { initPhysics } from '@zephyr3d/physics';
import { rapierPhysics } from '@zephyr3d/physics-rapier';
import {
  Application,
  BoxShape,
  Collider,
  DirectionalLight,
  getEngine,
  getInput,
  Mesh,
  NodePhysics,
  OrbitCameraController,
  PBRMetallicRoughnessMaterial,
  PerspectiveCamera,
  RigidBody,
  Scene,
  SphereShape,
} from '@zephyr3d/scene';
import { button } from '../../shared/controls.ts';
import { zephyrExample } from '../../shared/frame.ts';
import { rapierWasmUrl } from '../../shared/physics.ts';

function material(r: number, g: number, b: number): PBRMetallicRoughnessMaterial {
  const m = new PBRMetallicRoughnessMaterial();
  m.albedoColor = new Vector4(r, g, b, 1);
  m.metallic = 0;
  m.roughness = 0.6;
  return m;
}
const COLORS: [number, number, number][] = [[0.9, 0.35, 0.15], [0.15, 0.45, 0.9], [0.95, 0.8, 0.2], [0.3, 0.75, 0.35]];

export default zephyrExample(import.meta.url, async (stage) => {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  // Loads the physics engine (a WebAssembly module); wasmUrl points at the bundled copy
  await initPhysics(rapierPhysics, { wasmUrl: rapierWasmUrl });

  const scene = new Scene();
  const sun = new DirectionalLight(scene);
  sun.lookAt(new Vector3(-6, 10, 4), Vector3.zero(), Vector3.axisPY());
  sun.castShadow = true;
  sun.shadow.shadowRegion.setLimit(new AABB(new Vector3(-10, -1, -10), new Vector3(10, 12, 10)));

  // The ground: a collider without a rigid body is static
  const ground = new Mesh(scene, new BoxShape({ size: 20, sizeY: 0.5, sizeZ: 20 }), material(0.5, 0.5, 0.5));
  ground.position.setXYZ(0, -0.25, 0);
  ground.castShadow = false;
  const groundCollider = new Collider();
  groundCollider.size = new Vector3(20, 0.5, 20);
  ground.physics = new NodePhysics({ colliders: [groundCollider] });

  // A static ramp: also just a collider, turned with its node
  const ramp = new Mesh(scene, new BoxShape({ size: 5, sizeY: 0.3, sizeZ: 3 }), material(0.35, 0.4, 0.5));
  ramp.position.setXYZ(-2.5, 1.2, 0);
  ramp.rotation = Quaternion.fromAxisAngle(Vector3.axisPZ(), -0.35);
  const rampCollider = new Collider();
  rampCollider.size = new Vector3(5, 0.3, 3);
  ramp.physics = new NodePhysics({ colliders: [rampCollider] });

  const boxShape = new BoxShape({ size: 0.6 });
  const ballShape = new SphereShape({ radius: 0.3 });
  const bodies: Mesh[] = [];
  let count = 0;
  // A dynamic body: a RigidBody gives the node mass, a Collider on the same node its shape
  const addBox = (x: number, y: number, z: number): void => {
    const c = COLORS[count++ % COLORS.length]!;
    const mesh = new Mesh(scene, boxShape, material(...c));
    mesh.position.setXYZ(x, y, z);
    mesh.rotation = Quaternion.fromAxisAngle(new Vector3(1, 1, 0).inplaceNormalize(), count * 0.4);
    const collider = new Collider();
    collider.size = new Vector3(0.6, 0.6, 0.6);
    mesh.physics = new NodePhysics({ body: new RigidBody(), colliders: [collider] });
    bodies.push(mesh);
  };
  const addBall = (x: number, y: number, z: number): void => {
    const c = COLORS[count++ % COLORS.length]!;
    const mesh = new Mesh(scene, ballShape, material(...c));
    mesh.position.setXYZ(x, y, z);
    const body = new RigidBody();
    body.mass = 2;
    const collider = new Collider();
    collider.shape = 'sphere';
    collider.radius = 0.3;
    collider.restitution = 0.5;
    mesh.physics = new NodePhysics({ body, colliders: [collider] });
    bodies.push(mesh);
  };
  const drop = (): void => {
    for (let i = 0; i < 6; i++) addBox(-3 + (i % 3) * 0.7, 3 + Math.floor(i / 3) * 0.9, -0.4 + (i % 2) * 0.8);
    for (let i = 0; i < 4; i++) addBall(1.5 + (i % 2) * 0.5, 2.5 + i * 0.8, -0.5 + i * 0.35);
  };
  // Removing a node takes its physics data out of the simulation
  const reset = (): void => {
    for (const node of bodies) {
      node.remove();
      node.dispose();
    }
    bodies.length = 0;
    drop();
  };
  drop();

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 200);
  camera.lookAt(new Vector3(0, 5, 11), new Vector3(0, 0.8, 0), Vector3.axisPY());
  camera.controller = new OrbitCameraController({ center: new Vector3(0, 0.8, 0) });
  scene.mainCamera = camera;
  getInput().use(camera.handleEvent, camera);
  getEngine().setRenderable(scene, 0);

  if (stage.bar) {
    button(stage.bar, 'Drop more', drop);
    button(stage.bar, 'Reset', reset);
  } else {
    stage.every(5000, reset);
  }
  myApp.run();
});
