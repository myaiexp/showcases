// @vitest-environment happy-dom
// Parses every diagram definition each Mermaid example renders, so a syntax slip fails here, not in a browser
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import type { Cleanup, Mount } from '../src/types.ts';

/**
 * happy-dom cannot lay out an SVG, so render(), run() and renderInto() are replaced by
 * recorders and the shared playground keeps its variants instead of drawing them. What an
 * example would have drawn is then checked with the real mermaid.parse(), which needs no
 * layout. Definitions an example builds later (on a timer or on input) are not reached;
 * the first state and every playground variant are.
 */
const seen: string[] = [];
/** Calls an example made to parse() itself: a validator checks text it may never render. */
let parsedByExample = 0;

// happy-dom has no Option constructor; examples build <select> menus with it.
globalThis.Option ??= function Option(text = '', value?: string) {
  const o = document.createElement('option');
  o.text = text;
  o.value = value ?? text;
  return o;
} as unknown as typeof Option;

vi.mock('../packages/mermaid/shared/setup.ts', async () => {
  const { default: real } = await import('mermaid');
  const record = (code: string): void => void seen.push(code);
  const mermaid = {
    ...real,
    initialize: () => {},
    parse: (...args: Parameters<typeof real.parse>) => {
      parsedByExample++;
      return real.parse(...args);
    },
    render: async (_id: string, code: string) => {
      record(code);
      return { svg: '<svg></svg>', diagramType: 'recorded', bindFunctions: undefined };
    },
    run: async (opts?: { nodes?: ArrayLike<Element>; querySelector?: string }) => {
      const nodes = opts?.nodes ?? document.querySelectorAll(opts?.querySelector ?? '.mermaid');
      for (const n of Array.from(nodes)) record(n.textContent ?? '');
    },
  };
  return {
    BASE_CONFIG: { startOnLoad: false, theme: 'dark' },
    mermaid,
    nextId: () => 'mm-test',
    renderInto: async (_target: HTMLElement, code: string) => {
      record(code);
      return { svg: null, diagramType: 'recorded' };
    },
  };
});

vi.mock('../packages/mermaid/shared/playground.ts', () => ({
  diagramBox: (el: HTMLElement) => el.appendChild(document.createElement('div')),
  statusLine: () => () => {},
  playground: (_el: HTMLElement, _ctx: unknown, opts: { variants: readonly { code: string }[] }) => {
    for (const v of opts.variants) seen.push(v.code);
    return () => {};
  },
}));

const EXAMPLES = join(import.meta.dirname, '../packages/mermaid/examples');
const slugs = readdirSync(EXAMPLES, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

describe.each(slugs)('mermaid/%s', (slug) => {
  afterAll(() => {
    document.body.replaceChildren();
  });

  it('renders only definitions that parse', async () => {
    const { default: mount } = (await import(join(EXAMPLES, slug, 'main.ts'))) as { default: Mount };
    seen.length = 0;
    parsedByExample = 0;
    for (const preview of [false, true]) {
      const el = document.createElement('div');
      document.body.append(el);
      const controller = new AbortController();
      const cleanup: Cleanup | void = await mount(el, { preview, signal: controller.signal });
      controller.abort();
      cleanup?.();
    }
    // The real mermaid is imported only now, after the mocks: the example's own imports
    // (an external diagram such as ZenUML registering itself) have already run.
    const { default: mermaid } = await import('mermaid');
    const codes = [...new Set(seen)].filter((c) => c.trim() !== '');
    expect(codes.length + parsedByExample, 'the example rendered no diagram').toBeGreaterThan(0);
    for (const code of codes) {
      await expect(mermaid.parse(code), code).resolves.toBeTruthy();
    }
  });
});
