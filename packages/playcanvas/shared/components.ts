// Scene setup for the Engine, Components and ECS chapters: camera, orbit, sun, materials
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { createOrbit, type Orbit } from './orbit.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';

export interface SceneOptions extends StageOptions {
  /** Camera orbit; false leaves the camera where the example puts it. */
  orbit?: false | { distance?: number; yaw?: number; pitch?: number; target?: pc.Vec3; autoRotate?: number };
  /** Directional light with these Euler angles; false for none. Default on, no shadows. */
  sun?: false | { angles?: [number, number, number]; shadows?: boolean; intensity?: number };
  /** A receiving plane under the scene, this many units wide; 0 for none. Default 0. */
  floor?: number;
  ambient?: string;
  clear?: string;
  /** Orbit stays auto-only (cards never take input); true lets the reader drag in the full view. Default true. */
  interactive?: boolean;
}

export interface Scene {
  stage: Stage;
  app: pc.Application;
  camera: pc.Entity;
  sun: pc.Entity | null;
  orbit: Orbit | null;
  /** Everything the example created outside the app: orbit, then the stage. Call it last in the cleanup. */
  dispose(): void;
}

/** A StandardMaterial from a CSS colour, with the common knobs. */
export function material(
  colour: string,
  { emissive, opacity, metalness, gloss, cull }: { emissive?: string; opacity?: number; metalness?: number; gloss?: number; cull?: number } = {},
): pc.StandardMaterial {
  const m = new pc.StandardMaterial();
  m.diffuse = new pc.Color().fromString(colour);
  if (emissive) m.emissive = new pc.Color().fromString(emissive);
  if (opacity !== undefined) {
    m.opacity = opacity;
    m.blendType = pc.BLEND_NORMAL;
  }
  if (metalness !== undefined) {
    m.useMetalness = true;
    m.metalness = metalness;
  }
  if (gloss !== undefined) m.gloss = gloss;
  if (cull !== undefined) m.cull = cull;
  m.update();
  return m;
}

/** A render-component entity of a primitive type, added to `parent`. */
export function addShape(
  parent: pc.GraphNode,
  type: string,
  mat: pc.Material | null,
  position: [number, number, number] = [0, 0, 0],
  scale: [number, number, number] | number = 1,
  name = type,
): pc.Entity {
  const e = new pc.Entity(name);
  e.addComponent('render', { type: type as pc.RenderComponent['type'], material: mat ?? undefined });
  e.setLocalPosition(...position);
  if (typeof scale === 'number') e.setLocalScale(scale, scale, scale);
  else e.setLocalScale(...scale);
  parent.addChild(e);
  return e;
}

/** A camera, an optional sun and floor, and an orbit, on a ready stage. */
export async function createScene(el: HTMLElement, ctx: MountContext, options: SceneOptions = {}): Promise<Scene> {
  const stage = await createStage(el, ctx, options);
  const { app } = stage;
  app.scene.ambientLight = new pc.Color().fromString(options.ambient ?? '#383c48');

  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: new pc.Color().fromString(options.clear ?? '#14161d') });
  app.root.addChild(camera);

  let orbit: Orbit | null = null;
  if (options.orbit !== false) {
    orbit = createOrbit(app, camera, { distance: 8, pitch: -22, ...options.orbit, interactive: !ctx.preview && options.interactive !== false });
  }

  let sun: pc.Entity | null = null;
  if (options.sun !== false) {
    const s = options.sun ?? {};
    sun = new pc.Entity('sun');
    sun.addComponent('light', {
      type: 'directional',
      intensity: s.intensity ?? 1,
      castShadows: s.shadows ?? false,
      shadowDistance: 30,
      shadowResolution: 1024,
      normalOffsetBias: 0.05,
    });
    sun.setEulerAngles(...(s.angles ?? [50, 30, 0]));
    app.root.addChild(sun);
  }

  if (options.floor) {
    const f = addShape(app.root, 'plane', material('#2a2e3a'), [0, 0, 0], [options.floor, 1, options.floor], 'floor');
    f.render!.castShadows = false;
  }

  return {
    stage,
    app,
    camera,
    sun,
    orbit,
    dispose() {
      orbit?.dispose();
      stage.dispose();
    },
  };
}
