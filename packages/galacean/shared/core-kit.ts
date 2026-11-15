// Scene helpers for Core, Script, Input, Assets: lights, solids, ticks
import {
  BlinnPhongMaterial,
  BoxColliderShape,
  type Camera,
  DirectLight,
  type Engine,
  type Entity,
  type Material,
  type Mesh,
  MeshRenderer,
  type ModelMesh,
  PrimitiveMesh,
  Quaternion,
  Script,
  SphereColliderShape,
  UnlitMaterial,
  Vector3,
} from '@galacean/engine';
import { addCamera, type Stage } from './stage.ts';

export type Rgb3 = readonly [number, number, number];

export const PALETTE = {
  red: [0.93, 0.3, 0.3],
  green: [0.35, 0.85, 0.45],
  blue: [0.35, 0.55, 1],
  amber: [1, 0.75, 0.25],
  violet: [0.7, 0.5, 1],
  cyan: [0.3, 0.85, 0.9],
  grey: [0.6, 0.64, 0.7],
  white: [0.95, 0.95, 0.95],
} as const satisfies Record<string, Rgb3>;

/** A camera, a directional light and a grey ambient light: the usual starting point. */
export function lit(stage: Stage, position: [number, number, number] = [0, 2.5, 8], target: [number, number, number] = [0, 0, 0]): Camera {
  const camera = addCamera(stage.root, position, target);
  const light = stage.root.createChild('light');
  light.transform.setRotation(-45, -40, 0);
  light.addComponent(DirectLight);
  stage.scene.ambientLight.diffuseSolidColor.set(0.38, 0.4, 0.46, 1);
  return camera;
}

export function unlit(engine: Engine, [r, g, b]: Rgb3, alpha = 1): UnlitMaterial {
  const material = new UnlitMaterial(engine);
  material.baseColor.set(r, g, b, alpha);
  if (alpha < 1) material.isTransparent = true;
  return material;
}

export function phong(engine: Engine, [r, g, b]: Rgb3): BlinnPhongMaterial {
  const material = new BlinnPhongMaterial(engine);
  material.baseColor.set(r, g, b, 1);
  return material;
}

/** A child entity of `parent` that draws `mesh` with `material` at `position`. */
export function solid(parent: Entity, mesh: Mesh, material: Material, position: [number, number, number] = [0, 0, 0], name = 'solid'): Entity {
  const entity = parent.createChild(name);
  entity.transform.setPosition(...position);
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(material);
  return entity;
}

const unitBoxes = new WeakMap<Engine, ModelMesh>();
const unitCones = new WeakMap<Engine, ModelMesh>();
const unitBox = (engine: Engine): ModelMesh => {
  let mesh = unitBoxes.get(engine);
  if (!mesh) unitBoxes.set(engine, (mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1)));
  return mesh;
};
const unitCone = (engine: Engine): ModelMesh => {
  let mesh = unitCones.get(engine);
  if (!mesh) unitCones.set(engine, (mesh = PrimitiveMesh.createCone(engine, 0.5, 1, 16, 1)));
  return mesh;
};

const tmpMid = new Vector3();
const tmpDir = new Vector3();

export interface Line {
  entity: Entity;
  /** Stretches the line between two world points (the parent must sit at the origin, unrotated). */
  set(a: Vector3, b: Vector3): void;
}

/** A thin box that can be pointed from one world point to another. */
export function line(parent: Entity, material: Material, thickness = 0.04): Line {
  const entity = solid(parent, unitBox(parent.engine), material, [0, 0, 0], 'line');
  return {
    entity,
    set(a, b) {
      Vector3.subtract(b, a, tmpDir);
      const length = tmpDir.length();
      entity.isActive = length > 1e-5;
      if (!entity.isActive) return;
      Vector3.add(a, b, tmpMid);
      tmpMid.scale(0.5);
      entity.transform.setWorldPosition(tmpMid.x, tmpMid.y, tmpMid.z);
      entity.transform.lookAt(b, Math.abs(tmpDir.y / length) > 0.99 ? new Vector3(1, 0, 0) : new Vector3(0, 1, 0));
      entity.transform.setScale(thickness, thickness, length);
    },
  };
}

export interface Polyline {
  set(points: readonly Vector3[], closed?: boolean): void;
}

/** `segments` lines drawn through a list of points. */
export function polyline(parent: Entity, material: Material, segments: number, thickness = 0.03): Polyline {
  const lines = Array.from({ length: segments }, () => line(parent, material, thickness));
  return {
    set(points, closed = false) {
      lines.forEach((l, i) => {
        const a = points[i];
        const b = points[closed ? (i + 1) % points.length : i + 1];
        if (a && b && i < (closed ? points.length : points.length - 1)) {
          l.entity.isActive = true;
          l.set(a, b);
        } else {
          l.entity.isActive = false;
        }
      });
    },
  };
}

export interface Arrow {
  entity: Entity;
  /** Draws an arrow from `origin` along `vector` (so its length is the vector's length). */
  set(origin: Vector3, vector: Vector3): void;
}

export function arrow(parent: Entity, material: Material, thickness = 0.05): Arrow {
  const shaft = line(parent, material, thickness);
  const head = parent.createChild('arrowhead');
  const cone = solid(head, unitCone(parent.engine), material, [0, 0, 0], 'cone');
  cone.transform.setRotation(-90, 0, 0);
  const tip = new Vector3();
  const base = new Vector3();
  const back = new Vector3();
  const headLength = 0.4;
  return {
    entity: head,
    set(origin, vector) {
      const length = vector.length();
      head.isActive = shaft.entity.isActive = length > 1e-5;
      if (!head.isActive) return;
      Vector3.add(origin, vector, tip);
      back.copyFrom(vector).normalize().scale(-Math.min(headLength, length));
      Vector3.add(tip, back, base);
      shaft.set(origin, base);
      head.transform.setWorldPosition(tip.x + back.x / 2, tip.y + back.y / 2, tip.z + back.z / 2);
      head.transform.lookAt(tip, Math.abs(vector.y / length) > 0.99 ? new Vector3(1, 0, 0) : new Vector3(0, 1, 0));
      const size = Math.min(headLength, length);
      cone.transform.setScale(size * 0.7, size, size * 0.7);
    },
  };
}

/** A small sphere that follows a point. */
export function marker(parent: Entity, material: Material, size = 0.16): { entity: Entity; set(p: Vector3): void } {
  const entity = solid(parent, PrimitiveMesh.createSphere(parent.engine, size / 2, 12), material, [0, 0, 0], 'marker');
  return { entity, set: (p) => entity.transform.setPosition(p.x, p.y, p.z) };
}

/** A wireframe box drawn from twelve lines. */
export function wireBox(parent: Entity, material: Material, thickness = 0.03): { entity: Entity; set(min: Vector3, max: Vector3): void } {
  const entity = parent.createChild('wire box');
  const lines = Array.from({ length: 12 }, () => line(entity, material, thickness));
  const c = Array.from({ length: 8 }, () => new Vector3());
  const edges = [0, 1, 1, 3, 3, 2, 2, 0, 4, 5, 5, 7, 7, 6, 6, 4, 0, 4, 1, 5, 3, 7, 2, 6];
  return {
    entity,
    set(min, max) {
      c.forEach((p, i) => p.set(i & 1 ? max.x : min.x, i & 2 ? max.y : min.y, i & 4 ? max.z : min.z));
      lines.forEach((l, i) => l.set(c[edges[i * 2]!]!, c[edges[i * 2 + 1]!]!));
    },
  };
}

/** Three great circles of a sphere. */
export function wireSphere(parent: Entity, material: Material, thickness = 0.025): { entity: Entity; set(center: Vector3, radius: number): void } {
  const n = 40;
  const entity = parent.createChild('wire sphere');
  const rings = [0, 1, 2].map(() => polyline(entity, material, n, thickness));
  const pts = Array.from({ length: n }, () => new Vector3());
  return {
    entity,
    set(center, radius) {
      rings.forEach((ring, axis) => {
        pts.forEach((p, i) => {
          const a = (i / n) * Math.PI * 2;
          const u = Math.cos(a) * radius;
          const v = Math.sin(a) * radius;
          if (axis === 0) p.set(center.x + u, center.y + v, center.z);
          else if (axis === 1) p.set(center.x, center.y + u, center.z + v);
          else p.set(center.x + v, center.y, center.z + u);
        });
        ring.set(pts, true);
      });
    },
  };
}

class Tick extends Script {
  fn: ((deltaTime: number, elapsed: number) => void) | undefined;
  override onUpdate(deltaTime: number): void {
    this.fn?.(deltaTime, this.engine.time.elapsedTime);
  }
}

/** Runs `fn(deltaTime, elapsedSeconds)` every frame from a Script on its own entity. */
export function tick(root: Entity, fn: (deltaTime: number, elapsed: number) => void): Entity {
  const entity = root.createChild('tick');
  entity.addComponent(Tick).fn = fn;
  return entity;
}

/** "x, y, z" with `digits` decimals, for readouts. */
export const v3 = (v: { x: number; y: number; z: number }, digits = 2): string => `${v.x.toFixed(digits)}, ${v.y.toFixed(digits)}, ${v.z.toFixed(digits)}`;

/** A translucent square sheet for a plane (normal `n`, signed `distance` as in Plane: n.p + distance = 0). */
export function planeSheet(parent: Entity, material: Material, size = 7): { entity: Entity; set(normal: Vector3, distance: number): void } {
  const entity = solid(parent, PrimitiveMesh.createPlane(parent.engine, size, size), material, [0, 0, 0], 'plane');
  const axis = new Vector3();
  const up = new Vector3(0, 1, 0);
  const q = new Quaternion();
  const unit = new Vector3();
  return {
    entity,
    set(normal, distance) {
      unit.copyFrom(normal).normalize();
      Vector3.cross(up, unit, axis);
      const angle = Math.acos(Math.max(-1, Math.min(1, Vector3.dot(up, unit))));
      if (axis.length() < 1e-6) q.set(0, 0, 0, 1).rotateX(unit.y < 0 ? Math.PI : 0);
      else Quaternion.rotationAxisAngle(axis.normalize(), angle, q);
      entity.transform.rotationQuaternion = q;
      entity.transform.setPosition(-unit.x * distance, -unit.y * distance, -unit.z * distance);
    },
  };
}

/** A box collider shape of the given size. */
export function boxShape(x: number, y: number, z: number, isTrigger = false): BoxColliderShape {
  const shape = new BoxColliderShape();
  shape.size = new Vector3(x, y, z);
  shape.isTrigger = isTrigger;
  return shape;
}

/** A sphere collider shape of the given radius. */
export function sphereShape(radius: number, isTrigger = false): SphereColliderShape {
  const shape = new SphereColliderShape();
  shape.radius = radius;
  shape.isTrigger = isTrigger;
  return shape;
}
