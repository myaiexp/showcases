// Runs each example in its own iframe, so each gets its own Zephyr3D Application
import { tryGetApp } from '@zephyr3d/scene';
import type { Mount } from '@/types.ts';
import { mountFrame } from './host.ts';

/**
 * Zephyr3D allows one Application per page and has no way to dispose of it: the
 * constructor throws when getApp() is already set, and the device, caches and input live
 * as module state. So an example cannot share the gallery page with another. Each one
 * runs in an iframe that imports the example's own module again: ES modules are cached
 * per document, so the iframe gets its own copy of @zephyr3d/scene and its own singleton.
 * Removing the iframe ends the app, its loops and its timers. Traps: ./traps.md.
 */

/** What an example's run function gets. Everything here lives as long as the example. */
export interface Stage {
  /** The canvas inside the example's iframe. Pass it to new Application({ canvas }). */
  readonly canvas: HTMLCanvasElement;
  /** True in a 200px gallery card: no input, no network, keep it light. */
  readonly preview: boolean;
  /** Pass to new Application({ pixelRatio }): 1 in cards, up to 2 in the full view. */
  readonly pixelRatio: number;
  /** The control row above the view (full view only; null in cards). See ./controls.ts. */
  readonly bar: HTMLElement | null;
  /** A text line under the view (full view only; null in cards). */
  readout(): HTMLPreElement | null;
  /** A one-line caption over the view's bottom edge, in cards and the full view. */
  caption(text: string): void;
  /** Calls fn(i) every ms (i from 1) until the example unmounts. */
  every(ms: number, fn: (i: number) => void): void;
  /** Registers a teardown that runs before the app stops. */
  own(fn: () => void): void;
}

/** An example's body, written as the docs write an app: new Application, ready, run. */
export type Run = (stage: Stage) => void | Promise<void>;

export interface FrameOptions {
  /** Height of the view in the full view, px. Default 480. */
  height?: number;
}

/** What the example's module hands the host when it runs inside its iframe. */
export interface FrameEntry {
  run: Run;
  /** Stops this realm's Application loop (the iframe's own copy of the engine). */
  stopApp(): void;
}

/** The handshake the host leaves on the iframe's window before importing the module. */
export interface FrameHost {
  start(entry: FrameEntry): void;
}

declare global {
  interface Window {
    __zephyrHost?: FrameHost;
  }
}

/**
 * Wraps an example: `export default zephyrExample(import.meta.url, async (stage) => {…})`.
 * In the gallery page it returns a Mount that builds the iframe; inside the iframe the
 * same call finds the host's handshake and gives it `run`.
 */
export function zephyrExample(moduleUrl: string, run: Run, opts: FrameOptions = {}): Mount {
  const host = window.__zephyrHost;
  if (host) {
    host.start({ run, stopApp: () => tryGetApp()?.stop() });
    return () => () => {};
  }
  return (el, ctx) => mountFrame(el, ctx, moduleUrl, opts);
}
