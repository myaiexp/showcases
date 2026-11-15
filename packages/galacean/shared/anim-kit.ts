// Helpers for the animation chapters: a code-built clip stage and controller setup
import {
  type AnimationClip,
  Animator,
  AnimatorController,
  AnimatorControllerLayer,
  type AnimatorConditionMode,
  type AnimatorState,
  AnimatorStateTransition,
  type AnimatorStateMachine,
  type AnimationCurve,
  type Engine,
  type Entity,
  Keyframe,
  type KeyframeValueType,
  PBRMaterial,
  PrimitiveMesh,
  MeshRenderer,
} from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import type { GltfBuilder } from './gltf-builder.ts';
import { robotGlb } from './gltf-models.ts';
import { loadStudioEnv } from './env.ts';
import { blinn, caption, demo, type Demo, type DemoOptions, floor, lin, steps } from './gfx-kit.ts';
import type { Stage } from './stage.ts';

type V3 = [number, number, number];

/** Adds keys to a curve: `[time, value]` pairs become Keyframes. */
export function keys<V extends KeyframeValueType>(curve: AnimationCurve<V>, list: [number, V][]): void {
  for (const [time, value] of list) {
    const key = new Keyframe<V>();
    key.time = time;
    key.value = value;
    curve.addKey(key);
  }
}

export interface Controlled {
  controller: AnimatorController;
  machine: AnimatorStateMachine;
  /** One state per clip, named after the clip. */
  states: Record<string, AnimatorState>;
}

/** An empty AnimatorController with a "Base" layer on `animator`, plus a state for each clip given. */
export function controllerFor(engine: Engine, animator: Animator, clips: AnimationClip[] = []): Controlled {
  const controller = new AnimatorController(engine);
  controller.addLayer(new AnimatorControllerLayer('Base'));
  animator.animatorController = controller;
  const machine = controller.layers[0]!.stateMachine;
  const states: Record<string, AnimatorState> = {};
  for (const clip of clips) {
    const state = machine.addState(clip.name);
    state.clip = clip;
    states[clip.name] = state;
  }
  return { controller, machine, states };
}

/** Puts an Animator on `entity` that loops `clip` as the state "<clip.name>". */
export function playClip(engine: Engine, entity: Entity, clip: AnimationClip): Animator {
  const animator = entity.getComponent(Animator) ?? entity.addComponent(Animator);
  controllerFor(engine, animator, [clip]);
  animator.play(clip.name);
  return animator;
}

export interface CubeStage extends Demo {
  cube: Entity;
  material: PBRMaterial;
  renderer: MeshRenderer;
  say: (text: string) => void;
}

/** A lit stage with one rounded-colour cube at `at`, the target for hand-built clips. */
export async function cubeStage(el: HTMLElement, ctx: MountContext, options: DemoOptions & { ground?: boolean; size?: number } = {}): Promise<CubeStage> {
  const d = await demo(el, ctx, { camera: [0, 2, 7], target: [0, 0.8, 0], ...options });
  const { stage, engine, root } = d;
  stage.scene.ambientLight = await loadStudioEnv(engine);
  if (options.ground !== false) floor(root, engine, -0.5, 14, blinn(engine, [0.3, 0.34, 0.42], 10));
  const cube = root.createChild('cube');
  const renderer = cube.addComponent(MeshRenderer);
  const s = options.size ?? 1;
  renderer.mesh = PrimitiveMesh.createCuboid(engine, s, s, s);
  const material = new PBRMaterial(engine);
  material.baseColor.set(...lin([0.9, 0.5, 0.2]), 1);
  material.roughness = 0.45;
  renderer.setMaterial(material);
  return { ...d, cube, material, renderer, say: caption(stage) };
}

/** The sRGB hex of a [r, g, b] 0..1 triple. */
export const rgbOf = (c: V3): string => `rgb(${c.map((v) => Math.round(v * 255)).join(',')})`;

/** Cards run each item in turn every `seconds`; the full view gets one button per item (first item runs at once). */
export function cycle(stage: Stage, root: Entity, items: readonly (readonly [string, () => void])[], seconds = 2): void {
  if (stage.preview) {
    steps(root, seconds, items.length, (i) => items[i]![1]());
    return;
  }
  items.forEach(([label, run]) => button(stage.bar, label, run));
  items[0]![1]();
}

export interface LinkOptions {
  duration?: number;
  exitTime?: number;
  offset?: number;
  hasExitTime?: boolean;
  /** duration in seconds instead of a share of the next clip */
  fixed?: boolean;
  conditions?: [name: string, mode: AnimatorConditionMode, threshold?: number | boolean][];
}

/** A transition from `from` to `to` with the options set; returns it so it can be tuned later. */
export function link(from: AnimatorState, to: AnimatorState, o: LinkOptions = {}): AnimatorStateTransition {
  const t = new AnimatorStateTransition();
  t.destinationState = to;
  if (o.duration !== undefined) t.duration = o.duration;
  if (o.exitTime !== undefined) t.exitTime = o.exitTime;
  if (o.offset !== undefined) t.offset = o.offset;
  if (o.hasExitTime !== undefined) t.hasExitTime = o.hasExitTime;
  if (o.fixed) t.isFixedDuration = true;
  for (const [name, mode, threshold] of o.conditions ?? []) t.addCondition(name, mode, threshold);
  from.addTransition(t);
  return t;
}

/** The same robot as robotGlb() but without any animation and in other paint, to reuse clips on. */
export function plainRobotGlb(): GltfBuilder {
  const gltf = robotGlb();
  gltf.json.animations.length = 0;
  for (const m of gltf.json.materials) {
    const pbr = m.pbrMetallicRoughness as { baseColorFactor: number[] };
    if (m.name === 'Paint') pbr.baseColorFactor = [0.2, 0.55, 0.95, 1];
  }
  return gltf;
}
