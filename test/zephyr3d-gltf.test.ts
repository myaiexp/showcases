// The generated Zephyr3D GLB models are valid and internally consistent
import { describe, expect, it } from 'vitest';
import { blobGlb, BLOB_TARGETS } from '../packages/zephyr3d/shared/gltf/blob.ts';
import { FIGURE_ANIMATIONS, FIGURE_JOINTS, figureGlb } from '../packages/zephyr3d/shared/gltf/figure.ts';
import { lanternGlb, toyGlb, treeGlb } from '../packages/zephyr3d/shared/gltf/props.ts';
import { TENTACLE_JOINTS, tentacleGlb } from '../packages/zephyr3d/shared/gltf/tentacle.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Json = any;

const WIDTH: Record<string, number> = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
const BYTES: Record<number, number> = { 5121: 1, 5123: 2, 5125: 4, 5126: 4 };

/** Splits a GLB into its JSON and BIN chunks, checking the container as it goes. */
function parse(glb: ArrayBuffer): { json: Json; bin: DataView } {
  const dv = new DataView(glb);
  expect(dv.getUint32(0, true)).toBe(0x46546c67);
  expect(dv.getUint32(4, true)).toBe(2);
  expect(dv.getUint32(8, true)).toBe(glb.byteLength);
  const jsonLength = dv.getUint32(12, true);
  expect(dv.getUint32(16, true)).toBe(0x4e4f534a);
  expect(jsonLength % 4).toBe(0);
  const json = JSON.parse(new TextDecoder().decode(new Uint8Array(glb, 20, jsonLength)));
  const binAt = 20 + jsonLength;
  const binLength = dv.getUint32(binAt, true);
  expect(dv.getUint32(binAt + 4, true)).toBe(0x004e4942);
  expect(binLength % 4).toBe(0);
  expect(binAt + 8 + binLength).toBe(glb.byteLength);
  expect(json.asset.version).toBe('2.0');
  expect(json.buffers).toHaveLength(1);
  expect(json.buffers[0].byteLength).toBe(binLength);
  return { json, bin: new DataView(glb, binAt + 8, binLength) };
}

/** Reads an accessor as a flat number array, checking it lies inside its bufferView. */
function read(json: Json, bin: DataView, index: number): number[] {
  const acc = json.accessors[index];
  const view = json.bufferViews[acc.bufferView];
  const width = WIDTH[acc.type] as number;
  const size = BYTES[acc.componentType] as number;
  expect(view.byteOffset % 4).toBe(0);
  expect(view.byteOffset + view.byteLength).toBeLessThanOrEqual(bin.byteLength);
  expect((acc.byteOffset ?? 0) + acc.count * width * size).toBeLessThanOrEqual(view.byteLength);
  const out: number[] = [];
  for (let i = 0; i < acc.count * width; i++) {
    const at = view.byteOffset + (acc.byteOffset ?? 0) + i * size;
    out.push(
      acc.componentType === 5126 ? bin.getFloat32(at, true) : acc.componentType === 5125 ? bin.getUint32(at, true) : acc.componentType === 5123 ? bin.getUint16(at, true) : bin.getUint8(at),
    );
  }
  return out;
}

const MODELS: [string, () => ArrayBuffer][] = [
  ['figure', figureGlb],
  ['tentacle', tentacleGlb],
  ['blob', blobGlb],
  ['toy', toyGlb],
  ['tree', treeGlb],
  ['lantern', lanternGlb],
];

describe.each(MODELS)('%s.glb', (_name, make) => {
  const glb = make();
  const { json, bin } = parse(glb);

  it('has accessors inside their views, with the right targets, bounds and index ranges', () => {
    for (const mesh of json.meshes) {
      for (const p of mesh.primitives) {
        const count = json.accessors[p.attributes.POSITION].count;
        for (const [semantic, index] of Object.entries<number>(p.attributes)) {
          const acc = json.accessors[index];
          expect(acc.count, semantic).toBe(count);
          expect(json.bufferViews[acc.bufferView].target).toBe(34962);
        }
        const positions = read(json, bin, p.attributes.POSITION);
        const acc = json.accessors[p.attributes.POSITION];
        for (let k = 0; k < 3; k++) {
          const axis = positions.filter((_, i) => i % 3 === k);
          expect(acc.min[k]).toBeCloseTo(Math.min(...axis), 5);
          expect(acc.max[k]).toBeCloseTo(Math.max(...axis), 5);
        }
        const indices = read(json, bin, p.indices);
        expect(json.bufferViews[json.accessors[p.indices].bufferView].target).toBe(34963);
        expect(indices.length % 3).toBe(0);
        expect(Math.max(...indices)).toBeLessThan(count);
        if (p.attributes.NORMAL) {
          const n = read(json, bin, p.attributes.NORMAL);
          for (let i = 0; i < n.length; i += 3) expect(Math.hypot(n[i]!, n[i + 1]!, n[i + 2]!)).toBeCloseTo(1, 3);
        }
        expect(json.materials[p.material]).toBeDefined();
      }
    }
  });

  it('winds every closed primitive counter-clockwise (positive volume)', () => {
    for (const mesh of json.meshes) {
      for (const p of mesh.primitives) {
        const v = read(json, bin, p.attributes.POSITION);
        const idx = read(json, bin, p.indices);
        let volume = 0;
        for (let t = 0; t < idx.length; t += 3) {
          const [a, b, c] = [idx[t]! * 3, idx[t + 1]! * 3, idx[t + 2]! * 3];
          // Signed tetrahedron volume against the origin: a . (b x c) / 6.
          volume +=
            (v[a]! * (v[b + 1]! * v[c + 2]! - v[b + 2]! * v[c + 1]!) -
              v[a + 1]! * (v[b]! * v[c + 2]! - v[b + 2]! * v[c]!) +
              v[a + 2]! * (v[b]! * v[c + 1]! - v[b + 1]! * v[c]!)) /
            6;
        }
        expect(volume, mesh.name).toBeGreaterThan(0);
      }
    }
  });

  it('binds skins: joint indices in range, weights sum to one, one matrix per joint', () => {
    for (const skin of json.skins ?? []) {
      const ibm = json.accessors[skin.inverseBindMatrices];
      expect(ibm.type).toBe('MAT4');
      expect(ibm.count).toBe(skin.joints.length);
      for (const j of skin.joints) expect(json.nodes[j]).toBeDefined();
    }
    for (const node of json.nodes) {
      if (node.skin === undefined) continue;
      const joints = json.skins[node.skin].joints.length;
      for (const p of json.meshes[node.mesh].primitives) {
        const j = read(json, bin, p.attributes.JOINTS_0);
        const w = read(json, bin, p.attributes.WEIGHTS_0);
        expect(Math.max(...j)).toBeLessThan(joints);
        for (let i = 0; i < w.length; i += 4) expect(w[i]! + w[i + 1]! + w[i + 2]! + w[i + 3]!).toBeCloseTo(1, 4);
      }
    }
  });

  it('has animation samplers whose input and output counts agree and that loop', () => {
    for (const anim of json.animations ?? []) {
      expect(anim.name).toBeTruthy();
      for (const ch of anim.channels) {
        const sampler = anim.samplers[ch.sampler];
        const input = json.accessors[sampler.input];
        const output = json.accessors[sampler.output];
        const node = json.nodes[ch.target.node];
        expect(node).toBeDefined();
        const per = ch.target.path === 'rotation' ? 4 : ch.target.path === 'weights' ? json.meshes[node.mesh].primitives[0].targets.length : 3;
        expect(output.count * WIDTH[output.type]!, `${anim.name}/${node.name}`).toBe(input.count * per);
        expect(input.min).toBeDefined();
        expect(input.max).toBeDefined();
        const times = read(json, bin, sampler.input);
        expect(times[0]).toBe(0);
        times.forEach((t, i) => i && expect(t).toBeGreaterThan(times[i - 1]!));
        expect(input.max[0]).toBeCloseTo(times[times.length - 1]!, 5);
        const values = read(json, bin, sampler.output);
        for (let k = 0; k < per; k++) expect(values[values.length - per + k]).toBeCloseTo(values[k]!, 4);
        if (ch.target.path === 'rotation') {
          for (let i = 0; i < values.length; i += 4) expect(Math.hypot(values[i]!, values[i + 1]!, values[i + 2]!, values[i + 3]!)).toBeCloseTo(1, 4);
        }
      }
    }
  });

  it('has morph targets matching the POSITION count', () => {
    for (const mesh of json.meshes) {
      for (const p of mesh.primitives) {
        const count = json.accessors[p.attributes.POSITION].count;
        for (const t of p.targets ?? []) {
          for (const index of Object.values<number>(t)) expect(json.accessors[index].count).toBe(count);
          expect(json.accessors[t.POSITION].min).toBeDefined();
        }
        if (p.targets) {
          expect(mesh.extras.targetNames).toHaveLength(p.targets.length);
          expect(mesh.weights).toHaveLength(p.targets.length);
        }
      }
    }
  });
});

describe('model specifics', () => {
  it('the figure has the Mixamo joints, the five clips and stands on y = 0, about 1.7 tall', () => {
    const { json, bin } = parse(figureGlb());
    const names = json.skins[0].joints.map((j: number) => json.nodes[j].name);
    expect(names).toEqual(FIGURE_JOINTS);
    expect(names).toHaveLength(22);
    expect(json.animations.map((a: Json) => a.name)).toEqual([...FIGURE_ANIMATIONS]);
    for (const required of ['Hips', 'Spine2', 'Neck', 'Head', 'LeftArm', 'RightForeArm', 'LeftHand', 'LeftUpLeg', 'RightLeg', 'LeftFoot', 'RightToeBase']) {
      expect(names).toContain(`mixamorig:${required}`);
    }
    const ys = json.meshes[0].primitives.flatMap((p: Json) => read(json, bin, p.attributes.POSITION).filter((_, i) => i % 3 === 1));
    expect(Math.min(...ys)).toBeCloseTo(0, 2);
    expect(Math.max(...ys)).toBeGreaterThan(1.65);
    expect(Math.max(...ys)).toBeLessThan(1.8);
  });

  it('the tentacle has the chain Bone0..Bone7 and sway and curl clips', () => {
    const { json } = parse(tentacleGlb());
    expect(json.skins[0].joints.map((j: number) => json.nodes[j].name)).toEqual(TENTACLE_JOINTS);
    expect(json.animations.map((a: Json) => a.name)).toEqual(['sway', 'curl']);
  });

  it('the blob names its morph targets and animates their weights', () => {
    const { json } = parse(blobGlb());
    expect(json.meshes[0].extras.targetNames).toEqual([...BLOB_TARGETS]);
    expect(BLOB_TARGETS.length).toBeGreaterThanOrEqual(3);
    expect(json.animations[0].name).toBe('pulse');
    expect(json.animations[0].channels[0].target.path).toBe('weights');
  });

  it('the props use PBR factors and an emissive colour', () => {
    for (const make of [toyGlb, treeGlb, lanternGlb]) {
      const { json } = parse(make());
      for (const m of json.materials) {
        expect(m.pbrMetallicRoughness.baseColorFactor).toHaveLength(4);
        expect(m.pbrMetallicRoughness.metallicFactor).toBeDefined();
        expect(m.pbrMetallicRoughness.roughnessFactor).toBeDefined();
      }
    }
    expect(parse(lanternGlb()).json.materials.some((m: Json) => m.emissiveFactor)).toBe(true);
    expect(parse(treeGlb()).json.materials.some((m: Json) => m.emissiveFactor)).toBe(true);
  });
});
