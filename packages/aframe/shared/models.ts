// Models made in code as blob: URLs: glTF props, a windmill, OBJ + MTL
import { Glb, type Vec4 } from './gltf/glb.ts';
import { box, lathe, merge, staticPrim } from './gltf/geo.ts';
import { lanternGlb, toyGlb, treeGlb } from './gltf/props.ts';

/**
 * The docs load models from files (`<a-asset-item src="tree.gltf">`); examples load these
 * instead. Each call makes a blob: URL in the calling realm (the example's iframe), which
 * the offline guard lets through and which dies with the iframe's document.
 */
function blobUrl(data: BlobPart, type: string): string {
  return URL.createObjectURL(new Blob([data], { type }));
}

export const glb = {
  /** A rubber-duck toy, about 0.9 tall, facing +Z. */
  toy: () => blobUrl(toyGlb(), 'model/gltf-binary'),
  /** A tree with leafy blobs and glowing fruit, about 2 tall. */
  tree: () => blobUrl(treeGlb(), 'model/gltf-binary'),
  /** A lantern with an emissive glass core. */
  lantern: () => blobUrl(lanternGlb(), 'model/gltf-binary'),
  /** A windmill with two clips: `spin` (the sails) and `sway` (the whole mill rocking). */
  windmill: () => blobUrl(windmillGlb(), 'model/gltf-binary'),
};

/** Quaternion for an angle about the Z axis. */
function aboutZ(rad: number): Vec4 {
  return [0, 0, Math.sin(rad / 2), Math.cos(rad / 2)];
}

/** Quaternion for an angle about the Y axis. */
function aboutY(rad: number): Vec4 {
  return [0, Math.sin(rad / 2), 0, Math.cos(rad / 2)];
}

export const WINDMILL_CLIPS = ['spin', 'sway'] as const;

function windmillGlb(): ArrayBuffer {
  const g = new Glb();
  const wall = g.addMaterial({ name: 'wall', baseColor: [0.82, 0.74, 0.6], roughness: 0.8 });
  const roof = g.addMaterial({ name: 'roof', baseColor: [0.55, 0.12, 0.08], roughness: 0.6 });
  const sail = g.addMaterial({ name: 'sail', baseColor: [0.92, 0.9, 0.85], roughness: 0.9, doubleSided: true });
  const tower = lathe([[0, 0], [0, 0.55], [1.6, 0.4], [1.6, 0]], { seg: 16 });
  const cap = lathe([[1.55, 0], [1.55, 0.48], [2.05, 0]], { seg: 16 });
  const body = g.addMesh({ name: 'Tower', primitives: [staticPrim(merge(tower), wall), staticPrim(merge(cap), roof)] });
  const sails = merge(
    box([0, 0, 0], [0.12, 0.12, 0.12]),
    ...[0, 1, 2, 3].map((i) => {
      const a = (i * Math.PI) / 2;
      const r = 0.55;
      return box([Math.cos(a) * r, Math.sin(a) * r, 0], i % 2 ? [0.18, 0.9, 0.02] : [0.9, 0.18, 0.02]);
    }),
  );
  const hub = g.addMesh({ name: 'Sails', primitives: [staticPrim(sails, sail)] });
  const sailsNode = g.addNode({ name: 'Sails', mesh: hub, translation: [0, 1.45, 0.5] });
  const towerNode = g.addNode({ name: 'Mill', mesh: body, children: [sailsNode] });

  const steps = 16;
  const spinTimes = new Float32Array(Array.from({ length: steps + 1 }, (_, i) => (i / steps) * 4));
  const spinValues = new Float32Array(Array.from({ length: steps + 1 }, (_, i) => aboutZ((-i / steps) * Math.PI * 2)).flat());
  g.addAnimation({ name: 'spin', channels: [{ node: sailsNode, path: 'rotation', times: spinTimes, values: spinValues }] });

  const swayTimes = new Float32Array([0, 1, 2, 3, 4]);
  const swayValues = new Float32Array([0, 0.25, 0, -0.25, 0].map((a) => aboutY(a)).flat());
  g.addAnimation({ name: 'sway', channels: [{ node: towerNode, path: 'rotation', times: swayTimes, values: swayValues }] });
  return g.build([towerNode]);
}

/** A faceted gem as Wavefront OBJ text, with `usemtl` groups for its MTL file. */
export function gemObj(sides = 8): string {
  const lines = ['# A faceted gem generated in code', 'mtllib gem.mtl', 'o Gem', 'v 0 1.2 0', 'v 0 -0.9 0'];
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2;
    lines.push(`v ${(Math.cos(a) * 0.8).toFixed(4)} 0.35 ${(Math.sin(a) * 0.8).toFixed(4)}`);
  }
  for (let i = 0; i < sides; i++) {
    const a = 3 + i;
    const b = 3 + ((i + 1) % sides);
    lines.push(`usemtl ${i % 2 ? 'Ruby' : 'Garnet'}`, `f 1 ${b} ${a}`, `f 2 ${a} ${b}`);
  }
  return lines.join('\n');
}

/** The MTL file for gemObj: two materials, diffuse and specular. */
export function gemMtl(): string {
  return ['newmtl Ruby', 'Kd 0.85 0.08 0.2', 'Ks 0.9 0.9 0.9', 'Ns 80', '', 'newmtl Garnet', 'Kd 0.45 0.02 0.1', 'Ks 0.9 0.9 0.9', 'Ns 80'].join('\n');
}

export const obj = {
  /** gemObj() as a blob: URL. */
  gem: () => blobUrl(gemObj(), 'text/plain'),
  /** gemMtl() as a blob: URL. */
  gemMtl: () => blobUrl(gemMtl(), 'text/plain'),
};
