// Stage, camera and NavigationPlugin V2 for the navigation examples
import { ArcRotateCamera, Color3, HemisphericLight, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import type { Mesh, Scene } from '@babylonjs/core';
import { CreateNavigationPluginAsync } from '@babylonjs/addons/navigation/index.js';
import type { RecastNavigationJSPluginV2 } from '@babylonjs/addons/navigation/index.js';
import type { MountContext } from '@/types.ts';
import { recastInstance } from './recast.ts';
import { createStage, type Stage } from './stage.ts';

export interface NavStage {
  stage: Stage;
  scene: Scene;
  camera: ArcRotateCamera;
  plugin: RecastNavigationJSPluginV2;
  /** The recast-navigation modules the plugin was created with (TileCacheMeshProcess, QueryFilter ...). */
  recast: Awaited<ReturnType<typeof recastInstance>>;
  /** Registers cleanup that runs (in reverse order) before the plugin and stage are disposed. */
  onDispose(fn: () => void): void;
  /**
   * Runs the cleanups, then plugin.dispose() and stage.dispose(). Return this from mount's
   * cleanup. plugin.dispose() also disposes the crowd from plugin.createCrowd(): disposing
   * it again destroys freed WASM memory.
   */
  dispose(): void;
}

/** Initializes recast, creates the V2 plugin with `CreateNavigationPluginAsync({ instance })`, a camera and a light. */
export async function createNavStage(
  el: HTMLElement,
  ctx: MountContext,
  options: { radius?: number; beta?: number; height?: number } = {},
): Promise<NavStage> {
  const recast = await recastInstance();
  const plugin = await CreateNavigationPluginAsync({ instance: recast });
  const stage = createStage(el, ctx, { height: options.height });
  const { scene, canvas } = stage;
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, options.beta ?? 0.95, options.radius ?? 26, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  const light = new HemisphericLight('light', new Vector3(0.2, 1, -0.3), scene);
  light.intensity = 0.95;
  scene.clearColor.set(0.08, 0.09, 0.12, 1);

  const cleanups: Array<() => void> = [];
  return {
    stage,
    scene,
    camera,
    plugin,
    recast,
    onDispose: (fn) => void cleanups.push(fn),
    dispose() {
      for (const fn of cleanups.reverse()) fn();
      cleanups.length = 0;
      plugin.dispose();
      stage.dispose();
    },
  };
}

/** Navmesh parameters (the docs' creation parameters) tuned for the 0.25 voxel arenas. */
export const arenaParameters = {
  cs: 0.25,
  ch: 0.25,
  walkableSlopeAngle: 35,
  walkableHeight: 8,
  walkableClimb: 2,
  walkableRadius: 2,
  maxEdgeLen: 12,
  maxSimplificationError: 1.3,
  minRegionArea: 8,
  mergeRegionArea: 20,
  maxVertsPerPoly: 6,
  detailSampleDist: 6,
  detailSampleMaxError: 1,
};

function flat(scene: Scene, name: string, hex: string): StandardMaterial {
  const m = new StandardMaterial(name, scene);
  m.diffuseColor = Color3.FromHexString(hex);
  m.specularColor = Color3.Black();
  return m;
}

/** A flat ground and walls given as {x, z, w, d} boxes of height 2: the meshes a navmesh is built from. */
export function createArena(scene: Scene, size: number, walls: Array<{ x: number; z: number; w: number; d: number }>): Mesh[] {
  const ground = MeshBuilder.CreateGround('ground', { width: size, height: size }, scene);
  ground.material = flat(scene, 'ground-mat', '#252a3a');
  const wallMat = flat(scene, 'wall-mat', '#5b6489');
  const meshes: Mesh[] = [ground];
  for (const w of walls) {
    const box = MeshBuilder.CreateBox('wall', { width: w.w, depth: w.d, height: 2 }, scene);
    box.position.set(w.x, 1, w.z);
    box.material = wallMat;
    meshes.push(box);
  }
  return meshes;
}

/** A translucent material for navmesh debug overlays. */
export function overlayMaterial(scene: Scene, hex = '#3a6bff', alpha = 0.35): StandardMaterial {
  const m = flat(scene, 'overlay', hex);
  m.alpha = alpha;
  m.emissiveColor = Color3.FromHexString(hex).scale(0.5);
  return m;
}
