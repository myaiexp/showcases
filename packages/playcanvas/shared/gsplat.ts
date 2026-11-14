// Gaussian splatting chapter: splat clouds made in code, containers and a scene
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { createOrbit, type Orbit } from './orbit.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';

/** Splat attributes in plain arrays: what the default GSplatFormat stores per splat. */
export interface SplatCloud {
  count: number;
  /** xyz per splat. */
  positions: Float32Array;
  /** rgba per splat, 0..1. */
  colors: Float32Array;
  /** xyz per splat: the Gaussian's standard deviation along each local axis. */
  scales: Float32Array;
  /** xyzw quaternion per splat. */
  rotations: Float32Array;
}

/** A small seeded random generator (mulberry32), so a cloud looks the same on every mount. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Approximate normal deviate from the random generator. */
export const gauss = (r: () => number): number => (r() + r() + r() + r() - 2) * 1.7;

/** Hue 0..1 to a saturated, bright rgb triple. */
export function hue(h: number, s = 0.75, v = 1): [number, number, number] {
  const f = (n: number): number => {
    const k = (n + h * 6) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };
  return [f(5), f(3), f(1)];
}

export function emptyCloud(count: number): SplatCloud {
  const rotations = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) rotations[i * 4 + 3] = 1;
  return { count, positions: new Float32Array(count * 3), colors: new Float32Array(count * 4), scales: new Float32Array(count * 3), rotations };
}

/** A (2,3) torus knot with a fuzzy tube; the hue follows the curve. */
export function knotCloud(count: number, seed = 7, size = 0.045): SplatCloud {
  const cloud = emptyCloud(count);
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const ring = 2 + Math.cos(3 * t);
    const x = ring * Math.cos(2 * t) * 0.55 + gauss(r) * 0.07;
    const y = ring * Math.sin(2 * t) * 0.55 + gauss(r) * 0.07;
    const z = -Math.sin(3 * t) * 0.55 + gauss(r) * 0.07;
    cloud.positions.set([x, z, y], i * 3);
    cloud.colors.set([...hue(i / count), 0.9], i * 4);
    cloud.scales.fill(size * (0.7 + r() * 0.6), i * 3, i * 3 + 3);
  }
  return cloud;
}

/** A spiral galaxy disc: bright core, two arms, flat round splats. */
export function galaxyCloud(count: number, seed = 3, radius = 3): SplatCloud {
  const cloud = emptyCloud(count);
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const d = Math.pow(r(), 0.7);
    const arm = (i % 2) * Math.PI;
    const a = d * 7 + arm + gauss(r) * 0.18;
    const rad = d * radius;
    cloud.positions.set([Math.cos(a) * rad, gauss(r) * 0.05 * (1.2 - d), Math.sin(a) * rad], i * 3);
    const core = Math.max(0, 1 - d * 2.2);
    cloud.colors.set([0.45 + core * 0.55 + (1 - d) * 0.1, 0.5 + core * 0.4, 0.95 - d * 0.35, 0.55 + r() * 0.3], i * 4);
    cloud.scales.fill(0.03 + r() * 0.03, i * 3, i * 3 + 3);
  }
  return cloud;
}

/** Flat discs on a sphere, each turned to face outwards (position, scale and rotation all used). */
export function discShellCloud(count: number, radius = 1.4, seed = 5): SplatCloud {
  const cloud = emptyCloud(count);
  const r = rng(seed);
  const q = new pc.Quat();
  const axis = new pc.Vec3();
  const normal = new pc.Vec3();
  for (let i = 0; i < count; i++) {
    const y = 1 - ((i + 0.5) / count) * 2;
    const ring = Math.sqrt(1 - y * y);
    const a = i * 2.399963;
    normal.set(Math.cos(a) * ring, y, Math.sin(a) * ring);
    cloud.positions.set([normal.x * radius, normal.y * radius, normal.z * radius], i * 3);
    // Turn the splat's local +Z onto the outward normal.
    axis.cross(pc.Vec3.BACK, normal);
    if (axis.lengthSq() < 1e-8) axis.set(1, 0, 0);
    q.setFromAxisAngle(axis.normalize(), Math.acos(pc.math.clamp(normal.z, -1, 1)) * pc.math.RAD_TO_DEG);
    cloud.rotations.set([q.x, q.y, q.z, q.w], i * 4);
    cloud.scales.set([0.085, 0.085, 0.012], i * 3);
    cloud.colors.set([...hue(0.55 + normal.y * 0.25 + r() * 0.03, 0.6, 0.95), 0.95], i * 4);
  }
  return cloud;
}

/** A hollow box surface of round splats: easy to read when clipped, shaded or picked. */
export function boxCloud(count: number, half = 1, seed = 11, size = 0.05): SplatCloud {
  const cloud = emptyCloud(count);
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const face = Math.floor(r() * 6);
    const u = (r() * 2 - 1) * half;
    const v = (r() * 2 - 1) * half;
    const s = face % 2 ? half : -half;
    const p = face < 2 ? [s, u, v] : face < 4 ? [u, s, v] : [u, v, s];
    cloud.positions.set(p, i * 3);
    cloud.colors.set([...hue(((p[0]! + p[1]! * 0.5 + p[2]!) / half + 3) / 8, 0.6, 1), 1], i * 4);
    cloud.scales.fill(size, i * 3, i * 3 + 3);
  }
  return cloud;
}

function boundsOf(cloud: SplatCloud, margin: number): pc.BoundingBox {
  const min = new pc.Vec3(Infinity, Infinity, Infinity);
  const max = new pc.Vec3(-Infinity, -Infinity, -Infinity);
  for (let i = 0; i < cloud.count; i++) {
    const x = cloud.positions[i * 3]!;
    const y = cloud.positions[i * 3 + 1]!;
    const z = cloud.positions[i * 3 + 2]!;
    min.set(Math.min(min.x, x), Math.min(min.y, y), Math.min(min.z, z));
    max.set(Math.max(max.x, x), Math.max(max.y, y), Math.max(max.z, z));
  }
  const bounds = new pc.BoundingBox();
  bounds.setMinMax(min, max);
  bounds.halfExtents.addScalar(margin);
  return bounds;
}

const half = (v: number): number => pc.FloatPacking.float2Half(v);

/**
 * Writes a cloud into a GSplatContainer made with the default format (dataCenter,
 * dataColor, dataScale, dataRotation) and calls update(). The container's capacity must
 * be at least cloud.count.
 */
export function writeCloud(container: pc.GSplatContainer, cloud: SplatCloud): void {
  const centerTex = container.getTexture('dataCenter')!;
  const colorTex = container.getTexture('dataColor')!;
  const scaleTex = container.getTexture('dataScale')!;
  const rotTex = container.getTexture('dataRotation')!;
  const center = centerTex.lock() as Float32Array;
  const color = colorTex.lock() as Uint16Array;
  const scale = scaleTex.lock() as Uint16Array;
  const rot = rotTex.lock() as Uint16Array;
  const centers = container.centers;
  for (let i = 0; i < cloud.count; i++) {
    for (let k = 0; k < 3; k++) {
      center[i * 4 + k] = cloud.positions[i * 3 + k]!;
      centers[i * 3 + k] = cloud.positions[i * 3 + k]!;
      scale[i * 4 + k] = half(cloud.scales[i * 3 + k]!);
    }
    for (let k = 0; k < 4; k++) {
      color[i * 4 + k] = half(cloud.colors[i * 4 + k]!);
      rot[i * 4 + k] = half(cloud.rotations[i * 4 + k]!);
    }
  }
  centerTex.unlock();
  colorTex.unlock();
  scaleTex.unlock();
  rotTex.unlock();
  container.aabb = boundsOf(cloud, 0.3);
  container.update(cloud.count);
}

/** A GSplatContainer (default format) holding the cloud. */
export function cloudContainer(device: pc.GraphicsDevice, cloud: SplatCloud, capacity = cloud.count): pc.GSplatContainer {
  const container = new pc.GSplatContainer(device, capacity, pc.GSplatFormat.createDefaultFormat(device));
  writeCloud(container, cloud);
  return container;
}

export interface SplatSceneOptions extends StageOptions {
  distance?: number;
  yaw?: number;
  pitch?: number;
  target?: pc.Vec3;
  autoRotate?: number;
  fov?: number;
  clearColor?: pc.Color;
  /** Keep orbit dragging off, for examples that use pointer input themselves. */
  noDrag?: boolean;
}

export interface SplatScene {
  stage: Stage;
  app: pc.Application;
  camera: pc.Entity;
  orbit: Orbit;
  /** Puts a container on a new entity under the root; the container is destroyed on dispose. */
  add(container: pc.GSplatResourceBase, name?: string, components?: Record<string, unknown>): pc.Entity;
  dispose(): void;
}

/**
 * A stage with splat-friendly settings (no MSAA: splat rendering is fill-rate bound), a
 * dark camera and an orbit. Splat sorting runs in a worker, so dispose() destroys the
 * containers it was given before the app goes.
 */
export async function createSplatScene(el: HTMLElement, ctx: MountContext, options: SplatSceneOptions = {}): Promise<SplatScene> {
  const stage = await createStage(el, ctx, { ...options, deviceOptions: { antialias: false, ...options.deviceOptions } });
  const { app } = stage;
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: options.clearColor ?? new pc.Color(0.04, 0.05, 0.08), fov: options.fov ?? 45, farClip: 200 });
  app.root.addChild(camera);
  const orbit = createOrbit(app, camera, {
    target: options.target,
    distance: options.distance ?? 7,
    yaw: options.yaw ?? 25,
    pitch: options.pitch ?? -18,
    autoRotate: options.autoRotate ?? 10,
    interactive: !ctx.preview && !options.noDrag,
  });
  const owned: pc.GSplatResourceBase[] = [];
  return {
    stage,
    app,
    camera,
    orbit,
    add(container, name = 'splat', components = {}) {
      if (!owned.includes(container)) owned.push(container);
      const entity = new pc.Entity(name);
      entity.addComponent('gsplat', { resource: container, ...components });
      app.root.addChild(entity);
      return entity;
    },
    dispose() {
      orbit.dispose();
      for (const c of owned) c.destroy();
      stage.dispose();
    },
  };
}
