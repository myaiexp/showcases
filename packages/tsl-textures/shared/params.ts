// Texture parameters as TSL uniforms, with panel rows and docs snapshot presets
import * as THREE from 'three/webgpu';
import { uniform } from 'three/tsl';
import type { UniformNode } from 'three/webgpu';
import { buttons, colour, heading, slider, toggle, type Row } from './panel.ts';
import type { Stage } from './stage.ts';

/*
 * Each spec entry is one parameter as the docs list it: its default and documented range.
 * params() turns every entry into a uniform node, so main.ts passes `u.scale` where the
 * docs' code example passes `scale: 1.2`. The panel moves `.value`; no shader rebuilds.
 */

interface FloatSpec { kind: 'float'; value: number; min: number; max: number; step: number }
interface IntSpec { kind: 'int'; value: number; min: number; max: number; step: number }
interface FlagSpec { kind: 'flag'; value: boolean }
interface ColorSpec { kind: 'color'; value: number }
/** Vector ranges are one number for every axis, or one per axis. */
type Bound = number | readonly number[];
interface Vec2Spec { kind: 'vec2'; value: [number, number]; min: Bound; max: Bound; step: number }
interface Vec3Spec { kind: 'vec3'; value: [number, number, number]; min: Bound; max: Bound; step: number }
export type Spec = FloatSpec | IntSpec | FlagSpec | ColorSpec | Vec2Spec | Vec3Spec;

const axis = (b: Bound, i: number): number => (typeof b === 'number' ? b : b[i]!);
const stepFor = (min: Bound, max: Bound): number => {
  const span = axis(max, 0) - axis(min, 0);
  return span > 20 ? 1 : span > 2 ? 0.01 : 0.001;
};

/** A float with its documented range. */
export const range = (value: number, min: number, max: number, step = stepFor(min, max)): FloatSpec => ({ kind: 'float', value, min, max, step });
/** An int-typed parameter (its layout input is `int`), uploaded as `uniform(n, 'int')`. */
export const int = (value: number, min: number, max: number): IntSpec => ({ kind: 'int', value, min, max, step: 1 });
/** A 0/1 switch; the library's layout reads it as an int. */
export const flag = (value: boolean): FlagSpec => ({ kind: 'flag', value });
/** A colour, written as the docs write it: `new THREE.Color(0x4545D3)`. */
export const rgb = (value: number): ColorSpec => ({ kind: 'color', value });
export const xy = (x: number, y: number, min: Bound, max: Bound, step = stepFor(min, max)): Vec2Spec => ({ kind: 'vec2', value: [x, y], min, max, step });
export const xyz = (x: number, y: number, z: number, min: Bound, max: Bound, step = stepFor(min, max)): Vec3Spec => ({ kind: 'vec3', value: [x, y, z], min, max, step });

type UniformOf<S extends Spec> = S extends FloatSpec ? UniformNode<'float'>
  : S extends IntSpec | FlagSpec ? UniformNode<'int'>
  : S extends ColorSpec ? UniformNode<'color'>
  : S extends Vec2Spec ? UniformNode<'vec2'>
  : UniformNode<'vec3'>;
export type Uniforms<S extends Record<string, Spec>> = { [K in keyof S]: UniformOf<S[K]> };

/** One docs snapshot: colours as numbers, vectors as arrays, as in the snapshot links. */
export type Preset<S extends Record<string, Spec>> = {
  [K in keyof S]?: S[K] extends Vec2Spec | Vec3Spec ? readonly number[] : S[K] extends FlagSpec ? boolean | number : number;
};

export interface ParamOptions<S extends Record<string, Spec>> {
  /** The docs page's snapshots; a card cycles through them. */
  presets?: readonly Preset<S>[];
  /** Panel heading above the rows. */
  title?: string;
  /** Card: ms each preset holds before easing to the next. */
  hold?: number;
  /**
   * Full view: the presets' button row. Defaults to the docs snapshots ("Snapshot 1"…);
   * false hides it, for presets that only drive the card.
   */
  presetButtons?: false | { title: string; labels: readonly string[] };
}

export interface Params<S extends Record<string, Spec>> {
  u: Uniforms<S>;
  /** Eases every listed parameter to `preset` over `ms` (0 jumps). */
  apply(preset: Preset<S>, ms?: number): void;
}

type Values = number[];
const read = (spec: Spec, u: UniformNode<never>): Values => {
  const v = u.value as unknown;
  if (spec.kind === 'color') return (v as THREE.Color).toArray();
  if (spec.kind === 'vec2' || spec.kind === 'vec3') return (v as THREE.Vector3).toArray();
  return [v as number];
};
const target = (spec: Spec, raw: number | boolean | readonly number[]): Values => {
  if (spec.kind === 'color') return new THREE.Color(raw as number).toArray();
  if (typeof raw === 'boolean') return [raw ? 1 : 0];
  return typeof raw === 'number' ? [raw] : [...raw];
};
const write = (spec: Spec, u: UniformNode<never>, vals: Values): void => {
  const v = u.value as unknown;
  if (spec.kind === 'color') (v as THREE.Color).fromArray(vals);
  else if (spec.kind === 'vec2' || spec.kind === 'vec3') (v as THREE.Vector3).fromArray(vals);
  else (u as unknown as { value: number }).value = spec.kind === 'float' ? vals[0]! : Math.round(vals[0]!);
};

export function params<S extends Record<string, Spec>>(stage: Stage, spec: S, opts: ParamOptions<S> = {}): Params<S> {
  const u = {} as Record<string, UniformNode<never>>;
  for (const [key, s] of Object.entries(spec)) {
    const node =
      s.kind === 'float' ? uniform(s.value)
      : s.kind === 'int' ? uniform(s.value, 'int')
      : s.kind === 'flag' ? uniform(s.value ? 1 : 0, 'int')
      : s.kind === 'color' ? uniform(new THREE.Color(s.value))
      : s.kind === 'vec2' ? uniform(new THREE.Vector2(...s.value))
      : uniform(new THREE.Vector3(...s.value));
    u[key] = node as unknown as UniformNode<never>;
  }

  const rows = new Map<string, (vals: Values) => void>();
  let tween: { from: Map<string, Values>; to: Map<string, Values>; t0: number; ms: number } | null = null;
  let now = 0;
  stage.frame((t) => {
    now = t * 1000;
    if (!tween) return;
    const k = tween.ms <= 0 ? 1 : Math.min(1, (now - tween.t0) / tween.ms);
    const e = k * k * (3 - 2 * k);
    for (const [key, to] of tween.to) {
      const from = tween.from.get(key)!;
      const s = spec[key]!;
      const discrete = s.kind === 'int' || s.kind === 'flag';
      write(s, u[key]!, discrete ? (e < 0.5 ? from : to) : to.map((b, i) => from[i]! + (b - from[i]!) * e));
    }
    if (k >= 1) {
      for (const [key, to] of tween.to) rows.get(key)?.(to);
      tween = null;
    }
  });

  const apply = (preset: Preset<S>, ms = 0): void => {
    const from = new Map<string, Values>();
    const to = new Map<string, Values>();
    for (const [key, raw] of Object.entries(preset) as [string, number | boolean | readonly number[]][]) {
      const s = spec[key];
      if (!s || raw === undefined) continue;
      from.set(key, read(s, u[key]!));
      to.set(key, target(s, raw));
    }
    tween = { from, to, t0: now, ms };
    if (ms <= 0) {
      for (const [key, vals] of to) {
        write(spec[key]!, u[key]!, vals);
        rows.get(key)?.(vals);
      }
      tween = null;
    }
  };

  const presets = opts.presets ?? [];
  if (stage.panel) {
    const panel = stage.panel;
    const shown = opts.presetButtons;
    if (presets.length > 0 && shown !== false) {
      heading(panel, shown?.title ?? 'Snapshots from the docs');
      const label = (i: number): string => shown?.labels[i] ?? `Snapshot ${i + 1}`;
      buttons(panel, presets.map((p, i) => [label(i), () => apply(p, 700)] as [string, () => void]));
    }
    heading(panel, opts.title ?? 'Parameters');
    for (const [key, s] of Object.entries(spec)) rows.set(key, addRow(panel, key, s, u[key]!));
  } else if (stage.preview && presets.length > 1) {
    let i = 0;
    const hold = opts.hold ?? 2600;
    const id = setInterval(() => apply(presets[(i = (i + 1) % presets.length)]!, 1100), hold + 1100);
    stage.onDispose(() => clearInterval(id));
  }
  // Open on the first snapshot, as the docs page does: some textures' raw defaults draw
  // nothing on a radius-1.1 model (darthMaul's `distance: 1.9` cuts off every fragment).
  // After the rows exist, so they show the snapshot's values.
  if (presets[0]) apply(presets[0]);
  return { u: u as unknown as Uniforms<S>, apply };
}

/** One panel row per parameter; returns how to show a value set from code. */
function addRow(panel: HTMLElement, key: string, s: Spec, u: UniformNode<never>): (vals: Values) => void {
  if (s.kind === 'color') {
    const row = colour(panel, key, s.value, (hex) => write(s, u, new THREE.Color(hex).toArray()));
    return (vals) => row.set(new THREE.Color().fromArray(vals).getHex());
  }
  if (s.kind === 'flag') {
    const row = toggle(panel, key, s.value, (on) => write(s, u, [on ? 1 : 0]));
    return (vals) => row.set(vals[0]! !== 0);
  }
  if (s.kind === 'vec2' || s.kind === 'vec3') {
    const axes = s.kind === 'vec2' ? ['x', 'y'] : ['x', 'y', 'z'];
    const parts: Row<number>[] = axes.map((name, i) =>
      slider(panel, `${key}.${name}`, { min: axis(s.min, i), max: axis(s.max, i), step: s.step, value: s.value[i]! }, (v) => {
        const vals = read(s, u);
        vals[i] = v;
        write(s, u, vals);
      }),
    );
    return (vals) => parts.forEach((p, i) => p.set(vals[i]!));
  }
  const row = slider(panel, key, s, (v) => write(s, u, [v]));
  return (vals) => row.set(vals[0]!);
}
