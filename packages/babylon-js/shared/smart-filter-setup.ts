// ThinEngine canvas and test-image texture for the Smart Filters examples
import { ThinEngine } from '@babylonjs/core';
import { createImageTexture } from '@babylonjs/smart-filters';
import type { ThinTexture } from '@babylonjs/core';
import type { MountContext } from '@/types.ts';
import { drawTestImage } from './test-picture.ts';

export interface SmartFilterCanvas {
  canvas: HTMLCanvasElement;
  engine: ThinEngine;
  /** Calls `onResize` after every canvas size change (the runtime must be told: smartFilter.resize). */
  onResize(callback: () => void): void;
  dispose(): void;
}

/** A canvas in `el` with a ThinEngine, which is what Smart Filters render with (no scene needed). */
export function createSmartFilterCanvas(el: HTMLElement, { preview }: MountContext, height = 440): SmartFilterCanvas {
  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, { display: 'block', width: '100%', height: preview ? '200px' : `${height}px` });
  el.append(canvas);
  const engine = new ThinEngine(canvas, true, { premultipliedAlpha: false, adaptToDeviceRatio: !preview });
  let callback: (() => void) | undefined;
  const observer = new ResizeObserver(() => {
    engine.resize();
    callback?.();
  });
  observer.observe(canvas);
  return {
    canvas,
    engine,
    onResize: (cb) => (callback = cb),
    dispose() {
      observer.disconnect();
      engine.stopRenderLoop();
      engine.dispose();
      canvas.remove();
    },
  };
}

/** The test image as a ThinTexture, ready to wrap in an InputBlock. */
export function createTestTexture(engine: ThinEngine): ThinTexture {
  return createImageTexture(engine, drawTestImage(), true);
}
