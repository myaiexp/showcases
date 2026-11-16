// Image-filter demos: a painted picture on a canvas, plus card sweeps
//
// Filter traps found against fabric 7.4.0 (add to this list):
// - applyFilters() is synchronous, so a page-wide setFilterBackend() can be swapped and restored
//   around it in one tick. Software WebGL (headless, this VPS) takes 300-400 ms per call.
// - Convolute 3x3 with `opaque: true` fails to compile its WebGL shader; pad the kernel to 5x5.
// - `opaque` reads opposite ways: Canvas2D keeps the original alpha for true, WebGL for false.
// - Resize.resizeType only applies on Canvas2D (WebGL always lanczos). A second Canvas2D
//   applyFilters() with another Resize scale reads a cropped corner: make a fresh FabricImage.
//   `sliceHack` crops the picture at some scales.
// - BlendImage takes a FabricImage whose left/top are raw image pixels (origin left/top);
//   its `alpha` does nothing. RemoveColor.useAlpha is declared but unused.
// - A WebGLFilterBackend of your own keeps its GL context after dispose(): lose it first.
// - A canvas-sourced FabricImage's getSrc() is a data URL, so it round-trips through JSON.
// - Custom filters need a unique `static type`: classRegistry also stores it lowercased.
import { Canvas, FabricImage, type filters } from 'fabric';
import type { MountContext } from '@/types.ts';
import { picture, type Picture } from './images.ts';
import { createStage, type Pane, type Stage } from './stage.ts';

/** The picture size every filter example uses: small, because applyFilters runs per change. */
export const SIZE = [320, 220] as const;

export interface Shot {
  canvas: Canvas;
  /** The current image (a new one after `setPicture`). */
  readonly img: FabricImage;
  /** Replaces the image's filters array, applies it, and redraws. */
  show(list: filters.BaseFilter<string>[]): void;
  /** Swaps in another painted picture and applies the same filters to it. */
  setPicture(kind: Picture): void;
}

export function filterStage(el: HTMLElement, ctx: MountContext, panes?: readonly string[], hint?: string): Stage {
  return createStage(el, ctx, { panes, hint, scene: SIZE, height: 300, width: 900 });
}

/** A canvas in `pane` holding one FabricImage of a painted picture (filters are applied by `show`). */
export function shot(stage: Stage, kind: Picture, pane: Pane = stage, seed = 7): Shot {
  const canvas = stage.own(new Canvas(pane.el, { selection: false, skipTargetFind: true }), pane);
  const make = (k: Picture): FabricImage =>
    new FabricImage(picture(k, SIZE[0], SIZE[1], seed), { left: SIZE[0] / 2, top: SIZE[1] / 2 });
  let img = make(kind);
  canvas.add(img);
  const self: Shot = {
    canvas,
    get img() {
      return img;
    },
    show(list) {
      img.filters = list;
      img.applyFilters();
      canvas.requestRenderAll();
    },
    setPicture(k) {
      const list = img.filters;
      canvas.remove(img);
      img.dispose();
      img = make(k);
      canvas.add(img);
      self.show(list);
    },
  };
  return self;
}

/** Card motion: calls `fn(v)` with v going back and forth between `from` and `to`, at most every 110 ms. */
export function sweep(stage: Stage, from: number, to: number, fn: (v: number) => void, seconds = 3): void {
  const t0 = performance.now();
  const step = (): void => {
    const start = performance.now();
    const p = (((start - t0) / 1000 / seconds) % 1) * 2;
    const k = p < 1 ? p : 2 - p;
    fn(from + (to - from) * (0.5 - 0.5 * Math.cos(k * Math.PI)));
    // A slow applyFilters (software GL, big picture) leaves the page room to breathe: wait 2x as long as it took.
    stage.after(Math.max(110, 2 * (performance.now() - start)), step);
  };
  stage.after(110, step);
}

/** Card motion for a list of choices: steps to the next every `ms`. */
export function cycle<T>(stage: Stage, items: readonly T[], fn: (item: T) => void, ms = 1300): void {
  let i = 0;
  stage.every(ms, () => fn(items[++i % items.length]!));
}
