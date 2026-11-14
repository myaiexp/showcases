// An iframe running its own Motion, for features that act on the whole document
import type * as MotionApi from 'motion';
// The package's exports map hides dist/, so the UMD build is reached by path.
import motionUrl from '../../../node_modules/motion/dist/motion.js?url';

// animateView() calls document.startViewTransition, which snapshots the entire page and
// allows one transition at a time; scopeMotion's matchMedia and window-level resize() and
// scroll() read the window. In the gallery those would capture every card at once, so an
// example that needs them gets a document of its own. The UMD build sets `Motion` on the
// iframe's window, and that copy works against the iframe's document.

export interface MotionFrame {
  iframe: HTMLIFrameElement;
  win: Window;
  doc: Document;
  /** The iframe's own Motion: the same API as `import * as Motion from 'motion'`. */
  Motion: typeof MotionApi;
}

/** base.css tokens copied into the iframe so its page matches the gallery's theme. */
const TOKENS = ['--bg', '--bg-surface', '--bg-raised', '--fg-1', '--fg-2', '--fg-3', '--accent',
  '--accent-text', '--border', '--green', '--red', '--orange', '--cyan', '--purple', '--yellow',
  '--font-mono', '--space-1', '--space-2', '--space-3', '--space-4', '--space-5', '--space-6'];

function themeCss(): string {
  const root = getComputedStyle(document.documentElement);
  const vars = TOKENS.map((t) => `${t}:${root.getPropertyValue(t).trim()}`).filter((d) => !d.endsWith(':'));
  return `:root{${vars.join(';')};color-scheme:dark}
*{box-sizing:border-box}
body{margin:0;background:var(--bg,#111);color:var(--fg-1,#eee);font:14px/1.5 system-ui,sans-serif}
button{font:inherit;color:inherit;background:var(--bg-raised,#222);border:1px solid var(--border,#444);border-radius:6px;padding:4px 10px;cursor:pointer}`;
}

/**
 * Appends an iframe to `parent` and loads Motion into it. `css` styles the iframe's page
 * (it is the example's own document, so it needs no scoping). Size the iframe with CSS;
 * removing it stops everything running inside.
 */
export async function motionFrame(parent: HTMLElement, opts: { css?: string; signal: AbortSignal }): Promise<MotionFrame> {
  const iframe = document.createElement('iframe');
  iframe.className = 'motion-frame';
  Object.assign(iframe.style, { border: '0', width: '100%', height: '100%', display: 'block', background: 'transparent' });
  iframe.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>${themeCss()}\n${opts.css ?? ''}</style></head><body></body></html>`;
  const loaded = new Promise<void>((resolve) => iframe.addEventListener('load', () => resolve(), { once: true }));
  parent.append(iframe);
  try {
    await loaded;
    opts.signal.throwIfAborted();
    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;
    if (!win || !doc) throw new Error('iframe has no document');
    await new Promise<void>((resolve, reject) => {
      const s = doc.createElement('script');
      s.src = new URL(motionUrl, document.baseURI).href;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('could not load Motion into the iframe'));
      doc.head.append(s);
    });
    opts.signal.throwIfAborted();
    const Motion = (win as unknown as { Motion?: typeof MotionApi }).Motion;
    if (!Motion) throw new Error('Motion did not load in the iframe');
    return { iframe, win, doc, Motion };
  } catch (err) {
    iframe.remove();
    throw err;
  }
}
