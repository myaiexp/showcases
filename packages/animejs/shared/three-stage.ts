// Shared Three.js stage for the adapter examples: renderer, scene, camera, resize, render loop, cleanup
import { createTimer } from 'animejs';
import * as THREE from 'three';

/** The slice of a renderer the stage needs; both WebGLRenderer and WebGPURenderer fit it. */
export interface StageRenderer {
  domElement: HTMLCanvasElement;
  setPixelRatio(ratio: number): void;
  setSize(width: number, height: number, updateStyle?: boolean): void;
  render(scene: THREE.Scene, camera: THREE.Camera): void;
  dispose(): void;
}

export interface StageOptions {
  preview: boolean;
  /** Camera position, default [0, 0, 6]. */
  cameraPosition?: [number, number, number];
  fov?: number;
  /** Supply a ready renderer (e.g. an initialised WebGPURenderer); default is a WebGLRenderer. */
  renderer?: StageRenderer;
  /** Runs once per frame before render. */
  onFrame?: () => void;
}

export interface Stage {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: StageRenderer;
  wrap: HTMLElement;
  /** Register anything with dispose() (textures, geometries) for cleanup. */
  own<T extends { dispose(): void }>(item: T): T;
  /** Stops the loop, disconnects the observer, disposes everything, removes the canvas. */
  destroy(): void;
}

export function createStage(el: HTMLElement, opts: StageOptions): Stage {
  const wrap = document.createElement('div');
  wrap.style.cssText = `position:relative;width:100%;height:${opts.preview ? '100%' : '400px'};overflow:hidden`;
  el.append(wrap);

  const renderer: StageRenderer = opts.renderer ?? new THREE.WebGLRenderer({ alpha: true, antialias: !opts.preview });
  renderer.setPixelRatio(opts.preview ? 1 : Math.min(window.devicePixelRatio, 2));
  const canvas = renderer.domElement;
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  wrap.append(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(opts.fov ?? 50, 1, 0.1, 100);
  camera.position.set(...(opts.cameraPosition ?? [0, 0, 6]));
  scene.add(camera);

  const owned: { dispose(): void }[] = [];
  const resize = (): void => {
    const w = Math.max(1, wrap.clientWidth);
    const h = Math.max(1, wrap.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(wrap);
  resize();

  // The loop is an anime.js timer, as in the docs' own snippets; revert() stops it.
  const loop = createTimer({
    onUpdate: () => {
      opts.onFrame?.();
      renderer.render(scene, camera);
    },
  });

  let destroyed = false;
  return {
    scene,
    camera,
    renderer,
    wrap,
    own: (item) => {
      owned.push(item);
      return item;
    },
    destroy: () => {
      if (destroyed) return;
      destroyed = true;
      loop.revert();
      observer.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
        mats.forEach((mat) => mat.dispose());
      });
      owned.forEach((item) => item.dispose());
      renderer.dispose();
      wrap.remove();
    },
  };
}

/** Full-view control row: returns the panel plus helpers to add buttons and a readout line. */
export function createPanel(el: HTMLElement): {
  button(label: string, onClick: () => void): HTMLButtonElement;
  readout(): HTMLElement;
} {
  const panel = document.createElement('div');
  panel.className = 'panel';
  el.append(panel);
  return {
    button: (label, onClick) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', onClick);
      panel.append(b);
      return b;
    },
    readout: () => {
      const r = document.createElement('pre');
      r.className = 'readout';
      el.append(r);
      return r;
    },
  };
}

