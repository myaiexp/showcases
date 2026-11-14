// Rig for PBR and graphics examples: stage, orbit camera, sky
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { createOrbit, type Orbit } from './orbit.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';

/** Fills `out` with the linear HDR colour seen along the unit direction (x, y, z). */
export type Shade = (x: number, y: number, z: number, out: number[]) => void;

/**
 * An equirectangular HDR image drawn in code: a half-float texture, so values above 1.0
 * survive. Row 0 is the zenith and the middle column looks down +Z, which is how the
 * engine reads an equirect source (see `EnvLighting`).
 */
export function equirectTexture(device: pc.GraphicsDevice, shade: Shade, width = 256, name = 'equirect-sky'): pc.Texture {
  const height = width / 2;
  const data = new Uint16Array(width * height * 4);
  const rgb = [0, 0, 0];
  const half = pc.FloatPacking.float2Half;
  const one = half(1);
  let k = 0;
  for (let j = 0; j < height; j++) {
    const lat = (0.5 - (j + 0.5) / height) * Math.PI;
    for (let i = 0; i < width; i++) {
      const lon = ((i + 0.5) / width - 0.5) * Math.PI * 2;
      shade(Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon), rgb);
      data[k++] = half(rgb[0]!);
      data[k++] = half(rgb[1]!);
      data[k++] = half(rgb[2]!);
      data[k++] = one;
    }
  }
  return new pc.Texture(device, {
    name,
    width,
    height,
    format: pc.PIXELFORMAT_RGBA16F,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
    projection: pc.TEXTUREPROJECTION_EQUIRECT,
    levels: [data],
  });
}

export interface SkyOptions {
  /** Brightness of the sun disc; 1 or less is a plain LDR sky. Default 18. */
  sun?: number;
  /** Direction towards the sun (need not be normalised). */
  sunDir?: [number, number, number];
  /** Two bright softbox panels on the horizon, handy as reflections. Default true. */
  panels?: boolean;
  zenith?: [number, number, number];
  horizon?: [number, number, number];
  ground?: [number, number, number];
  /** Clamp every channel to 1, as an LDR image would. */
  clamp?: boolean;
}

/** A daylight sky shader: zenith-to-horizon gradient, dark ground, a sun and two softboxes. */
export function daySky({ sun = 18, sunDir = [0.5, 0.45, 0.7], panels = true, zenith = [0.1, 0.25, 0.7], horizon = [0.85, 0.8, 0.7], ground = [0.1, 0.085, 0.07], clamp = false }: SkyOptions = {}): Shade {
  const len = Math.hypot(...sunDir);
  const s = sunDir.map((v) => v / len) as [number, number, number];
  const cosSun = Math.cos((6 * Math.PI) / 180);
  return (x, y, z, out) => {
    const t = Math.pow(Math.abs(y), 0.5);
    const top = y >= 0 ? zenith : ground;
    for (let c = 0; c < 3; c++) out[c] = horizon[c]! + (top[c]! - horizon[c]!) * t;
    const d = x * s[0] + y * s[1] + z * s[2];
    if (sun > 0) {
      const glow = Math.pow(Math.max(d, 0), 48) * 0.4;
      for (let c = 0; c < 3; c++) out[c]! += glow;
      if (d > cosSun) {
        out[0] = sun;
        out[1] = sun * 0.92;
        out[2] = sun * 0.8;
      }
    }
    if (panels && y > 0.1 && y < 0.55) {
      const lon = Math.atan2(x, z);
      if ((lon > -2.2 && lon < -1.7) || (lon > 1.0 && lon < 1.5)) out[0] = out[1] = out[2] = 6;
    }
    if (clamp) for (let c = 0; c < 3; c++) out[c] = Math.min(out[c]!, 1);
  };
}

/** The generated sky the scene uses: a sharp cubemap for the background, an atlas for lighting. */
export interface Environment {
  skybox: pc.Texture;
  atlas: pc.Texture;
  /** Puts it on the scene as skybox and envAtlas. */
  apply(scene: pc.Scene): void;
  dispose(): void;
}

/** Runs the engine's EnvLighting pipeline on an equirect (or cubemap) source, then frees the source. */
export function buildEnvironment(source: pc.Texture, skyboxSize = 256): Environment {
  const skybox = pc.EnvLighting.generateSkyboxCubemap(source, skyboxSize);
  const lighting = pc.EnvLighting.generateLightingSource(source);
  const atlas = pc.EnvLighting.generateAtlas(lighting, { numReflectionSamples: 384, numAmbientSamples: 768 });
  lighting.destroy();
  source.destroy();
  let applied: pc.Scene | null = null;
  return {
    skybox,
    atlas,
    apply(scene) {
      applied = scene;
      scene.skybox = skybox;
      scene.envAtlas = atlas;
    },
    dispose() {
      if (applied) {
        applied.skybox = null;
        applied.envAtlas = null;
      }
      skybox.destroy();
      atlas.destroy();
    },
  };
}

export interface RigOptions extends StageOptions {
  /** A sky to light the scene with, or false for an unlit-by-environment scene. Default: daySky(). */
  sky?: Shade | false;
  /** A directional light on top of the environment. Default true. */
  sun?: boolean;
  target?: pc.Vec3;
  distance?: number;
  yaw?: number;
  pitch?: number;
  autoRotate?: number;
  /** Camera tone mapping. Default TONEMAP_NEUTRAL, so HDR highlights roll off. */
  toneMapping?: number;
  clearColor?: pc.Color;
}

export interface Rig {
  stage: Stage;
  app: pc.Application;
  camera: pc.Entity;
  sunLight: pc.Entity | null;
  orbit: Orbit;
  env: Environment | null;
  /** Textures to destroy with the rig (created through `own`). */
  own<T extends pc.Texture>(texture: T): T;
  dispose(): void;
}

/** Stage + camera + orbit + generated environment + optional sun. Call `dispose()` in cleanup. */
export async function createRig(el: HTMLElement, ctx: MountContext, options: RigOptions = {}): Promise<Rig> {
  const stage = await createStage(el, ctx, options);
  const { app } = stage;
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', {
    clearColor: options.clearColor ?? new pc.Color(0.07, 0.08, 0.1),
    toneMapping: options.toneMapping ?? pc.TONEMAP_NEUTRAL,
    fov: 40,
  });
  app.root.addChild(camera);
  const orbit = createOrbit(app, camera, {
    target: options.target,
    distance: options.distance ?? 8,
    yaw: options.yaw ?? 20,
    pitch: options.pitch ?? -12,
    autoRotate: options.autoRotate ?? 6,
    interactive: !ctx.preview,
  });
  let env: Environment | null = null;
  if (options.sky !== false) {
    env = buildEnvironment(equirectTexture(stage.device, options.sky ?? daySky()));
    env.apply(app.scene);
  }
  let sunLight: pc.Entity | null = null;
  if (options.sun !== false) {
    sunLight = new pc.Entity('sun');
    sunLight.addComponent('light', { type: 'directional', intensity: env ? 0.8 : 1.2, color: new pc.Color(1, 0.95, 0.85) });
    sunLight.setEulerAngles(50, 30, 0);
    app.root.addChild(sunLight);
  }
  const owned: pc.Texture[] = [];
  return {
    stage,
    app,
    camera,
    sunLight,
    orbit,
    env,
    own: (texture) => (owned.push(texture), texture),
    dispose() {
      orbit.dispose();
      env?.dispose();
      for (const t of owned) t.destroy();
      stage.dispose();
    },
  };
}

/** A metalness-workflow StandardMaterial with a hex colour, already updated. */
export function pbrMaterial(hex: string, props: Partial<pc.StandardMaterial> = {}): pc.StandardMaterial {
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color().fromString(hex);
  material.useMetalness = true;
  material.metalness = 0;
  material.gloss = 0.7;
  Object.assign(material, props);
  material.update();
  return material;
}

/** A render entity of a primitive type with a given material, added to the app root. */
export type PrimitiveType = 'box' | 'capsule' | 'cone' | 'cylinder' | 'plane' | 'sphere' | 'torus';

export function addMesh(app: pc.AppBase, type: PrimitiveType, material: pc.Material, position: [number, number, number] = [0, 0, 0], scale: number | [number, number, number] = 1): pc.Entity {
  const entity = new pc.Entity(type);
  entity.addComponent('render', { type, material });
  entity.setLocalPosition(...position);
  if (Array.isArray(scale)) entity.setLocalScale(...scale);
  else entity.setLocalScale(scale, scale, scale);
  app.root.addChild(entity);
  return entity;
}

/** A cols x rows grid of spheres (centred on the origin, in the XY plane); `make` gives each its material. */
export function sphereGrid(app: pc.AppBase, cols: number, rows: number, make: (col: number, row: number) => pc.Material, spacing = 1.2, radius = 0.5): pc.Entity[] {
  const out: pc.Entity[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out.push(addMesh(app, 'sphere', make(c, r), [(c - (cols - 1) / 2) * spacing * radius * 2, ((rows - 1) / 2 - r) * spacing * radius * 2, 0], radius * 2));
    }
  }
  return out;
}

/** Swings the orbit camera back and forth instead of circling (flat scenes turn edge-on when they circle). A drag ends it. */
export function sway(app: pc.AppBase, orbit: Orbit, amplitude = 25, speed = 0.5): void {
  orbit.autoRotate = 0;
  let last = 0;
  let t = 0;
  const step = (dt: number): void => {
    if (orbit.autoRotate !== last) return void app.off('update', step); // the reader took over
    t += dt;
    last = orbit.autoRotate = Math.cos(t * speed) * amplitude * speed;
  };
  app.on('update', step);
}
