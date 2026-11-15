// Generated .glb files for the model chapter: scenes, variants, lights, more
import { GltfBuilder, quat } from './gltf-builder.ts';
import { box, sphere } from './gltf-models.ts';

type V3 = [number, number, number];
type Geometry = ReturnType<typeof box>;
type Def = Record<string, unknown>;

/** Adds a top-level extension block ("extensions", "extensionsUsed") to the glTF JSON. */
function declare(gltf: GltfBuilder, name: string, body?: unknown): void {
  const json = gltf.json as unknown as Def;
  const used = ((json.extensionsUsed as string[] | undefined) ??= []);
  if (!used.includes(name)) used.push(name);
  if (body !== undefined) ((json.extensions as Def | undefined) ??= {})[name] = body;
}

/** Hangs `value` under `extensions[name]` of a JSON object that came from the builder. */
function extend(def: Def, name: string, value: unknown): void {
  ((def.extensions as Def | undefined) ??= {})[name] = value;
}

/** A mesh node for `g` with `material`. */
export function shape(gltf: GltfBuilder, name: string, g: Geometry, material: number, at: V3 = [0, 0, 0]): number {
  const attributes = {
    POSITION: gltf.accessor(new Float32Array(g.positions), 'VEC3', 'vertex'),
    NORMAL: gltf.accessor(new Float32Array(g.normals), 'VEC3', 'vertex'),
    TEXCOORD_0: gltf.accessor(new Float32Array(g.uvs), 'VEC2', 'vertex'),
  };
  const indices = gltf.accessor(new Uint16Array(g.indices), 'SCALAR', 'index');
  const mesh = gltf.mesh(`${name}Mesh`, [{ attributes, indices, material }]);
  return gltf.node({ name, mesh, translation: at });
}

/** A looping spin about Y for `node`. */
export function spinClip(gltf: GltfBuilder, name: string, node: number, seconds = 4): void {
  const times = [0, 0.25, 0.5, 0.75, 1].map((f) => f * seconds);
  const values = [0, 90, 180, 270, 360].flatMap((deg) => quat([0, 1, 0], deg));
  gltf.animation(name, [{ node, path: 'rotation', times, values }]);
}

/** Three scenes: a cube, a ball, and a pair (two root nodes). The default scene is index 0. */
export function scenesGlb(): GltfBuilder {
  const gltf = new GltfBuilder();
  const orange = gltf.material({ name: 'Orange', color: [0.95, 0.45, 0.12], roughness: 0.4 });
  const teal = gltf.material({ name: 'Teal', color: [0.1, 0.65, 0.6], roughness: 0.3, metallic: 0.4 });
  const cube = shape(gltf, 'Cube', box(1.2, 1.2, 1.2), orange, [0, 1, 0]);
  const ball = shape(gltf, 'Ball', sphere(0.75), teal, [0, 1, 0]);
  const left = shape(gltf, 'PairLeft', box(0.8, 0.8, 0.8), orange, [-0.8, 1, 0]);
  const right = shape(gltf, 'PairRight', sphere(0.5), teal, [0.8, 1, 0]);
  const scenes = gltf.json.scenes;
  scenes[0] = { name: 'CubeScene', nodes: [cube] };
  scenes.push({ name: 'BallScene', nodes: [ball] }, { name: 'PairScene', nodes: [left, right] });
  spinClip(gltf, 'Spin', cube);
  return gltf;
}

/** A body and a cap, each mapped to three materials through KHR_materials_variants. */
export function variantsGlb(): GltfBuilder {
  const gltf = new GltfBuilder();
  const looks: [string, V3, number, number][] = [
    ['Candy', [0.9, 0.2, 0.45], 0, 0.3],
    ['Steel', [0.7, 0.74, 0.8], 0.9, 0.25],
    ['Gold', [0.95, 0.7, 0.2], 1, 0.3],
  ];
  const body: number[] = [];
  const cap: number[] = [];
  for (const [name, color, metallic, roughness] of looks) {
    body.push(gltf.material({ name: `${name}Body`, color, metallic, roughness }));
    cap.push(gltf.material({ name: `${name}Cap`, color: [color[0] * 0.5, color[1] * 0.5, color[2] * 0.5], metallic, roughness }));
  }
  const bodyNode = shape(gltf, 'Body', box(1.4, 1.1, 1.4), body[0]!, [0, 0.55, 0]);
  const capNode = shape(gltf, 'Cap', sphere(0.55), cap[0]!, [0, 1.5, 0]);
  gltf.root(bodyNode);
  gltf.root(capNode);
  declare(gltf, 'KHR_materials_variants', { variants: looks.map(([name]) => ({ name })) });
  const map = (node: number, materials: number[]): void => {
    const mesh = gltf.json.nodes[node]!.mesh!;
    const prim = (gltf.json.meshes[mesh]!.primitives as Def[])[0]!;
    extend(prim, 'KHR_materials_variants', { mappings: materials.map((material, i) => ({ material, variants: [i] })) });
  };
  map(bodyNode, body);
  map(capNode, cap);
  spinClip(gltf, 'Spin', bodyNode, 6);
  return gltf;
}

/** A ball under a point light that circles it, the light declared through KHR_lights_punctual. */
export function lightsGlb(): GltfBuilder {
  const gltf = new GltfBuilder();
  const white = gltf.material({ name: 'Matte', color: [0.9, 0.9, 0.9], roughness: 0.5 });
  const glow = gltf.material({ name: 'Bulb', color: [0, 0, 0], emissive: [1, 0.85, 0.5] });
  const ball = shape(gltf, 'Ball', sphere(0.8), white, [0, 1, 0]);
  const bulb = shape(gltf, 'BulbMesh', sphere(0.08), glow, [0, 0, 0]);
  const lamp = gltf.node({ name: 'Lamp', translation: [1.8, 1.4, 0], children: [bulb] });
  const orbit = gltf.node({ name: 'Orbit', translation: [0, 0, 0], children: [lamp] });
  (gltf.json.nodes[lamp] as unknown as Def).extensions = { KHR_lights_punctual: { light: 0 } };
  gltf.root(ball);
  gltf.root(orbit);
  declare(gltf, 'KHR_lights_punctual', { lights: [{ name: 'Lamp', type: 'point', color: [1, 0.85, 0.5], intensity: 1.4, range: 12 }] });
  const times = [0, 1, 2, 3, 4];
  gltf.animation('Orbit', [{ node: orbit, path: 'rotation', times, values: [0, 90, 180, 270, 360].flatMap((d) => quat([0, 1, 0], d)) }]);
  return gltf;
}

/** One ball per entry of `looks`: a base material plus the extension blocks to add. */
export function ballsGlb(looks: { name: string; color: [number, number, number]; metallic?: number; roughness?: number; ext?: Def; unlit?: boolean }[], extUsed: string[]): GltfBuilder {
  const gltf = new GltfBuilder();
  const gap = 1.8;
  looks.forEach((look, i) => {
    const m = gltf.material({ name: look.name, color: look.color, metallic: look.metallic ?? 0, roughness: look.roughness ?? 0.4 });
    const def = gltf.json.materials[m]!;
    if (look.ext) for (const [key, value] of Object.entries(look.ext)) extend(def, key, value);
    if (look.unlit) extend(def, 'KHR_materials_unlit', {});
    gltf.root(shape(gltf, look.name, sphere(0.8), m, [(i - (looks.length - 1) / 2) * gap, 1, 0]));
  });
  for (const name of extUsed) declare(gltf, name);
  return gltf;
}

/** Two cameras (perspective and orthographic) looking at a cube, switched on by the example. */
export function camerasGlb(): GltfBuilder {
  const gltf = new GltfBuilder();
  const orange = gltf.material({ name: 'Orange', color: [0.95, 0.45, 0.12], roughness: 0.4 });
  const cube = shape(gltf, 'Cube', box(1.2, 1.2, 1.2), orange, [0, 1, 0]);
  const cam = (name: string, at: V3, rot: [number, number, number, number], camera: number): number =>
    gltf.node({ name, translation: at, rotation: rot, camera } as Parameters<typeof gltf.node>[0]);
  const tilt = quat([1, 0, 0], -20);
  gltf.root(cube);
  gltf.root(cam('FrontCamera', [0, 2, 5], tilt, 0));
  gltf.root(cam('SideCamera', [5, 1, 0], quat([0, 1, 0], 90), 1));
  (gltf.json as unknown as Def).cameras = [
    { name: 'Front', type: 'perspective', perspective: { yfov: 0.9, znear: 0.1, zfar: 50 } },
    { name: 'Side', type: 'orthographic', orthographic: { xmag: 3, ymag: 3, znear: 0.1, zfar: 50 } },
  ];
  spinClip(gltf, 'Spin', cube);
  return gltf;
}

/** A cube textured with `png`, whose material carries a KHR_texture_transform block. */
export function texturedGlb(png: Uint8Array, transform: Def): GltfBuilder {
  const gltf = new GltfBuilder();
  const texture = gltf.image(png);
  const m = gltf.material({ name: 'Tiled', color: [1, 1, 1], roughness: 0.6, texture });
  const base = (gltf.json.materials[m]!.pbrMetallicRoughness as Def).baseColorTexture as Def;
  extend(base, 'KHR_texture_transform', transform);
  gltf.root(shape(gltf, 'Cube', box(1.6, 1.6, 1.6), m, [0, 1, 0]));
  declare(gltf, 'KHR_texture_transform');
  return gltf;
}

/** A sphere whose positions are stored as normalized UNSIGNED_SHORT (KHR_mesh_quantization) or floats. */
export function quantizedGlb(quantize: boolean): GltfBuilder {
  const gltf = new GltfBuilder();
  const m = gltf.material({ name: 'Teal', color: [0.1, 0.65, 0.6], roughness: 0.35 });
  const g = sphere(0.9, 48);
  let position: number;
  let scale = 1;
  if (quantize) {
    // Map [-1, 1] to [0, 65535]; the node's scale and offset bring the range back.
    const q = new Uint16Array(g.positions.map((v) => Math.round(((v + 1) / 2) * 65535)));
    position = gltf.accessor(q, 'VEC3', 'vertex');
    Object.assign(gltf.json.accessors[position]!, { normalized: true, min: [0, 0, 0], max: [65535, 65535, 65535] });
    scale = 2;
  } else {
    position = gltf.accessor(new Float32Array(g.positions), 'VEC3', 'vertex');
  }
  const attributes = {
    POSITION: position,
    NORMAL: gltf.accessor(new Float32Array(g.normals), 'VEC3', 'vertex'),
    TEXCOORD_0: gltf.accessor(new Float32Array(g.uvs), 'VEC2', 'vertex'),
  };
  const indices = gltf.accessor(new Uint16Array(g.indices), 'SCALAR', 'index');
  const mesh = gltf.mesh('Sphere', [{ attributes, indices, material: m }]);
  const node = gltf.node({ name: 'Sphere', mesh, ...(quantize ? { translation: [-1, -1, -1], scale: [scale, scale, scale] } : { translation: [0, 1, 0] }) } as Parameters<typeof gltf.node>[0]);
  if (quantize) {
    gltf.root(gltf.node({ name: 'Holder', translation: [0, 1, 0], children: [node] }));
    declare(gltf, 'KHR_mesh_quantization');
  } else {
    gltf.root(node);
  }
  return gltf;
}

/** Three boxes carrying a made-up extension: node-level `SHOWCASE_spin` or material-level `SHOWCASE_toon`. */
export function pluginGlb(kind: 'spin' | 'toon'): GltfBuilder {
  const gltf = new GltfBuilder();
  const name = kind === 'spin' ? 'SHOWCASE_spin' : 'SHOWCASE_toon';
  [0, 1, 2].forEach((i) => {
    const m = gltf.material({ name: `Box${i}`, color: [0.9, 0.5 - i * 0.1, 0.2 + i * 0.25], roughness: 0.5 });
    if (kind === 'toon') extend(gltf.json.materials[m]!, name, { color: [[1, 0.35, 0.3], [0.3, 0.8, 0.4], [0.35, 0.5, 1]][i], bands: 2 + i * 2 });
    const node = shape(gltf, `Box${i}`, box(1, 1, 1), m, [(i - 1) * 1.8, 1, 0]);
    if (kind === 'spin') extend(gltf.json.nodes[node] as unknown as Def, name, { degreesPerSecond: 40 * (i + 1) });
    gltf.root(node);
  });
  declare(gltf, name);
  return gltf;
}

/** The .gltf JSON text of a .glb: the binary chunk moves into a base64 data URI. */
export function gltfJsonText(glb: ArrayBuffer): string {
  const dv = new DataView(glb);
  const jsonLength = dv.getUint32(12, true);
  const json = JSON.parse(new TextDecoder().decode(new Uint8Array(glb, 20, jsonLength))) as { buffers: { byteLength: number; uri?: string }[] };
  const binLength = dv.getUint32(20 + jsonLength, true);
  const bin = new Uint8Array(glb, 28 + jsonLength, binLength);
  let text = '';
  for (let i = 0; i < bin.length; i += 0x8000) text += String.fromCharCode(...bin.subarray(i, i + 0x8000));
  json.buffers[0]!.uri = `data:application/octet-stream;base64,${btoa(text)}`;
  return JSON.stringify(json);
}
