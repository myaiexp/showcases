// Scaffolding for animateView examples: iframe host, page and timers
import type * as MotionApi from 'motion';
import { motionFrame } from './frame.ts';

// Every animateView example runs in its own iframe (see frame.ts). This does the parts they
// all repeat: size a host box (200px in a card, taller in the full view), load the frame,
// add an `.app` div to the iframe's body, and track timers so cleanup stops them.

export interface ViewStage {
  doc: Document;
  win: Window;
  /** The iframe's own Motion. */
  Motion: typeof MotionApi;
  /** An empty div in the iframe's body: the example's page lives here. */
  app: HTMLElement;
  /** Calls `fn` every `seconds`, starting after `first` seconds. Stopped by `dispose()`. */
  every(fn: () => void, seconds: number, first?: number): void;
  /** Stops every timer started with `every`. */
  dispose(): void;
}

export interface ViewStageOptions {
  preview: boolean;
  signal: AbortSignal;
  /** CSS for the iframe's page. `.app` fills the body, centred. */
  css: string;
}

const BASE_CSS = 'body{display:grid;place-items:center;height:100vh;overflow:hidden}.app{width:min(100vw - 16px,340px)}';

export async function viewStage(el: HTMLElement, o: ViewStageOptions): Promise<ViewStage> {
  const host = document.createElement('div');
  Object.assign(host.style, { width: '100%', height: o.preview ? '200px' : '340px' });
  // Centre the stage and anything the example adds under it (panel, hint) in the full view.
  Object.assign(el.style, { display: 'flex', flexDirection: 'column', alignItems: 'center' });
  el.append(host);
  const { doc, win, Motion } = await motionFrame(host, { css: BASE_CSS + o.css, signal: o.signal });
  const app = doc.createElement('div');
  app.className = 'app';
  doc.body.append(app);
  const ids: number[] = [];
  return {
    doc,
    win,
    Motion,
    app,
    every(fn, seconds, first = seconds) {
      ids.push(window.setTimeout(() => {
        fn();
        ids.push(window.setInterval(fn, seconds * 1000));
      }, first * 1000));
    },
    dispose() {
      for (const id of ids) {
        window.clearTimeout(id);
        window.clearInterval(id);
      }
      ids.length = 0;
    },
  };
}
