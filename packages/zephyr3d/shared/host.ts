// Gallery side of the frame: builds the iframe, imports the example, tears it down
import type { MountContext } from '@/types.ts';
import { controlBar } from './controls.ts';
import type { FrameEntry, FrameOptions, Stage } from './frame.ts';
import frameUrl from './frame.html?url';
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
 * Application.ready() focuses its canvas. Inside a card's iframe that would pull focus
 * from the gallery and scroll it, so cards drop focus() and the full view keeps the page
 * where it is.
 */
function tameFocus(win: Window, preview: boolean): void {
  const proto = (win as unknown as { HTMLElement: typeof HTMLElement }).HTMLElement.prototype;
  const focus = proto.focus;
  proto.focus = preview
    ? function noFocus(): void {}
    : function focusInPlace(this: HTMLElement, opts?: FocusOptions): void {
        focus.call(this, { ...opts, preventScroll: true });
      };
}

export async function mountFrame(el: HTMLElement, ctx: MountContext, moduleUrl: string, opts: FrameOptions): Promise<() => void> {
  const { preview, signal } = ctx;
  const bar = preview ? null : controlBar(el);
  const view = document.createElement('div');
  view.className = preview ? 'z3s-view z3s-card' : 'z3s-view';
  if (!preview && opts.height) view.style.height = `${opts.height}px`;
  const iframe = document.createElement('iframe');
  iframe.title = 'Zephyr3D example';
  // A real URL, not srcdoc: the engine's default HttpFS resolves './' against location.href,
  // which throws for about:srcdoc. The engine fetches nothing until an example asks it to.
  iframe.src = frameUrl;
  const captionEl = document.createElement('div');
  captionEl.className = 'z3s-caption';
  view.append(iframe, captionEl);
  el.append(view);

  let readoutEl: HTMLPreElement | null = null;
  let entry: FrameEntry | null = null;
  let failed = false;
  let done = false;
  const owned: (() => void)[] = [];

  const teardown = (): void => {
    if (done) return;
    done = true;
    for (const fn of owned.splice(0)) {
      try {
        fn();
      } catch (err) {
        console.error('zephyr3d stage: a teardown failed', err);
      }
    }
    try {
      entry?.stopApp();
    } catch (err) {
      console.error('zephyr3d stage: stopping the app failed', err);
    }
    // The context dies with the iframe's document eventually; losing it now frees it at once.
    const canvas = iframe.contentDocument?.querySelector<HTMLCanvasElement>('canvas');
    if (canvas && canvas.width > 0) {
      (canvas.getContext('webgl2') as WebGL2RenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext();
    }
    iframe.remove();
    view.remove();
    bar?.remove();
    readoutEl?.remove();
  };

  /** An error after start: stop the frame loop, so a per-frame throw cannot flood the console. */
  const fail = (err: unknown): void => {
    if (failed || done) return;
    failed = true;
    try {
      entry?.stopApp();
    } catch {
      // The app may be what failed; the message below is what matters.
    }
    const box = document.createElement('div');
    box.className = 'z3s-error';
    box.textContent = `Zephyr3D stopped: ${err instanceof Error ? err.message : String(err)}`;
    view.append(box);
    console.error('zephyr3d example failed', err);
  };

  try {
    await race(new Promise<void>((resolve) => iframe.addEventListener('load', () => resolve(), { once: true })), signal);
    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;
    const canvas = doc?.querySelector<HTMLCanvasElement>('canvas');
    if (!win || !doc || !canvas) throw new Error('the example iframe has no document');
    tameFocus(win, preview);
    Object.assign(win, opts.globals);
    win.addEventListener('error', (e) => fail(e.error ?? e.message));
    win.addEventListener('unhandledrejection', (e) => fail(e.reason));

    const started = new Promise<FrameEntry>((resolve, reject) => {
      win.__zephyrHost = { start: resolve };
      const script = doc.createElement('script');
      script.type = 'module';
      script.textContent = `import(${JSON.stringify(moduleUrl)}).catch((e) => { window.__zephyrImportError = e; dispatchEvent(new Event('zephyr-import-error')); });`;
      win.addEventListener('zephyr-import-error', () => reject((win as unknown as { __zephyrImportError: unknown }).__zephyrImportError), { once: true });
      doc.head.append(script);
    });
    entry = await race(started, signal);

    const stage: Stage = {
      canvas,
      preview,
      pixelRatio: preview ? 1 : Math.min(window.devicePixelRatio || 1, 2),
      bar,
      readout() {
        if (preview) return null;
        if (!readoutEl) {
          readoutEl = document.createElement('pre');
          readoutEl.className = 'z3s-readout';
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
    await race(Promise.resolve(entry.run(stage)), signal);
  } catch (err) {
    teardown();
    throw err;
  }
  signal.addEventListener('abort', teardown, { once: true });
  return teardown;
}
