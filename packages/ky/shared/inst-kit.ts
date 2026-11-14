// Shared setup for the JSON, fetch and instance examples: scene, ledger, runner
import type { MountContext } from '@/types.ts';
import { button } from './controls.ts';
import { errorName, panel, type Tone } from './panels.ts';
import { demo, serial, type Demo, type DemoOptions } from './req-kit.ts';
import type { Seen, Server } from './server.ts';
import type { Stage } from './stage.ts';
import { pathOf } from './wire.ts';
import './inst.css';

/** A pretend server and Ky wired to it, with quick trips (120 ms) so cards stay lively. */
export function scene(el: HTMLElement, ctx: MountContext, opts: DemoOptions = {}): Demo {
  return demo(el, ctx, { ...opts, server: { latency: 120, delay: 80, ...opts.server } });
}

/**
 * Cards loop `run` with a pause; the full view gets a button and runs once at once.
 * Runs never overlap. Returns a function that queues one more run.
 */
export function runner(stage: Stage, run: () => Promise<void>, o: { pause?: number; label?: string } = {}): () => void {
  if (stage.preview) {
    stage.play(async (wait) => {
      await run();
      await wait(o.pause ?? 2200);
    });
    return () => undefined;
  }
  const queue = serial(stage);
  button(stage.bar!, o.label ?? 'Send again', () => queue(run));
  queue(run);
  return () => queue(run);
}

/** What one call looked like on arrival: where it went and which headers it carried. */
export interface LedgerOptions {
  /** Header names to show for every entry, in this order. */
  headers?: readonly string[];
  /** Show the host as well as the path. */
  host?: boolean;
  /** Entries kept; older ones drop off. Default 3 in a card, 6 in the full view. */
  max?: number;
}

export function ledger(parent: HTMLElement, title: string, stage: Stage, opts: LedgerOptions = {}) {
  const p = panel(parent, title);
  const max = opts.max ?? (stage.preview ? 3 : 6);
  const line = (box: HTMLElement, cls: string, text: string, tone?: Tone): HTMLElement => {
    const d = document.createElement('div');
    d.className = cls;
    d.textContent = text;
    if (tone) d.dataset['tone'] = tone;
    box.append(d);
    return d;
  };
  const api = {
    ...p,
    clear() {
      p.body.replaceChildren();
    },
    /** `req` is the request the server saw; undefined means nothing was sent. */
    add(label: string, req: Seen | undefined, tone?: Tone) {
      const box = document.createElement('div');
      box.className = 'inst-entry';
      const where = req ? `${req.method === 'GET' ? '' : `${req.method} `}${opts.host ? req.url.host : ''}${pathOf(req.url)}` : 'nothing was sent';
      const head = line(box, 'inst-line', '', tone);
      const l = document.createElement('span');
      l.className = 'inst-label';
      l.textContent = `${label} `;
      head.append(l, where);
      if (req && opts.headers?.length) {
        const row = line(box, 'inst-line', '');
        opts.headers.forEach((name, i) => {
          const value = req.headers.get(name);
          if (i) row.append(Object.assign(document.createElement('span'), { className: 'inst-sep', textContent: ' · ' }));
          const chip = document.createElement('span');
          chip.dataset['tone'] = value === null ? 'warn' : 'ok';
          chip.textContent = `${name}: ${value ?? '—'}`;
          row.append(chip);
        });
      }
      p.body.append(box);
      while (p.body.childElementCount > max) p.body.firstElementChild?.remove();
    },
  };
  return api;
}

/** Makes a call on the server and adds what it carried to the ledger; a failure is marked, not thrown. */
export async function track(
  stage: Stage,
  server: Server,
  log: ReturnType<typeof ledger>,
  label: string,
  call: () => Promise<unknown>,
): Promise<boolean> {
  const before = server.requests.length;
  try {
    await call();
    log.add(label, server.requests[before]);
    return true;
  } catch (error) {
    if (stage.disposed) throw error;
    log.add(`${label} ✕ ${errorName(error)}`, server.requests[before], 'bad');
    return false;
  }
}

/** Compact one-line text for a value, for panels; a Date shows as Date(2026-12-24). */
export function compact(value: unknown): string {
  if (value === undefined) return 'undefined';
  const text = JSON.stringify(value, function (this: Record<string, unknown>, key: string, v: unknown) {
    // JSON turns a Date into text before the replacer sees it, so look at the original.
    const raw = this[key];
    return raw instanceof Date ? `Date(${raw.toISOString().slice(0, 10)})` : v;
  });
  return text ?? String(value);
}

/** A scene whose server answers every path, with one ledger of what each call carried. */
export function ledgerScene(el: HTMLElement, ctx: MountContext, opts: DemoOptions & { title?: string; ledger?: LedgerOptions } = {}) {
  const d = scene(el, ctx, { routes: { '*': { json: { ok: true } } }, ...opts });
  const log = ledger(d.stage.row(), opts.title ?? 'What the server received', d.stage, opts.ledger);
  /** Runs a call and adds what the server received for it to the ledger. */
  const send = (label: string, call: () => Promise<unknown>): Promise<boolean> => track(d.stage, d.server, log, label, call);
  return { ...d, log, send };
}
