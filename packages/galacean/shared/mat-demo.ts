// Material gallery scaffolding: studio-lit demo, rows of balls, sweeps
import { type Engine, type Entity, type Material, type Mesh, type MeshRenderer, PrimitiveMesh } from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { loadStudioEnv } from './env.ts';
import { add, demo, type Demo, type DemoOptions, quadMesh, tick, unlit } from './gfx-kit.ts';
import { canvasTexture, type Draw } from './textures.ts';

export interface MatDemoOptions extends DemoOptions {
  /** Studio ambient light for PBR (default true). */
  env?: boolean;
  /** Camera sways left and right by this many units (default 2; 0 holds still). */
  sway?: number;
}

/** A demo stage with the studio ambient light loaded and a camera swaying so reflections move. */
export async function matDemo(el: HTMLElement, ctx: MountContext, options: MatDemoOptions = {}): Promise<Demo> {
  const target = options.target ?? [0, 0, 0];
  const camera = options.camera ?? [0, 0.5, 7];
  const d = await demo(el, ctx, { ...options, camera, target });
  if (options.env !== false) {
    const ambient = await loadStudioEnv(d.engine);
    ambient.specularIntensity = 2.5;
    ambient.diffuseIntensity = 1.4;
    d.stage.scene.ambientLight = ambient;
  }
  const sway = options.sway ?? 2;
  if (sway > 0) {
    const look = d.camera.entity.transform.position.clone().set(...target);
    tick(d.camera.entity, (_dt, t) => {
      d.camera.entity.transform.setPosition(camera[0] + Math.sin(t * 0.5) * sway, camera[1], camera[2]);
      d.camera.entity.transform.lookAt(look);
    });
  }
  return d;
}

export interface Ball<M extends Material = Material> {
  entity: Entity;
  renderer: MeshRenderer;
  material: M;
}

export interface RowOptions {
  mesh?: Mesh;
  radius?: number;
  gap?: number;
  y?: number;
  z?: number;
}

/** `count` spheres in a row centred on x = 0; `make(t, i)` builds each material, t runs 0 to 1 along the row. */
export function ballRow<M extends Material>(root: Entity, engine: Engine, count: number, make: (t: number, i: number) => M, o: RowOptions = {}): Ball<M>[] {
  const radius = o.radius ?? 0.8;
  const step = radius * 2 + (o.gap ?? 0.35);
  const mesh = o.mesh ?? PrimitiveMesh.createSphere(engine, radius, 48);
  return Array.from({ length: count }, (_, i) => {
    const material = make(count === 1 ? 0 : i / (count - 1), i);
    const { entity, renderer } = add(root, mesh, material, [(i - (count - 1) / 2) * step, o.y ?? 0, o.z ?? 0], `ball${i}`);
    return { entity, renderer, material };
  });
}

/** Sets `fn(t)` on a loop 0..1..0 over `seconds`, for cards that sweep a value by themselves. */
export function pingPong(entity: Entity, seconds: number, fn: (t: number) => void): void {
  tick(entity, (_dt, time) => fn(0.5 - 0.5 * Math.cos((time / seconds) * Math.PI * 2)));
}

/** A readable list: formats numbers to two decimals. */
export const fmt = (v: number, digits = 2): string => v.toFixed(digits);

const stripes: Draw = (g, size) => {
  const colors = ['#e84a4a', '#f2c230', '#4bd07a', '#3aa6e8', '#8a63e8', '#f0f0f0'];
  const cell = size / 12;
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 12; x++) {
      g.fillStyle = (x + y) % 2 ? '#14181f' : colors[(x >> 1) % colors.length]!;
      g.fillRect(x * cell, y * cell, cell, cell);
    }
  }
};

/** A bright patterned wall behind the balls (unlit), so see-through materials have something to show. */
export function backdrop(root: Entity, engine: Engine, width = 16, height = 6, z = -3): Entity {
  const wall = add(root, quadMesh(engine, width, height), unlit(engine, [1, 1, 1]), [0, 0, z], 'backdrop');
  (wall.renderer.getMaterial() as import('@galacean/engine').UnlitMaterial).baseTexture = canvasTexture(engine, stripes, { size: 512 });
  return wall.entity;
}
