// A skinned tube on eight joints (Bone0..Bone7) with sway and curl clips
import { Glb, type Vec3 } from './glb.ts';
import { blendByY, ellipsoid, lathe, mergePrims, rigid, sampleProfile, skinned } from './geo.ts';
import { addRig, clip, type Pose } from './rig.ts';

const BONES = 8;
const SPACING = 0.2;
const TAU = Math.PI * 2;

/** Joint names in chain order, root first. Not a humanoid, so no rig mapping applies. */
export const TENTACLE_JOINTS: string[] = Array.from({ length: BONES }, (_, i) => `Bone${i}`);
/** Clip names in the GLB. */
export const TENTACLE_ANIMATIONS = ['sway', 'curl'] as const;

const radiusAt = (y: number): number => 0.15 - 0.11 * Math.min(1, y / (BONES * SPACING));

/** Each bone bends around X (curl) and Z (sway), later bones lagging behind earlier ones. */
function sway(u: number): Pose {
  const p = u * TAU;
  const rot: Record<string, Vec3> = {};
  TENTACLE_JOINTS.forEach((name, i) => {
    const k = Math.min(1, 0.3 + i * 0.15);
    rot[name] = [0.1 * k * Math.sin(p - 0.55 * i + 1.3), 0, 0.17 * k * Math.sin(p - 0.55 * i)];
  });
  return { rot };
}

function curl(u: number): Pose {
  const c = 0.5 - 0.5 * Math.cos(u * TAU);
  const rot: Record<string, Vec3> = {};
  TENTACLE_JOINTS.forEach((name, i) => {
    rot[name] = [(0.12 + 0.06 * i) * c * (i === 0 ? 0.4 : 1), 0, 0.05 * c * Math.sin(i)];
  });
  return { rot };
}

/** The tentacle as a GLB: a purple tube, cream suckers up the front and an emissive tip. */
export function tentacleGlb(): ArrayBuffer {
  const glb = new Glb();
  const [flesh, sucker, tip] = [
    glb.addMaterial({ name: 'flesh', baseColor: [0.32, 0.05, 0.42], roughness: 0.35 }),
    glb.addMaterial({ name: 'suckers', baseColor: [0.85, 0.7, 0.6], roughness: 0.5 }),
    glb.addMaterial({ name: 'tip', baseColor: [0.9, 0.35, 0.05], roughness: 0.3, emissive: [1, 0.35, 0.05] }),
  ];
  const top = BONES * SPACING + 0.02;
  const keys: [number, number][] = [[-0.02, 0], [-0.01, radiusAt(0)]];
  for (let y = 0.2; y < top - 0.05; y += 0.2) keys.push([y, radiusAt(y)]);
  keys.push([top - 0.05, radiusAt(top - 0.05)], [top, 0]);
  const stops = Array.from({ length: BONES }, (_, i): [number, number] => [(BONES - 1 - i) * SPACING, BONES - 1 - i]);
  const body = skinned(lathe(sampleProfile(keys, 0.05), { seg: 14 }), blendByY(stops), flesh);
  const suckers = Array.from({ length: 13 }, (_, k) => {
    const y = 0.12 + k * 0.125;
    const bone = Math.min(BONES - 1, Math.max(0, Math.round(y / SPACING)));
    return skinned(ellipsoid([0, y, radiusAt(y) * 0.92], [0.03, 0.03, 0.025].map((v) => v * (1.2 - y / 2)) as Vec3, 8, 5), rigid(bone), sucker);
  });
  const tipPrim = skinned(ellipsoid([0, top - 0.02, 0], [0.04, 0.05, 0.04], 8, 6), rigid(BONES - 1), tip);
  const mesh = glb.addMesh({ name: 'Tentacle', primitives: [body, mergePrims(suckers), tipPrim] });
  const rig = addRig(glb, TENTACLE_JOINTS.map((name, i) => ({ name, parent: i - 1, world: [0, i * SPACING, 0] as Vec3 })), 'TentacleSkin');
  const bodyNode = glb.addNode({ name: 'TentacleBody', mesh, skin: rig.skin });
  const nodes: Record<string, number> = Object.fromEntries(TENTACLE_JOINTS.map((n, i) => [n, rig.nodes[i]!]));
  const base = { nodes, translated: [], keys: 24 };
  glb.addAnimation(clip({ ...base, name: 'sway', duration: 2, pose: sway }));
  glb.addAnimation(clip({ ...base, name: 'curl', duration: 2.4, pose: curl }));
  return glb.build([rig.nodes[0]!, bodyNode]);
}
