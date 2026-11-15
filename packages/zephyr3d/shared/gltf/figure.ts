// A skinned low-poly humanoid with a Mixamo-named rig, facing +Z, feet at y = 0
import { Glb, type MaterialDef, type PrimitiveDef, type Vec3 } from './glb.ts';
import {
  blendByY,
  box,
  ellipsoid,
  type Geo,
  type Influence,
  lathe,
  mergePrims,
  rigid,
  sampleProfile,
  skinned,
} from './geo.ts';
import { addRig, type JointDef } from './rig.ts';
import { figureClips } from './figure-clips.ts';

const PREFIX = 'mixamorig:';

/** Short joint names in rig order (Mixamo names without the "mixamorig:" prefix). */
export const FIGURE_KEYS: string[] = [];
const WORLD: Vec3[] = [];
const PARENT: number[] = [];

function joint(key: string, parent: string | null, world: Vec3): void {
  FIGURE_KEYS.push(key);
  WORLD.push(world);
  PARENT.push(parent === null ? -1 : FIGURE_KEYS.indexOf(parent));
}

joint('Hips', null, [0, 0.95, 0]);
joint('Spine', 'Hips', [0, 1.05, 0]);
joint('Spine1', 'Spine', [0, 1.18, 0]);
joint('Spine2', 'Spine1', [0, 1.32, 0]);
joint('Neck', 'Spine2', [0, 1.45, 0]);
joint('Head', 'Neck', [0, 1.52, 0]);
for (const [side, s] of [['Left', 1], ['Right', -1]] as const) {
  joint(`${side}Shoulder`, 'Spine2', [s * 0.07, 1.4, 0]);
  joint(`${side}Arm`, `${side}Shoulder`, [s * 0.24, 1.4, 0]);
  joint(`${side}ForeArm`, `${side}Arm`, [s * 0.24, 1.15, 0]);
  joint(`${side}Hand`, `${side}ForeArm`, [s * 0.24, 0.9, 0]);
  joint(`${side}UpLeg`, 'Hips', [s * 0.095, 0.93, 0]);
  joint(`${side}Leg`, `${side}UpLeg`, [s * 0.095, 0.51, 0]);
  joint(`${side}Foot`, `${side}Leg`, [s * 0.095, 0.09, 0]);
  joint(`${side}ToeBase`, `${side}Foot`, [s * 0.095, 0.04, 0.12]);
}

/** The joint names as they appear in the GLB, e.g. "mixamorig:LeftUpLeg". */
export const FIGURE_JOINTS: string[] = FIGURE_KEYS.map((k) => PREFIX + k);
/** Clip names in the GLB. */
export const FIGURE_ANIMATIONS = ['idle', 'walk', 'run', 'wave', 'jump'] as const;
/** Part names the example can colour: the GLB's material names. */
export const FIGURE_MATERIALS = ['skin', 'shirt', 'trousers', 'shoes', 'hair', 'eyes'] as const;

const MATERIALS: MaterialDef[] = [
  { name: 'skin', baseColor: [0.72, 0.4, 0.29], roughness: 0.7 },
  { name: 'shirt', baseColor: [0.04, 0.22, 0.7], roughness: 0.85 },
  { name: 'trousers', baseColor: [0.035, 0.04, 0.1], roughness: 0.9 },
  { name: 'shoes', baseColor: [0.32, 0.1, 0.03], roughness: 0.45, metallic: 0.1 },
  { name: 'hair', baseColor: [0.05, 0.025, 0.012], roughness: 0.6 },
  { name: 'eyes', baseColor: [0.01, 0.01, 0.015], roughness: 0.2 },
];

const idx = (key: string): number => FIGURE_KEYS.indexOf(key);

/** A tube along Y (bottom to top) from [y, radius] keys, centred at x. */
function tube(keys: [number, number][], x: number, sx = 1, sz = 1, seg = 10): Geo {
  return lathe(sampleProfile(keys, 0.04), { cx: x, sx, sz, seg });
}

function bodyParts(): [number, Geo, Influence][] {
  const parts: [number, Geo, Influence][] = [];
  const add = (material: number, geo: Geo, influence: Influence): void => {
    parts.push([material, geo, influence]);
  };
  const [SKIN, SHIRT, TROUSERS, SHOES, HAIR, EYES] = [0, 1, 2, 3, 4, 5];
  add(
    SHIRT,
    tube([[0.9, 0], [0.92, 0.12], [0.98, 0.155], [1.1, 0.15], [1.2, 0.155], [1.3, 0.18], [1.38, 0.19], [1.42, 0.12], [1.44, 0.05], [1.45, 0]], 0, 1, 0.62, 14),
    blendByY([[1.34, idx('Spine2')], [1.24, idx('Spine1')], [1.14, idx('Spine1')], [1.06, idx('Spine')], [0.98, idx('Spine')], [0.9, idx('Hips')]]),
  );
  add(TROUSERS, ellipsoid([0, 0.9, 0], [0.17, 0.09, 0.11], 14, 8), rigid(idx('Hips')));
  add(SKIN, tube([[1.4, 0], [1.41, 0.05], [1.5, 0.045], [1.55, 0]], 0), rigid(idx('Neck')));
  add(SKIN, ellipsoid([0, 1.595, 0.005], [0.095, 0.108, 0.105], 14, 10), rigid(idx('Head')));
  add(HAIR, ellipsoid([0, 1.625, -0.025], [0.1, 0.088, 0.11], 14, 8), rigid(idx('Head')));
  for (const sx of [-0.04, 0.04]) add(EYES, ellipsoid([sx, 1.6, 0.103], [0.013, 0.013, 0.013], 8, 6), rigid(idx('Head')));
  for (const [side, s] of [['Left', 1], ['Right', -1]] as const) {
    const [arm, fore, hand] = [idx(`${side}Arm`), idx(`${side}ForeArm`), idx(`${side}Hand`)];
    const x = s * 0.24;
    add(SHIRT, tube([[1.2, 0], [1.21, 0.058], [1.3, 0.062], [1.42, 0.066], [1.455, 0.04], [1.47, 0]], x), rigid(arm));
    add(
      SKIN,
      tube([[0.78, 0], [0.8, 0.034], [0.84, 0.046], [0.9, 0.036], [0.96, 0.036], [1.1, 0.046], [1.2, 0.052], [1.26, 0.054], [1.27, 0]], x, 1, 0.8),
      blendByY([[1.22, arm], [1.08, fore], [0.96, fore], [0.88, hand]]),
    );
    const [up, leg, foot, toe] = [idx(`${side}UpLeg`), idx(`${side}Leg`), idx(`${side}Foot`), idx(`${side}ToeBase`)];
    const lx = s * 0.095;
    add(
      TROUSERS,
      tube([[0.07, 0], [0.075, 0.04], [0.1, 0.05], [0.3, 0.062], [0.5, 0.07], [0.62, 0.078], [0.8, 0.085], [0.92, 0.088], [0.97, 0]], lx),
      blendByY([[0.62, up], [0.42, leg], [0.16, leg], [0.08, foot]]),
    );
    add(SHOES, box([lx, 0.05, 0.02], [0.105, 0.1, 0.2]), rigid(foot));
    add(SHOES, box([lx, 0.03, 0.165], [0.105, 0.06, 0.09]), rigid(toe));
  }
  return parts;
}

/**
 * The humanoid as a GLB: 22 Mixamo-named joints (hips, 3 spine, neck, head, and per side
 * shoulder, arm, forearm, hand, up-leg, leg, foot, toe base; no fingers), six coloured
 * materials, and the clips idle, walk, run, wave and jump.
 */
export function figureGlb(): ArrayBuffer {
  const glb = new Glb();
  const materials = MATERIALS.map((m) => glb.addMaterial(m));
  const byMaterial = new Map<number, PrimitiveDef[]>();
  for (const [m, geo, influence] of bodyParts()) {
    const list = byMaterial.get(m) ?? [];
    list.push(skinned(geo, influence, materials[m]));
    byMaterial.set(m, list);
  }
  const mesh = glb.addMesh({ name: 'Figure', primitives: [...byMaterial.values()].map(mergePrims) });
  const joints: JointDef[] = FIGURE_JOINTS.map((name, i) => ({ name, parent: PARENT[i], world: WORLD[i] }));
  const rig = addRig(glb, joints, 'FigureSkin');
  const body = glb.addNode({ name: 'FigureBody', mesh, skin: rig.skin });
  const nodes = Object.fromEntries(FIGURE_KEYS.map((k, i) => [k, rig.nodes[i]]));
  for (const c of figureClips(nodes)) glb.addAnimation(c);
  return glb.build([rig.nodes[0], body]);
}
