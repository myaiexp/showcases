// Post-process scaffolding: an HDR camera with post-processing on
import { type Engine, type Entity, PBRMaterial, PrimitiveMesh } from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { add, blinn, demo, type Demo, type DemoOptions, floor, tick } from './gfx-kit.ts';

export interface PostDemoOptions extends DemoOptions {
  /** Camera.enableHDR (default true). */
  hdr?: boolean;
  /** Camera.enablePostProcess (default true, as the docs require). */
  post?: boolean;
  /** Fill the scene with glowing shapes (default true). */
  glow?: boolean;
}

/** A demo stage whose camera has enablePostProcess on, HDR by default, and a dim scene of glowing shapes. */
export async function postDemo(el: HTMLElement, ctx: MountContext, options: PostDemoOptions = {}): Promise<Demo> {
  const d = await demo(el, ctx, { camera: [0, 1.4, 7.5], target: [0, 0.4, 0], ...options });
  d.camera.enablePostProcess = options.post ?? true;
  d.camera.enableHDR = options.hdr ?? true;
  d.light.color.set(0.6, 0.58, 0.55, 1);
  if (options.glow !== false) glowScene(d.root, d.engine);
  return d;
}

/** Three emissive shapes (brighter than 1, so HDR keeps the overshoot) turning over a dim floor. */
export function glowScene(root: Entity, engine: Engine): Entity[] {
  floor(root, engine, -1.2, 18, blinn(engine, [0.25, 0.28, 0.34], 6));
  const shapes: [import('@galacean/engine').Mesh, [number, number, number], [number, number, number]][] = [
    [PrimitiveMesh.createSphere(engine, 0.9, 40), [-2.6, 0, 0], [4, 1.6, 0.3]],
    [PrimitiveMesh.createTorus(engine, 0.8, 0.3, 24, 48), [0, 0.1, 0], [0.4, 2.4, 4]],
    [PrimitiveMesh.createCuboid(engine, 1.3, 1.3, 1.3), [2.6, 0, 0], [3.5, 0.4, 3]],
  ];
  return shapes.map(([mesh, position, emissive]) => {
    const material = new PBRMaterial(engine);
    material.baseColor.set(0.05, 0.05, 0.06, 1);
    material.metallic = 0;
    material.roughness = 0.6;
    material.emissiveColor.set(...emissive, 1);
    const { entity } = add(root, mesh, material, position, 'glow');
    tick(entity, (dt) => entity.transform.rotate(15 * dt, 35 * dt, 0));
    return entity;
  });
}
