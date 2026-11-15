// Physics kit: a PhysX world with camera and light, bodies, rounds, rain
import {
  BoxColliderShape,
  type Camera,
  CapsuleColliderShape,
  DynamicCollider,
  type Engine,
  type Entity,
  type PhysicsScene,
  PointerButton,
  PrimitiveMesh,
  Ray,
  type Scene,
  SphereColliderShape,
  StaticCollider,
  Vector2,
  Vector3,
} from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { PALETTE, type Rgb3 } from './core-kit.ts';
import { add, blinn, caption, demo, tick } from './gfx-kit.ts';
import type { Stage, StageOptions } from './stage.ts';

export { PALETTE };
export type V3 = [number, number, number];

export interface World {
  stage: Stage;
  engine: Engine;
  scene: Scene;
  root: Entity;
  camera: Camera;
  physics: PhysicsScene;
  /** The caption laid over the canvas. */
  say(text: string): void;
  /** The default floor (undefined with `floor: false`). */
  ground?: Solid<BoxColliderShape>;
}

export interface WorldOptions extends StageOptions {
  camera?: V3;
  target?: V3;
  /** `false` for no floor; otherwise `{ w, d }` is the floor's size, its top face at y = 0. */
  floor?: false | { w?: number; d?: number };
}

/** A stage with the page's PhysX backend, a camera, a sun, ambient light and (by default) a static floor. */
export async function world(el: HTMLElement, ctx: MountContext, options: WorldOptions = {}): Promise<World> {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 4, 11], target: [0, 1.5, 0], ...options, physics: true });
  stage.scene.ambientLight.diffuseSolidColor.set(0.38, 0.4, 0.46, 1);
  const w: World = { stage, engine, scene: stage.scene, root, camera, physics: stage.scene.physics, say: caption(stage) };
  if (options.floor !== false) {
    const { w: fw = 14, d: fd = 8 } = options.floor ?? {};
    w.ground = wall(root, [0, -0.2, 0], [fw, 0.4, fd], PALETTE.grey, 'floor');
  }
  return w;
}

export interface Solid<S> {
  entity: Entity;
  shape: S;
}

/** A static box with a matching mesh: a floor, wall or ramp (rotate `entity` afterwards). */
export function wall(parent: Entity, pos: V3, size: V3, color: Rgb3, name = 'wall', visible = true): Solid<BoxColliderShape> & { collider: StaticCollider } {
  const entity = visible ? add(parent, PrimitiveMesh.createCuboid(parent.engine, ...size), blinn(parent.engine, [...color]), pos, name).entity : parent.createChild(name);
  entity.transform.setPosition(...pos);
  const collider = entity.addComponent(StaticCollider);
  const shape = new BoxColliderShape();
  shape.size = new Vector3(...size);
  collider.addShape(shape);
  return { entity, shape, collider };
}

/** A dynamic box. */
export function crate(parent: Entity, pos: V3, size: V3, color: Rgb3, name = 'crate'): Solid<BoxColliderShape> & { body: DynamicCollider } {
  const { entity } = add(parent, PrimitiveMesh.createCuboid(parent.engine, ...size), blinn(parent.engine, [...color]), pos, name);
  const body = entity.addComponent(DynamicCollider);
  const shape = new BoxColliderShape();
  shape.size = new Vector3(...size);
  body.addShape(shape);
  return { entity, shape, body };
}

/** A dynamic sphere. */
export function ball(parent: Entity, pos: V3, radius: number, color: Rgb3, name = 'ball'): Solid<SphereColliderShape> & { body: DynamicCollider } {
  const { entity } = add(parent, PrimitiveMesh.createSphere(parent.engine, radius, 24), blinn(parent.engine, [...color], 40), pos, name);
  const body = entity.addComponent(DynamicCollider);
  const shape = new SphereColliderShape();
  shape.radius = radius;
  body.addShape(shape);
  return { entity, shape, body };
}

/** A dynamic capsule standing on the Y axis (`height` is the straight part, as in the collider shape). */
export function pill(parent: Entity, pos: V3, radius: number, height: number, color: Rgb3, name = 'capsule'): Solid<CapsuleColliderShape> & { body: DynamicCollider } {
  const { entity } = add(parent, PrimitiveMesh.createCapsule(parent.engine, radius, height, 20, 1), blinn(parent.engine, [...color], 40), pos, name);
  const body = entity.addComponent(DynamicCollider);
  const shape = new CapsuleColliderShape();
  shape.radius = radius;
  shape.height = height;
  body.addShape(shape);
  return { entity, shape, body };
}

/** Every `seconds`, tears down the last round's entity and calls `build(round, holder)` with a fresh one. */
export function rounds(w: World, seconds: number, build: (round: number, holder: Entity) => void): { restart(): void } {
  let current = -1;
  let holder: Entity | undefined;
  let offset = 0;
  let now = 0;
  tick(w.root, (_dt, t) => {
    now = t;
    const n = Math.floor((t - offset) / seconds);
    if (n === current) return;
    current = n;
    holder?.destroy();
    holder = w.root.createChild('round');
    build(n, holder);
  });
  return {
    restart() {
      offset = now;
      current = -1;
    },
  };
}

/** Calls `make` every `every` seconds (first call at once) and keeps at most `max` of what it made. */
export function rain(w: World, every: number, max: number, make: (n: number, parent: Entity) => Entity): { clear(): void } {
  const made: Entity[] = [];
  let acc = every;
  let n = 0;
  tick(w.root, (dt) => {
    acc += dt;
    if (acc >= every) {
      acc = 0;
      made.push(make(n++, w.root));
      while (made.length > max) made.shift()!.destroy();
    }
    for (let i = made.length - 1; i >= 0; i--) {
      if (made[i]!.transform.position.y < -12) made.splice(i, 1)[0]!.destroy();
    }
  });
  return {
    clear() {
      for (const e of made.splice(0)) e.destroy();
    },
  };
}

/** In the full view, calls `fn(ray)` once per press on the canvas (the camera ray through the pointer). */
export function onPress(w: World, fn: (ray: Ray) => void): void {
  if (w.stage.preview) return;
  const ray = new Ray();
  const at = new Vector2();
  tick(w.root, () => {
    const input = w.engine.inputManager;
    const pointer = input.pointers[0];
    if (pointer && input.isPointerDown(PointerButton.Primary)) {
      w.camera.screenPointToRay(at.set(pointer.position.x, pointer.position.y), ray);
      fn(ray);
    }
  });
}

/** A random number in [-1, 1) from a seed, so cards repeat the same story. */
export function rnd(seed: number): number {
  const s = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
}

export const fmt = (v: { x: number; y: number; z: number }, d = 1): string => `${v.x.toFixed(d)}, ${v.y.toFixed(d)}, ${v.z.toFixed(d)}`;
