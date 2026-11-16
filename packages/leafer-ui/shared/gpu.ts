// Frees the WebGL contexts that @leafer-in/image-filter creates for filtered images
//
// Each filtered paint owns a <canvas> with a WebGL context (`paint.image.view`), kept in the source
// image's `childrenMap` until the source image itself is destroyed. A page that mounts many cards
// would run into the browser's limit of 16 contexts, so on dispose close the contexts of the elements
// the example filtered and drop their `childrenMap` entries.
import type { IUI } from 'leafer-ui';
import { slider } from './controls.ts';
import type { Stage } from './stage.ts';

interface FilterImage {
  parent?: { childrenMap?: Record<string, unknown> } | null;
  view?: { close?: () => void };
}

/** `elements` is read at dispose time, so it may return elements created later. */
export function freeFilterContexts(stage: Pick<Stage, 'onDispose'>, elements: () => IUI[]): void {
  stage.onDispose(() => {
    const held: { image: FilterImage; id: number }[] = [];
    for (const ui of elements()) {
      const fills = (ui.__ as { fill?: unknown }).fill;
      if (!Array.isArray(fills)) continue;
      for (const paint of fills as { image?: FilterImage }[]) {
        if (paint.image?.parent) held.push({ image: paint.image, id: ui.innerId });
      }
    }
    // After the engine is destroyed: it still reads these images while it tears the paints down.
    queueMicrotask(() => {
      for (const { image, id } of held) {
        if (image.parent?.childrenMap) delete image.parent.childrenMap[id];
        image.view?.close?.(); // image-filter's own close(): loses the WebGL context
      }
    });
  });
}

/**
 * Like shapes.ts `drive`, for values that feed an image filter. Each change of a filter value makes
 * image-filter compile a shader and upload a texture that it never deletes (they go when the context is
 * lost on dispose), so a card sweeps in a few coarse steps instead of every frame.
 */
export function driveSlow(
  stage: Stage,
  label: string,
  [min, max, step]: readonly [number, number, number],
  value: number,
  set: (v: number) => void,
  period = 6,
): void {
  set(value);
  if (stage.bar) {
    slider(stage.bar, label, min, max, step, value, set);
    return;
  }
  const stops = 8; // values per half sweep
  const t0 = performance.now();
  stage.every(700, () => {
    const u = 0.5 - 0.5 * Math.cos(((performance.now() - t0) / 1000 / period) * Math.PI * 2);
    const q = Math.round(u * stops) / stops;
    set(Math.round((min + (max - min) * q) / step) * step);
  });
}
