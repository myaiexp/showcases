// Character controller kit: a capsule character and the docs' walk script
import {
  CapsuleColliderShape,
  CharacterController,
  ControllerCollisionFlag,
  type Entity,
  PrimitiveMesh,
  Script,
  Vector3,
} from '@galacean/engine';
import type { Rgb3 } from './core-kit.ts';
import { add, blinn } from './gfx-kit.ts';
import { wall } from './phys-kit.ts';

export interface Character {
  entity: Entity;
  controller: CharacterController;
  shape: CapsuleColliderShape;
}

/** A capsule mesh with a CharacterController and one CapsuleColliderShape (radius 0.4, straight part 1.2). */
export function character(parent: Entity, pos: [number, number, number], color: Rgb3, name = 'character'): Character {
  const { engine } = parent;
  const { entity } = add(parent, PrimitiveMesh.createCapsule(engine, 0.4, 1.2, 20, 1), blinn(engine, [...color], 30), pos, name);
  const controller = entity.addComponent(CharacterController);
  const shape = new CapsuleColliderShape();
  shape.radius = 0.4;
  shape.height = 1.2;
  controller.addShape(shape);
  return { entity, controller, shape };
}

/**
 * The docs' movement script: a wanted velocity from `drive`, gravity along -`up` by hand
 * (a CharacterController has none), then `controller.move`. `flags` is the last result.
 */
export class Walker extends Script {
  controller!: CharacterController;
  /** The wanted velocity in world space; `jump` is a one-frame request. */
  drive: (dt: number) => { velocity: Vector3; jump?: boolean } = () => ({ velocity: new Vector3() });
  up = new Vector3(0, 1, 0);
  jumpSpeed = 6;
  flags = 0;
  grounded = false;
  private climb = 0;
  private readonly disp = new Vector3();
  override onUpdate(frameTime: number): void {
    const dt = Math.min(frameTime, 1 / 30);
    const { velocity, jump } = this.drive(dt);
    this.climb += this.scene.physics.gravity.y * dt;
    if (this.grounded && this.climb < 0) this.climb = -1;
    if (this.grounded && jump) this.climb = this.jumpSpeed;
    this.disp.set(velocity.x + this.up.x * this.climb, velocity.y + this.up.y * this.climb, velocity.z + this.up.z * this.climb).scale(dt);
    this.flags = this.controller.move(this.disp, 0, dt);
    this.grounded = (this.flags & ControllerCollisionFlag.Down) !== 0;
    if ((this.flags & ControllerCollisionFlag.Up) !== 0 && this.climb > 0) this.climb = 0;
  }
}

/** "Sides Down" style text for a flags value. */
export function flagNames(flags: number): string {
  const names = [];
  if (flags & ControllerCollisionFlag.Sides) names.push('Sides');
  if (flags & ControllerCollisionFlag.Up) names.push('Up');
  if (flags & ControllerCollisionFlag.Down) names.push('Down');
  return names.length ? names.join(' | ') : 'None';
}

/** A static slab whose top face starts at (startX, 0) and rises at `angle` degrees along +x. */
export function incline(parent: Entity, angle: number, length: number, startX: number, color: Rgb3): Entity {
  const t = 0.4;
  const a = (angle * Math.PI) / 180;
  const cx = startX + (length / 2) * Math.cos(a) + (t / 2) * Math.sin(a);
  const cy = (length / 2) * Math.sin(a) - (t / 2) * Math.cos(a);
  const slab = wall(parent, [cx, cy, 0], [length, t, 3], color, 'incline');
  slab.entity.transform.setRotation(0, 0, angle);
  return slab.entity;
}

/** `count` static steps of `height` and `depth` rising along +x from `startX`. */
export function stairs(parent: Entity, count: number, height: number, depth: number, startX: number, color: Rgb3): void {
  for (let i = 0; i < count; i++) wall(parent, [startX + depth * (i + 0.5), (height * (i + 1)) / 2, 0], [depth, height * (i + 1), 3], color, `step ${i + 1}`);
}
