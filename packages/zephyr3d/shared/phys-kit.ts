// Scaffolding for the Physics examples: app, world, sun, camera, quick bodies
import { AABB, Quaternion, Vector3, Vector4 } from '@zephyr3d/base';
import { backendWebGL2 } from '@zephyr3d/backend-webgl';
import { initPhysics } from '@zephyr3d/physics';
import { rapierPhysics } from '@zephyr3d/physics-rapier';
import {
  Application,
  BoxShape,
  CapsuleShape,
  Collider,
  CylinderShape,
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
  type PhysicsWorld,
  type SceneNode,
} from '@zephyr3d/scene';
import { button } from './controls.ts';
import type { Stage } from './frame.ts';
import { rapierWasmUrl } from './physics.ts';

export interface Kit {
  myApp: Application;
  scene: Scene;
  sun: DirectionalLight;
  world: PhysicsWorld;
  stage: Stage;
}

export type Rgb = readonly [number, number, number];
export const ORANGE: Rgb = [0.9, 0.35, 0.15];
export const BLUE: Rgb = [0.15, 0.45, 0.9];
export const YELLOW: Rgb = [0.95, 0.8, 0.2];
export const GREEN: Rgb = [0.3, 0.75, 0.35];
export const GREY: Rgb = [0.55, 0.55, 0.55];
export const SLATE: Rgb = [0.4, 0.45, 0.55];
export const RED: Rgb = [0.75, 0.1, 0.12];
export const PALETTE: Rgb[] = [ORANGE, BLUE, YELLOW, GREEN];

export function mat(c: Rgb, a = 1): PBRMetallicRoughnessMaterial {
  const m = new PBRMetallicRoughnessMaterial();
  m.albedoColor = new Vector4(c[0], c[1], c[2], a);
  m.metallic = 0;
  m.roughness = 0.6;
  if (a < 1) m.blendMode = 'blend';
  return m;
}

export interface StartOptions {
  /** Half extent of the area the shadow map covers. Default 10. */
  half?: number;
  /** Height the shadow map covers. Default 12. */
  top?: number;
}

/** Application + physics engine + scene + a shadow-casting sun. The camera is separate: see `orbit`. */
export async function startPhysics(stage: Stage, opts: StartOptions = {}): Promise<Kit> {
  const myApp = new Application({ backend: backendWebGL2, canvas: stage.canvas, pixelRatio: stage.pixelRatio });
  await myApp.ready();
  await initPhysics(rapierPhysics, { wasmUrl: rapierWasmUrl });
  const scene = new Scene();
  const half = opts.half ?? 10;
  const sun = new DirectionalLight(scene);
  sun.lookAt(new Vector3(-6, 10, 6), Vector3.zero(), Vector3.axisPY());
  sun.castShadow = true;
  // Keeps bodies that fall off the floor from stretching the shadow map
  sun.shadow.shadowRegion.setLimit(new AABB(new Vector3(-half, -1, -half), new Vector3(half, opts.top ?? 12, half)));
  return { myApp, scene, sun, world: scene.physicsWorld!, stage };
}

/** An orbit camera (drag in the full view) looking at `target`. */
export function orbit(kit: Kit, eye: Vector3, target: Vector3, fov = Math.PI / 3): PerspectiveCamera {
  const camera = new PerspectiveCamera(kit.scene, fov, 0.1, 300);
  camera.lookAt(eye, target, Vector3.axisPY());
  camera.controller = new OrbitCameraController({ center: target.clone() });
  kit.scene.mainCamera = camera;
  getInput().use(camera.handleEvent, camera);
  return camera;
}

/** Finishes setup: the scene becomes the engine's renderable and the loop starts. */
export function launch(kit: Kit): void {
  getEngine().setRenderable(kit.scene, 0);
  kit.myApp.run();
}

/** Registers a node as a moving shadow caster. */
export function cast(kit: Kit, node: SceneNode): void {
  kit.sun.shadow.shadowRegion.addDynamicCaster(node);
}

/** Removes a body's node from the world and the shadow map, and frees it. */
export function discard(kit: Kit, node: Mesh): void {
  const drop = (n: SceneNode): void => {
    kit.sun.shadow.shadowRegion.removeCaster(n);
    for (const c of n.children) drop(c);
  };
  drop(node);
  node.remove();
  node.dispose();
}

function boxCollider(size: Vector3): Collider {
  const c = new Collider();
  c.size = size;
  return c;
}

/** A static box: a Collider and no RigidBody. */
export function staticBox(kit: Kit, size: Vector3, pos: Vector3, color: Rgb, rotation?: Quaternion): Mesh {
  const mesh = new Mesh(kit.scene, new BoxShape({ size: size.x, sizeY: size.y, sizeZ: size.z }), mat(color));
  mesh.position.set(pos);
  if (rotation) mesh.rotation = rotation;
  mesh.physics = new NodePhysics({ colliders: [boxCollider(size)] });
  cast(kit, mesh);
  return mesh;
}

/** The floor: a wide, thin static box whose top is at y = 0. */
export function floor(kit: Kit, width = 20, depth = 20, color: Rgb = GREY): Mesh {
  const f = staticBox(kit, new Vector3(width, 0.5, depth), new Vector3(0, -0.25, 0), color);
  f.castShadow = false;
  return f;
}

/** A dynamic box. */
export function dynBox(kit: Kit, size: Vector3 | number, pos: Vector3, color: Rgb, mass = 1): Mesh {
  const s = typeof size === 'number' ? new Vector3(size, size, size) : size;
  const mesh = new Mesh(kit.scene, new BoxShape({ size: s.x, sizeY: s.y, sizeZ: s.z }), mat(color));
  mesh.position.set(pos);
  const body = new RigidBody();
  body.mass = mass;
  mesh.physics = new NodePhysics({ body, colliders: [boxCollider(s)] });
  cast(kit, mesh);
  return mesh;
}

/** A dynamic ball. */
export function dynBall(kit: Kit, radius: number, pos: Vector3, color: Rgb, mass = 1): Mesh {
  const mesh = new Mesh(kit.scene, new SphereShape({ radius }), mat(color));
  mesh.position.set(pos);
  const body = new RigidBody();
  body.mass = mass;
  const collider = new Collider();
  collider.shape = 'sphere';
  collider.radius = radius;
  mesh.physics = new NodePhysics({ body, colliders: [collider] });
  cast(kit, mesh);
  return mesh;
}

/** A capsule mesh whose total height (round ends included) matches Collider.height. */
export function capsuleShape(radius: number, totalHeight: number): CapsuleShape {
  return new CapsuleShape({ radius, height: totalHeight - 2 * radius });
}

/** A cylinder mesh standing on Y, centred. */
export function cylinderShape(radius: number, height: number): CylinderShape {
  return new CylinderShape({ topRadius: radius, bottomRadius: radius, height, anchor: 0.5 });
}

/** The collider on a mesh, for tweaking after the fact. */
export function colliderOf(node: SceneNode, i = 0): Collider {
  return node.physics!.colliders[i]!;
}

/** Sets a mesh's colour in place. */
export function tint(node: Mesh, c: Rgb): void {
  (node.material as PBRMetallicRoughnessMaterial).albedoColor = new Vector4(c[0], c[1], c[2], 1);
}

/** Repeats `fn` (a respawn) on a timer in cards; in the full view `fn` is for buttons only. */
export function loopInCard(kit: Kit, ms: number, fn: () => void): void {
  if (kit.stage.preview) kit.stage.every(ms, fn);
}

/**
 * Builds a set of bodies now, and rebuilds them on a Reset button (full view) or every
 * `cardMs` (cards). `build` returns every node it made, so the old ones can be discarded.
 */
export function respawn(kit: Kit, build: () => Mesh[], cardMs = 8000, label = 'Reset'): () => void {
  let nodes = build();
  const reset = (): void => {
    for (const n of nodes) discard(kit, n);
    nodes = build();
  };
  if (kit.stage.bar) button(kit.stage.bar, label, reset);
  else kit.stage.every(cardMs, reset);
  return reset;
}
