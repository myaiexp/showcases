// Model and animation chapters: load a generated .glb and set it up on a lit stage
import {
  Animator,
  AssetType,
  type AnimationClip,
  type Entity,
  type GLTFResource,
  type Material,
  MeshRenderer,
  type Renderer,
} from '@galacean/engine';
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { loadStudioEnv } from './env.ts';
import { blinn, caption, demo, type Demo, type DemoOptions, floor } from './gfx-kit.ts';
import type { GltfBuilder } from './gltf-builder.ts';
import type { Stage } from './stage.ts';

type V3 = [number, number, number];

/** What a mount returns when it was cancelled while loading (the stage is already disposed). */
export const NOOP = (): void => {};

/** Loads a generated .glb (or any blob URL) through AssetType.GLTF; the blob URL is revoked at cleanup. */
export async function loadGlb(stage: Stage, glb: GltfBuilder | string, params?: Record<string, unknown>): Promise<GLTFResource> {
  const url = typeof glb === 'string' ? glb : glb.url();
  stage.own(() => URL.revokeObjectURL(url));
  return stage.engine.resourceManager.load<GLTFResource>({ url, type: AssetType.GLTF, params });
}

export interface Rig extends Demo {
  gltf: GLTFResource;
  /** `gltf.instantiateSceneRoot()` placed under the stage root. */
  model: Entity;
  /** The Animator the loader put on the model (undefined when the glTF has no animation or skin). */
  animator: Animator;
  /** Caption laid over the canvas. */
  say: (text: string) => void;
}

export interface RigOptions extends DemoOptions {
  /** Draw a ground plane at y = 0 (default true). */
  ground?: boolean;
  /** Image-based ambient light from the generated studio .env (default true). */
  env?: boolean;
  /** Skip instantiating: the example does it itself. */
  bare?: boolean;
  params?: Record<string, unknown>;
}

/**
 * A stage with camera, sun, studio ambient and ground, plus the glTF loaded from `make()`
 * and one instance of it. Null when the mount was cancelled during the load (already disposed).
 */
export async function rig(el: HTMLElement, ctx: MountContext, make: () => GltfBuilder, options: RigOptions = {}): Promise<Rig | null> {
  const d = await demo(el, ctx, { camera: [0, 1.7, 6.2], target: [0, 1, 0], ...options });
  const { stage, engine, root } = d;
  if (options.ground !== false) floor(root, engine, 0, 14, blinn(engine, [0.3, 0.34, 0.42], 10));
  if (options.env !== false) stage.scene.ambientLight = await loadStudioEnv(engine);
  const gltf = await loadGlb(stage, make(), options.params);
  if (ctx.signal.aborted) {
    stage.dispose();
    return null;
  }
  const model = options.bare ? root.createChild('model') : gltf.instantiateSceneRoot();
  if (!options.bare) root.addChild(model);
  return { ...d, gltf, model, animator: model.getComponent(Animator)!, say: caption(stage) };
}

/** The clip called `name` from a loaded glTF. */
export function clipOf(gltf: GLTFResource, name: string): AnimationClip {
  const clip = gltf.animations?.find((c) => c.name === name);
  if (!clip) throw new Error(`no clip ${name}`);
  return clip;
}

/** One button per name in the full view's bar. */
export function buttons(stage: Stage, names: readonly string[], onPick: (name: string) => void): void {
  if (stage.preview) return;
  for (const name of names) button(stage.bar, name, () => onPick(name));
}

/** Every material used by the renderers under `entity`. */
export function materialsOf(entity: Entity): Material[] {
  const out: Material[] = [];
  for (const r of renderersOf(entity)) for (const m of r.getMaterials()) if (m && !out.includes(m)) out.push(m);
  return out;
}

export function renderersOf(entity: Entity): Renderer[] {
  return entity.getComponentsIncludeChildren(MeshRenderer, []);
}

/** Fills the card or view with a model that is `height` units tall, standing on y = 0. */
export function stand(model: Entity, at: V3 = [0, 0, 0], scale = 1): void {
  model.transform.setPosition(...at);
  model.transform.setScale(scale, scale, scale);
}

/** PNG bytes of a canvas drawing, for a glTF image that is embedded in the .glb. */
export async function pngBytes(draw: (g: CanvasRenderingContext2D, size: number) => void, size = 128): Promise<Uint8Array> {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  draw(canvas.getContext('2d')!, size);
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob'))), 'image/png'));
  return new Uint8Array(await blob.arrayBuffer());
}
