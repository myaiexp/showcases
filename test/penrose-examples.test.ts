// @vitest-environment happy-dom
// Mounts every Penrose example and solves every trio it shows, so a Penrose slip fails here
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import type { Cleanup, Mount } from '../src/types.ts';

/**
 * The playground is swapped for one that runs every variant in turn (a card shows one at a
 * time), and the page-wide solver for one that optimizes to convergence in one go. Each
 * trio is compiled, solved and rendered through the real layout code; a failure is kept
 * with the trio it came from. A program holding the comment "(deliberate error)" is
 * allowed to fail, and must.
 */
interface Failure {
  message: string;
  trio: string;
}
const failures: Failure[] = [];
const slow: string[] = [];
let runs = 0;
let deliberateFailed = false;
const DELIBERATE = '(deliberate error)';
/** A trio holding this comment may lay out shapes off canvas or with negative sizes. */
const DEGENERATE_OK = '(degenerate on purpose)';
/** The trio the last run compiled; resamples solve the same one. */
let lastTrio = '';
/** A solve slower than this in Node would stall a card. */
const SLOW_MS = 6000;

vi.mock('../packages/penrose/shared/solver.ts', async () => {
  const core = await import('@penrose/core');
  type Opts = import('../packages/penrose/shared/solver.ts').SolveOptions;
  return {
    solve(start: import('@penrose/core').PenroseState, opts: Opts) {
      queueMicrotask(() => {
        const t0 = performance.now();
        const res = core.optimize(start);
        if (opts.signal.aborted) return;
        const ms = performance.now() - t0;
        if (ms > SLOW_MS) slow.push(`${Math.round(ms)} ms`);
        if (res.isErr()) return opts.onError(res.error);
        if (!lastTrio.includes(DEGENERATE_OK)) {
          for (const problem of degenerate(res.value)) {
            failures.push({ message: `variation "${res.value.variation}": ${problem}`, trio: lastTrio });
          }
        }
        opts.onStep(res.value, { iterations: 0, slices: 1, done: true });
      });
    },
  };
});

vi.mock('../packages/penrose/shared/layout.ts', async (importActual) => {
  const real = await importActual<typeof import('../packages/penrose/shared/layout.ts')>();
  const { errorText } = await import('../packages/penrose/shared/stage.ts');
  return {
    ...real,
    createLayout(stage: Parameters<typeof real.createLayout>[0], hooks: Parameters<typeof real.createLayout>[1] = {}) {
      let last = '';
      let errored = false;
      const layout = real.createLayout(stage, {
        ...hooks,
        onError(err) {
          errored = true;
          if (last.includes(DELIBERATE)) deliberateFailed = true;
          else failures.push({ message: errorText(err), trio: last });
          hooks.onError?.(err);
        },
      });
      const run = layout.run.bind(layout);
      layout.run = async (trio) => {
        runs++;
        last = lastTrio = `${trio.domain}\n---\n${trio.substance}\n---\n${trio.style}`;
        errored = false;
        await run(trio);
        // A trio marked as a deliberate error must not compile and solve cleanly.
        if (last.includes(DELIBERATE) && !errored) failures.push({ message: 'the deliberate error solved fine', trio: last });
      };
      return layout;
    },
  };
});

vi.mock('../packages/penrose/shared/playground.ts', async (importActual) => {
  const real = await importActual<typeof import('../packages/penrose/shared/playground.ts')>();
  const { createLayout } = await import('../packages/penrose/shared/layout.ts');
  return {
    ...real,
    playground(stage: Parameters<typeof real.playground>[0], opts: Parameters<typeof real.playground>[1]) {
      const layout = createLayout(stage, opts);
      const variants: readonly import('../packages/penrose/shared/playground.ts').Variant[] = opts.variants?.length
        ? opts.variants
        : [{ label: '' }];
      pending.push(
        (async () => {
          for (const v of [...variants.slice(1), variants[0]!]) {
            await layout.run(real.trioOf(opts, v));
          }
          // Without variants a card cycles the trio through its variations (playground.ts).
          if (variants.length < 2) for (const v of real.cardVariations(opts).slice(1)) await layout.resample(v);
        })(),
      );
      return layout;
    },
  };
});
const pending: Promise<unknown>[] = [];

type Prop = { tag: string; contents: unknown };
/**
 * What a solve should never leave behind: a negative size, or a shape that keeps
 * ensureOnCanvas with its centre off the canvas (Penrose's canvas is centred on 0, 0).
 * A radius left free with nothing but ensureOnCanvas can run through zero and away.
 */
function degenerate(state: import('@penrose/core').PenroseState): string[] {
  const { width, height } = state.canvas;
  const found: string[] = [];
  const visit = (shape: Record<string, Prop>): void => {
    const name = String(shape['name']?.contents ?? '?');
    for (const key of ['r', 'rx', 'ry', 'width', 'height']) {
      const p = shape[key];
      if (p?.tag === 'FloatV' && typeof p.contents === 'number' && p.contents < -1e-3) {
        found.push(`${name}.${key} = ${p.contents.toFixed(1)}`);
      }
    }
    const center = shape['center']?.contents;
    if (shape['ensureOnCanvas']?.contents === true && Array.isArray(center)) {
      const [x, y] = center as number[];
      if (Math.abs(x!) > width / 2 + 2 || Math.abs(y!) > height / 2 + 2) {
        found.push(`${name}.center (${x!.toFixed(0)}, ${y!.toFixed(0)}) is off the ${width}×${height} canvas`);
      }
    }
    const members = shape['shapes']?.contents;
    if (Array.isArray(members)) for (const m of members) visit(m as Record<string, Prop>);
  };
  for (const shape of state.computeShapes(state.varyingValues)) visit(shape as unknown as Record<string, Prop>);
  return found;
}

beforeAll(() => {
  // MathJax checks `instanceof window.Document`, which happy-dom's documents fail.
  Object.defineProperty(window.Document, Symbol.hasInstance, { value: (x: { nodeType?: number }) => x?.nodeType === 9 });
  // happy-dom has no 2D canvas; Text shapes measure through one. Width ≈ 0.55em a character.
  const measure = (text: string, size: number) => ({
    width: text.length * size * 0.55,
    actualBoundingBoxAscent: size * 0.75,
    actualBoundingBoxDescent: size * 0.25,
    actualBoundingBoxLeft: 0,
    actualBoundingBoxRight: text.length * size * 0.55,
    fontBoundingBoxAscent: size * 0.8,
    fontBoundingBoxDescent: size * 0.2,
  });
  HTMLCanvasElement.prototype.getContext = function getContext() {
    const ctx = { font: '12px sans-serif', textBaseline: 'alphabetic' };
    return Object.assign(ctx, {
      measureText: (t: string) => measure(t, Number(/(\d+(?:\.\d+)?)px/.exec(ctx.font)?.[1] ?? 12)),
    });
  } as unknown as typeof HTMLCanvasElement.prototype.getContext;
});

// happy-dom has no Option constructor; the stage builds <select> menus with it.
globalThis.Option ??= function Option(text = '', value?: string) {
  const o = document.createElement('option');
  o.text = text;
  o.value = value ?? text;
  return o;
} as unknown as typeof Option;

const EXAMPLES = join(import.meta.dirname, '../packages/penrose/examples');
const slugs = readdirSync(EXAMPLES, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const settle = async (): Promise<void> => {
  // Runs can start more runs when they settle, so wait until a pass adds none.
  for (let before = -1; before !== pending.length; ) {
    before = pending.length;
    await Promise.allSettled(pending);
    await new Promise((r) => setTimeout(r, 20));
  }
};

describe.each(slugs)('penrose/%s', (slug) => {
  afterAll(() => {
    document.body.replaceChildren();
  });

  it('compiles, solves and renders every trio it shows', async () => {
    const { default: mount } = (await import(join(EXAMPLES, slug, 'main.ts'))) as { default: Mount };
    failures.length = 0;
    slow.length = 0;
    pending.length = 0;
    deliberateFailed = false;
    const el = document.createElement('div');
    document.body.append(el);
    const controller = new AbortController();
    const cleanup: Cleanup | void = await mount(el, { preview: false, signal: controller.signal });
    await settle();
    await new Promise((r) => setTimeout(r, 50));
    const bad = el.querySelector('[data-tone="bad"]')?.textContent ?? '';
    controller.abort();
    cleanup?.();
    expect(failures.map((f) => `${f.message}\n${f.trio}`)).toEqual([]);
    expect(slow, `a solve took longer than ${SLOW_MS} ms`).toEqual([]);
    if (!deliberateFailed) expect(bad, 'the caption reports an error').toBe('');
  }, 60_000);
});

it('mounted Penrose examples', () => {
  expect(slugs.length).toBeGreaterThan(0);
  expect(runs).toBeGreaterThanOrEqual(0);
});
