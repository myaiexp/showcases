// Shared deck.gl setup: sized box, a GPU device it owns, a release that frees it
import { luma } from '@luma.gl/core';
import type { Device } from '@luma.gl/core';
import { webgl2Adapter } from '@luma.gl/webgl';
import type { MountContext } from '@/types.ts';

/**
 * deck.gl 9.4 traps found while building this gallery, for whoever adds the next example:
 * - Deck.finalize() never frees the WebGL context: luma's device.destroy() is a no-op for
 *   the devices Deck creates (_reuseDevices). Chrome keeps ~16 live contexts and then drops
 *   the oldest, which blanks other cards. So every example renders on `stage.device` (Deck's
 *   documented `device` prop) and cleans up with `stage.release(deck)`, which finalizes and
 *   then loses the context on purpose.
 * - A Deck given `device` draws on that device's canvas and puts tooltips and widgets in
 *   the canvas's parent: `stage.box`, which is position: relative.
 * - Preview cards have no pointer input: pass `controller: !preview` (or false) so a card
 *   never grabs wheel events, and animate the view or the layers on a timer instead.
 * - A view state set from code (`viewState`) is not normalized the way a controller's is:
 *   at a longitude past ±180° the MapView draws nothing. Wrap a drifting longitude with
 *   ((lng + 180) % 360) - 180.
 */

/** Stage heights: a gallery card is 200px; the full view gets room to explore. */
export const PREVIEW_HEIGHT = 200;
export const FULL_HEIGHT = 460;

export interface StageOptions {
  /** Height in the full view, in CSS pixels. */
  height?: number;
  /** Height in a preview card; 200 fills the card. */
  previewHeight?: number;
  /** Where the box goes; defaults to the mount element. */
  parent?: HTMLElement;
  /** Background behind the canvas. Default: the dark map ocean. */
  background?: string;
}

export interface Stage {
  /** Full-width, position: relative box holding the canvas, tooltips and widgets. */
  box: HTMLDivElement;
  canvas: HTMLCanvasElement;
  /** WebGL2 device on `canvas`. Pass it to `new Deck({device})`. */
  device: Device;
  preview: boolean;
  /** Finalizes the decks (if given), frees the WebGL context and removes the box. */
  release(...decks: ({ finalize(): void } | null | undefined)[]): void;
}

/** Ocean colour of the shared basemap, also the default stage background. */
export const OCEAN = '#0b1622';

/**
 * Builds the box and canvas and creates the device. Resolves after the device exists;
 * rejects with an AbortError (and frees the device) if the card unmounts meanwhile.
 */
export async function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Promise<Stage> {
  const { preview, signal } = ctx;
  const box = document.createElement('div');
  box.style.position = 'relative';
  box.style.width = '100%';
  box.style.height = `${preview ? (opts.previewHeight ?? PREVIEW_HEIGHT) : (opts.height ?? FULL_HEIGHT)}px`;
  box.style.borderRadius = preview ? '0' : '8px';
  box.style.overflow = 'hidden';
  box.style.background = opts.background ?? OCEAN;
  box.style.flex = 'none';
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  box.append(canvas);
  (opts.parent ?? el).append(box);

  const device = await luma.createDevice({
    type: 'webgl',
    adapters: [webgl2Adapter],
    // A card is small and short-lived: 1x pixels keep six of them cheap.
    createCanvasContext: { canvas, useDevicePixels: preview ? 1 : true, autoResize: true },
  });

  let released = false;
  const release: Stage['release'] = (...decks) => {
    if (released) return;
    released = true;
    for (const deck of decks) deck?.finalize();
    device.loseDevice();
    box.remove();
  };
  if (signal.aborted) {
    release();
    throw new DOMException('unmounted while the device was being created', 'AbortError');
  }
  return { box, canvas, device, preview, release };
}

/**
 * Runs `tick(t)` every animation frame with t in seconds since the start; returns a stop
 * function. For previews that move the camera or a layer prop on their own.
 */
export function animate(tick: (t: number) => void): () => void {
  let raf = 0;
  const start = performance.now();
  const frame = (now: number): void => {
    tick((now - start) / 1000);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}
