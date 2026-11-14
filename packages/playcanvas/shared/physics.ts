// Physics chapter setup: ammo.js, a lit floor scene, body and timer helpers
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { loadAmmo } from './ammo.ts';
import { createScene, material, type Scene } from './components.ts';

export const PALETTE = ['#e8794a', '#f2c14e', '#7bc67b', '#4ab3e8', '#a78bfa', '#ec6fa9'] as const;

export interface PhysicsSceneOptions {
  height?: number;
  distance?: number;
  pitch?: number;
  yaw?: number;
  target?: [number, number, number];
  autoRotate?: number;
  /** Side of the square static floor, in metres; 0 for none. Default 14. */
  floor?: number;
  floorFriction?: number;
  floorRestitution?: number;
  floorColour?: string;
  /** Leave the camera's orbit off entirely. */
  orbit?: false;
}

export interface PhysicsScene extends Scene {
  physics: pc.RigidBodyComponentSystem;
  /** The static floor box (its top face is y = 0), or null without a floor. */
  floor: pc.Entity | null;
}

/** Awaits ammo.js, then builds a stage with camera, sun, orbit and a static floor box. */
export async function createPhysicsScene(el: HTMLElement, ctx: MountContext, o: PhysicsSceneOptions = {}): Promise<PhysicsScene> {
  await loadAmmo();
  const scene = await createScene(el, ctx, {
    height: o.height,
    sun: { shadows: true, angles: [55, 25, 0] },
    orbit:
      o.orbit === false
        ? false
        : { distance: o.distance ?? 14, pitch: o.pitch ?? -24, yaw: o.yaw ?? 30, target: new pc.Vec3(...(o.target ?? [0, 1.5, 0])), autoRotate: o.autoRotate ?? 8 },
  });
  const size = o.floor ?? 14;
  let floor: pc.Entity | null = null;
  if (size > 0) {
    floor = new pc.Entity('floor');
    floor.addComponent('render', { type: 'box', material: material(o.floorColour ?? '#2f3442'), castShadows: false });
    floor.addComponent('collision', { type: 'box', halfExtents: new pc.Vec3(size / 2, 0.5, size / 2) });
    floor.addComponent('rigidbody', { type: 'static', friction: o.floorFriction ?? 0.5, restitution: o.floorRestitution ?? 0 });
    floor.setLocalScale(size, 1, size);
    floor.setPosition(0, -0.5, 0);
    scene.app.root.addChild(floor);
  }
  return { ...scene, physics: scene.app.systems.rigidbody!, floor };
}

export type ShapeKind = 'box' | 'sphere' | 'capsule' | 'cylinder' | 'cone';

export interface BodyOptions {
  shape?: ShapeKind;
  /** Box: full width/height/depth. Others: uniform scale of the unit primitive
   *  (sphere diameter 1, capsule radius 0.5 height 2, cylinder and cone radius 0.5 height 1). */
  size?: number | [number, number, number];
  colour?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  type?: 'static' | 'dynamic' | 'kinematic';
  /** Rigidbody properties: mass, friction, restitution, damping, factors, gravityScale ... */
  body?: Record<string, unknown>;
  name?: string;
  castShadows?: boolean;
}

/** One render primitive with a matching collision shape and a rigidbody, added to the app root. */
export function addBody(app: pc.AppBase, o: BodyOptions = {}): pc.Entity {
  const shape = o.shape ?? 'box';
  const s = o.size ?? 1;
  const dims: [number, number, number] = Array.isArray(s) ? s : [s, s, s];
  const e = new pc.Entity(o.name ?? shape);
  e.addComponent('render', { type: shape, material: material(o.colour ?? PALETTE[0]), castShadows: o.castShadows ?? true });
  const k = dims[0];
  const collision: Record<string, unknown> =
    shape === 'box'
      ? { type: 'box', halfExtents: new pc.Vec3(dims[0] / 2, dims[1] / 2, dims[2] / 2) }
      : shape === 'sphere'
        ? { type: 'sphere', radius: k / 2 }
        : shape === 'capsule'
          ? { type: 'capsule', radius: k * 0.5, height: k * 2 }
          : { type: shape, radius: k * 0.5, height: k };
  e.addComponent('collision', collision);
  e.addComponent('rigidbody', { type: o.type ?? 'dynamic', ...o.body });
  e.setLocalScale(...(shape === 'box' ? dims : ([k, k, k] as [number, number, number])));
  if (o.rotation) e.setEulerAngles(...o.rotation);
  if (o.position) e.setPosition(...o.position);
  app.root.addChild(e);
  return e;
}

/** Respawn a dynamic body at rest: clear its velocities first, then teleport. */
export function respawn(e: pc.Entity, position: [number, number, number], rotation: [number, number, number] = [0, 0, 0]): void {
  const rb = e.rigidbody!;
  rb.linearVelocity = pc.Vec3.ZERO;
  rb.angularVelocity = pc.Vec3.ZERO;
  rb.teleport(new pc.Vec3(...position), new pc.Vec3(...rotation));
}

/** Calls `fn` every `seconds` of app time (not at time zero). The listener goes with the app. */
export function every(app: pc.AppBase, seconds: number, fn: (count: number) => void): void {
  let t = 0;
  let n = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (t < seconds) return;
    t -= seconds;
    fn(++n);
  });
}

/** Sets a StandardMaterial colour (and optional emissive) in place. */
export function tint(e: pc.Entity, colour: string, emissive?: string): void {
  const m = e.render!.meshInstances[0]!.material as pc.StandardMaterial;
  m.diffuse.fromString(colour);
  m.emissive.fromString(emissive ?? '#000000');
  m.update();
}

/** A purely visual marker (no physics): a small emissive sphere or box. */
export function addMarker(app: pc.AppBase, colour: string, size = 0.2, type: 'sphere' | 'box' = 'sphere'): pc.Entity {
  const e = new pc.Entity('marker');
  e.addComponent('render', { type, material: material(colour, { emissive: colour }), castShadows: false });
  e.setLocalScale(size, size, size);
  app.root.addChild(e);
  return e;
}
