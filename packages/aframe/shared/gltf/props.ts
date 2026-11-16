// Static PBR props: a toy duck, a tree and a lantern
import { Glb, type MaterialDef, type Vec3 } from './glb.ts';
import { box, ellipsoid, type Geo, lathe, merge, sampleProfile, staticPrim } from './geo.ts';

/** A cylinder along Y with hard edges, closed at both ends. */
function cylinder(y0: number, y1: number, r: number, c: [number, number] = [0, 0], seg = 16): Geo {
  return lathe([[y0, 0], [y0, r], [y0, r], [y1, r], [y1, r], [y1, 0]], { cx: c[0], cz: c[1], seg });
}

/** Builds one prop from `parts` (a shape per material) and returns the GLB. */
function prop(name: string, materials: MaterialDef[], parts: Geo[][]): ArrayBuffer {
  const glb = new Glb();
  const ids = materials.map((m) => glb.addMaterial(m));
  const primitives = parts.map((geos, i) => staticPrim(merge(...geos), ids[i]!));
  const node = glb.addNode({ name, mesh: glb.addMesh({ name, primitives }) });
  return glb.build([node]);
}

/** A rubber-duck stand-in made of ellipsoids, about 0.9 tall, facing +Z. */
export function toyGlb(): ArrayBuffer {
  const e = (c: Vec3, r: Vec3, seg = 16, rings = 10): Geo => ellipsoid(c, r, seg, rings);
  return prop(
    'Toy',
    [
      { name: 'rubber', baseColor: [0.95, 0.62, 0.02], roughness: 0.3 },
      { name: 'wing', baseColor: [0.85, 0.42, 0.01], roughness: 0.35 },
      { name: 'beak', baseColor: [0.9, 0.18, 0.015], roughness: 0.5 },
      { name: 'eye', baseColor: [0.01, 0.01, 0.012], roughness: 0.1 },
    ],
    [
      [e([0, 0.3, -0.02], [0.3, 0.24, 0.38], 20, 12), e([0, 0.4, -0.38], [0.08, 0.09, 0.13]), e([0, 0.74, 0.22], [0.17, 0.17, 0.17], 20, 12)],
      [e([-0.29, 0.34, -0.02], [0.05, 0.15, 0.25]), e([0.29, 0.34, -0.02], [0.05, 0.15, 0.25])],
      [e([0, 0.7, 0.42], [0.08, 0.03, 0.11]), e([-0.1, 0.03, 0.12], [0.07, 0.025, 0.1]), e([0.1, 0.03, 0.12], [0.07, 0.025, 0.1])],
      [e([-0.08, 0.79, 0.345], [0.028, 0.028, 0.028], 10, 8), e([0.08, 0.79, 0.345], [0.028, 0.028, 0.028], 10, 8)],
    ],
  );
}

/** A tree: rough bark trunk, three stacked leafy blobs and a few glowing fruit; about 2 tall. */
export function treeGlb(): ArrayBuffer {
  const trunk = lathe(sampleProfile([[0, 0], [0, 0.13], [0.5, 0.09], [1.0, 0.07], [1.0, 0]], 0.1), { seg: 10 });
  const fruit: Geo[] = [];
  for (let i = 0; i < 6; i++) {
    const a = i * 2.4;
    const y = 0.85 + (i % 3) * 0.32;
    const r = [0.55, 0.42, 0.28][i % 3]! * 0.93;
    fruit.push(ellipsoid([Math.cos(a) * r, y, Math.sin(a) * r], [0.05, 0.05, 0.05], 8, 6));
  }
  return prop(
    'Tree',
    [
      { name: 'bark', baseColor: [0.2, 0.09, 0.03], roughness: 0.95 },
      { name: 'leaves', baseColor: [0.07, 0.3, 0.05], roughness: 0.8 },
      { name: 'fruit', baseColor: [0.9, 0.15, 0.03], roughness: 0.3, emissive: [1, 0.25, 0.05] },
    ],
    [
      [trunk],
      [ellipsoid([0, 0.95, 0], [0.55, 0.4, 0.55], 16, 10), ellipsoid([0, 1.35, 0], [0.42, 0.35, 0.42], 16, 10), ellipsoid([0, 1.7, 0], [0.28, 0.3, 0.28], 14, 9)],
      fruit,
    ],
  );
}

/** A brass lantern with a glowing core, about 0.9 tall: metallic, rough and emissive in one. */
export function lanternGlb(): ArrayBuffer {
  const posts = [-1, 1].flatMap((sx) => [-1, 1].map((sz) => box([sx * 0.18, 0.45, sz * 0.18], [0.035, 0.74, 0.035])));
  return prop(
    'Lantern',
    [
      { name: 'brass', baseColor: [1, 0.72, 0.3], metallic: 1, roughness: 0.28 },
      { name: 'glass', baseColor: [1, 0.85, 0.4], roughness: 0.1, emissive: [1, 0.72, 0.25] },
      { name: 'iron', baseColor: [0.05, 0.05, 0.055], metallic: 0.8, roughness: 0.6 },
    ],
    [
      [cylinder(0, 0.08, 0.25), cylinder(0.82, 0.9, 0.25), ellipsoid([0, 0.98, 0], [0.12, 0.1, 0.12], 12, 8)],
      [ellipsoid([0, 0.45, 0], [0.14, 0.22, 0.14], 14, 10)],
      posts,
    ],
  );
}
