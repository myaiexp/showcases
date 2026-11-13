// Stage plus Havok physics world, camera and lights for the physics examples
import {
  ArcRotateCamera,
  Color3,
  HavokPlugin,
  HemisphericLight,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import type { AbstractMesh, Mesh, Scene } from '@babylonjs/core';
import type { MountContext } from '@/types.ts';
import { loadHavok } from './havok.ts';
import { createStage, type Stage } from './stage.ts';

export interface PhysicsStage {
  stage: Stage;
  scene: Scene;
  camera: ArcRotateCamera;
  plugin: HavokPlugin;
  /** Registers cleanup that runs (in reverse order) before the stage is disposed. */
  onDispose(fn: () => void): void;
  /** Runs the registered cleanups, then stage.dispose(). Return this from mount's cleanup. */
  dispose(): void;
}

export interface PhysicsStageOptions {
  gravity?: Vector3;
  /** Camera alpha, beta, radius and target. */
  camera?: { alpha?: number; beta?: number; radius?: number; target?: Vector3 };
  height?: number;
}

/**
 * Loads Havok, builds the stage, an orbit camera (input only in the full view) and a light,
 * and calls `scene.enablePhysics` with a fresh HavokPlugin. Each example still creates its
 * own shapes, bodies and the API it is about.
 */
export async function createPhysicsStage(el: HTMLElement, ctx: MountContext, options: PhysicsStageOptions = {}): Promise<PhysicsStage> {
  const havok = await loadHavok();
  const stage = createStage(el, ctx, { height: options.height });
  const { scene, canvas } = stage;
  const c = options.camera ?? {};
  const camera = new ArcRotateCamera('camera', c.alpha ?? -Math.PI / 2, c.beta ?? 1.1, c.radius ?? 16, c.target ?? Vector3.Zero(), scene);
  camera.lowerRadiusLimit = 2;
  if (!ctx.preview) camera.attachControl(canvas, true);
  const light = new HemisphericLight('light', new Vector3(0.3, 1, -0.2), scene);
  light.intensity = 0.95;
  scene.clearColor.set(0.08, 0.09, 0.12, 1);

  const plugin = new HavokPlugin(true, havok);
  scene.enablePhysics(options.gravity ?? new Vector3(0, -9.81, 0), plugin);

  const cleanups: Array<() => void> = [];
  return {
    stage,
    scene,
    camera,
    plugin,
    onDispose: (fn) => void cleanups.push(fn),
    dispose() {
      for (const fn of cleanups.reverse()) fn();
      cleanups.length = 0;
      stage.dispose();
    },
  };
}

/** Gives a mesh its own flat-coloured StandardMaterial (hex like '#ff8844'). */
export function paint(mesh: AbstractMesh, hex: string, alpha = 1): StandardMaterial {
  const m = new StandardMaterial(`${mesh.name}-mat`, mesh.getScene());
  m.diffuseColor = Color3.FromHexString(hex);
  m.specularColor = new Color3(0.2, 0.2, 0.2);
  m.alpha = alpha;
  mesh.material = m;
  return m;
}

/** A static box floor (a mass 0 aggregate) centred on the origin, top face at y = 0. */
export function staticFloor(scene: Scene, width: number, depth: number, hex = '#2b3140'): { mesh: Mesh; aggregate: PhysicsAggregate } {
  const mesh = MeshBuilder.CreateBox('floor', { width, depth, height: 1 }, scene);
  mesh.position.y = -0.5;
  paint(mesh, hex);
  const aggregate = new PhysicsAggregate(mesh, PhysicsShapeType.BOX, { mass: 0, friction: 0.6 }, scene);
  return { mesh, aggregate };
}
