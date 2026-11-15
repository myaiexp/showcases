// The figure's looping clips (idle, walk, run, wave, jump) as pose functions
import type { AnimationDef, Vec3 } from './glb.ts';
import { clip, curve, type Pose, smoothstep } from './rig.ts';

type Rot = Record<string, Vec3>;
type Side = 'Left' | 'Right';
const TAU = Math.PI * 2;
const HIPS_Y = 0.95;
const sides: Side[] = ['Left', 'Right'];

/**
 * Leg angles in flexion terms: `thigh` swings the knee forward, `knee` folds the shin back,
 * and the foot is levelled so the sole stays flat. All rest rotations are zero, and about X a
 * positive angle swings the limb toward -Z, so forward flexion is a negative X rotation.
 */
function leg(rot: Rot, side: Side, thigh: number, knee: number, toe = 0): void {
  rot[`${side}UpLeg`] = [-thigh, 0, 0];
  rot[`${side}Leg`] = [knee, 0, 0];
  rot[`${side}Foot`] = [thigh - knee, 0, 0];
  rot[`${side}ToeBase`] = [toe, 0, 0];
}

/** Arm angles: `swing` forward, `elbow` flexion, `out` away from the body (about Z, mirrored). */
function arm(rot: Rot, side: Side, swing: number, elbow: number, out: number, extra: Vec3 = [0, 0, 0]): void {
  const s = side === 'Left' ? 1 : -1;
  rot[`${side}Arm`] = [-swing + extra[0], extra[1], s * out + extra[2]];
  rot[`${side}ForeArm`] = [-elbow, 0, 0];
}

/** Hips height that keeps the feet on the ground for these leg angles (0.42 per bone). */
function plantedHips(thigh: number, knee: number): number {
  return HIPS_Y - 0.84 + 0.42 * Math.cos(thigh) + 0.42 * Math.cos(knee - thigh);
}

function idle(u: number): Pose {
  const p = u * TAU;
  const rot: Rot = {
    Hips: [0, 0, 0.012 * Math.sin(p)],
    Spine1: [0.018 * Math.sin(p), 0, 0],
    Spine2: [0.025 * Math.sin(p - 0.6), 0.03 * Math.sin(p), 0],
    Neck: [-0.01 * Math.sin(p), 0, 0],
    Head: [-0.02 * Math.sin(p - 1.2), 0.06 * Math.sin(p + 0.5), 0],
    LeftShoulder: [0, 0, 0.02 * Math.sin(p)],
    RightShoulder: [0, 0, -0.02 * Math.sin(p)],
  };
  for (const side of sides) {
    arm(rot, side, 0.03 * Math.sin(p - 0.5), 0.12 + 0.03 * Math.sin(p), 0.06 + 0.02 * Math.sin(p - 0.8));
    leg(rot, side, 0.02, 0.04);
  }
  return { rot, pos: { Hips: [0, HIPS_Y + 0.004 * Math.sin(p), 0] } };
}

/** Shared by walk and run: legs, arms and torso follow one phase. */
function stride(u: number, k: { thigh: number; lift: number; swing: number; elbow: number; lean: number; bob: number; base: number; twist: number; sag: number }): Pose {
  const p = u * TAU;
  const rot: Rot = {
    Hips: [k.lean, -k.twist * Math.sin(p), 0],
    Spine: [k.lean * 0.5, k.twist * 0.6 * Math.sin(p), 0],
    Spine2: [k.lean * 0.4, k.twist * 0.6 * Math.sin(p), 0],
    Neck: [-k.lean * 0.5, 0, 0],
    Head: [-k.lean * 0.9, -k.twist * 0.8 * Math.sin(p), 0],
  };
  for (const side of sides) {
    const q = side === 'Left' ? p : p + Math.PI;
    const thigh = k.base + k.thigh * Math.sin(q);
    const knee = 0.12 + k.lift * ((1 + Math.cos(q)) / 2) ** 2;
    leg(rot, side, thigh, knee, 0.1 * Math.max(0, Math.sin(q - 0.5)));
    const swing = -k.swing * Math.sin(q);
    arm(rot, side, swing, k.elbow + 0.25 * Math.max(0, swing / k.swing), 0.07);
  }
  return { rot, pos: { Hips: [0, k.bob * Math.cos(2 * p) + HIPS_Y - k.sag, 0] } };
}

const walk = (u: number): Pose => stride(u, { thigh: 0.45, lift: 0.75, swing: 0.4, elbow: 0.3, lean: 0.04, bob: 0.02, base: 0.05, twist: 0.1, sag: 0.01 });
const run = (u: number): Pose => stride(u, { thigh: 0.75, lift: 1.3, swing: 0.85, elbow: 1.3, lean: 0.2, bob: -0.05, base: 0.3, twist: 0.18, sag: 0.06 });

/** Right arm raised, forearm and hand waving, the rest of the body in a gentle idle. */
function wave(u: number): Pose {
  const base = idle(u);
  const env = smoothstep(0, 0.15, u) * (1 - smoothstep(0.85, 1, u));
  const w = Math.sin(u * TAU * 3) * env;
  const rot = base.rot ?? {};
  rot.RightShoulder = [0, 0, -0.12 * env];
  rot.RightArm = [-0.3 * env, 0, -2.55 * env + (1 - env) * -0.06];
  rot.RightForeArm = [-0.25 * env, 0, 0.55 * w];
  rot.RightHand = [0, 0, 0.35 * Math.sin(u * TAU * 3 - 0.8) * env];
  rot.Spine2 = [0.02, 0.1 * env, 0.04 * env];
  rot.Head = [0, -0.2 * env, 0.08 * env];
  return { rot, pos: base.pos };
}

/** Crouch, spring up, tuck at the top, land and settle. */
function jump(u: number): Pose {
  const thigh = curve([[0, 0.05], [0.18, 0.8], [0.3, -0.05], [0.5, 0.5], [0.72, 0.15], [0.82, 0.75]])(u);
  const knee = curve([[0, 0.1], [0.18, 1.4], [0.3, 0.05], [0.5, 0.9], [0.72, 0.2], [0.82, 1.3]])(u);
  const swing = curve([[0, 0.05], [0.18, -0.7], [0.3, 1.5], [0.5, 1.6], [0.72, 0.4], [0.82, -0.5]])(u);
  const lean = curve([[0, 0], [0.18, 0.3], [0.3, -0.05], [0.5, 0.1], [0.72, 0], [0.82, 0.3]])(u);
  const t = Math.min(1, Math.max(0, (u - 0.28) / 0.46));
  const rot: Rot = {
    Hips: [lean, 0, 0],
    Spine1: [lean * 0.4, 0, 0],
    Neck: [-lean * 0.4, 0, 0],
    Head: [-lean * 0.5, 0, 0],
  };
  for (const side of sides) {
    leg(rot, side, thigh, knee, 0);
    arm(rot, side, swing, 0.3 + 0.5 * smoothstep(0.2, 0.4, u) * (1 - smoothstep(0.7, 0.85, u)), 0.1 + 0.45 * 4 * t * (1 - t));
  }
  return { rot, pos: { Hips: [0, plantedHips(thigh, knee) + 0.34 * 4 * t * (1 - t), 0] } };
}

/** All five clips, keyed to the joint nodes by short name (see FIGURE_KEYS). */
export function figureClips(nodes: Record<string, number>): AnimationDef[] {
  const base = { nodes, translated: ['Hips'], keys: 24 };
  return [
    clip({ ...base, name: 'idle', duration: 2, pose: idle }),
    clip({ ...base, name: 'walk', duration: 1.1, pose: walk }),
    clip({ ...base, name: 'run', duration: 0.7, pose: run }),
    clip({ ...base, name: 'wave', duration: 1.6, pose: wave }),
    clip({ ...base, name: 'jump', duration: 1.2, pose: jump }),
  ];
}
