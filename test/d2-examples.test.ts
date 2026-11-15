// @vitest-environment happy-dom
// Mounts every D2 example against the real D2.js (its Node build), so a D2 slip fails here
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { Cleanup, Mount } from '../src/types.ts';

/**
 * The browser build starts its worker from a blob URL, which Node cannot run, so the
 * page's engine is swapped for one instance of the Node build. Every compile and render an
 * example makes goes through it, and each failure is kept with the source it came from.
 * The playground is swapped for one that compiles and renders every variant, not just the
 * first. A source holding the comment "(deliberate error)" is allowed to fail.
 */
interface Failure {
  call: string;
  code: string;
  message: string;
}
const failures: Failure[] = [];
let calls = 0;
/** Set when a deliberate error failed: the example then shows it in its caption on purpose. */
let deliberateFailed = false;
const DELIBERATE = '(deliberate error)';

vi.mock('../packages/d2/shared/engine.ts', async () => {
  // D2.js's Node build picks its message path by `typeof window`, which happy-dom defines,
  // so it runs inside a plain worker thread, where window is undefined.
  const { Worker } = await import('node:worker_threads');
  const path = join(import.meta.dirname, '../node_modules/@terrastruct/d2/dist/node-esm/index.js');
  const worker = new Worker(
    `const { parentPort, workerData } = require('node:worker_threads');
    import(workerData).then(({ D2 }) => {
      const d2 = new D2();
      parentPort.on('message', async ({ id, method, args }) => {
        try {
          parentPort.postMessage({ id, value: await d2[method](...args) });
        } catch (err) {
          parentPort.postMessage({ id, error: err instanceof Error ? err.message : String(err) });
        }
      });
      parentPort.postMessage({ id: 0 });
    });`,
    { eval: true, workerData: path },
  );
  worker.unref();
  const waiting = new Map<number, { resolve(v: unknown): void; reject(e: Error): void }>();
  let next = 1;
  worker.on('message', ({ id, value, error }: { id: number; value?: unknown; error?: string }) => {
    const w = waiting.get(id);
    waiting.delete(id);
    if (error !== undefined) w?.reject(new Error(error));
    else w?.resolve(value);
  });
  const call = (method: string, ...args: unknown[]): Promise<unknown> =>
    new Promise((resolve, reject) => {
      const id = next++;
      waiting.set(id, { resolve, reject });
      worker.postMessage({ id, method, args });
    });
  const ready = new Promise<void>((resolve) => waiting.set(0, { resolve: () => resolve(), reject: () => undefined }));

  const sources = new Map<string, string>();
  let tail: Promise<unknown> = ready;
  const STOPPED = new Error('stopped');
  const queue = <T,>(name: string, code: string, run: () => Promise<T>): Promise<T> => {
    calls++;
    const result = tail.then(run).catch((err: unknown) => {
      if (code.includes(DELIBERATE)) deliberateFailed = true;
      else failures.push({ call: name, code, message: err instanceof Error ? err.message.split('\n')[0]! : String(err) });
      throw err;
    });
    tail = result.catch(() => undefined);
    return result;
  };
  const codeOf = (input: unknown): string =>
    typeof input === 'string' ? input : Object.values((input as { fs: Record<string, string> }).fs).join('\n');
  // A diagram crosses the thread boundary as a copy, so its source is found by its JSON.
  const api = {
    compile: (input: unknown, options?: unknown) =>
      queue('compile', codeOf(input), async () => {
        const result = (await (typeof input === 'string' ? call('compile', input, options) : call('compile', input))) as {
          diagram: object;
        };
        sources.set(JSON.stringify(result.diagram), codeOf(input));
        return result;
      }),
    render: (diagram: object, options?: unknown) =>
      queue('render', sources.get(JSON.stringify(diagram)) ?? '', () => call('render', diagram, options)),
    encode: (s: string) => queue('encode', s, () => call('encode', s)),
    decode: (s: string) => queue('decode', s, () => call('decode', s)),
    version: () => queue('version', '', () => call('version')),
    jsVersion: () => queue('jsVersion', '', () => call('jsVersion')),
  };
  return {
    STOPPED,
    loadD2: async () => {
      await ready;
      return api;
    },
    /** Settles once every call made so far has. */
    idle: () => tail,
    stop: () => worker.terminate(),
  };
});

vi.mock('../packages/d2/shared/playground.ts', async (importActual) => {
  const real = await importActual<typeof import('../packages/d2/shared/playground.ts')>();
  type Opts = Parameters<typeof real.playground>[1];
  return {
    ...real,
    playground: (stage: Parameters<typeof real.playground>[0], opts: Opts) => {
      for (const v of opts.variants) {
        void real.compileAndRender(stage, v.code, { ...opts.options, ...v.options }).then(
          ({ svg }) => stage.show(svg),
          () => undefined,
        );
      }
    },
  };
});

// happy-dom's XML parser rejects the CDATA block in D2's <style>, which browsers accept, so
// the SVG is checked for its viewBox and stood in for by an empty svg carrying it.
vi.mock('../packages/d2/shared/svg.ts', async (importActual) => {
  const real = await importActual<typeof import('../packages/d2/shared/svg.ts')>();
  return {
    ...real,
    putSvg: (box: HTMLElement, text: string) => {
      const viewBox = /<svg[^>]*viewBox="([^"]+)"/.exec(text)?.[1];
      if (!viewBox) throw new Error(`no svg with a viewBox in D2's output: ${text.slice(0, 80)}`);
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', viewBox);
      box.replaceChildren(svg);
      return svg;
    },
  };
});

// happy-dom has no Option constructor; the stage builds <select> menus with it.
globalThis.Option ??= function Option(text = '', value?: string) {
  const o = document.createElement('option');
  o.text = text;
  o.value = value ?? text;
  return o;
} as unknown as typeof Option;

const EXAMPLES = join(import.meta.dirname, '../packages/d2/examples');
const slugs = readdirSync(EXAMPLES, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const idle = async (): Promise<void> => {
  const engine = (await import('../packages/d2/shared/engine.ts')) as unknown as { idle(): Promise<unknown> };
  // Calls can queue more calls when they settle (compile, then render), so wait until a
  // pass adds none.
  for (let before = -1; before !== calls; ) {
    before = calls;
    await engine.idle();
    await new Promise((r) => setTimeout(r, 0));
  }
};

beforeAll(async () => {
  const engine = await import('../packages/d2/shared/engine.ts');
  await engine.loadD2(new AbortController().signal);
}, 60_000);

describe.each(slugs)('d2/%s', (slug) => {
  afterAll(() => {
    document.body.replaceChildren();
  });

  it('compiles and renders every source it shows', async () => {
    const { default: mount } = (await import(join(EXAMPLES, slug, 'main.ts'))) as { default: Mount };
    failures.length = 0;
    deliberateFailed = false;
    const before = calls;
    const el = document.createElement('div');
    document.body.append(el);
    const controller = new AbortController();
    const cleanup: Cleanup | void = await mount(el, { preview: false, signal: controller.signal });
    await idle();
    const bad = el.querySelector('[data-tone="bad"]')?.textContent ?? '';
    controller.abort();
    cleanup?.();
    expect(calls - before, 'the example made no D2 call').toBeGreaterThan(0);
    expect(failures.map((f) => `${f.call}: ${f.message}\n${f.code}`)).toEqual([]);
    if (!deliberateFailed) expect(bad, 'the caption reports an error').toBe('');
  }, 60_000);
});
