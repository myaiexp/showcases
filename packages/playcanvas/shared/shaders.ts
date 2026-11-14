// Scene helpers for Graphics: Shaders examples: camera, orbit, shapes, clock
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { createOrbit, type Orbit } from './orbit.ts';
import { createStage, type Stage, type StageOptions } from './stage.ts';

export interface ShaderSceneOptions extends StageOptions {
  distance?: number;
  pitch?: number;
  yaw?: number;
  autoRotate?: number;
  target?: pc.Vec3;
  clear?: string;
  /** A directional light with these Euler angles (and optional shadows); default none. */
  sun?: { angles?: [number, number, number]; shadows?: boolean; intensity?: number };
}

export interface ShaderScene {
  stage: Stage;
  app: pc.Application;
  camera: pc.Entity;
  sun: pc.Entity | null;
  orbit: Orbit;
  /** Orbit, then the stage; call it last in the cleanup. */
  dispose(): void;
}

/** A stage with a camera on an orbit; ShaderMaterials need no lights, so the sun is optional. */
export async function createShaderScene(el: HTMLElement, ctx: MountContext, options: ShaderSceneOptions = {}): Promise<ShaderScene> {
  const stage = await createStage(el, ctx, options);
  const { app } = stage;
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: new pc.Color().fromString(options.clear ?? '#10131a'), fov: 45 });
  app.root.addChild(camera);
  const orbit = createOrbit(app, camera, {
    target: options.target,
    distance: options.distance ?? 6,
    yaw: options.yaw ?? 25,
    pitch: options.pitch ?? -18,
    autoRotate: options.autoRotate ?? 14,
    interactive: !ctx.preview,
  });
  let sun: pc.Entity | null = null;
  if (options.sun) {
    sun = new pc.Entity('sun');
    sun.addComponent('light', {
      type: 'directional',
      castShadows: options.sun.shadows ?? false,
      shadowDistance: 20,
      shadowResolution: 1024,
      normalOffsetBias: 0.05,
      intensity: options.sun.intensity ?? 1,
    });
    sun.setEulerAngles(...(options.sun.angles ?? [50, 30, 0]));
    app.root.addChild(sun);
  }
  return {
    stage,
    app,
    camera,
    sun,
    orbit,
    dispose() {
      orbit.dispose();
      stage.dispose();
    },
  };
}

/** The shader description ShaderMaterial takes (the engine's typings do not export the name). */
export type ShaderDesc = NonNullable<ConstructorParameters<typeof pc.ShaderMaterial>[0]>;

export type ShapeType = 'box' | 'capsule' | 'cone' | 'cylinder' | 'plane' | 'sphere' | 'torus';

/** A render entity of a primitive type with a material, added to the app root. */
export function addShape(
  app: pc.AppBase,
  type: ShapeType,
  material: pc.Material,
  position: [number, number, number] = [0, 0, 0],
  scale: number | [number, number, number] = 1,
  renderProps: Record<string, unknown> = {},
): pc.Entity {
  const entity = new pc.Entity(type);
  entity.addComponent('render', { type, material, ...renderProps });
  entity.setLocalPosition(...position);
  if (Array.isArray(scale)) entity.setLocalScale(...scale);
  else entity.setLocalScale(scale, scale, scale);
  app.root.addChild(entity);
  return entity;
}

/** An entity drawing a generated geometry (more segments than the render primitives have). */
export function addGeometry(
  app: pc.AppBase,
  geometry: pc.Geometry,
  material: pc.Material,
  position: [number, number, number] = [0, 0, 0],
  renderProps: Record<string, unknown> = {},
): pc.Entity {
  const mesh = pc.Mesh.fromGeometry(app.graphicsDevice, geometry);
  const entity = new pc.Entity('geometry');
  entity.addComponent('render', { meshInstances: [new pc.MeshInstance(mesh, material)], ...renderProps });
  entity.setLocalPosition(...position);
  app.root.addChild(entity);
  return entity;
}

/** Calls `fn(elapsedSeconds, dt)` every frame; the listener leaves with app.destroy(). */
export function onTick(app: pc.AppBase, fn: (t: number, dt: number) => void): void {
  let t = 0;
  app.on('update', (dt: number) => fn((t += dt), dt));
}

/** The first mesh instance of an entity's render component (nullable in the typings). */
export function firstInstance(entity: pc.Entity): pc.MeshInstance {
  const instance = entity.render?.meshInstances[0];
  if (!instance) throw new Error(`${entity.name} has no mesh instance`);
  return instance;
}
