// Shared stage: WebGL renderer, scene, camera, orbit, frame loop and full cleanup
//
// Traps: read shared/traps.md before building an example, and add to it.
import * as THREE from 'three';
import type { MountContext } from '@/types.ts';
import { createOrbit, type Orbit } from './orbit.ts';
import { controlBar } from './controls.ts';

export interface StageOptions {
  /** Canvas height in the full view, in CSS pixels. Cards always fill their 200px box. */
  height?: number;
  /** Camera position, and the point the orbit circles. */
  position?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
  near?: number;
  far?: number;
  background?: THREE.ColorRepresentation | null;
  /** false: no orbit, the example moves the camera itself. A number sets the auto-rotate speed (rad/s). */
  orbit?: boolean | number;
  /** Extra WebGLRenderer parameters, merged over the README's recommended attributes. */
  renderer?: THREE.WebGLRendererParameters;
}

/** Anything the stage should free on dispose: composers, passes, effects, textures. */
interface Disposable {
  dispose(): void;
}
interface Sized {
  setSize(width: number, height: number, updateStyle?: boolean): void;
}

export interface Stage {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  orbit: Orbit | null;
  preview: boolean;
  /** The column the canvas sits in: append extra full-view panels here. */
  box: HTMLDivElement;
  /** Control bar under the canvas, or null in a card. */
  bar: HTMLDivElement | null;
  /** Canvas size in CSS pixels. */
  size: { width: number; height: number };
  /**
   * Frees `thing` on dispose. An EffectComposer (anything with `setSize`) is also resized with
   * the canvas, starting now; use `ownBuffer` for render targets, which take pixel sizes.
   */
  own<T extends Disposable>(thing: T): T;
  /** Calls `frame(dt, t)` every animation frame (seconds) until dispose. Render from here. */
  run(frame: (dt: number, t: number) => void): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  onDispose(fn: () => void): void;
  dispose(): void;
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;flex-direction:column;width:100%;position:relative';
  el.append(box);

  const canvas = document.createElement('canvas');
  canvas.style.cssText = `display:block;width:100%;height:${preview ? 200 : (opts.height ?? 420)}px;touch-action:none`;
  box.append(canvas);

  // The README's recommended attributes for a post processing workflow.
  const renderer = new THREE.WebGLRenderer({
    canvas,
    powerPreference: 'high-performance',
    antialias: false,
    stencil: false,
    depth: false,
    ...opts.renderer,
  });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  if (opts.background !== null) renderer.setClearColor(new THREE.Color(opts.background ?? 0x0b0d12));

  const scene = new THREE.Scene();
  if (opts.background !== null) scene.background = new THREE.Color(opts.background ?? 0x0b0d12);
  const near = opts.near ?? 0.1;
  const far = opts.far ?? 100;
  const camera = new THREE.PerspectiveCamera(opts.fov ?? 50, 2, near, far);
  camera.position.set(...(opts.position ?? [0, 2.5, 7]));

  const target = new THREE.Vector3(...(opts.target ?? [0, 0.6, 0]));
  const orbit =
    opts.orbit === false
      ? null
      : createOrbit(camera, canvas, target, {
          interactive: !preview,
          autoRotate: typeof opts.orbit === 'number' ? opts.orbit : 0.2,
        });
  if (!orbit) camera.lookAt(target);

  const owned: Disposable[] = [];
  const sized: Sized[] = [];
  const cleanups: (() => void)[] = [];
  const size = { width: 0, height: 0 };

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (w === 0 || h === 0) return;
    size.width = w;
    size.height = h;
    renderer.setSize(w, h, false);
    for (const s of sized) s.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  const bar = preview ? null : controlBar(box);
  let last = -1;
  let start = -1;

  const stage: Stage = {
    canvas,
    renderer,
    scene,
    camera,
    orbit,
    preview,
    box,
    bar,
    size,
    own(thing) {
      owned.push(thing);
      const s = thing as unknown as Partial<Sized>;
      if (typeof s.setSize === 'function') {
        sized.push(s as Sized);
        if (size.width > 0) s.setSize(size.width, size.height, false);
      }
      return thing;
    },
    run(frame) {
      renderer.setAnimationLoop((ms) => {
        const now = ms / 1000;
        if (start < 0) start = now;
        const dt = last < 0 ? 1 / 60 : Math.min(now - last, 0.1);
        last = now;
        orbit?.update(dt);
        frame(dt, now - start);
      });
    },
    every(ms, fn) {
      const id = setInterval(fn, ms);
      cleanups.push(() => clearInterval(id));
    },
    onDispose(fn) {
      cleanups.push(fn);
    },
    dispose() {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      orbit?.dispose();
      for (const fn of cleanups.splice(0).reverse()) fn();
      for (const thing of owned.splice(0).reverse()) thing.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          for (const m of [obj.material].flat()) m.dispose();
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      box.remove();
    },
  };
  return stage;
}
