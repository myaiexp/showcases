// Ghost wireframes for query shapes: boxes, spheres and capsules
import { type Entity, type Material, Matrix, Quaternion, Vector3 } from '@galacean/engine';
import { type Line, line } from './core-kit.ts';

type Path = Vector3[];

const circle = (r: number, n: number, axis: 0 | 1 | 2): Path =>
  Array.from({ length: n + 1 }, (_, i) => {
    const t = (Math.PI * 2 * i) / n;
    const u = Math.cos(t) * r;
    const v = Math.sin(t) * r;
    return axis === 0 ? new Vector3(0, u, v) : axis === 1 ? new Vector3(u, 0, v) : new Vector3(u, v, 0);
  });

const world = new Matrix();
const a = new Vector3();
const b = new Vector3();
const one = new Vector3(1, 1, 1);

class Ghost {
  private readonly lines: Line[] = [];
  readonly holder: Entity;
  private readonly material: Material;
  private readonly thickness: number;
  constructor(parent: Entity, material: Material, thickness: number) {
    this.holder = parent.createChild('ghost');
    this.material = material;
    this.thickness = thickness;
  }
  /** Draws `paths` (shape space) at `center` turned by `rotation`; hides everything when `visible` is false. */
  draw(paths: Path[], center: Vector3, rotation: Quaternion, visible = true): void {
    const total = paths.reduce((n, p) => n + p.length - 1, 0);
    while (this.lines.length < total) this.lines.push(line(this.holder, this.material, this.thickness));
    this.holder.isActive = visible;
    if (!visible) return;
    Matrix.affineTransformation(one, rotation, center, world);
    let k = 0;
    for (const p of paths) {
      for (let i = 0; i < p.length - 1; i++) {
        Vector3.transformCoordinate(p[i]!, world, a);
        Vector3.transformCoordinate(p[i + 1]!, world, b);
        this.lines[k++]!.set(a, b);
      }
    }
    for (; k < this.lines.length; k++) this.lines[k]!.entity.isActive = false;
  }
}

const boxPaths = (h: Vector3): Path[] => {
  const c = Array.from({ length: 8 }, (_, i) => new Vector3(i & 1 ? h.x : -h.x, i & 2 ? h.y : -h.y, i & 4 ? h.z : -h.z));
  const e = [0, 1, 1, 3, 3, 2, 2, 0, 4, 5, 5, 7, 7, 6, 6, 4, 0, 4, 1, 5, 3, 7, 2, 6];
  return Array.from({ length: 12 }, (_, i) => [c[e[i * 2]!]!, c[e[i * 2 + 1]!]!]);
};

const capsulePaths = (r: number, height: number): Path[] => {
  const hh = height / 2;
  const out: Path[] = [];
  for (const s of [1, -1]) {
    out.push(circle(r, 16, 1).map((p) => p.set(p.x, s * hh, p.z)));
    for (const plane of [0, 1]) {
      out.push(Array.from({ length: 9 }, (_, i) => {
        const t = (Math.PI * i) / 8;
        const x = Math.cos(t) * r;
        const y = s * (hh + Math.sin(t) * r);
        return plane === 0 ? new Vector3(x, y, 0) : new Vector3(0, y, x);
      }));
    }
  }
  for (const [x, z] of [[r, 0], [-r, 0], [0, r], [0, -r]] as const) out.push([new Vector3(x, hh, z), new Vector3(x, -hh, z)]);
  return out;
};

const identity = new Quaternion();

export function ghostBox(parent: Entity, material: Material, thickness = 0.03): { set(center: Vector3 | false, halfExtents?: Vector3, rotation?: Quaternion): void } {
  const g = new Ghost(parent, material, thickness);
  return { set: (center, half = one, rotation = identity) => (center ? g.draw(boxPaths(half), center, rotation) : g.draw([], a, identity, false)) };
}

export function ghostSphere(parent: Entity, material: Material, thickness = 0.03): { set(center: Vector3 | false, radius?: number): void } {
  const g = new Ghost(parent, material, thickness);
  return { set: (center, r = 1) => (center ? g.draw([0, 1, 2].map((x) => circle(r, 24, x as 0 | 1 | 2)), center, identity) : g.draw([], a, identity, false)) };
}

export function ghostCapsule(parent: Entity, material: Material, thickness = 0.03): { set(center: Vector3 | false, radius?: number, height?: number, rotation?: Quaternion): void } {
  const g = new Ghost(parent, material, thickness);
  return { set: (center, r = 0.5, h = 1, rotation = identity) => (center ? g.draw(capsulePaths(r, h), center, rotation) : g.draw([], a, identity, false)) };
}
