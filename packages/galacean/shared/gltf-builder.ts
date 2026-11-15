// Writes glTF 2.0 binary (.glb) files in code: meshes, nodes, skins, clips
//
// The docs load models by URL (AssetType.GLTF). Examples here never download, so they build
// a .glb in memory and load it from a blob URL through the same loader. Only what the
// generated models need is covered: float/uint accessors, PBR materials, node trees, skins,
// morph targets and animation channels.

type Typed = Float32Array | Uint16Array | Uint32Array | Uint8Array;
type AccessorType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4' | 'MAT4';
const SIZE: Record<AccessorType, number> = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
const COMPONENT = (a: Typed): number =>
  a instanceof Float32Array ? 5126 : a instanceof Uint32Array ? 5125 : a instanceof Uint16Array ? 5123 : 5121;

export interface Pbr {
  name?: string;
  color: [number, number, number, number?];
  metallic?: number;
  roughness?: number;
  emissive?: [number, number, number];
  /** Index from `image()`, used as the base colour texture. */
  texture?: number;
  doubleSided?: boolean;
  alpha?: 'OPAQUE' | 'BLEND' | 'MASK';
}

export interface Primitive {
  attributes: Record<string, number>;
  indices?: number;
  material?: number;
  targets?: Record<string, number>[];
}

export interface NodeDef {
  name: string;
  mesh?: number;
  skin?: number;
  children?: number[];
  translation?: [number, number, number];
  rotation?: [number, number, number, number];
  scale?: [number, number, number];
  weights?: number[];
}

export interface Channel {
  node: number;
  path: 'translation' | 'rotation' | 'scale' | 'weights';
  times: number[];
  /** Flat values: 3 per key for translation/scale, 4 for rotation, one per target for weights. */
  values: number[];
  interpolation?: 'LINEAR' | 'STEP' | 'CUBICSPLINE';
}

type Def = Record<string, unknown>;

/** The glTF document being built; every list starts empty and empty lists are left out. */
export interface GltfJson {
  asset: Def;
  scene: number;
  scenes: { name: string; nodes: number[] }[];
  nodes: NodeDef[];
  meshes: Def[];
  materials: Def[];
  accessors: Def[];
  bufferViews: Def[];
  buffers: Def[];
  animations: Def[];
  skins: Def[];
  images: Def[];
  textures: Def[];
  samplers: Def[];
}

export class GltfBuilder {
  readonly json: GltfJson = {
    asset: { version: '2.0', generator: 'showcases gltf-builder' },
    scene: 0,
    scenes: [{ name: 'Scene', nodes: [] }],
    nodes: [],
    meshes: [],
    materials: [],
    accessors: [],
    bufferViews: [],
    buffers: [],
    animations: [],
    skins: [],
    images: [],
    textures: [],
    samplers: [],
  };
  private chunks: Uint8Array[] = [];
  private length = 0;

  private view(data: ArrayBufferView, target?: number): number {
    const pad = (4 - (this.length % 4)) % 4;
    if (pad) this.push(new Uint8Array(pad));
    const byteOffset = this.length;
    this.push(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
    return this.json.bufferViews.push({ buffer: 0, byteOffset, byteLength: data.byteLength, ...(target ? { target } : {}) }) - 1;
  }

  private push(bytes: Uint8Array): void {
    this.chunks.push(bytes);
    this.length += bytes.byteLength;
  }

  /** An accessor over `data`; vertex attributes get min/max (POSITION needs them). */
  accessor(data: Typed, type: AccessorType, target?: 'vertex' | 'index'): number {
    const size = SIZE[type];
    const count = data.length / size;
    const def: Record<string, unknown> = {
      bufferView: this.view(data, target === 'vertex' ? 34962 : target === 'index' ? 34963 : undefined),
      componentType: COMPONENT(data),
      count,
      type,
    };
    if (data instanceof Float32Array && type !== 'MAT4') {
      const min = Array<number>(size).fill(Infinity);
      const max = Array<number>(size).fill(-Infinity);
      for (let i = 0; i < data.length; i++) {
        min[i % size] = Math.min(min[i % size]!, data[i]!);
        max[i % size] = Math.max(max[i % size]!, data[i]!);
      }
      Object.assign(def, { min, max });
    }
    return this.json.accessors.push(def) - 1;
  }

  material(m: Pbr): number {
    const [r, g, b, a = 1] = m.color;
    return (
      this.json.materials.push({
        name: m.name ?? `material${this.json.materials.length}`,
        pbrMetallicRoughness: {
          baseColorFactor: [r, g, b, a],
          metallicFactor: m.metallic ?? 0,
          roughnessFactor: m.roughness ?? 0.6,
          ...(m.texture !== undefined ? { baseColorTexture: { index: m.texture } } : {}),
        },
        ...(m.emissive ? { emissiveFactor: m.emissive } : {}),
        ...(m.doubleSided ? { doubleSided: true } : {}),
        ...(m.alpha ? { alphaMode: m.alpha } : {}),
      }) - 1
    );
  }

  /** A PNG (or JPEG) embedded in the binary chunk; returns a texture index. */
  image(bytes: Uint8Array, mimeType = 'image/png'): number {
    const image = this.json.images.push({ bufferView: this.view(bytes), mimeType }) - 1;
    if (!this.json.samplers.length) this.json.samplers.push({ magFilter: 9729, minFilter: 9987, wrapS: 10497, wrapT: 10497 });
    return this.json.textures.push({ source: image, sampler: 0 }) - 1;
  }

  mesh(name: string, primitives: Primitive[], weights?: number[]): number {
    return this.json.meshes.push({ name, primitives, ...(weights ? { weights } : {}) }) - 1;
  }

  node(def: NodeDef): number {
    return this.json.nodes.push(def) - 1;
  }

  /** Adds a node to the scene's root list. */
  root(node: number): void {
    this.json.scenes[0]!.nodes.push(node);
  }

  skin(joints: number[], inverseBindMatrices: Float32Array, skeleton?: number): number {
    const ibm = this.accessor(inverseBindMatrices, 'MAT4');
    return this.json.skins.push({ joints, inverseBindMatrices: ibm, ...(skeleton !== undefined ? { skeleton } : {}) }) - 1;
  }

  animation(name: string, channels: Channel[]): number {
    const samplers: unknown[] = [];
    const out: unknown[] = [];
    for (const c of channels) {
      const input = this.accessor(new Float32Array(c.times), 'SCALAR');
      const type: AccessorType = c.path === 'rotation' ? 'VEC4' : c.path === 'weights' ? 'SCALAR' : 'VEC3';
      const output = this.accessor(new Float32Array(c.values), type);
      const sampler = samplers.push({ input, output, interpolation: c.interpolation ?? 'LINEAR' }) - 1;
      out.push({ sampler, target: { node: c.node, path: c.path } });
    }
    return this.json.animations.push({ name, samplers, channels: out }) - 1;
  }

  /** The finished .glb bytes. */
  glb(): ArrayBuffer {
    const json: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(this.json)) {
      if (!Array.isArray(value) || value.length) json[key] = value;
    }
    json.buffers = [{ byteLength: this.length }];
    const text = new TextEncoder().encode(JSON.stringify(json));
    const jsonLength = Math.ceil(text.byteLength / 4) * 4;
    const binLength = Math.ceil(this.length / 4) * 4;
    const total = 12 + 8 + jsonLength + 8 + binLength;
    const out = new Uint8Array(total);
    const dv = new DataView(out.buffer);
    dv.setUint32(0, 0x46546c67, true);
    dv.setUint32(4, 2, true);
    dv.setUint32(8, total, true);
    dv.setUint32(12, jsonLength, true);
    dv.setUint32(16, 0x4e4f534a, true);
    out.fill(0x20, 20, 20 + jsonLength);
    out.set(text, 20);
    let at = 20 + jsonLength;
    dv.setUint32(at, binLength, true);
    dv.setUint32(at + 4, 0x004e4942, true);
    at += 8;
    for (const chunk of this.chunks) {
      out.set(chunk, at);
      at += chunk.byteLength;
    }
    return out.buffer;
  }

  /** A blob URL of the .glb; revoke it when the example is done with it. */
  url(): string {
    return URL.createObjectURL(new Blob([this.glb()], { type: 'model/gltf-binary' }));
  }
}

/** Quaternion [x, y, z, w] for `deg` degrees about a unit axis. */
export function quat(axis: [number, number, number], deg: number): [number, number, number, number] {
  const h = (deg * Math.PI) / 360;
  const s = Math.sin(h);
  return [axis[0] * s, axis[1] * s, axis[2] * s, Math.cos(h)];
}
