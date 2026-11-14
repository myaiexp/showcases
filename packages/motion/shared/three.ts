// Three.js stage (renderer, scene, camera, lights) that registers threeEffect once
import * as THREE from 'three';
import { animate, cancelFrame, frame } from 'motion';
import { threeEffect } from 'motion/three';

// Traps:
// - animate.addEffect() is page-wide and de-duplicates (it removes the effect before adding it again),
//   so registering at import time is safe however many cards import this. Do not removeEffect() on
//   cleanup: another card on the page may still be animating a mesh.
// - Motion writes to Three in frame.preRender; the stage renders in frame.render, so every frame is complete.
// - Every mounted card owns a WebGL context and browsers cap them (~16), so dispose() must call
//   forceContextLoss() as well as dispose(). Cards keep pixel ratio 1.
// - A camera moved by animate() keeps its old orientation: the stage re-aims it at `stage.target` and
//   refreshes the projection (for an animated fov) every frame.
animate.addEffect(threeEffect);

export { THREE };

export interface ThreeStage {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  /** The point the camera looks at, every frame. */
  target: THREE.Vector3;
  /** Frees the context, geometries, materials and textures in the scene, and stops rendering. */
  dispose(): void;
}

export interface StageOptions {
  /** Card: pixel ratio 1 and cheaper antialiasing. */
  preview: boolean;
  fov?: number;
  position?: [number, number, number];
  /** Adds an ambient and a directional light. Default true. */
  lights?: boolean;
  /** Called after Motion's writes, just before each render. */
  beforeRender?: () => void;
}

/** Appends the sized div a stage renders into: the card's 200px strip, or a 520px-wide panel in the full view. */
export function stageHost(parent: HTMLElement, preview: boolean, fullHeight = 340): HTMLDivElement {
  const host = document.createElement('div');
  host.className = 'stage';
  Object.assign(host.style, preview ? { width: '100%', height: '200px' } : { width: 'min(100%, 520px)', height: `${fullHeight}px`, touchAction: 'manipulation' });
  parent.append(host);
  return host;
}

/** Fills `host` (which must have a size from CSS) with a canvas rendering a scene. */
export function threeStage(host: HTMLElement, o: StageOptions): ThreeStage {
  const renderer = new THREE.WebGLRenderer({ antialias: !o.preview, alpha: true });
  renderer.setPixelRatio(o.preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(o.fov ?? 40, 1, 0.1, 100);
  camera.position.set(...(o.position ?? [0, 0.6, 6]));
  const target = new THREE.Vector3(0, 0, 0);

  if (o.lights !== false) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(3, 5, 4);
    scene.add(sun);
  }

  const resize = (): void => {
    const w = Math.max(host.clientWidth, 1);
    const h = Math.max(host.clientHeight, 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  const render = (): void => {
    o.beforeRender?.();
    camera.lookAt(target);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  frame.render(render, true);

  return {
    renderer,
    scene,
    camera,
    target,
    dispose() {
      cancelFrame(render);
      observer.disconnect();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        for (const m of mats) {
          for (const v of Object.values(m)) if ((v as THREE.Texture | null)?.isTexture) (v as THREE.Texture).dispose();
          m.dispose();
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
