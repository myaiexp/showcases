// Mesh layers sample assets: a crystal mesh, a canvas texture, a code-built glTF
import type { LngLat } from './data.ts';

/** A vertex attribute the way SimpleMeshLayer reads a mesh object: values plus components. */
export type MeshAttr = {
  size: number;
  value: Float32Array;
};

export type CrystalMesh = {
  positions: MeshAttr;
  normals: MeshAttr;
  texCoords: MeshAttr;
};

type V3 = [number, number, number];

const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function unit(v: V3): V3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}

/**
 * A bipyramid ("crystal") of unit radius: `sides` triangles up, `sides` down, flat normals.
 * z is up (deck.gl's metre offsets are x east, y north, z up). Non-indexed.
 */
export function crystalMesh(sides = 6, tall = 1.6): CrystalMesh {
  const ring: V3[] = [];
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2;
    ring.push([Math.cos(a), Math.sin(a), 0]);
  }
  const top: V3 = [0, 0, tall];
  const bottom: V3 = [0, 0, -tall];
  const pos: number[] = [];
  const nor: number[] = [];
  const tex: number[] = [];
  const tri = (a: V3, b: V3, c: V3, uv: [number, number][]): void => {
    const n = unit(cross(sub(b, a), sub(c, a)));
    for (const [i, p] of [a, b, c].entries()) {
      pos.push(...p);
      nor.push(...n);
      tex.push(...(uv[i] ?? [0, 0]));
    }
  };
  for (let i = 0; i < sides; i++) {
    const a = ring[i]!;
    const b = ring[(i + 1) % sides]!;
    const u0 = i / sides;
    const u1 = (i + 1) / sides;
    tri(a, b, top, [[u0, 0.5], [u1, 0.5], [(u0 + u1) / 2, 1]]);
    tri(b, a, bottom, [[u1, 0.5], [u0, 0.5], [(u0 + u1) / 2, 0]]);
  }
  return {
    positions: { size: 3, value: new Float32Array(pos) },
    normals: { size: 3, value: new Float32Array(nor) },
    texCoords: { size: 2, value: new Float32Array(tex) },
  };
}

/** A canvas texture of coloured stripes with a grid, to read a mesh's texCoords by eye. */
export function stripeTexture(size = 128): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('2d canvas unavailable');
  const grad = g.createLinearGradient(0, 0, size, 0);
  grad.addColorStop(0, '#ff7a45');
  grad.addColorStop(0.5, '#ffd24a');
  grad.addColorStop(1, '#3ec9a7');
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  g.fillStyle = 'rgba(0,0,0,0.28)';
  for (let y = 0; y < size; y += size / 4) g.fillRect(0, y, size, size / 8);
  g.strokeStyle = 'rgba(255,255,255,0.8)';
  g.lineWidth = 3;
  g.strokeRect(1.5, 1.5, size - 3, size - 3);
  return canvas;
}

/** Sample sites around Europe for the mesh examples: a position and a stable angle. */
export interface Site {
  position: LngLat;
  heading: number;
  height: number;
}

export function sites(count = 24, seed = 5): Site[] {
  let a = seed >>> 0;
  const rand = (): number => {
    a = (a * 1664525 + 1013904223) >>> 0;
    return a / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    position: [-8 + rand() * 36, 38 + rand() * 20] as LngLat,
    heading: rand() * 360,
    height: 0.5 + rand() * 1.5,
  }));
}

export interface GltfOptions {
  /** Base colour factor, 0-1 RGBA. */
  color?: [number, number, number, number];
  metallic?: number;
  roughness?: number;
  /** Adds a 4-second spin animation of the node around its up (glTF y) axis. */
  animated?: boolean;
}

const b64 = (bytes: Uint8Array): string => {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
};

/**
 * A complete glTF 2.0 document built in code: a bipyramid (glTF is y-up) with a PBR
 * material, and optionally a looping rotation animation. The buffer is embedded as base64.
 */
export function buildGltf(opts: GltfOptions = {}, binary?: { bin?: Uint8Array }): object {
  const { color = [0.95, 0.55, 0.2, 1], metallic = 0.6, roughness = 0.35, animated = false } = opts;
  const sides = 6;
  const crystal = crystalMesh(sides, 1.4);
  // The mesh helper is z-up; glTF is y-up, so swap (x, y, z) -> (x, z, -y).
  const swap = (src: Float32Array): Float32Array => {
    const out = new Float32Array(src.length);
    for (let i = 0; i < src.length; i += 3) {
      out[i] = src[i]!;
      out[i + 1] = src[i + 2]!;
      out[i + 2] = -src[i + 1]!;
    }
    return out;
  };
  const positions = swap(crystal.positions.value);
  const normals = swap(crystal.normals.value);
  const count = positions.length / 3;
  const times = new Float32Array([0, 1, 2, 3, 4]);
  const turns = new Float32Array(5 * 4);
  for (let k = 0; k < 5; k++) {
    const half = (k * Math.PI) / 4;
    turns.set([0, Math.sin(half), 0, Math.cos(half)], k * 4);
  }
  const chunks = animated ? [positions, normals, times, turns] : [positions, normals];
  const total = chunks.reduce((n, c) => n + c.byteLength, 0);
  const bytes = new Uint8Array(total);
  const views: { byteOffset: number; byteLength: number }[] = [];
  let offset = 0;
  for (const c of chunks) {
    bytes.set(new Uint8Array(c.buffer, c.byteOffset, c.byteLength), offset);
    views.push({ byteOffset: offset, byteLength: c.byteLength });
    offset += c.byteLength;
  }
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i++) {
    min[i % 3] = Math.min(min[i % 3]!, positions[i]!);
    max[i % 3] = Math.max(max[i % 3]!, positions[i]!);
  }
  if (binary) binary.bin = bytes;
  const accessors: object[] = [
    { bufferView: 0, componentType: 5126, count, type: 'VEC3', min, max },
    { bufferView: 1, componentType: 5126, count, type: 'VEC3' },
  ];
  if (animated) {
    accessors.push(
      { bufferView: 2, componentType: 5126, count: 5, type: 'SCALAR', min: [0], max: [4] },
      { bufferView: 3, componentType: 5126, count: 5, type: 'VEC4' },
    );
  }
  return {
    asset: { version: '2.0', generator: 'deck.gl showcase' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ name: 'crystal', mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, material: 0, mode: 4 }] }],
    materials: [{ pbrMetallicRoughness: { baseColorFactor: color, metallicFactor: metallic, roughnessFactor: roughness } }],
    buffers: [binary ? { byteLength: total } : { byteLength: total, uri: `data:application/octet-stream;base64,${b64(bytes)}` }],
    bufferViews: views.map((v) => ({ buffer: 0, ...v })),
    accessors,
    ...(animated
      ? {
          animations: [
            {
              name: 'spin',
              samplers: [{ input: 2, output: 3, interpolation: 'LINEAR' }],
              channels: [{ sampler: 0, target: { node: 0, path: 'rotation' } }],
            },
          ],
        }
      : {}),
  };
}

/** The same glTF as a binary .glb (JSON chunk, then the buffer in a BIN chunk). */
export function buildGlb(opts?: GltfOptions): Uint8Array {
  const out: { bin?: Uint8Array } = {};
  const json = new TextEncoder().encode(JSON.stringify(buildGltf(opts, out)));
  const bin = out.bin ?? new Uint8Array(0);
  const pad = (n: number): number => (4 - (n % 4)) % 4;
  const jsonLen = json.length + pad(json.length);
  const binLen = bin.length + pad(bin.length);
  const glb = new Uint8Array(12 + 8 + jsonLen + 8 + binLen);
  const view = new DataView(glb.buffer);
  view.setUint32(0, 0x46546c67, true); // 'glTF'
  view.setUint32(4, 2, true);
  view.setUint32(8, glb.length, true);
  view.setUint32(12, jsonLen, true);
  view.setUint32(16, 0x4e4f534a, true); // 'JSON'
  glb.fill(0x20, 20, 20 + jsonLen);
  glb.set(json, 20);
  view.setUint32(20 + jsonLen, binLen, true);
  view.setUint32(24 + jsonLen, 0x004e4942, true); // 'BIN\0'
  glb.set(bin, 28 + jsonLen);
  return glb;
}

/** The glTF as a data: URL of a .glb, which a ScenegraphLayer fetches and parses like any URL. */
export function gltfDataUrl(opts?: GltfOptions): string {
  return `data:model/gltf-binary;base64,${b64(buildGlb(opts))}`;
}
