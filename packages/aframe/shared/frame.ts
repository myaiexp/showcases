// Runs each A-Frame example in its own iframe, with its own A-Frame and registries
import type { Mount } from '@/types.ts';
import { mountFrame } from './host.ts';
import type { AFrame, Scene } from './types.ts';

/**
 * A-Frame keeps page-wide state: custom elements (`a-scene`, `a-entity`, every primitive),
 * the component, system, shader and primitive registries (a registered system starts in
 * every later scene), and `window` listeners a scene never removes when it is detached
 * (a-scene.js `attachedCallbackPostCamera` adds an anonymous resize listener that keeps the
 * whole scene alive). So each example runs in an iframe that imports the example's module
 * again: the iframe's realm gets its own A-Frame, and removing the iframe ends the scene,
 * its loops, timers, listeners and context. The example's own code runs in the iframe's
 * realm too, so `document`, `window` and `setTimeout` in it are the iframe's, as in the
 * docs' single-page apps. Traps: ./traps.md.
 */

/** What an example's `run` gets, once its scene has loaded. */
export interface Stage {
  /** True in a 200px gallery card: no input, no network, keep it light. */
  readonly preview: boolean;
  /** The example's `<a-scene>`, in the iframe. */
  readonly scene: Scene;
  /** The iframe's A-Frame (the docs' global AFRAME). */
  readonly AFRAME: AFrame;
  /** The control row above the view, in the gallery page (full view only; null in cards). See ./controls.ts. */
  readonly bar: HTMLElement | null;
  /** A text line under the view (full view only; null in cards). */
  readout(): HTMLPreElement | null;
  /** A one-line caption over the view's bottom edge, in cards and the full view. */
  caption(text: string): void;
  /** Calls fn(i) every ms (i from 1) until the example unmounts. */
  every(ms: number, fn: (i: number) => void): void;
  /** Registers a teardown that runs before the iframe goes. */
  own(fn: () => void): void;
}

export interface SceneContext {
  preview: boolean;
}

export interface Example {
  /**
   * Registers what the scene's markup uses (components, systems, shaders, primitives,
   * geometries). Runs after A-Frame loads and before the markup is attached, as a `<script>`
   * in the docs' `<head>` would.
   */
  setup?(AFRAME: AFrame, ctx: SceneContext): void | Promise<void>;
  /** The page's markup as the docs write it: one `<a-scene>`, plus any HTML beside it. */
  scene: string | ((ctx: SceneContext) => string);
  /** Runs once the scene has loaded: card drivers, controls, JavaScript against the DOM. */
  run?(stage: Stage): void | Promise<void>;
  /** Height of the view in the full view, px. Default 480. */
  height?: number;
}

/** What the example's module hands the host when it runs inside its iframe. */
export interface FrameEntry {
  example: Example;
  /** Imports A-Frame into this realm (the iframe's) and returns it. */
  boot(): Promise<AFrame>;
}

/** The handshake the host leaves on the iframe's window before importing the module. */
export interface FrameHost {
  start(entry: FrameEntry): void;
}

declare global {
  interface Window {
    __aframeHost?: FrameHost;
  }
}

/**
 * Wraps an example: `export default aframeExample(import.meta.url, { setup, scene, run })`.
 * In the gallery page it returns a Mount that builds the iframe; inside the iframe the
 * same call finds the host's handshake and hands it the example.
 */
export function aframeExample(moduleUrl: string, example: Example): Mount {
  const host = window.__aframeHost;
  if (host) {
    host.start({ example, boot: async () => (await import('./boot.ts')).default });
    return () => () => {};
  }
  return (el, ctx) => mountFrame(el, ctx, moduleUrl, example.height);
}
