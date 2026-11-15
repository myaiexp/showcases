// Joint hierarchies and keyframe clips sampled from pose functions
import { type AnimationDef, type ChannelDef, type Glb, translationIbm, type Vec3, type Vec4 } from './glb.ts';

/** A joint at rest: only a position, no rotation. `parent` is an index into the list, or -1. */
export interface JointDef {
  name: string;
  parent: number;
  world: Vec3;
}

export interface Rig {
  /** Node index per joint, in JointDef order (also the JOINTS_0 numbering). */
  nodes: number[];
  skin: number;
}

/** Adds the joint nodes (local translations from the world rest positions) and a skin. */
export function addRig(glb: Glb, joints: JointDef[], skinName: string): Rig {
  const nodes = joints.map((j) => {
    const p = joints[j.parent]?.world ?? ([0, 0, 0] as Vec3);
    return glb.addNode({ name: j.name, translation: [j.world[0] - p[0], j.world[1] - p[1], j.world[2] - p[2]] });
  });
  joints.forEach((j, i) => {
    if (j.parent >= 0) glb.addChild(nodes[j.parent]!, nodes[i]!);
  });
  const root = nodes[joints.findIndex((j) => j.parent < 0)]!;
  const skin = glb.addSkin({
    name: skinName,
    joints: nodes,
    inverseBindMatrices: translationIbm(joints.map((j) => j.world)),
    skeleton: root,
  });
  return { nodes, skin };
}

/** Euler angles (radians, applied about X, then Y, then Z in world axes) to a quaternion [x,y,z,w]. */
export function eulerQuat(x: number, y: number, z: number): Vec4 {
  const [sx, cx, sy, cy, sz, cz] = [Math.sin(x / 2), Math.cos(x / 2), Math.sin(y / 2), Math.cos(y / 2), Math.sin(z / 2), Math.cos(z / 2)];
  // q = qz * qy * qx
  return [
    cz * cy * sx - sz * sy * cx,
    cz * sy * cx + sz * cy * sx,
    sz * cy * cx - cz * sy * sx,
    cz * cy * cx + sz * sy * sx,
  ];
}

/** 0 below a, 1 above b, eased between. */
export function smoothstep(a: number, b: number, t: number): number {
  const s = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return s * s * (3 - 2 * s);
}

/**
 * A smooth periodic curve through [u, value] points (u in [0, 1), ascending). The curve wraps
 * from the last point back to the first, with cubic Hermite tangents taken from the neighbours.
 */
export function curve(points: [number, number][]): (u: number) => number {
  const n = points.length;
  const at = (i: number): [number, number] => {
    const [u, v] = points[((i % n) + n) % n]!;
    return [u + Math.floor(i / n), v];
  };
  return (u) => {
    const t = u - Math.floor(u);
    let i = n - 1;
    while (i > 0 && points[i]![0] > t) i--;
    const [u0, v0] = at(i);
    const [u1, v1] = at(i + 1);
    const [um, vm] = at(i - 1);
    const [up, vp] = at(i + 2);
    const m0 = ((v1 - vm) / (u1 - um)) * (u1 - u0);
    const m1 = ((vp - v0) / (up - u0)) * (u1 - u0);
    const s = (t - u0) / (u1 - u0);
    const [s2, s3] = [s * s, s * s * s];
    return (2 * s3 - 3 * s2 + 1) * v0 + (s3 - 2 * s2 + s) * m0 + (-2 * s3 + 3 * s2) * v1 + (s3 - s2) * m1;
  };
}

/** One pose: Euler rotations by joint name, and absolute translations (for the root joint). */
export interface Pose {
  rot?: Record<string, Vec3>;
  pos?: Record<string, Vec3>;
}

export interface ClipOptions {
  name: string;
  /** Seconds; the last keyframe repeats the first so the clip loops without a jump. */
  duration: number;
  /** Keyframes per loop, not counting the closing one. */
  keys: number;
  /** Node index by joint name. Every joint listed gets a rotation channel. */
  nodes: Record<string, number>;
  /** Rest translations of joints that get a translation channel (those a pose sets in `pos`). */
  translated: string[];
  pose: (u: number) => Pose;
}

/** Samples `pose(u)` for u = 0..1 into LINEAR rotation and translation channels. */
export function clip(o: ClipOptions): AnimationDef {
  const frames = o.keys + 1;
  const times = new Float32Array(frames);
  const poses: Pose[] = [];
  for (let k = 0; k < frames; k++) {
    times[k] = (k / o.keys) * o.duration;
    poses.push(o.pose(k / o.keys));
  }
  const channels: ChannelDef[] = [];
  for (const [joint, node] of Object.entries(o.nodes)) {
    const values = new Float32Array(frames * 4);
    let prev: Vec4 | null = null;
    poses.forEach((p, k) => {
      const e = p.rot?.[joint] ?? [0, 0, 0];
      let q = eulerQuat(e[0], e[1], e[2]);
      // Keep neighbours in the same hemisphere so slerp takes the short way round.
      if (prev && prev[0] * q[0] + prev[1] * q[1] + prev[2] * q[2] + prev[3] * q[3] < 0) q = q.map((v) => -v) as Vec4;
      values.set(q, k * 4);
      prev = q;
    });
    const head = Array.from(values.subarray(0, 4));
    const tail = values.subarray((frames - 2) * 4, (frames - 1) * 4);
    const flip = head.reduce((s, v, i) => s + v * (tail[i] ?? 0), 0) < 0 ? -1 : 1;
    values.set(head.map((v) => v * flip), (frames - 1) * 4);
    channels.push({ node, path: 'rotation', times, values });
  }
  for (const joint of o.translated) {
    const values = new Float32Array(frames * 3);
    poses.forEach((p, k) => values.set(p.pos?.[joint] ?? [0, 0, 0], k * 3));
    values.set(values.subarray(0, 3), (frames - 1) * 3);
    channels.push({ node: o.nodes[joint]!, path: 'translation', times, values });
  }
  return { name: o.name, channels };
}
