// Shared Galacean stage: canvas, WebGLEngine, resize, full GPU teardown
//
// Traps found while building the gallery against @galacean/engine 1.6.13 (add to this list):
// - `engine.destroy()` frees engine objects but keeps the WebGL context alive until garbage
//   collection, and a page only gets about 16. `stage.dispose()` loses it through
//   WEBGL_lose_context right after the destroy, then removes the canvas.
// - Several things are page-wide, not per engine: the physics backend (`Engine._nativePhysics`,
//   set by the last `WebGLEngine.create({ physics })`), PhysX's collision-layer table
//   (`physicsScene.setColliderLayerCollision` writes the one PhysX module), the ShaderLab
//   compiler (`Shader._shaderLab`), shader names (`Shader.create` logs "already exists" and
//   returns undefined on a second call), shader includes (`ShaderFactory.registerInclude`
//   throws on a second call) and `@galacean/engine-shader`'s `registerIncludes()`. Every
//   engine here gets the same ShaderLab and (with `physics: true`) the same PhysXPhysics, so the
//   globals never change hands. Custom shaders use `Shader.find(name) ?? Shader.create(…)`
//   with a name unique to the example; collision-layer changes are undone on cleanup.
// - Each engine with physics logs "A physics engine has already been configured" once the
//   page has one. That is the shared instance being handed over again, not a second backend.
// - Script pointer callbacks (`onPointerClick`, `onPointerDrag` …) and local post-process
//   volumes only work in an engine created with physics, since pointer picking runs through
//   the physics scene. Pass `physics: true` for those.
// - The keyboard listens on `window` by default, so every engine on the page would see every
//   key. The stage passes `input.keyboardTarget: canvas` (focusable in the full view).
// - Material and light colours are linear. An sRGB pick passed straight in looks washed out;
//   `gfx-kit.ts` `lin()` converts. A plain-GLSL `Shader.create` shader writes to the screen
//   as-is, so it gamma-encodes its own output (`pow(c, vec3(1.0 / 2.2))`).
// - The skybox shader flips x ("TextureCube is left-hand"), so the cube's px face shows on
//   the world's -X side, mirrored from the docs' "px = right".
// - A `TextureFormat.Depth` Texture2D in a RenderTarget samples as black with the default
//   bilinear filter; set `filterMode = TextureFilterMode.Point`. Depth lands in red.
// - bufferMesh.mdx's instancing snippet binds the instance buffer with stride 12 while it
//   holds two Vector3 elements; the stride must be 24.
// - `WebGLGraphicDeviceOptions` has no `antialias`: anti-aliasing is `camera.msaaSamples`
//   and `camera.antiAliasing` (FXAA) only.
import { Camera, type Entity, type Scene, WebGLEngine, type WebGLEngineConfiguration } from '@galacean/engine';
import { ShaderLab } from '@galacean/engine-shaderlab';
import type { MountContext } from '@/types.ts';

export interface Stage {
  canvas: HTMLCanvasElement;
  engine: WebGLEngine;
  scene: Scene;
  /** A root entity created on the active scene. */
  root: Entity;
  preview: boolean;
  /** Text bar under the canvas in the full view (hint, readouts); hidden in cards. */
  bar: HTMLElement;
  /** Runs `fn` at cleanup, before the engine is destroyed. */
  own(fn: () => void): void;
  /** Destroys the engine, frees the WebGL context and removes the canvas. */
  dispose(): void;
}

export interface StageOptions {
  /** Canvas height in the full view, in CSS pixels (default 440). Cards fill their 200px. */
  height?: number;
  /** Create the engine with the page's shared PhysXPhysics (pointer callbacks need it too). */
  physics?: boolean;
  /** Background colour as linear RGBA (default a dark slate). */
  background?: [number, number, number, number];
  /** Don't call engine.run(); the example runs the engine itself. */
  manualRun?: boolean;
  /** Extra WebGLEngine.create options (graphicDeviceOptions, colorSpace …). */
  config?: Partial<Omit<WebGLEngineConfiguration, 'canvas'>>;
  /** One line under the canvas in the full view. */
  hint?: string;
}

/** One ShaderLab for the page: WebGLEngine.create stores it on a static, so all engines share it. */
export const shaderLab = new ShaderLab();

export async function createStage(el: HTMLElement, { preview, signal }: MountContext, options: StageOptions = {}): Promise<Stage> {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    display: 'block',
    width: '100%',
    height: preview ? '200px' : `${options.height ?? 440}px`,
    outline: 'none',
    touchAction: 'none',
  });
  canvas.tabIndex = preview ? -1 : 0;
  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;padding:8px 0;width:100%;font-size:13px;color:var(--fg-2)';
  bar.hidden = preview;
  if (options.hint) bar.append(options.hint);
  el.append(canvas, bar);

  const physics = options.physics ? await (await import('./physx.ts')).physx() : undefined;
  const engine = await WebGLEngine.create({
    canvas,
    shaderLab,
    physics,
    ...options.config,
    input: { keyboardTarget: canvas, ...options.config?.input },
  });
  const ratio = preview ? 1 : Math.min(window.devicePixelRatio, 2);
  engine.canvas.resizeByClientSize(ratio);
  const observer = new ResizeObserver(() => engine.canvas.resizeByClientSize(ratio));
  observer.observe(canvas);

  const scene = engine.sceneManager.activeScene;
  scene.background.solidColor.set(...(options.background ?? [0.012, 0.015, 0.024, 1]));
  const root = scene.createRootEntity('root');

  const owned: (() => void)[] = [];
  let disposed = false;
  const dispose = (): void => {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    for (const fn of owned.splice(0).reverse()) fn();
    const gl = (engine as unknown as { _hardwareRenderer: { gl: WebGLRenderingContext } })._hardwareRenderer.gl;
    try {
      engine.destroy();
    } finally {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
      bar.remove();
    }
  };
  if (signal.aborted) {
    dispose();
  } else if (!options.manualRun) {
    engine.run();
  }

  return { canvas, engine, scene, root, preview, bar, own: (fn) => void owned.push(fn), dispose };
}

/** A camera entity under `parent` at `position`, looking at `target`. */
export function addCamera(parent: Entity, position: [number, number, number] = [0, 2, 8], target: [number, number, number] = [0, 0, 0]): Camera {
  const entity = parent.createChild('camera');
  entity.transform.setPosition(...position);
  entity.transform.lookAt(entity.transform.position.clone().set(...target));
  return entity.addComponent(Camera);
}
