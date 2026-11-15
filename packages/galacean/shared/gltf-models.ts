// Generated .glb models: an animated robot, a skinned tentacle and a morphing blob
import { GltfBuilder, quat } from './gltf-builder.ts';

interface Geometry { positions: number[]; normals: number[]; uvs: number[]; indices: number[] }

/** An axis-aligned box centred on the origin. */
export function box(w: number, h: number, d: number): Geometry {
  const g: Geometry = { positions: [], normals: [], uvs: [], indices: [] };
  const faces: [number[], number[], number[]][] = [
    [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
    [[-1, 0, 0], [0, 0, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 0, 0], [0, 0, -1]],
    [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
    [[0, 0, 1], [1, 0, 0], [0, 1, 0]],
    [[0, 0, -1], [-1, 0, 0], [0, 1, 0]],
  ];
  const half = [w / 2, h / 2, d / 2];
  for (const [n, u, v] of faces) {
    const base = g.positions.length / 3;
    for (const [su, sv] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as const) {
      for (let k = 0; k < 3; k++) g.positions.push((n[k]! + su * u[k]! + sv * v[k]!) * half[k]!);
      g.normals.push(...n);
      g.uvs.push((su + 1) / 2, (1 - sv) / 2);
    }
    g.indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  return g;
}

/** A UV sphere. */
export function sphere(r: number, seg = 24): Geometry {
  const g: Geometry = { positions: [], normals: [], uvs: [], indices: [] };
  for (let y = 0; y <= seg; y++) {
    const v = y / seg;
    const th = v * Math.PI;
    for (let x = 0; x <= seg; x++) {
      const u = x / seg;
      const ph = u * Math.PI * 2;
      const n = [Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)];
      g.normals.push(...n);
      g.positions.push(n[0]! * r, n[1]! * r, n[2]! * r);
      g.uvs.push(u, v);
    }
  }
  for (let y = 0; y < seg; y++) {
    for (let x = 0; x < seg; x++) {
      const a = y * (seg + 1) + x;
      const b = a + seg + 1;
      g.indices.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  return g;
}

function addGeometry(gltf: GltfBuilder, name: string, g: Geometry, material: number, extra: Record<string, number> = {}): number {
  const attributes = {
    POSITION: gltf.accessor(new Float32Array(g.positions), 'VEC3', 'vertex'),
    NORMAL: gltf.accessor(new Float32Array(g.normals), 'VEC3', 'vertex'),
    TEXCOORD_0: gltf.accessor(new Float32Array(g.uvs), 'VEC2', 'vertex'),
    ...extra,
  };
  const indices = gltf.accessor(new Uint16Array(g.indices), 'SCALAR', 'index');
  return gltf.mesh(name, [{ attributes, indices, material }]);
}

/** Keyframes for a looping swing about `axis`: angle(t) sampled at `steps` points over `duration`. */
function swing(axis: [number, number, number], duration: number, angle: (t: number) => number, steps = 12): { times: number[]; values: number[] } {
  const times: number[] = [];
  const values: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * duration;
    times.push(t);
    values.push(...quat(axis, angle(i / steps)));
  }
  return { times, values };
}

const X: [number, number, number] = [1, 0, 0];
const Y: [number, number, number] = [0, 1, 0];
const Z: [number, number, number] = [0, 0, 1];
const TAU = Math.PI * 2;

/**
 * A blocky robot whose parts are separate nodes: Robot › Hips › Body › Head, ArmL, ArmR and
 * Hips › LegL, LegR. Clips: Idle, Walk, Run, Wave (right arm only), Jump (moves the root).
 */
export function robotGlb(): GltfBuilder {
  const gltf = new GltfBuilder();
  const steel = gltf.material({ name: 'Steel', color: [0.55, 0.6, 0.68], metallic: 0.7, roughness: 0.35 });
  const paint = gltf.material({ name: 'Paint', color: [0.95, 0.45, 0.12], roughness: 0.45 });
  const glow = gltf.material({ name: 'Visor', color: [0.05, 0.1, 0.12], emissive: [0.2, 0.9, 1], roughness: 0.2 });
  const bodyMesh = addGeometry(gltf, 'BodyMesh', box(0.9, 1, 0.5), paint);
  const headMesh = addGeometry(gltf, 'HeadMesh', box(0.55, 0.45, 0.45), steel);
  const visorMesh = addGeometry(gltf, 'VisorMesh', box(0.45, 0.14, 0.05), glow);
  const limbMesh = addGeometry(gltf, 'LimbMesh', box(0.24, 0.8, 0.24), steel);
  const legMesh = addGeometry(gltf, 'LegMesh', box(0.3, 1, 0.3), steel);

  const limb = (name: string, mesh: number, x: number, y: number, drop: number): number => {
    const part = gltf.node({ name: `${name}Mesh`, mesh, translation: [0, -drop, 0] });
    return gltf.node({ name, translation: [x, y, 0], children: [part] });
  };
  const visor = gltf.node({ name: 'Visor', mesh: visorMesh, translation: [0, 0.03, 0.23] });
  const head = gltf.node({ name: 'Head', mesh: headMesh, translation: [0, 0.75, 0], children: [visor] });
  const armL = limb('ArmL', limbMesh, -0.6, 0.4, 0.4);
  const armR = limb('ArmR', limbMesh, 0.6, 0.4, 0.4);
  const body = gltf.node({ name: 'Body', mesh: bodyMesh, translation: [0, 0.55, 0], children: [head, armL, armR] });
  const legL = limb('LegL', legMesh, -0.25, 0, 0.5);
  const legR = limb('LegR', legMesh, 0.25, 0, 0.5);
  const hips = gltf.node({ name: 'Hips', translation: [0, 1, 0], children: [body, legL, legR] });
  const robot = gltf.node({ name: 'Robot', children: [hips] });
  gltf.root(robot);

  const bob = (duration: number, lift: number, cycles: number): { times: number[]; values: number[] } => {
    const times: number[] = [];
    const values: number[] = [];
    for (let i = 0; i <= 12; i++) {
      times.push((i / 12) * duration);
      values.push(0, 1 + lift * (0.5 - 0.5 * Math.cos((i / 12) * TAU * cycles)), 0);
    }
    return { times, values };
  };
  const rot = (node: number, axis: [number, number, number], duration: number, angle: (t: number) => number) =>
    ({ node, path: 'rotation' as const, ...swing(axis, duration, angle) });

  gltf.animation('Idle', [
    { node: hips, path: 'translation', ...bob(2, 0.04, 1) },
    rot(head, Y, 2, (t) => 15 * Math.sin(t * TAU)),
    rot(armL, Z, 2, (t) => -4 - 3 * Math.sin(t * TAU)),
    rot(armR, Z, 2, (t) => 4 + 3 * Math.sin(t * TAU)),
  ]);
  const gait = (name: string, duration: number, leg: number, arm: number, lift: number): void => {
    gltf.animation(name, [
      { node: hips, path: 'translation', ...bob(duration, lift, 2) },
      rot(legL, X, duration, (t) => leg * Math.sin(t * TAU)),
      rot(legR, X, duration, (t) => -leg * Math.sin(t * TAU)),
      rot(armL, X, duration, (t) => -arm * Math.sin(t * TAU)),
      rot(armR, X, duration, (t) => arm * Math.sin(t * TAU)),
      rot(body, X, duration, () => leg / 6),
    ]);
  };
  gait('Walk', 1, 30, 25, 0.06);
  gait('Run', 0.6, 55, 60, 0.14);
  gltf.animation('Wave', [rot(armR, Z, 1.2, (t) => 150 + 20 * Math.sin(t * TAU * 2))]);
  const jump = { times: [] as number[], values: [] as number[] };
  for (let i = 0; i <= 12; i++) {
    jump.times.push(i / 12);
    jump.values.push(0, 1.2 * Math.sin((i / 12) * Math.PI), 0);
  }
  gltf.animation('Jump', [
    { node: robot, path: 'translation', ...jump },
    rot(legL, X, 1, (t) => -40 * Math.sin(t * Math.PI)),
    rot(legR, X, 1, (t) => -40 * Math.sin(t * Math.PI)),
    rot(armL, Z, 1, (t) => -150 * Math.sin(t * Math.PI)),
    rot(armR, Z, 1, (t) => 150 * Math.sin(t * Math.PI)),
  ]);
  return gltf;
}

/** A tube skinned to a chain of four bones (Bone0…Bone3, 0.75 apart). Clips: Sway, Curl. */
export function tentacleGlb(): GltfBuilder {
  const gltf = new GltfBuilder();
  const material = gltf.material({ name: 'Skin', color: [0.55, 0.3, 0.85], roughness: 0.5 });
  const bones = 4;
  const gap = 0.75;
  const height = gap * bones;
  const radial = 16;
  const rings = 24;
  const g: Geometry = { positions: [], normals: [], uvs: [], indices: [] };
  const joints: number[] = [];
  const weights: number[] = [];
  for (let r = 0; r <= rings; r++) {
    const y = (r / rings) * height;
    const radius = 0.35 * (1 - 0.8 * (r / rings));
    const f = Math.min(bones - 1, y / gap);
    const j = Math.min(bones - 2, Math.floor(f));
    const w = Math.min(1, f - j);
    for (let s = 0; s <= radial; s++) {
      const a = (s / radial) * TAU;
      g.positions.push(Math.cos(a) * radius, y, Math.sin(a) * radius);
      g.normals.push(Math.cos(a), 0, Math.sin(a));
      g.uvs.push(s / radial, r / rings);
      joints.push(j, j + 1, 0, 0);
      weights.push(1 - w, w, 0, 0);
    }
  }
  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < radial; s++) {
      const a = r * (radial + 1) + s;
      const b = a + radial + 1;
      g.indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  const mesh = addGeometry(gltf, 'TentacleMesh', g, material, {
    JOINTS_0: gltf.accessor(new Uint16Array(joints), 'VEC4', 'vertex'),
    WEIGHTS_0: gltf.accessor(new Float32Array(weights), 'VEC4', 'vertex'),
  });
  let child: number | undefined;
  const boneNodes: number[] = [];
  for (let i = bones - 1; i >= 0; i--) {
    child = gltf.node({ name: `Bone${i}`, translation: [0, i === 0 ? 0 : gap, 0], ...(child !== undefined ? { children: [child] } : {}) });
    boneNodes.unshift(child);
  }
  const ibm = new Float32Array(16 * bones);
  for (let i = 0; i < bones; i++) {
    ibm.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -i * gap, 0, 1], i * 16);
  }
  const skin = gltf.skin(boneNodes, ibm, boneNodes[0]);
  const skinned = gltf.node({ name: 'TentacleSkin', mesh, skin });
  gltf.root(gltf.node({ name: 'Tentacle', children: [skinned, boneNodes[0]!] }));

  gltf.animation('Sway', boneNodes.map((node, i) => ({ node, path: 'rotation' as const, ...swing(Z, 2, (t) => 22 * Math.sin(t * TAU - i * 0.8)) })));
  gltf.animation('Curl', boneNodes.map((node) => ({ node, path: 'rotation' as const, ...swing(X, 1.6, (t) => 32 * (0.5 - 0.5 * Math.cos(t * TAU))) })));
  return gltf;
}

/** A sphere with two morph targets, Cube and Spikes, and a Morph clip that blends between them. */
export function blobGlb(): GltfBuilder {
  const gltf = new GltfBuilder();
  const material = gltf.material({ name: 'Blob', color: [0.15, 0.75, 0.55], roughness: 0.3 });
  const g = sphere(1, 40);
  const cube: number[] = [];
  const spikes: number[] = [];
  for (let i = 0; i < g.positions.length; i += 3) {
    const [x, y, z] = [g.positions[i]!, g.positions[i + 1]!, g.positions[i + 2]!];
    const m = Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) || 1;
    const k = 0.85 / m;
    cube.push(x * k - x, y * k - y, z * k - z);
    const s = 0.35 * Math.max(0, Math.sin(x * 9) * Math.sin(y * 9) * Math.sin(z * 9));
    spikes.push(x * s, y * s, z * s);
  }
  const attributes = {
    POSITION: gltf.accessor(new Float32Array(g.positions), 'VEC3', 'vertex'),
    NORMAL: gltf.accessor(new Float32Array(g.normals), 'VEC3', 'vertex'),
    TEXCOORD_0: gltf.accessor(new Float32Array(g.uvs), 'VEC2', 'vertex'),
  };
  const targets = [
    { POSITION: gltf.accessor(new Float32Array(cube), 'VEC3', 'vertex') },
    { POSITION: gltf.accessor(new Float32Array(spikes), 'VEC3', 'vertex') },
  ];
  const indices = gltf.accessor(new Uint16Array(g.indices), 'SCALAR', 'index');
  const mesh = gltf.mesh('BlobMesh', [{ attributes, indices, material, targets }], [0, 0]);
  gltf.json.meshes[mesh]!.extras = { targetNames: ['Cube', 'Spikes'] };
  const node = gltf.node({ name: 'Blob', mesh });
  gltf.root(node);
  gltf.animation('Morph', [
    { node, path: 'weights', times: [0, 1, 2, 3, 4], values: [0, 0, 1, 0, 0, 0, 0, 1, 0, 0] },
  ]);
  return gltf;
}
