// XR kit: an engine with the WebXR device, an origin rig and a small room
import { BlinnPhongMaterial, type Camera, DirectLight, type Entity, PrimitiveMesh, type XRManager } from '@galacean/engine';
import '@galacean/engine-xr';
import { WebXRDevice } from '@galacean/engine-xr-webxr';
import type { MountContext } from '@/types.ts';
import { PALETTE } from './core-kit.ts';
import { add, blinn } from './gfx-kit.ts';
import { addCamera, createStage, type Stage, type StageOptions } from './stage.ts';
import { canvasTexture, checker } from './textures.ts';

export interface XrWorld {
  stage: Stage;
  xr: XRManager;
  root: Entity;
  /** The XR origin: the entity that stands for the real-world floor point. */
  origin: Entity;
  /** The camera the page renders with (a plain camera, never attached to a session here). */
  camera: Camera;
}

/**
 * A stage whose engine was created with `xrDevice: new WebXRDevice()`, with `xrManager.origin`
 * set to an `origin` entity. No session is ever requested here: examples that want one ask for it
 * from a button in the full view.
 */
export async function xrWorld(el: HTMLElement, ctx: MountContext, options: StageOptions & { camera?: [number, number, number]; target?: [number, number, number] } = {}): Promise<XrWorld> {
  const stage = await createStage(el, ctx, { ...options, config: { ...options.config, xrDevice: new WebXRDevice() } });
  const xr = stage.engine.xrManager;
  const origin = stage.root.createChild('origin');
  xr.origin = origin;
  const camera = addCamera(stage.root, options.camera ?? [3.5, 2.6, 6], options.target ?? [0, 0.9, 0]);
  const sun = stage.root.createChild('sun');
  sun.transform.setRotation(-45, -35, 0);
  sun.addComponent(DirectLight);
  stage.scene.ambientLight.diffuseSolidColor.set(0.4, 0.42, 0.48, 1);
  return { stage, xr, root: stage.root, origin, camera };
}

/** A checkered floor, a table and a few pillars: something to be inside of. */
export function room(w: XrWorld): void {
  const { engine } = w.stage;
  const floorMaterial = new BlinnPhongMaterial(engine);
  floorMaterial.baseTexture = canvasTexture(engine, checker('#9aa4b4', '#586274', 8), { size: 256 });
  add(w.root, PrimitiveMesh.createPlane(engine, 12, 12), floorMaterial, [0, 0, 0], 'floor');
  add(w.root, PrimitiveMesh.createCuboid(engine, 1.6, 0.08, 0.9), blinn(engine, [...PALETTE.amber]), [0, 0.75, -1.2], 'table top');
  for (const [x, z] of [[-0.7, -1.55], [0.7, -1.55], [-0.7, -0.85], [0.7, -0.85]]) add(w.root, PrimitiveMesh.createCuboid(engine, 0.08, 0.75, 0.08), blinn(engine, [0.5, 0.35, 0.2]), [x!, 0.375, z!], 'leg');
  [[-3, -3, PALETTE.blue], [3, -2.5, PALETTE.violet], [-2.6, 2.2, PALETTE.green]].forEach(([x, z, c], i) => add(w.root, PrimitiveMesh.createCylinder(engine, 0.3, 0.3, 1.6 + i * 0.4, 16), blinn(engine, [...(c as readonly [number, number, number])]), [x as number, 0.9 + i * 0.2, z as number], 'pillar'));
}

/** Appends a result line when a support probe settles, unless the page has moved on. */
export function settle(stage: Stage, promise: Promise<void>, ok: string, fail: string, out: (line: string) => void): void {
  promise.then(
    () => !stage.engine.destroyed && out(ok),
    (e: unknown) => !stage.engine.destroyed && out(`${fail} ${e instanceof Error ? e.message : String(e)}`),
  );
}
