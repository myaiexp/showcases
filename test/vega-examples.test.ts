// @vitest-environment happy-dom
// Mounts every Vega example, card and full view, so a spec Vega rejects or warns about fails here
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import type { Cleanup, Mount } from '../src/types.ts';

/**
 * happy-dom has no canvas, so getContext('2d') returns a context whose drawing calls do
 * nothing and whose measureText guesses 6px a character. Vega's parse, dataflow, scales,
 * layout and scenegraph all run for real, so a bad expression, an unknown transform or a
 * missing data file throws or logs here. Vega's own warnings (stage.render sets logLevel
 * Warn) count as failures too: "Infinite extent", "Unrecognized scale" and the like are
 * specs that draw nothing in a browser.
 */
function fakeContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const state: Record<string | symbol, unknown> = { canvas, font: '10px sans-serif' };
  return new Proxy(state, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === 'measureText') return (s: string) => ({ width: String(s).length * 6 });
      if (key === 'getImageData' || key === 'createImageData') {
        return (_x: number, _y: number, w = 1, h = 1) => ({ width: w, height: h, data: new Uint8ClampedArray(w * h * 4) });
      }
      if (key === 'isPointInPath' || key === 'isPointInStroke') return () => false;
      if (key === 'getLineDash') return () => [];
      if (key.toString().startsWith('create')) return () => ({ addColorStop() {} });
      return () => {};
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  }) as unknown as CanvasRenderingContext2D;
}

const contexts = new WeakMap<HTMLCanvasElement, CanvasRenderingContext2D>();
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, kind: string) {
    if (kind !== '2d') return null;
    let ctx = contexts.get(this);
    if (!ctx) contexts.set(this, (ctx = fakeContext(this)));
    return ctx;
  } as typeof HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,';
  globalThis.Option ??= function Option(text = '', value?: string) {
    const o = document.createElement('option');
    o.text = text;
    o.value = value ?? text;
    return o;
  } as unknown as typeof Option;
});

const dir = join(import.meta.dirname, '..', 'packages', 'vega', 'examples');
const slugs = readdirSync(dir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const problems: string[] = [];
afterEach(() => {
  problems.length = 0;
  vi.restoreAllMocks();
});

describe.each(slugs)('vega/%s', (slug) => {
  it('mounts a card and a full view, runs them a second, unmounts cleanly', async () => {
    const record = (...args: unknown[]): void => {
      problems.push(args.map((a) => (a instanceof Error ? a.message : String(a))).join(' '));
    };
    vi.spyOn(console, 'error').mockImplementation(record);
    vi.spyOn(console, 'warn').mockImplementation(record);
    const mod = (await import(`../packages/vega/examples/${slug}/main.ts`)) as { default: Mount };
    // Both modes at once, so the file stays fast with hundreds of examples.
    const runs = [true, false].map(async (preview) => {
      const el = document.createElement('div');
      document.body.append(el);
      const ac = new AbortController();
      const cleanup: Cleanup = await mod.default(el, { preview, signal: ac.signal });
      return { el, ac, cleanup };
    });
    const mounted = await Promise.all(runs);
    // Let loaders, timers and the first card-loop steps run.
    await new Promise((r) => setTimeout(r, 1000));
    for (const { el, ac, cleanup } of mounted) {
      ac.abort();
      cleanup();
      el.remove();
    }
    expect(problems, problems.join('\n')).toEqual([]);
  }, 20_000);
});
