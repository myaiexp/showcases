// Wireframes for collider shapes, drawn from thin boxes (no toolkit needed)
import {
  BoxColliderShape,
  CapsuleColliderShape,
  type Collider,
  type ColliderShape,
  ColliderShapeUpAxis,
  type Entity,
  type Material,
  Matrix,
  PlaneColliderShape,
  Quaternion,
  SphereColliderShape,
  Vector3,
} from '@galacean/engine';
import { type Line, line } from './core-kit.ts';
import { tick } from './gfx-kit.ts';

type Path = Vector3[];

/** A circle (or arc) of radius `r` around the `axis` axis. */
const ring = (r: number, n: number, axis: 0 | 1 | 2): Path =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = (Math.PI * 2 * i) / n;
    const u = Math.cos(t) * r;
    const v = Math.sin(t) * r;
    return axis === 0 ? new Vector3(0, u, v) : axis === 1 ? new Vector3(u, 0, v) : new Vector3(u, v, 0);
  });

/** The shape's outline as polylines in the shape's own space (a fixed number per shape type). */
function paths(shape: ColliderShape): Path[] {
  if (shape instanceof BoxColliderShape) {
    const h = shape.size;
    const c = Array.from({ length: 8 }, (_, i) => new Vector3(i & 1 ? h.x / 2 : -h.x / 2, i & 2 ? h.y / 2 : -h.y / 2, i & 4 ? h.z / 2 : -h.z / 2));
    const e = [0, 1, 1, 3, 3, 2, 2, 0, 4, 5, 5, 7, 7, 6, 6, 4, 0, 4, 1, 5, 3, 7, 2, 6];
    return Array.from({ length: 12 }, (_, i) => [c[e[i * 2]!]!, c[e[i * 2 + 1]!]!]);
  }
  if (shape instanceof SphereColliderShape) return [0, 1, 2].map((a) => ring(shape.radius, 24, a as 0 | 1 | 2));
  if (shape instanceof CapsuleColliderShape) {
    const r = shape.radius;
    const hh = shape.height / 2;
    // Built along Y, then the axis swapped in place for upAxis X or Z.
    const swap = (p: Vector3): Vector3 => (shape.upAxis === ColliderShapeUpAxis.X ? p.set(p.y, p.x, p.z) : shape.upAxis === ColliderShapeUpAxis.Z ? p.set(p.x, p.z, p.y) : p);
    const out: Path[] = [];
    for (const s of [1, -1]) {
      out.push(ring(r, 16, 1).map((p) => p.set(p.x, s * hh, p.z)));
      for (const plane of [0, 1] as const) {
        const arc = Array.from({ length: 9 }, (_, i) => {
          const a = (Math.PI * i) / 8;
          const x = Math.cos(a) * r;
          const y = s * (hh + Math.sin(a) * r);
          return plane === 0 ? new Vector3(x, y, 0) : new Vector3(0, y, x);
        });
        out.push(arc);
      }
    }
    for (const [x, z] of [[r, 0], [-r, 0], [0, r], [0, -r]] as const) out.push([new Vector3(x, hh, z), new Vector3(x, -hh, z)]);
    return out.map((p) => p.map(swap));
  }
  if (shape instanceof PlaneColliderShape) {
    const s = 3;
    const c = [new Vector3(-s, 0, -s), new Vector3(s, 0, -s), new Vector3(s, 0, s), new Vector3(-s, 0, s)];
    return [[c[0]!, c[1]!], [c[1]!, c[2]!], [c[2]!, c[3]!], [c[3]!, c[0]!], [new Vector3(-s, 0, 0), new Vector3(s, 0, 0)], [new Vector3(0, 0, -s), new Vector3(0, 0, s)]];
  }
  return [];
}

interface Drawn {
  lines: Line[];
  counts: number[];
}

const local = new Matrix();
const full = new Matrix();
const spin = new Quaternion();
const one = new Vector3(1, 1, 1);
const a = new Vector3();
const b = new Vector3();

/**
 * Draws every shape of `collider` as lines (follows shapes added or removed later). `root` must sit at the
 * origin unrotated; triggers use `triggerMaterial` when given.
 */
export function outline(root: Entity, collider: Collider, material: Material, triggerMaterial: Material = material, thickness = 0.03): void {
  const drawn = new Map<ColliderShape, Drawn & { trigger: boolean }>();
  const holder = root.createChild('outline');
  const retire = (shape: ColliderShape): void => {
    for (const l of drawn.get(shape)!.lines) l.entity.destroy();
    drawn.delete(shape);
  };
  tick(holder, () => {
    for (const s of [...drawn.keys()]) if (!collider.shapes.includes(s) || drawn.get(s)!.trigger !== s.isTrigger) retire(s);
    for (const shape of collider.shapes) {
      const ps = paths(shape);
      let d = drawn.get(shape);
      if (!d) {
        const lines: Line[] = [];
        const counts = ps.map((p) => p.length - 1);
        for (const n of counts) for (let i = 0; i < n; i++) lines.push(line(holder, shape.isTrigger ? triggerMaterial : material, thickness));
        drawn.set(shape, (d = { lines, counts, trigger: shape.isTrigger }));
      }
      const r = shape.rotation;
      Quaternion.rotationYawPitchRoll((r.y * Math.PI) / 180, (r.x * Math.PI) / 180, (r.z * Math.PI) / 180, spin);
      Matrix.affineTransformation(one, spin, shape.position, local);
      Matrix.multiply(collider.entity.transform.worldMatrix, local, full);
      let k = 0;
      ps.forEach((p, pi) => {
        for (let i = 0; i < d!.counts[pi]!; i++) {
          Vector3.transformCoordinate(p[i]!, full, a);
          Vector3.transformCoordinate(p[i + 1]!, full, b);
          d!.lines[k++]!.set(a, b);
        }
      });
    }
  });
}
