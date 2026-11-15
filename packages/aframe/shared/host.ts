// Gallery side of the frame: builds the iframe, loads A-Frame and the scene
import type { MountContext } from '@/types.ts';
import { controlBar } from './controls.ts';
import { cdnFonts } from './fonts.ts';
import type { FrameEntry, Stage } from './frame.ts';
import frameUrl from './frame.html?url';
import { CDN_ROOT, guardThree, guardWindow, rewriter } from './net.ts';
import type { Scene } from './types.ts';
import './stage.css';

function aborted(): DOMException {
  return new DOMException('unmounted', 'AbortError');
}

/** Waits for p, or rejects as soon as the signal aborts. */
function race<T>(p: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(aborted());
  return new Promise<T>((resolve, reject) => {
    const onAbort = (): void => reject(aborted());
    signal.addEventListener('abort', onAbort, { once: true });
    p.then(resolve, reject).finally(() => signal.removeEventListener('abort', onAbort));
  });
}

/**
 * Card defaults: no Enter VR button, loading overlay or iOS permission dialog in a 200px
 * card, and the 'f' key never enters VR. An example's own value wins.
 */
const CARD_ATTRS: Record<string, string> = {
  'xr-mode-ui': 'enabled: false',
  'loading-screen': 'enabled: false',
  'device-orientation-permission-ui': 'enabled: false',
  'keyboard-shortcuts': 'enterVR: false',
};

/**
 * Ctrl+Alt+I opens A-Frame's inspector, which loads its script from unpkg.com
 * (components/scene/inspector.js). Blocked before A-Frame's own listener sees it.
 */
function blockInspector(win: Window): void {
  win.addEventListener(
    'keydown',
    (e) => {
      if (e.keyCode === 73 && ((e.ctrlKey && e.altKey) || e.getModifierState('AltGraph'))) e.stopImmediatePropagation();
    },
    { capture: true },
  );
}

/** Focus inside a card's iframe would pull focus from the gallery and scroll it. */
function tameFocus(win: Window, preview: boolean): void {
  const proto = (win as unknown as { HTMLElement: typeof HTMLElement }).HTMLElement.prototype;
  const focus = proto.focus;
  proto.focus = preview
    ? function noFocus(): void {}
    : function focusInPlace(this: HTMLElement, opts?: FocusOptions): void {
        focus.call(this, { ...opts, preventScroll: true });
      };
}

/** Parses the example's markup in the iframe's document and attaches it to the body. */
function attachMarkup(doc: Document, markup: string, preview: boolean): Scene {
  const win = doc.defaultView as Window & { DOMParser: typeof DOMParser };
  const parsed = new win.DOMParser().parseFromString(markup, 'text/html');
  const scene = parsed.querySelector('a-scene');
  if (!scene) throw new Error('the example markup has no <a-scene>');
  if (preview) for (const [name, value] of Object.entries(CARD_ATTRS)) if (!scene.hasAttribute(name)) scene.setAttribute(name, value);
  // Moving the nodes adopts them into the iframe's document, where A-Frame's elements upgrade.
  doc.body.append(...Array.from(parsed.body.childNodes));
  return scene as unknown as Scene;
}

function whenLoaded(scene: Scene): Promise<void> {
  if (scene.hasLoaded) return Promise.resolve();
  return new Promise((resolve) => scene.addEventListener('loaded', () => resolve(), { once: true }));
}

export async function mountFrame(el: HTMLElement, ctx: MountContext, moduleUrl: string, height: number | undefined): Promise<() => void> {
  const { preview, signal } = ctx;
  const bar = preview ? null : controlBar(el);
  const view = document.createElement('div');
  view.className = preview ? 'afs-view afs-card' : 'afs-view';
  if (!preview && height) view.style.height = `${height}px`;
  const iframe = document.createElement('iframe');
  iframe.title = 'A-Frame example';
  iframe.src = frameUrl;
  // Enter VR / AR from the full view on a headset browser.
  iframe.allow = 'xr-spatial-tracking; fullscreen';
  const captionEl = document.createElement('div');
  captionEl.className = 'afs-caption';
  view.append(iframe, captionEl);
  el.append(view);

  let readoutEl: HTMLPreElement | null = null;
  let scene: Scene | null = null;
  let failed = false;
  let done = false;
  const owned: (() => void)[] = [];

  const stopScene = (): void => {
    scene?.renderer?.setAnimationLoop(null);
    void scene?.audioListener?.context.close().catch(() => {});
  };

  const teardown = (): void => {
    if (done) return;
    done = true;
    for (const fn of owned.splice(0)) {
      try {
        fn();
      } catch (err) {
        console.error('aframe stage: a teardown failed', err);
      }
    }
    try {
      stopScene();
      // The context dies with the iframe's document eventually; losing it now frees it at once.
      scene?.renderer?.forceContextLoss();
    } catch (err) {
      console.error('aframe stage: stopping the scene failed', err);
    }
    iframe.remove();
    view.remove();
    bar?.remove();
    readoutEl?.remove();
  };

  /** An error after start: stop the render loop, so a per-frame throw cannot flood the console. */
  const fail = (err: unknown): void => {
    if (failed || done) return;
    failed = true;
    try {
      stopScene();
    } catch {
      // The scene may be what failed; the message below is what matters.
    }
    const box = document.createElement('div');
    box.className = 'afs-error';
    box.textContent = `A-Frame stopped: ${err instanceof Error ? err.message : String(err)}`;
    view.append(box);
    console.error('aframe example failed', err);
  };

  try {
    const [, files] = await race(
      Promise.all([new Promise<void>((resolve) => iframe.addEventListener('load', () => resolve(), { once: true })), cdnFonts()]),
      signal,
    );
    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;
    if (!win || !doc) throw new Error('the example iframe has no document');
    const rewrite = rewriter(win, files);
    // Read once by A-Frame when it loads (constants/index.js).
    Object.assign(win, { AFRAME_CDN_ROOT: CDN_ROOT, devicePixelRatio: preview ? 1 : Math.min(window.devicePixelRatio || 1, 2) });
    guardWindow(win, rewrite);
    blockInspector(win);
    tameFocus(win, preview);
    win.addEventListener('error', (e) => fail(e.error ?? e.message));
    win.addEventListener('unhandledrejection', (e) => fail(e.reason));

    const started = new Promise<FrameEntry>((resolve, reject) => {
      win.__aframeHost = { start: resolve };
      const script = doc.createElement('script');
      script.type = 'module';
      script.textContent = `import(${JSON.stringify(moduleUrl)}).catch((e) => { window.__aframeImportError = e; dispatchEvent(new Event('aframe-import-error')); });`;
      win.addEventListener('aframe-import-error', () => reject((win as unknown as { __aframeImportError: unknown }).__aframeImportError), { once: true });
      doc.head.append(script);
    });
    const { example, boot } = await race(started, signal);
    const AFRAME = await race(boot(), signal);
    guardThree(AFRAME.THREE.DefaultLoadingManager, rewrite);
    await race(Promise.resolve(example.setup?.(AFRAME, { preview })), signal);
    const markup = typeof example.scene === 'function' ? example.scene({ preview }) : example.scene;
    const sceneEl = attachMarkup(doc, markup, preview);
    scene = sceneEl;
    await race(whenLoaded(sceneEl), signal);

    const stage: Stage = {
      preview,
      scene: sceneEl,
      AFRAME,
      bar,
      readout() {
        if (preview) return null;
        if (!readoutEl) {
          readoutEl = document.createElement('pre');
          readoutEl.className = 'afs-readout';
          view.after(readoutEl);
        }
        return readoutEl;
      },
      caption(text) {
        captionEl.textContent = text;
      },
      every(ms, fn) {
        let i = 0;
        // The iframe's own timer, so it stops when the iframe goes.
        const timer = win.setInterval(() => {
          if (done || failed) return;
          try {
            fn(++i);
          } catch (err) {
            fail(err);
          }
        }, ms);
        owned.push(() => win.clearInterval(timer));
      },
      own: (fn) => owned.push(fn),
    };
    await race(Promise.resolve(example.run?.(stage)), signal);
  } catch (err) {
    teardown();
    throw err;
  }
  signal.addEventListener('abort', teardown, { once: true });
  return teardown;
}
