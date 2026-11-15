// Keeps an example's iframe offline: a pretend A-Frame CDN, other remote URLs refused

/**
 * A-Frame loads its text fonts, controller and hand models from `AFRAME_CDN_ROOT`
 * (constants/index.js), read once when the library loads. The frame points it at this
 * host, which does not exist, and rewrites requests under it to the blob: URLs in `files`
 * (fonts.ts builds the fonts). Requests leave through three paths, and each is patched in
 * the iframe's own realm, so the gallery page is untouched:
 * - XMLHttpRequest.open: load-bmfont (text fonts) and A-Frame's src-loader;
 * - fetch: three's FileLoader (glTF, OBJ, a-assets items);
 * - three's DefaultLoadingManager URL modifier: ImageLoader and TextureLoader, which set
 *   `img.src` directly (installed after A-Frame loads, see `guardThree`).
 * Anything else that would reach another origin throws, so a stray URL fails loudly in the
 * example instead of becoming a request from a card.
 */
export const CDN_ROOT = 'https://cdn.aframe.example/';

export class OfflineError extends Error {
  constructor(url: string) {
    super(`blocked a network request to ${url} (examples run offline)`);
    this.name = 'OfflineError';
  }
}

type Rewrite = (url: string) => string;

/** Maps a URL to the one actually loaded: CDN files to blobs, local URLs as they are. */
export function rewriter(win: Window, files: ReadonlyMap<string, string>): Rewrite {
  return (raw) => {
    let url: URL;
    try {
      url = new URL(raw, win.location.href);
    } catch {
      return raw;
    }
    if (url.protocol === 'blob:' || url.protocol === 'data:') return raw;
    if (url.href.startsWith(CDN_ROOT)) {
      const hit = files.get(url.href.slice(CDN_ROOT.length));
      if (hit) return hit;
      throw new OfflineError(url.href);
    }
    if (url.origin !== win.location.origin) throw new OfflineError(url.href);
    return raw;
  };
}

/** Patches the iframe's fetch and XMLHttpRequest. Call before A-Frame loads. */
export function guardWindow(win: Window, rewrite: Rewrite): void {
  const realFetch = win.fetch.bind(win);
  win.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const href = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    let target: string;
    try {
      target = rewrite(href);
    } catch (err) {
      return Promise.reject(err);
    }
    return realFetch(target === href ? input : target, init);
  };

  const xhr = (win as unknown as { XMLHttpRequest: typeof XMLHttpRequest }).XMLHttpRequest.prototype;
  const open = xhr.open as (this: XMLHttpRequest, method: string, url: string | URL, ...rest: unknown[]) => void;
  xhr.open = function guardedOpen(this: XMLHttpRequest, method: string, url: string | URL, ...rest: unknown[]) {
    open.call(this, method, rewrite(String(url)), ...rest);
  } as typeof xhr.open;
}

/** three's loaders resolve every URL through the default manager; ImageLoader then sets img.src. */
export function guardThree(manager: { setURLModifier(fn: (url: string) => string): unknown }, rewrite: Rewrite): void {
  manager.setURLModifier(rewrite);
}
