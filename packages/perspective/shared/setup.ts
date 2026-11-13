// Shared Perspective setup: wasm bootstrap, page-wide worker, viewer helpers
import perspective_viewer from '@perspective-dev/viewer';
import '@perspective-dev/viewer-datagrid';
import '@perspective-dev/viewer-charts';
import perspective from '@perspective-dev/client';
import type { Client, Table } from '@perspective-dev/client';
import type { HTMLPerspectiveViewerElement, ViewerConfigUpdate } from '@perspective-dev/viewer';
import '@perspective-dev/viewer/dist/css/themes.css';
import SERVER_WASM from '@perspective-dev/server/dist/wasm/perspective-server.wasm?url';
import CLIENT_WASM from '@perspective-dev/viewer/dist/wasm/perspective-viewer.wasm?url';
import type { MountContext } from '@/types.ts';

export { perspective };
export type { Client, Table, HTMLPerspectiveViewerElement, ViewerConfigUpdate };

/**
 * The bootstrap from importing.md § Vite. init() registers the binaries for the page and
 * can run once, so every example shares this promise.
 */
let booted: Promise<void> | null = null;
export function boot(): Promise<void> {
  booted ??= perspective_viewer.init({ server: fetch(SERVER_WASM), viewer: fetch(CLIENT_WASM) });
  return booted;
}

/**
 * One Web Worker engine for the whole page (worker.md). A worker loads the whole engine,
 * and up to six previews run at once, so the gallery shares one and each example names
 * and deletes its own tables. Examples about workers themselves start their own.
 */
let shared: Promise<Client> | null = null;
export function worker(): Promise<Client> {
  shared ??= boot().then(() => perspective.worker());
  return shared;
}

let counter = 0;
/**
 * A table name unique on the page. viewer.md: always name a Table so save() tokens
 * point at it; uniqueness keeps two mounted examples from claiming the same name.
 */
export function uniqueName(base: string): string {
  counter += 1;
  return `${base}_${counter}`;
}

export interface ViewerOptions {
  /** Height in the full view, in CSS pixels. */
  height?: number;
  /** Height in a preview card; 200 fills the card. */
  previewHeight?: number;
  /** The theme attribute (viewer.md § Attributes). The site is dark, so Pro Dark. */
  theme?: string;
  /** Where the element goes; defaults to the mount element. */
  parent?: HTMLElement;
}

/** A sized `<perspective-viewer>` appended to the example. */
export function createViewer(el: HTMLElement, { preview }: MountContext, options: ViewerOptions = {}): HTMLPerspectiveViewerElement {
  const viewer = document.createElement('perspective-viewer');
  viewer.setAttribute('theme', options.theme ?? 'Pro Dark');
  viewer.style.display = 'block';
  viewer.style.width = '100%';
  viewer.style.height = `${preview ? (options.previewHeight ?? 200) : (options.height ?? 460)}px`;
  (options.parent ?? el).append(viewer);
  return viewer;
}

/**
 * Keeps a preview card alive: applies each restore() update in turn every `ms`. A step
 * waits for the previous restore() to settle, so slow renders never pile up.
 */
export function cycle(viewer: HTMLPerspectiveViewerElement, steps: ViewerConfigUpdate[], ms = 2600): () => void {
  let i = 0;
  let busy = false;
  let stopped = false;
  const id = window.setInterval(() => {
    if (busy || stopped) return;
    busy = true;
    i = (i + 1) % steps.length;
    viewer
      .restore(steps[i]!)
      .catch((err: unknown) => console.warn('perspective cycle', err))
      .finally(() => (busy = false));
  }, ms);
  return () => {
    stopped = true;
    window.clearInterval(id);
  };
}

/**
 * deleting.md: viewers and tables hold WebAssembly memory that garbage collection never
 * frees. Viewers go first, because table.delete() throws while a view still depends on it.
 */
export function teardown(viewers: HTMLPerspectiveViewerElement[], tables: Table[] = [], after?: () => Promise<void>): () => void {
  return () => {
    void (async () => {
      for (const v of viewers) {
        await v.delete();
        v.remove();
      }
      for (const t of tables) await t.delete();
      await after?.();
    })().catch((err: unknown) => console.warn('perspective teardown', err));
  };
}
