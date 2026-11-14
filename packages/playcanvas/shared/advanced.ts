// Helpers for Graphics: Advanced Rendering: scene, random, instance data
import * as pc from 'playcanvas';
import type { MountContext } from '@/types.ts';
import { colorMaterial } from './graphics-basics.ts';
import { createShaderScene, type ShaderScene, type ShaderSceneOptions } from './shaders.ts';

/** A small seeded random generator, so every mount scatters the same way. */
export function rng(seed = 1): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A shader scene (camera on an orbit, shadow-casting sun, soft ambient) with an optional floor entity. */
export async function createAdvScene(
  el: HTMLElement,
  ctx: MountContext,
  options: ShaderSceneOptions & { floor?: string | false } = {},
): Promise<ShaderScene> {
  const scene = await createShaderScene(el, ctx, { sun: { angles: [50, 30, 0], shadows: true }, ...options });
  scene.app.scene.ambientLight = new pc.Color(0.25, 0.27, 0.33);
  if (options.floor !== false) {
    const floor = new pc.Entity('floor');
    floor.addComponent('render', { type: 'plane', material: colorMaterial(options.floor ?? '#3a4152'), castShadows: false });
    floor.setLocalScale(40, 1, 40);
    scene.app.root.addChild(floor);
  }
  return scene;
}

/** `count` world matrices (16 floats each) scattered on a disc: random yaw, scale in [min, max], resting on y = `lift`. */
export function scatterMatrices(count: number, radius: number, rand: () => number, scale: [number, number] = [0.5, 1], lift = 0): Float32Array {
  const out = new Float32Array(count * 16);
  const m = new pc.Mat4();
  const pos = new pc.Vec3();
  const rot = new pc.Quat();
  const scl = new pc.Vec3();
  for (let i = 0; i < count; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * radius;
    const s = scale[0] + rand() * (scale[1] - scale[0]);
    pos.set(Math.cos(a) * r, lift + s * 0.5, Math.sin(a) * r);
    rot.setFromEulerAngles(0, rand() * 360, 0);
    scl.set(s, s, s);
    m.setTRS(pos, rot, scl);
    out.set(m.data, i * 16);
  }
  return out;
}

/** A box around the origin disc of `radius`, `height` tall, for the custom AABB of scattered instances. */
export function discBounds(radius: number, height: number): pc.BoundingBox {
  return new pc.BoundingBox(new pc.Vec3(0, height / 2, 0), new pc.Vec3(radius, height / 2, radius));
}
