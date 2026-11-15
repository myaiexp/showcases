// Scaffolding for the water examples: a sunlit sea bed with rocks and pilings (Lambert), an orbit camera, a Water node
import { Vector2, Vector3, Vector4 } from '@zephyr3d/base';
import type { MemoryFS } from '@zephyr3d/base';
import type { Texture2D } from '@zephyr3d/device';
import {
  CylinderShape,
  DirectionalLight,
  FBMWaveGenerator,
  getEngine,
  getInput,
  Mesh,
  OrbitCameraController,
  LambertMaterial,
  PerspectiveCamera,
  PlaneShape,
  SphereShape,
  Water,
  type Scene,
} from '@zephyr3d/scene';
import { checker, fbm, png, type Painter } from './textures.ts';
import { memoryFiles } from './vfs.ts';

/** A sandy bed with a faint grid, so refraction and caustics have something to bend. */
const sand: Painter = (px, w, h) => {
  const grid = checker(16, [210, 184, 140], [188, 160, 116]);
  grid(px, w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = 0.82 + 0.3 * fbm(x / w, y / h, 8, 3);
      const i = (y * w + x) * 4;
      px[i] = px[i]! * n;
      px[i + 1] = px[i + 1]! * n;
      px[i + 2] = px[i + 2]! * n;
    }
  }
};

/** The memory file system the bed texture is served from. */
export function waterFiles(): Promise<MemoryFS> {
  return memoryFiles({ '/textures/sand.png': png(256, 256, sand), });
}

export interface WaterWorld {
  sun: DirectionalLight;
  camera: PerspectiveCamera;
  bed: Mesh;
  rocks: Mesh[];
  pilings: Mesh[];
}

export interface WorldOptions {
  /** Y of the sea bed (negative), default -4. */
  depth?: number;
  /** Camera eye, default (0, 5, 16). */
  eye?: Vector3;
  /** Camera target, default (0, -1, 0). */
  target?: Vector3;
  /** Sun elevation in degrees, default 40. */
  sunElevation?: number;
  /** Whether the sun casts shadows, default false. */
  shadows?: boolean;
}

/**
 * A scatter sky with IBL, a sun, a sand bed at `depth`, a few rocks and two
 * pilings that pierce the surface (y = 0). The camera orbits `target` and tone maps.
 */
export async function buildWorld(scene: Scene, opts: WorldOptions = {}): Promise<WaterWorld> {
  const depth = opts.depth ?? -4;
  scene.env.sky.skyType = 'scatter';
  scene.env.light.type = 'ibl';
  const sun = new DirectionalLight(scene);
  const e = ((opts.sunElevation ?? 40) * Math.PI) / 180;
  sun.lookAt(new Vector3(Math.cos(e) * 40, Math.sin(e) * 40, Math.cos(e) * 24), Vector3.zero(), Vector3.axisPY());
  // Only caustics (and shadowed god rays) need a shadow-casting sun; shadow maps are costly
  sun.castShadow = opts.shadows ?? false;

  const bedMaterial = new LambertMaterial();
  bedMaterial.albedoTexture = await getEngine().resourceManager.fetchTexture<Texture2D>('/textures/sand.png');
  const bed = new Mesh(scene, new PlaneShape({ size: 120 }), bedMaterial);
  bed.position.setXYZ(0, depth, 0);

  const rockMaterial = new LambertMaterial();
  rockMaterial.albedoColor = new Vector4(0.45, 0.43, 0.4, 1);
  const rocks = [
    [-3.5, -2, 1.6, 1],
    [4, -4.5, 2.2, 1],
    [-6.5, -9, 1.3, 0.8],
    [8.5, 1, 1.8, 1.1],
  ].map(([x, z, r, s]) => {
    const rock = new Mesh(scene, new SphereShape({ radius: r! }), rockMaterial);
    rock.scale.setXYZ(1.2, s!, 1);
    rock.position.setXYZ(x!, depth + r! * 0.55, z!);
    return rock;
  });

  const postMaterial = new LambertMaterial();
  postMaterial.albedoColor = new Vector4(0.42, 0.3, 0.2, 1);
  const height = -depth + 2;
  const pilings = [-1.2, 1.4].map((x, i) => {
    const post = new Mesh(scene, new CylinderShape({ topRadius: 0.35, bottomRadius: 0.35, height }), postMaterial);
    post.position.setXYZ(x, depth + height / 2, 1.5 - i * 4.5);
    return post;
  });

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.1, 600);
  scene.mainCamera = camera;
  const target = opts.target ?? new Vector3(0, -1, 0);
  camera.lookAt(opts.eye ?? new Vector3(0, 5, 16), target, Vector3.axisPY());
  camera.controller = new OrbitCameraController({ center: target });
  getInput().use(camera.handleEvent, camera);
  // Sky and sun are high dynamic range
  camera.toneMap = true;
  getEngine().setRenderable(scene, 0);
  return { sun, camera, bed, rocks, pilings };
}

/** The docs' water node: parent, region from the transform, FBM waves. `size` is the region's side in metres. */
export function makeWater(scene: Scene, size = 160): Water {
  const water = new Water(scene);
  water.parent = scene.rootNode;
  // The X/Z scale controls the water region
  water.position.setXYZ(0, 0, 0);
  water.scale.setXYZ(size, 1, size);
  water.gridScale = 1;
  water.animationSpeed = 1;
  // Reach the horizon, so the region's edge does not show as a band
  water.infinite = true;
  const waves = new FBMWaveGenerator();
  waves.amplitude = 0.6;
  waves.frequency = 0.04;
  waves.numOctaves = 5;
  waves.wind = new Vector2(1, 0.35);
  water.waveGenerator = waves;
  return water;
}

/** Card motion: swings the camera round `target` at `radius` and `height` (call it from a tick). */
export function swingCamera(camera: PerspectiveCamera, ms: number, radius = 16, height = 5, target = new Vector3(0, -1, 0), speed = 0.00025): void {
  camera.lookAt(new Vector3(Math.sin(ms * speed) * radius, height, Math.cos(ms * speed) * radius), target, Vector3.axisPY());
}
