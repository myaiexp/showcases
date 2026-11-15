// Scaffolding for the terrain examples: generated heights, detail textures, splat map, grass card, a sunlit scene
import { float2half, Vector3 } from '@zephyr3d/base';
import type { MemoryFS } from '@zephyr3d/base';
import type { Texture2D, Texture2DArray } from '@zephyr3d/device';
import {
  ClipmapTerrain,
  DirectionalLight,
  getDevice,
  getEngine,
  getInput,
  OrbitCameraController,
  PerspectiveCamera,
  type Scene,
} from '@zephyr3d/scene';
import { fbm, normalsFrom, png, type Painter } from './textures.ts';
import { memoryFiles } from './vfs.ts';

const smooth = (a: number, b: number, x: number): number => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Terrain height in 0..1 at (u, v) in 0..1: an island of ridges with a basin in the middle. */
export function terrainHeight(u: number, v: number): number {
  const base = fbm(u, v, 3, 7);
  const ridge = 1 - Math.abs(2 * fbm(u, v, 5, 21) - 1);
  const d = Math.hypot(u - 0.5, v - 0.5) * 2;
  const island = smooth(1, 0.5, d);
  const basin = 1 - 0.45 * smooth(0.45, 0, d);
  return Math.max(0, Math.min(1, (0.45 * base + 0.5 * ridge * ridge * island) * island * basin + 0.04 * island));
}

/** A grey height map of the terrain, for the docs' fetchTexture route (8-bit, load it linear). */
export const heightPainter: Painter = (px, w, h) => {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const g = terrainHeight(x / w, y / h) * 255;
      const i = (y * w + x) * 4;
      px[i] = px[i + 1] = px[i + 2] = g;
      px[i + 3] = 255;
    }
  }
};

/** Half-float heights (0..1) for an r16f height map of size × size texels, row by row. */
export function halfHeights(size: number): Uint16Array<ArrayBuffer> {
  const data = new Uint16Array(new ArrayBuffer(size * size * 2));
  for (let z = 0; z < size; z++) for (let x = 0; x < size; x++) data[z * size + x] = float2half(terrainHeight(x / size, z / size));
  return data;
}

function paint(fn: (u: number, v: number) => [number, number, number]): Painter {
  return (px, w, h) => {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const c = fn(x / w, y / h);
        const i = (y * w + x) * 4;
        px[i] = c[0];
        px[i + 1] = c[1];
        px[i + 2] = c[2];
        px[i + 3] = 255;
      }
    }
  };
}

const grassAlbedo = paint((u, v) => {
  const n = 0.65 + 0.7 * fbm(u, v, 16, 3);
  const speck = fbm(u, v, 64, 9) > 0.7 ? 1.25 : 1;
  return [62 * n * speck, 118 * n * speck, 40 * n];
});
const rockAlbedo = paint((u, v) => {
  const n = 0.55 + 0.7 * fbm(u, v, 8, 5);
  const strata = 0.85 + 0.15 * Math.sin((v + 0.08 * fbm(u, v, 4, 1)) * 60);
  return [128 * n * strata, 118 * n * strata, 106 * n * strata];
});
const sandAlbedo = paint((u, v) => {
  const n = 0.8 + 0.4 * fbm(u, v, 32, 11);
  return [205 * n, 183 * n, 135 * n];
});
/** A tile with one dark blotch and one light stripe, so its repetition across the ground shows. */
const markedAlbedo = paint((u, v) => {
  const n = 0.7 + 0.5 * fbm(u, v, 8, 2);
  const blot = Math.exp(-(Math.hypot(u - 0.3, v - 0.6) ** 2) * 90);
  const sd = ((u + v * 0.5) % 1) - 0.7;
  const stripe = Math.exp(-sd * sd * 400);
  const k = n * (1 - 0.65 * blot) + 0.5 * stripe;
  return [150 * k, 135 * k, 100 * k];
});

/** A card of grass: a tuft of tapered blades, alpha-tested. */
const bladeCard: Painter = (px, w, h) => {
  const blades = [
    [0.2, 0.18, 0.55],
    [0.35, 0.45, 0.8],
    [0.5, 0.5, 1],
    [0.62, 0.55, 0.85],
    [0.8, 0.78, 0.6],
  ];
  for (let y = 0; y < h; y++) {
    const t = 1 - y / h;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      const i = (y * w + x) * 4;
      px[i + 3] = 0;
      for (const [x0, xt, hh] of blades) {
        if (t > hh!) continue;
        const k = t / hh!;
        const centre = x0! + (xt! - x0!) * k * k;
        if (Math.abs(u - centre) < 0.05 * (1 - k)) {
          px[i] = 40 + 90 * k;
          px[i + 1] = 90 + 110 * k;
          px[i + 2] = 30 + 30 * k;
          px[i + 3] = 255;
        }
      }
    }
  }
};

/** The VFS holding every generated terrain asset. */
export function terrainFiles(): Promise<MemoryFS> {
  return memoryFiles({
    '/terrain/height.png': png(256, 256, heightPainter),
    '/terrain/grass.png': png(256, 256, grassAlbedo),
    '/terrain/grass-n.png': png(256, 256, normalsFrom((u, v) => fbm(u, v, 24, 4), 2)),
    '/terrain/rock.png': png(256, 256, rockAlbedo),
    '/terrain/rock-n.png': png(256, 256, normalsFrom((u, v) => fbm(u, v, 12, 8), 4)),
    '/terrain/sand.png': png(256, 256, sandAlbedo),
    '/terrain/marked.png': png(256, 256, markedAlbedo),
    '/terrain/grass-card.png': png(64, 64, bladeCard),
  });
}

/** Loads a generated colour texture (sRGB) or data texture (linear) from the terrain VFS. */
export function loadTexture(path: string, linear = false): Promise<Texture2D> {
  return getEngine().resourceManager.fetchTexture<Texture2D>(path, linear ? { linearColorSpace: true } : undefined);
}

/** Weights (grass, rock, sand) of the three detail layers at (u, v): sand low, rock steep or high, grass between. */
export function layerWeights(u: number, v: number): [number, number, number] {
  const h = terrainHeight(u, v);
  const e = 1 / 128;
  const slope = Math.hypot(terrainHeight(u + e, v) - terrainHeight(u - e, v), terrainHeight(u, v + e) - terrainHeight(u, v - e)) * 24;
  const sand = smooth(0.2, 0.08, h);
  const rock = Math.max(smooth(0.25, 0.55, slope), smooth(0.55, 0.75, h)) * (1 - sand);
  const grass = Math.max(0, 1 - sand - rock);
  return [grass, rock, sand];
}

/**
 * A 512² splat map (two layers of rgba8): layer 0 holds the weights of detail layers 0..3 in r, g, b, a.
 * Assign it with material.setSplatMap().
 */
export function makeSplatMap(): Texture2DArray {
  const size = 512;
  const tex = getDevice().createTexture2DArray('rgba8unorm', size, size, 2)!;
  const layer0 = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const [g, r, s] = layerWeights(x / size, y / size);
      const i = (y * size + x) * 4;
      layer0[i] = g * 255;
      layer0[i + 1] = r * 255;
      layer0[i + 2] = s * 255;
    }
  }
  tex.update(layer0, 0, 0, 0, size, size, 1);
  tex.update(new Uint8Array(size * size * 4), 0, 0, 1, size, size, 1);
  return tex;
}

export interface TerrainWorld {
  terrain: ClipmapTerrain;
  camera: PerspectiveCamera;
  sun: DirectionalLight;
  /** The terrain's world-space side, metres. */
  size: number;
  /** World height of the tallest possible point (height scale). */
  heightScale: number;
}

export interface TerrainOptions {
  /** Side in world units and height-map texels, default 256. */
  size?: number;
  /** clipMapTileSize, default 64. */
  tile?: number;
  /** The node's Y scale: world height of a texel value of 1, default 40. */
  heightScale?: number;
  /** Write the generated half-float heights into the terrain's own height map, default true. */
  heights?: boolean;
}

/**
 * A sunlit scene around a ClipmapTerrain centred on the origin: scatter sky, tone mapped orbit camera.
 * The heights are written into the terrain's own r16f height map (heightMap.update), then
 * updateBoundingBox() refreshes the bounds the way the docs say.
 */
export function buildTerrain(scene: Scene, opts: TerrainOptions = {}): TerrainWorld {
  const size = opts.size ?? 256;
  const heightScale = opts.heightScale ?? 40;
  scene.env.sky.skyType = 'scatter';
  scene.env.light.type = 'ibl';
  const sun = new DirectionalLight(scene);
  sun.lookAt(new Vector3(40, 50, 30), Vector3.zero(), Vector3.axisPY());

  const terrain = new ClipmapTerrain(scene, size, size, opts.tile ?? 64);
  terrain.position.setXYZ(-size / 2, 0, -size / 2);
  terrain.scale.setXYZ(1, heightScale, 1);
  if (opts.heights !== false) {
    terrain.heightMap!.update(halfHeights(size), 0, 0, size, size);
    terrain.updateBoundingBox();
  }

  const camera = new PerspectiveCamera(scene, Math.PI / 3, 0.5, 2000);
  scene.mainCamera = camera;
  const target = new Vector3(0, heightScale * 0.15, 0);
  camera.lookAt(new Vector3(size * 0.35, heightScale * 0.9, size * 0.45), target, Vector3.axisPY());
  camera.controller = new OrbitCameraController({ center: target });
  getInput().use(camera.handleEvent, camera);
  camera.toneMap = true;
  getEngine().setRenderable(scene, 0);
  return { terrain, camera, sun, size, heightScale };
}

/** Card motion: swings the camera round the terrain. */
export function flyAround(world: TerrainWorld, ms: number, speed = 0.0002): void {
  const r = world.size * 0.5;
  world.camera.lookAt(
    new Vector3(Math.sin(ms * speed) * r, world.heightScale * 0.85, Math.cos(ms * speed) * r),
    new Vector3(0, world.heightScale * 0.15, 0),
    Vector3.axisPY(),
  );
}

/** World height of the generated terrain at world (x, z) (0 outside), from the height function. */
export function groundY(world: TerrainWorld, x: number, z: number): number {
  const u = (x + world.size / 2) / world.size;
  const v = (z + world.size / 2) / world.size;
  if (u < 0 || u > 1 || v < 0 || v > 1) return 0;
  return terrainHeight(u, v) * world.heightScale;
}

/** Puts the orbit camera `lift` metres above the ground at (x, z), looking at (tx, tz) at ground level. */
export function lookFrom(world: TerrainWorld, x: number, z: number, lift: number, tx: number, tz: number): void {
  const target = new Vector3(tx, groundY(world, tx, tz) + 1, tz);
  world.camera.lookAt(new Vector3(x, groundY(world, x, z) + lift, z), target, Vector3.axisPY());
  world.camera.controller = new OrbitCameraController({ center: target });
}

/** Fills a grass layer's density map from the generated ground: dense on grass, none on rock and sand, with clumps. */
export function paintDensity(layer: { densityMap: Uint8Array; densityMapWidth: number; densityMapHeight: number; updateDensityRegion(a: number, b: number, c: number, d: number): void }): void {
  const w = layer.densityMapWidth;
  const h = layer.densityMapHeight;
  for (let z = 0; z < h; z++) {
    for (let x = 0; x < w; x++) {
      const [grass] = layerWeights(x / w, z / h);
      const clump = smooth(0.35, 0.6, fbm(x / w, z / h, 24, 13));
      layer.densityMap[z * w + x] = grass * grass * clump * 255;
    }
  }
  layer.updateDensityRegion(0, 0, w, h);
}
