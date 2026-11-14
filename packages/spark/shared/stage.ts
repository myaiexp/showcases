// Shared Spark setup: renderer, SparkRenderer, camera, loop and teardown
import * as THREE from 'three';
import { SparkRenderer, SplatMesh, type SparkRendererOptions } from '@sparkjsdev/spark';
import type { MountContext } from '@/types.ts';
import { createOrbit, type Orbit } from './orbit.ts';

export interface StageOptions {
  /** Canvas height in the full view, in CSS pixels. Cards always fill their 200px box. */
  height?: number;
  /** SparkRenderer options; `renderer` is filled in. */
  spark?: Omit<SparkRendererOptions, 'renderer'>;
  /** Camera position, and the point the orbit circles. */
  position?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
  background?: THREE.ColorRepresentation;
  /** false: no orbit, the example moves the camera itself. A number sets the auto-rotate speed (rad/s). */
  orbit?: boolean | number;
}

export interface Stage {
  canvas: HTMLCanvasElement;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  spark: SparkRenderer;
  orbit: Orbit | null;
  /** Starts the render loop; `onFrame` runs before each render with seconds since start and since last frame. */
  run(onFrame?: (time: number, dt: number) => void): void;
  /** Stops the loop and frees splats, meshes, Spark's workers and the GL context. */
  dispose(): void;
}

export function createStage(el: HTMLElement, { preview }: MountContext, options: StageOptions = {}): Stage {
  const canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = preview ? '200px' : `${options.height ?? 440}px`;
  canvas.style.touchAction = 'none';
  el.append(canvas);

  // Spark's docs: keep antialias off, multisampling only costs time with splats.
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
  renderer.setPixelRatio(preview ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(new THREE.Color(options.background ?? 0x0c0e12));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(options.fov ?? 60, 2, 0.01, 1000);
  camera.position.set(...(options.position ?? [0, 0, 3]));

  const spark = new SparkRenderer({ renderer, ...options.spark });
  scene.add(spark);

  const target = new THREE.Vector3(...(options.target ?? [0, 0, 0]));
  const orbit =
    options.orbit === false
      ? null
      : createOrbit(camera, canvas, target, {
          interactive: !preview,
          autoRotate: typeof options.orbit === 'number' ? options.orbit : 0.25,
        });
  if (!orbit) camera.lookAt(target);

  const resize = (): void => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  let last = -1;
  return {
    canvas,
    renderer,
    scene,
    camera,
    spark,
    orbit,
    run(onFrame) {
      renderer.setAnimationLoop((ms) => {
        const time = ms / 1000;
        const dt = last < 0 ? 0 : Math.min(time - last, 0.1);
        last = time;
        orbit?.update(dt);
        onFrame?.(time, dt);
        renderer.render(scene, camera);
      });
    },
    dispose() {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      orbit?.dispose();
      scene.traverse((obj) => {
        if (obj === spark) return;
        if (obj instanceof SplatMesh) obj.dispose();
        else if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          for (const m of [obj.material].flat()) m.dispose();
        }
      });
      // Terminates the renderer's sort and LoD workers too.
      spark.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
