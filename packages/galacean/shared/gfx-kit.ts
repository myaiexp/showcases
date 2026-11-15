// Scene helpers for the graphics chapters: lit demo scene, tick scripts, materials
import {
  BlinnPhongMaterial,
  type Camera,
  Color,
  DirectLight,
  type Engine,
  type Entity,
  type Material,
  MeshRenderer,
  ModelMesh,
  PBRMaterial,
  PrimitiveMesh,
  Script,
  UnlitMaterial,
  type Mesh,
  Vector2,
  Vector3,
} from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { addCamera, createStage, type Stage, type StageOptions } from './stage.ts';

type V3 = [number, number, number];

/** Material colours are written as the sRGB values you see; the engine works in linear, so convert. */
export const lin = (c: V3): V3 => [c[0] ** 2.2, c[1] ** 2.2, c[2] ** 2.2];

/** A script whose onUpdate calls `fn(deltaSeconds, elapsedSeconds)`: the lightest way to animate. */
class Tick extends Script {
  fn: (dt: number, t: number) => void = () => {};
  private elapsed = 0;
  override onUpdate(dt: number): void {
    this.elapsed += dt;
    this.fn(dt, this.elapsed);
  }
}

export function tick(entity: Entity, fn: (dt: number, t: number) => void): Tick {
  const script = entity.addComponent(Tick);
  script.fn = fn;
  return script;
}

/** Turns `entity` by `degPerSec` (x, y, z) every second. */
export function spin(entity: Entity, degPerSec: V3 = [0, 40, 0]): void {
  tick(entity, (dt) => entity.transform.rotate(degPerSec[0] * dt, degPerSec[1] * dt, degPerSec[2] * dt));
}

/** Moves `camera` on a circle of `radius` at `height` around `target` and keeps it looking there. */
export function orbit(camera: Entity, target: V3, radius: number, height: number, speed = 0.4): void {
  const look = camera.transform.position.clone().set(...target);
  tick(camera, (_dt, t) => {
    camera.transform.setPosition(target[0] + Math.sin(t * speed) * radius, height, target[2] + Math.cos(t * speed) * radius);
    camera.transform.lookAt(look);
  });
}

/** Calls `fn(index)` whenever the `seconds`-long step changes, cycling through `count` steps (first call at once). */
export function steps(entity: Entity, seconds: number, count: number, fn: (index: number) => void): void {
  let last = -1;
  tick(entity, (_dt, t) => {
    const i = Math.floor(t / seconds) % count;
    if (i !== last) {
      last = i;
      fn(i);
    }
  });
}

export function sun(root: Entity, rotation: V3 = [-45, -45, 0]): DirectLight {
  const entity = root.createChild('sun');
  entity.transform.setRotation(...rotation);
  const light = entity.addComponent(DirectLight);
  light.color.set(1, 0.97, 0.92, 1);
  return light;
}

export const blinn = (engine: Engine, rgb: V3, shininess = 24): BlinnPhongMaterial => {
  const m = new BlinnPhongMaterial(engine);
  m.baseColor.set(...lin(rgb), 1);
  m.shininess = shininess;
  return m;
};

export const pbr = (engine: Engine, rgb: V3, metallic = 0, roughness = 0.5): PBRMaterial => {
  const m = new PBRMaterial(engine);
  m.baseColor.set(...lin(rgb), 1);
  m.metallic = metallic;
  m.roughness = roughness;
  return m;
};

export const unlit = (engine: Engine, rgb: V3): UnlitMaterial => {
  const m = new UnlitMaterial(engine);
  m.baseColor.set(...lin(rgb), 1);
  return m;
};

/** A child of `parent` at `position` drawing `mesh` with `material`. */
export function add(parent: Entity, mesh: Mesh, material: Material, position: V3 = [0, 0, 0], name = 'mesh'): { entity: Entity; renderer: MeshRenderer } {
  const entity = parent.createChild(name);
  entity.transform.setPosition(...position);
  const renderer = entity.addComponent(MeshRenderer);
  renderer.mesh = mesh;
  renderer.setMaterial(material);
  return { entity, renderer };
}

/** A big flat floor facing up at y = `y`. */
export function floor(root: Entity, engine: Engine, y = -1, size = 16, material?: Material): MeshRenderer {
  const { renderer } = add(root, PrimitiveMesh.createPlane(engine, size, size), material ?? blinn(engine, [0.45, 0.5, 0.58], 8), [0, y, 0], 'floor');
  return renderer;
}

export interface Demo {
  stage: Stage;
  engine: Engine;
  root: Entity;
  camera: Camera;
  light: DirectLight;
}

export interface DemoOptions extends StageOptions {
  camera?: V3;
  target?: V3;
  /** false to skip the directional light. */
  light?: boolean;
}

/** A stage with a camera looking at the origin and a directional light: the start of most examples. */
export async function demo(el: HTMLElement, ctx: MountContext, options: DemoOptions = {}): Promise<Demo> {
  const stage = await createStage(el, ctx, options);
  const camera = addCamera(stage.root, options.camera ?? [0, 2.5, 7], options.target ?? [0, 0, 0]);
  const light = sun(stage.root);
  if (options.light === false) light.entity.isActive = false;
  return { stage, engine: stage.engine, root: stage.root, camera, light };
}

/** A caption laid over the canvas (card and full view): `set('text')`. Removed at cleanup. */
export function caption(stage: Stage, text = ''): (text: string) => void {
  const box = document.createElement('div');
  box.style.cssText =
    'position:absolute;left:8px;top:8px;padding:2px 8px;border-radius:4px;font:12px/1.5 ui-monospace,monospace;color:#e6edf6;background:rgba(10,14,22,.72);pointer-events:none;max-width:90%;white-space:pre';
  box.textContent = text;
  box.hidden = !text;
  const host = stage.canvas.parentElement!;
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  host.append(box);
  stage.own(() => box.remove());
  return (t) => {
    box.textContent = t;
    box.hidden = !t;
  };
}

export const rgb = (r: number, g: number, b: number): Color => new Color(r, g, b, 1);

/** A w x h quad in the XY plane facing +Z, UVs (0, 0) at the top left so a canvas image shows upright. */
export function quadMesh(engine: Engine, w: number, h: number): ModelMesh {
  const mesh = new ModelMesh(engine);
  mesh.setPositions([new Vector3(-w / 2, h / 2, 0), new Vector3(w / 2, h / 2, 0), new Vector3(w / 2, -h / 2, 0), new Vector3(-w / 2, -h / 2, 0)]);
  mesh.setNormals([0, 0, 0, 0].map(() => new Vector3(0, 0, 1)));
  mesh.setUVs([new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1)]);
  mesh.setIndices(new Uint16Array([0, 2, 1, 0, 3, 2]));
  mesh.addSubMesh(0, 6);
  mesh.uploadData(true);
  return mesh;
}
