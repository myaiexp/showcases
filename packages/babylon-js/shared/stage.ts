// Shared canvas, WebGL Engine and Scene setup with resize and teardown
import { Engine, Scene } from '@babylonjs/core';
import type { MountContext } from '@/types.ts';

export interface Stage {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  /** Starts the render loop; `beforeRender` runs each frame before scene.render(). */
  run(beforeRender?: () => void): void;
  /** Stops the loop and disposes the scene and engine (and with them every mesh, texture and observer). */
  dispose(): void;
}

export interface StageOptions {
  /** Canvas height in the full view, in CSS pixels. Previews always fill their 200px card. */
  height?: number;
  /** Extra engine options, merged over the defaults. */
  engineOptions?: ConstructorParameters<typeof Engine>[2];
}

/**
 * The boilerplate the starter-scene example writes out by hand: a canvas in `el`, an
 * Engine on it, a Scene, engine.resize() on canvas resize, and a render loop. Previews
 * render at device-pixel ratio 1 to stay light.
 */
export function createStage(el: HTMLElement, { preview }: MountContext, options: StageOptions = {}): Stage {
  const canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = preview ? '200px' : `${options.height ?? 440}px`;
  canvas.style.outline = 'none';
  canvas.style.touchAction = 'none';
  el.append(canvas);

  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: false,
    stencil: true,
    adaptToDeviceRatio: !preview,
    ...options.engineOptions,
  });
  const scene = new Scene(engine);

  const observer = new ResizeObserver(() => engine.resize());
  observer.observe(canvas);

  let running = false;
  return {
    canvas,
    engine,
    scene,
    run(beforeRender) {
      if (running) return;
      running = true;
      engine.runRenderLoop(() => {
        beforeRender?.();
        scene.render();
      });
    },
    dispose() {
      observer.disconnect();
      engine.stopRenderLoop();
      scene.dispose();
      engine.dispose();
      canvas.remove();
    },
  };
}
