// Animation chapter: a jointed box creature and a code clip builder
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { addShape, createScene, material, type Scene } from './components.ts';

type Vec3Tuple = [number, number, number];

interface Joint {
  name: string;
  parent: string | null;
  at: Vec3Tuple;
  /** The visible part: size and centre offset from the joint, so limbs swing from their top. */
  box: { size: Vec3Tuple; offset: Vec3Tuple; colour: string; shape?: 'box' | 'sphere' };
}

const SKIN = '#8a90a0';
const LIMB = '#4ab3e8';
const JOINTS: Joint[] = [
  { name: 'Hips', parent: 'Root', at: [0, 1, 0], box: { size: [0.6, 0.25, 0.35], offset: [0, 0, 0], colour: SKIN } },
  { name: 'Spine', parent: 'Hips', at: [0, 0.1, 0], box: { size: [0.5, 0.55, 0.3], offset: [0, 0.28, 0], colour: SKIN } },
  { name: 'Head', parent: 'Spine', at: [0, 0.6, 0], box: { size: [0.34, 0.34, 0.34], offset: [0, 0.2, 0], colour: '#e8794a', shape: 'sphere' } },
  { name: 'ArmL', parent: 'Spine', at: [-0.38, 0.5, 0], box: { size: [0.14, 0.42, 0.14], offset: [0, -0.2, 0], colour: LIMB } },
  { name: 'ForeL', parent: 'ArmL', at: [0, -0.42, 0], box: { size: [0.12, 0.38, 0.12], offset: [0, -0.18, 0], colour: '#7fd0f5' } },
  { name: 'ArmR', parent: 'Spine', at: [0.38, 0.5, 0], box: { size: [0.14, 0.42, 0.14], offset: [0, -0.2, 0], colour: LIMB } },
  { name: 'ForeR', parent: 'ArmR', at: [0, -0.42, 0], box: { size: [0.12, 0.38, 0.12], offset: [0, -0.18, 0], colour: '#7fd0f5' } },
  { name: 'LegL', parent: 'Hips', at: [-0.17, -0.1, 0], box: { size: [0.18, 0.5, 0.18], offset: [0, -0.25, 0], colour: '#7bc67b' } },
  { name: 'ShinL', parent: 'LegL', at: [0, -0.5, 0], box: { size: [0.15, 0.45, 0.15], offset: [0, -0.22, 0], colour: '#a8e0a8' } },
  { name: 'LegR', parent: 'Hips', at: [0.17, -0.1, 0], box: { size: [0.18, 0.5, 0.18], offset: [0, -0.25, 0], colour: '#7bc67b' } },
  { name: 'ShinR', parent: 'LegR', at: [0, -0.5, 0], box: { size: [0.15, 0.45, 0.15], offset: [0, -0.22, 0], colour: '#a8e0a8' } },
];

/**
 * A jointed creature of boxes. Every joint is an entity named after its part, so a clip can
 * target `['Root', 'Hips', 'Spine', 'ArmR']` and so on. The returned entity is not yet in the scene.
 */
export function createCreature(name = 'Root'): pc.Entity {
  const root = new pc.Entity(name);
  const byName = new Map<string, pc.Entity>([[name, root]]);
  for (const j of JOINTS) {
    const e = new pc.Entity(j.name);
    e.setLocalPosition(...j.at);
    byName.get(j.parent === 'Root' ? name : j.parent!)!.addChild(e);
    byName.set(j.name, e);
    addShape(e, j.box.shape ?? 'box', material(j.box.colour), j.box.offset, j.box.size, `${j.name} mesh`);
  }
  return root;
}

/** The path of joint names from the creature's root down to `joint`, as clips and masks need it. */
export function jointPath(joint: string, root = 'Root'): string[] {
  const chain: string[] = [];
  let at: string | null = joint;
  while (at && at !== 'Root') {
    chain.unshift(at);
    at = JOINTS.find((j) => j.name === at)?.parent ?? null;
  }
  return [root, ...chain];
}

export type Property = 'localPosition' | 'localRotation' | 'localScale';

export interface Channel {
  path: string[];
  property: Property;
  /** Keyframe times in seconds. */
  times: number[];
  /** One value per time: three numbers for position and scale, Euler degrees for rotation. */
  values: number[][];
  interpolation?: number;
}

/** Builds a clip (an AnimTrack) from channels. Euler rotations are converted to quaternions. */
export function buildTrack(name: string, duration: number, channels: Channel[], events?: object[]): pc.AnimTrack {
  const inputs: pc.AnimData[] = [];
  const outputs: pc.AnimData[] = [];
  const curves: pc.AnimCurve[] = [];
  const q = new pc.Quat();
  channels.forEach((c, i) => {
    inputs.push(new pc.AnimData(1, c.times));
    const flat: number[] = [];
    for (const v of c.values) {
      if (c.property === 'localRotation') {
        q.setFromEulerAngles(v[0]!, v[1]!, v[2]!);
        flat.push(q.x, q.y, q.z, q.w);
      } else flat.push(...v);
    }
    outputs.push(new pc.AnimData(c.property === 'localRotation' ? 4 : 3, flat));
    curves.push(new pc.AnimCurve([{ entityPath: c.path, component: 'graph', propertyPath: [c.property] }], i, i, c.interpolation ?? pc.INTERPOLATION_LINEAR));
  });
  const track = new pc.AnimTrack(name, duration, inputs, outputs, curves);
  if (events) track.events = new pc.AnimEvents(events);
  return track;
}

/** Samples `fn` at `steps + 1` evenly spaced times, so a loop closes on its first key. */
export function sample(
  joint: string,
  property: Property,
  duration: number,
  fn: (t: number, phase: number) => number[],
  steps = 12,
  root = 'Root',
): Channel {
  const times: number[] = [];
  const values: number[][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * duration;
    times.push(t);
    values.push(fn(t, i / steps));
  }
  return { path: jointPath(joint, root), property, times, values };
}

const TAU = Math.PI * 2;
const rot = (x = 0, y = 0, z = 0): number[] => [x, y, z];

/** Looping locomotion cycle; `amp` scales the swing and `period` is its length in seconds. */
export function locomotion(name: string, period: number, amp: number, root = 'Root'): pc.AnimTrack {
  const s = (p: number, shift = 0): number => Math.sin((p + shift) * TAU);
  return buildTrack(name, period, [
    sample('LegL', 'localRotation', period, (_t, p) => rot(s(p) * 35 * amp), 12, root),
    sample('LegR', 'localRotation', period, (_t, p) => rot(-s(p) * 35 * amp), 12, root),
    sample('ShinL', 'localRotation', period, (_t, p) => rot(Math.max(0, -s(p, 0.25)) * 40 * amp), 12, root),
    sample('ShinR', 'localRotation', period, (_t, p) => rot(Math.max(0, s(p, 0.25)) * 40 * amp), 12, root),
    sample('ArmL', 'localRotation', period, (_t, p) => rot(-s(p) * 30 * amp), 12, root),
    sample('ArmR', 'localRotation', period, (_t, p) => rot(s(p) * 30 * amp), 12, root),
    sample('Hips', 'localPosition', period, (_t, p) => [0, 1 + Math.abs(s(p * 2)) * 0.06 * amp, 0], 12, root),
    sample('Spine', 'localRotation', period, (_t, p) => rot(amp * 5, s(p) * 6 * amp, 0), 12, root),
  ]);
}

/** Slow breathing and head turn. */
export function idleClip(name = 'Idle', root = 'Root'): pc.AnimTrack {
  const d = 3;
  return buildTrack(name, d, [
    sample('Spine', 'localRotation', d, (_t, p) => rot(Math.sin(p * TAU) * 2.5), 12, root),
    sample('Head', 'localRotation', d, (_t, p) => rot(0, Math.sin(p * TAU) * 18, 0), 12, root),
    sample('ArmL', 'localRotation', d, (_t, p) => rot(0, 0, -4 - Math.sin(p * TAU) * 2), 12, root),
    sample('ArmR', 'localRotation', d, (_t, p) => rot(0, 0, 4 + Math.sin(p * TAU) * 2), 12, root),
  ]);
}

/** The right arm raised and waving; the rest is left alone, so it suits a masked layer. */
export function waveClip(name = 'Wave', root = 'Root'): pc.AnimTrack {
  const d = 1.2;
  return buildTrack(name, d, [
    sample('ArmR', 'localRotation', d, () => rot(0, 0, 150), 4, root),
    sample('ForeR', 'localRotation', d, (_t, p) => rot(0, 0, Math.sin(p * TAU * 2) * 35), 16, root),
    sample('Head', 'localRotation', d, (_t, p) => rot(0, 0, Math.sin(p * TAU * 2) * 6), 8, root),
  ]);
}

/** A crouch and a hop. Not a loop: the last key returns to the first pose. */
export function jumpClip(name = 'Jump', root = 'Root'): pc.AnimTrack {
  const d = 0.9;
  const arc = (p: number): number => Math.sin(p * Math.PI);
  return buildTrack(name, d, [
    sample('Hips', 'localPosition', d, (_t, p) => [0, 1 - 0.25 * Math.max(0, 1 - p * 6) + arc(Math.max(0, p - 0.2) / 0.8) * 0.8, 0], 12, root),
    sample('LegL', 'localRotation', d, (_t, p) => rot(-arc(p) * 50), 12, root),
    sample('LegR', 'localRotation', d, (_t, p) => rot(-arc(p) * 50), 12, root),
    sample('ShinL', 'localRotation', d, (_t, p) => rot(arc(p) * 70), 12, root),
    sample('ShinR', 'localRotation', d, (_t, p) => rot(arc(p) * 70), 12, root),
    sample('ArmL', 'localRotation', d, (_t, p) => rot(0, 0, -10 - arc(p) * 100), 12, root),
    sample('ArmR', 'localRotation', d, (_t, p) => rot(0, 0, 10 + arc(p) * 100), 12, root),
  ]);
}

/** Leans the torso towards a direction: `x` tilts sideways, `z` forwards (positive) or back. */
export function leanClip(name: string, x: number, z: number, root = 'Root'): pc.AnimTrack {
  const d = 1;
  return buildTrack(name, d, [
    sample('Spine', 'localRotation', d, () => rot(z * 28, 0, -x * 28), 2, root),
    sample('Hips', 'localRotation', d, () => rot(z * 8, 0, -x * 8), 2, root),
  ]);
}

/** A floor disc under a creature, so its motion has something to be read against. */
export function addPad(parent: pc.GraphNode, colour = '#2a2e3a', size = 3): pc.Entity {
  return addShape(parent, 'cylinder', material(colour), [0, 0.02, 0], [size, 0.04, size], 'pad');
}

export interface CreatureScene {
  scene: Scene;
  /** The creature's root, in the scene with an anim component on it. */
  creature: pc.Entity;
}

/** A scene with a creature on a pad and an anim component ready for clips or a state graph. */
export async function creatureScene(
  el: HTMLElement,
  ctx: MountContext,
  { distance = 5.5, yaw = 20, activate = true }: { distance?: number; yaw?: number; activate?: boolean } = {},
): Promise<CreatureScene> {
  const scene = await createScene(el, ctx, {
    floor: 16,
    orbit: { distance, yaw, pitch: -14, target: new pc.Vec3(0, 1.1, 0), autoRotate: ctx.preview ? 9 : 0 },
  });
  addPad(scene.app.root);
  const creature = createCreature();
  scene.app.root.addChild(creature);
  creature.addComponent('anim', { activate });
  return { scene, creature };
}
