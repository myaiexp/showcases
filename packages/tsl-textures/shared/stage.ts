// Shared tsl-textures stage: renderer, scene, lights, orbit camera, panel, cleanup
import * as THREE from 'three/webgpu';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { MountContext } from '@/types.ts';
import './stage.css';

/*
 * Traps found while building this gallery. Read before writing an example, add to it.
 *
 * - Import every texture from 'tsl-textures'. The README's `tsl-textures/polka-dots`
 *   subpaths are not in the package's `exports` (only `.` and `./tsl-textures.js`).
 * - The library imports Color/Vector2/Vector3 from the bare `three`. vite.config.ts maps
 *   that to `three/webgpu` for files under tsl-textures, so it shares the Three.js
 *   gallery's core. Examples import from 'three/webgpu' and 'three/tsl', never 'three'.
 * - The docs pages' parameter lists drift from the source. The source's `defaults` are
 *   the truth, and shared/tsl-textures.d.ts types them, so a docs-only name fails tsc:
 *   clouds lists `variety`, but its params are `density` and `opacity`.
 *   Others: circles and grid list `background`/`flat` they lack; cork.md says `staight`,
 *   isolines' code `thinnes`, processed-wood `stregth`; tiger-fur's import is invalid JS.
 * - brain.md assigns `brain()` to normalNode. `brain()` is the colour and ignores `wave`,
 *   `speed` and `time`; `brain.normal()` is the animated normal that uses them.
 * - Params that do nothing in 3.0.5: dysonSphere `variation`, waves `foamEdge`; and
 *   `rust.opacity` ignores the colour and noise params. caustics moves even at `speed` 0
 *   (it runs on time * exp(speed - 1)).
 * - Some code examples on the docs pages disagree with the source defaults (polka-dots,
 *   zebra-lines, scepter-head, runny-eggs). Specs start from the defaults; presets copy the
 *   snapshot links. Where a snapshot exceeds the documented range (darth-maul `balance`,
 *   dysonSphere `complexity`, bricks `jointSpan`) the range is widened to hold it.
 * - Normal functions (concrete, roughClay, waterDrops, runnyEggs.normal and every shape
 *   texture's .normal) read `tangentLocal`, the raw `tangent` attribute, which three's
 *   geometries lack: the normals come out NaN. shapes.ts `model()` computes tangents
 *   whenever the material has a normalNode, so call it after assigning the nodes.
 * - halftone's `color` defaults to vertexColor(), which needs a colour attribute: pass a
 *   colour. Its `position` is screenCoordinate, in pixels, so dot size follows pixel ratio.
 * - Params with an `int` layout input (rust/planet `iterations`, isolayers `layers`,
 *   watermelon `stripes`, entangled `density`, turbulentSmoke `details`, halftone
 *   `pattern`/`attenuation`, grid `equirectangular`, polkaDots/zebraLines `flat`) need an
 *   int node: shared/params.ts `int()` makes `uniform(n, 'int')`.
 * - Every param goes into a TSL Fn, so a uniform node works anywhere a number, Color or
 *   Vector is documented, and changing `.value` restyles with no shader rebuild.
 * - `renderer.dispose()` neither loses the WebGL2 context nor destroys the GPUDevice; with
 *   cards mounting and unmounting, the stage does both on cleanup.
 */

export interface StageOptions {
  /** Camera distance from the origin. */
  distance?: number;
  /** Clear colour behind the model. */
  background?: THREE.ColorRepresentation;
  /** Full-view canvas height, px. Cards are always 200px. */
  height?: number;
  /** Adds the default hemisphere + key lights (on unless false). */
  lights?: boolean;
  /** Puts a parameter panel beside the canvas in the full view. */
  panel?: boolean;
}

export interface Stage {
  readonly preview: boolean;
  readonly signal: AbortSignal;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGPURenderer;
  /** The row holding the canvas and panel; append extra chrome here. */
  readonly root: HTMLElement;
  /** Full view with `panel`: the side panel to fill. Null in a card. */
  readonly panel: HTMLElement | null;
  /** Calls `fn(seconds, deltaSeconds)` every frame before rendering. */
  frame(fn: (t: number, dt: number) => void): void;
  /** Disposes `item` (geometry, material, texture) on cleanup. Returns it. */
  own<T extends { dispose(): void }>(item: T): T;
  onDispose(fn: () => void): void;
  /** Starts the render loop. Call once the scene is built. */
  start(): void;
  dispose(): Promise<void>;
}

/** The backend fields the cleanup reads; three's types keep them private. */
interface BackendHandles {
  gl?: WebGL2RenderingContext | null;
  device?: { destroy(): void } | null;
}

export async function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Promise<Stage> {
  const { preview, signal } = ctx;
  const root = document.createElement('div');
  root.className = preview ? 'tt-stage tt-card' : 'tt-stage tt-full';
  const canvasBox = document.createElement('div');
  canvasBox.className = 'tt-canvas';
  if (!preview) canvasBox.style.height = `${opts.height ?? 440}px`;
  root.append(canvasBox);
  let panel: HTMLElement | null = null;
  if (!preview && opts.panel !== false) {
    panel = document.createElement('div');
    panel.className = 'tt-panel';
    root.append(panel);
  }
  el.append(root);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(opts.background ?? 0x16181d);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, opts.distance ?? 4.2);
  camera.lookAt(0, 0, 0);
  if (opts.lights !== false) {
    scene.add(new THREE.HemisphereLight(0xffffff, 0x404050, 1.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    scene.add(key);
  }

  const renderer = new THREE.WebGPURenderer({ antialias: !preview });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  canvasBox.append(renderer.domElement);

  const owned: { dispose(): void }[] = [];
  const disposers: (() => void)[] = [];
  const frames: ((t: number, dt: number) => void)[] = [];
  let controls: OrbitControls | null = null;
  let disposed = false;

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h } = canvasBox;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvasBox);

  const dispose = async (): Promise<void> => {
    if (disposed) return;
    disposed = true;
    renderer.setAnimationLoop(null);
    observer.disconnect();
    controls?.dispose();
    for (const fn of disposers.splice(0).reverse()) fn();
    for (const item of owned.splice(0)) item.dispose();
    const backend = renderer.backend as unknown as BackendHandles;
    // Read the handles before dispose(), which may clear them.
    const gl = backend.gl ?? null;
    const device = backend.device ?? null;
    await renderer.dispose();
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    device?.destroy();
    root.remove();
  };

  await renderer.init();
  if (signal.aborted) {
    await dispose();
    throw signal.reason ?? new DOMException('Unmounted', 'AbortError');
  }
  resize();
  if (!preview) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
  }

  const clock = new THREE.Timer();
  return {
    preview,
    signal,
    scene,
    camera,
    renderer,
    root,
    panel,
    frame: (fn) => void frames.push(fn),
    own: (item) => {
      owned.push(item);
      return item;
    },
    onDispose: (fn) => void disposers.push(fn),
    start: () => {
      renderer.setAnimationLoop((now) => {
        clock.update(now);
        const t = clock.getElapsed();
        const dt = clock.getDelta();
        for (const fn of frames) fn(t, dt);
        controls?.update();
        renderer.render(scene, camera);
      });
    },
    dispose,
  };
}
