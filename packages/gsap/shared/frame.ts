// An iframe running its own GSAP, for page-level scroll and viewport features
import type { gsap as Gsap } from 'gsap';
import type { Observer as ObserverClass } from 'gsap/Observer';
import type { ScrollSmoother as ScrollSmootherClass } from 'gsap/ScrollSmoother';
import type { ScrollToPlugin as ScrollToClass } from 'gsap/ScrollToPlugin';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';
import gsapUrl from 'gsap/dist/gsap.min.js?url';
import observerUrl from 'gsap/dist/Observer.min.js?url';
import scrollSmootherUrl from 'gsap/dist/ScrollSmoother.min.js?url';
import scrollToUrl from 'gsap/dist/ScrollToPlugin.min.js?url';
import scrollTriggerUrl from 'gsap/dist/ScrollTrigger.min.js?url';

// ScrollSmoother, normalizeScroll and gsap.matchMedia act on the window they were loaded
// into: the body's scrollbar, the viewport's width. Loaded into the gallery page they would
// hijack its scroll, so an example that needs them gets a page of its own. Each script
// build sets a global on the iframe's window, and that copy of GSAP drives the iframe.
const SCRIPTS = {
  ScrollTrigger: scrollTriggerUrl,
  ScrollSmoother: scrollSmootherUrl,
  Observer: observerUrl,
  ScrollToPlugin: scrollToUrl,
} as const;
export type FramePlugin = keyof typeof SCRIPTS;

/** The iframe's own GSAP. Plugins not requested are undefined at runtime. */
export interface GsapFrame {
  iframe: HTMLIFrameElement;
  win: Window;
  doc: Document;
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerClass;
  ScrollSmoother: typeof ScrollSmootherClass;
  Observer: typeof ObserverClass;
  ScrollToPlugin: typeof ScrollToClass;
}

export interface FrameOptions {
  plugins: readonly FramePlugin[];
  /** CSS for the iframe document. Not scoped: the iframe is the example's own page. */
  css?: string;
  signal: AbortSignal;
}

/** base.css tokens copied into the iframe so its page matches the gallery's theme. */
const TOKENS = ['--bg', '--bg-surface', '--bg-raised', '--fg-1', '--fg-2', '--fg-3', '--accent',
  '--accent-text', '--border', '--green', '--red', '--orange', '--cyan', '--purple', '--font-mono',
  '--space-1', '--space-2', '--space-3', '--space-4', '--space-5', '--space-6'];

function themeCss(): string {
  const root = getComputedStyle(document.documentElement);
  const vars = TOKENS.map((t) => `${t}:${root.getPropertyValue(t).trim()}`).filter((d) => !d.endsWith(':'));
  return `:root{${vars.join(';')};color-scheme:dark}
body{margin:0;background:var(--bg,#111);color:var(--fg-1,#eee);font:14px/1.5 system-ui,sans-serif}`;
}

function loadScript(doc: Document, url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = doc.createElement('script');
    s.src = new URL(url, document.baseURI).href;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`could not load ${url}`));
    doc.head.append(s);
  });
}

/**
 * Appends an iframe to `parent`, loads GSAP and the named plugins into it and registers
 * them. Size the iframe with CSS; removing it stops everything running inside.
 */
export async function gsapFrame(parent: HTMLElement, opts: FrameOptions): Promise<GsapFrame> {
  const iframe = document.createElement('iframe');
  iframe.className = 'gsap-frame';
  iframe.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>${themeCss()}\n${opts.css ?? ''}</style></head><body></body></html>`;
  const loaded = new Promise<void>((resolve) => iframe.addEventListener('load', () => resolve(), { once: true }));
  parent.append(iframe);
  try {
    return await boot(iframe, loaded, opts);
  } catch (err) {
    iframe.remove();
    throw err;
  }
}

async function boot(iframe: HTMLIFrameElement, loaded: Promise<void>, opts: FrameOptions): Promise<GsapFrame> {
  await loaded;
  opts.signal.throwIfAborted();
  const win = iframe.contentWindow;
  const doc = iframe.contentDocument;
  if (!win || !doc) throw new Error('iframe has no document');
  await loadScript(doc, gsapUrl);
  for (const name of opts.plugins) await loadScript(doc, SCRIPTS[name]);
  opts.signal.throwIfAborted();

  const g = win as unknown as Record<string, unknown>;
  const gsap = g.gsap as typeof Gsap;
  gsap.registerPlugin(...opts.plugins.map((name) => g[name] as object));
  return {
    iframe,
    win,
    doc,
    gsap,
    ScrollTrigger: g.ScrollTrigger as typeof ScrollTriggerClass,
    ScrollSmoother: g.ScrollSmoother as typeof ScrollSmootherClass,
    Observer: g.Observer as typeof ObserverClass,
    ScrollToPlugin: g.ScrollToPlugin as typeof ScrollToClass,
  };
}
