// A small glTF 2.0 binary (GLB) writer for models generated in code
export type Vec3 = [number, number, number];
export type Vec4 = [number, number, number, number];
export type AccessorType = 'SCALAR' | 'VEC2' | 'VEC3' | 'VEC4' | 'MAT4';
export type TypedData = Float32Array | Uint32Array | Uint16Array | Uint8Array;

const COMPONENTS: Record<AccessorType, number> = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
const FLOAT = 5126;

function componentType(data: TypedData): number {
  if (data instanceof Float32Array) return FLOAT;
  if (data instanceof Uint32Array) return 5125;
  if (data instanceof Uint16Array) return 5123;
  return 5121;
}

/** One material, in glTF's metallic-roughness terms. Colours are linear 0..1. */
export interface MaterialDef {
  name: string;
  baseColor: [number, number, number] | Vec4;
  metallic?: number;
  roughness?: number;
  emissive?: Vec3;
  doubleSided?: boolean;
}

/** One draw call: attribute arrays are tightly packed; `targets` are morph deltas. */
export interface PrimitiveDef {
  positions: Float32Array;
  normals?: Float32Array;
  colors?: Float32Array;
  indices: Uint16Array | Uint32Array;
  /** JOINTS_0, four joint indices per vertex. */
  joints?: Uint8Array | Uint16Array;
  /** WEIGHTS_0, four weights per vertex. */
  weights?: Float32Array;
  material?: number;
  targets?: { POSITION: Float32Array; NORMAL?: Float32Array }[];
}

export interface MeshDef {
  name: string;
  primitives: PrimitiveDef[];
  /** Default morph weights, one per target. */
  weights?: number[];
  /** Names of the morph targets; written to mesh.extras.targetNames. */
  targetNames?: string[];
}

export interface NodeDef {
  name: string;
  children?: number[];
  mesh?: number;
  skin?: number;
  translation?: Vec3;
  rotation?: Vec4;
  scale?: Vec3;
  weights?: number[];
}

export interface SkinDef {
  name: string;
  joints: number[];
  /** 16 floats per joint, column-major. */
  inverseBindMatrices: Float32Array;
  skeleton?: number;
}

export interface ChannelDef {
  node: number;
  path: 'translation' | 'rotation' | 'scale' | 'weights';
  /** Keyframe times in seconds; the same array object is stored once per animation. */
  times: Float32Array;
  /** Values per keyframe: 3 (translation, scale), 4 (rotation) or one per target (weights). */
  values: Float32Array;
}

export interface AnimationDef {
  name: string;
  channels: ChannelDef[];
}

interface Json {
  [key: string]: unknown;
}

/** Collects accessors, nodes, meshes, skins and animations, then packs them with build(). */
export class Glb {
  private readonly chunks: Uint8Array[] = [];
  private byteLength = 0;
  private readonly bufferViews: Json[] = [];
  private readonly accessors: Json[] = [];
  private readonly materials: Json[] = [];
  private readonly meshes: Json[] = [];
  private readonly skins: Json[] = [];
  private readonly animations: Json[] = [];
  readonly nodes: NodeDef[] = [];

  /**
   * Stores `data` in its own bufferView and returns the accessor index. `target` marks
   * vertex ('array') or index ('element') data. `bounds` writes min/max, required for
   * POSITION, morph POSITION and animation input accessors.
   */
  accessor(data: TypedData, type: AccessorType, target?: 'array' | 'element', bounds = false): number {
    const size = COMPONENTS[type];
    const count = data.length / size;
    if (!Number.isInteger(count)) throw new Error(`accessor data (${data.length}) is not a multiple of ${size}`);
    const bytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    const padded = new Uint8Array(Math.ceil(bytes.length / 4) * 4);
    padded.set(bytes);
    const view: Json = { buffer: 0, byteOffset: this.byteLength, byteLength: bytes.length };
    if (target) view.target = target === 'array' ? 34962 : 34963;
    this.chunks.push(padded);
    this.byteLength += padded.length;
    const accessor: Json = {
      bufferView: this.bufferViews.push(view) - 1,
      componentType: componentType(data),
      count,
      type,
    };
    if (bounds) {
      const min = new Array<number>(size).fill(Infinity);
      const max = new Array<number>(size).fill(-Infinity);
      for (let i = 0; i < data.length; i++) {
        min[i % size] = Math.min(min[i % size], data[i]);
        max[i % size] = Math.max(max[i % size], data[i]);
      }
      accessor.min = min;
      accessor.max = max;
    }
    return this.accessors.push(accessor) - 1;
  }

  addMaterial(def: MaterialDef): number {
    const [r, g, b, a = 1] = def.baseColor;
    const material: Json = {
      name: def.name,
      pbrMetallicRoughness: {
        baseColorFactor: [r, g, b, a],
        metallicFactor: def.metallic ?? 0,
        roughnessFactor: def.roughness ?? 0.8,
      },
    };
    if (def.emissive) material.emissiveFactor = def.emissive;
    if (def.doubleSided) material.doubleSided = true;
    if (a < 1) material.alphaMode = 'BLEND';
    return this.materials.push(material) - 1;
  }

  addMesh(def: MeshDef): number {
    const primitives = def.primitives.map((p) => {
      const attributes: Record<string, number> = {
        POSITION: this.accessor(p.positions, 'VEC3', 'array', true),
      };
      if (p.normals) attributes.NORMAL = this.accessor(p.normals, 'VEC3', 'array');
      if (p.colors) attributes.COLOR_0 = this.accessor(p.colors, 'VEC3', 'array');
      if (p.joints) attributes.JOINTS_0 = this.accessor(p.joints, 'VEC4', 'array');
      if (p.weights) attributes.WEIGHTS_0 = this.accessor(p.weights, 'VEC4', 'array');
      const prim: Json = { attributes, indices: this.accessor(p.indices, 'SCALAR', 'element'), mode: 4 };
      if (p.material !== undefined) prim.material = p.material;
      if (p.targets) {
        prim.targets = p.targets.map((t) => {
          const target: Record<string, number> = { POSITION: this.accessor(t.POSITION, 'VEC3', 'array', true) };
          if (t.NORMAL) target.NORMAL = this.accessor(t.NORMAL, 'VEC3', 'array');
          return target;
        });
      }
      return prim;
    });
    const mesh: Json = { name: def.name, primitives };
    if (def.weights) mesh.weights = def.weights;
    if (def.targetNames) mesh.extras = { targetNames: def.targetNames };
    return this.meshes.push(mesh) - 1;
  }

  addNode(def: NodeDef): number {
    return this.nodes.push({ ...def, children: def.children ? [...def.children] : undefined }) - 1;
  }

  /** Makes `child` a child of `parent`. */
  addChild(parent: number, child: number): void {
    const node = this.nodes[parent];
    node.children = [...(node.children ?? []), child];
  }

  addSkin(def: SkinDef): number {
    const skin: Json = {
      name: def.name,
      joints: def.joints,
      inverseBindMatrices: this.accessor(def.inverseBindMatrices, 'MAT4'),
    };
    if (def.skeleton !== undefined) skin.skeleton = def.skeleton;
    return this.skins.push(skin) - 1;
  }

  addAnimation(def: AnimationDef): number {
    const inputs = new Map<Float32Array, number>();
    const samplers: Json[] = [];
    const channels: Json[] = [];
    for (const ch of def.channels) {
      let input = inputs.get(ch.times);
      if (input === undefined) {
        input = this.accessor(ch.times, 'SCALAR', undefined, true);
        inputs.set(ch.times, input);
      }
      const width = ch.path === 'rotation' ? 'VEC4' : ch.path === 'weights' ? 'SCALAR' : 'VEC3';
      const output = this.accessor(ch.values, width);
      const sampler = samplers.push({ input, output, interpolation: 'LINEAR' }) - 1;
      channels.push({ sampler, target: { node: ch.node, path: ch.path } });
    }
    return this.animations.push({ name: def.name, samplers, channels }) - 1;
  }

  /** Packs everything into a GLB with `roots` as the nodes of the one scene. */
  build(roots: number[]): ArrayBuffer {
    const nodes = this.nodes.map((n) => {
      const out: Json = { name: n.name };
      for (const [key, value] of Object.entries(n)) {
        if (key !== 'name' && value !== undefined) out[key] = value;
      }
      return out;
    });
    const gltf: Json = {
      asset: { version: '2.0', generator: 'showcases zephyr3d gltf writer' },
      scene: 0,
      scenes: [{ nodes: roots }],
      nodes,
      buffers: [{ byteLength: this.byteLength }],
      bufferViews: this.bufferViews,
      accessors: this.accessors,
    };
    if (this.materials.length) gltf.materials = this.materials;
    if (this.meshes.length) gltf.meshes = this.meshes;
    if (this.skins.length) gltf.skins = this.skins;
    if (this.animations.length) gltf.animations = this.animations;

    const json = new TextEncoder().encode(JSON.stringify(gltf));
    const jsonLength = Math.ceil(json.length / 4) * 4;
    const total = 12 + 8 + jsonLength + 8 + this.byteLength;
    const out = new ArrayBuffer(total);
    const dv = new DataView(out);
    const bytes = new Uint8Array(out);
    dv.setUint32(0, 0x46546c67, true);
    dv.setUint32(4, 2, true);
    dv.setUint32(8, total, true);
    dv.setUint32(12, jsonLength, true);
    dv.setUint32(16, 0x4e4f534a, true);
    bytes.set(json, 20);
    bytes.fill(0x20, 20 + json.length, 20 + jsonLength);
    const binStart = 20 + jsonLength;
    dv.setUint32(binStart, this.byteLength, true);
    dv.setUint32(binStart + 4, 0x004e4942, true);
    let at = binStart + 8;
    for (const chunk of this.chunks) {
      bytes.set(chunk, at);
      at += chunk.length;
    }
    return out;
  }
}

/** Inverse bind matrices for joints whose rest pose is only a translation to `world`. */
export function translationIbm(world: Vec3[]): Float32Array {
  const out = new Float32Array(world.length * 16);
  world.forEach(([x, y, z], i) => {
    out.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -x, -y, -z, 1], i * 16);
  });
  return out;
}
