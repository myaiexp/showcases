// JSON Schema kit: a coloured JSON viewer with change marks, a pair, an option tour
import './json-schema-view.css';
import { select } from './controls.ts';
import type { Stage } from './stage.ts';
import { codeLine } from './widgets.ts';

type Kind = 'key' | 'str' | 'num' | 'bool' | 'null' | 'punct';
interface Part {
  text: string;
  kind: Kind;
  full?: string;
}
interface Line {
  depth: number;
  key?: string;
  /** What follows the key: a value, an opening bracket, or a whole short object on one line. */
  parts: Part[];
  comma: boolean;
}

const MAX_TEXT = 42;
/** Widest one-line object; the viewer sets it before drawing (synchronous, so a shared variable is safe). */
let inlineMax = 40;

function scalar(v: unknown): Part {
  if (v === null) return { text: 'null', kind: 'null' };
  if (typeof v === 'string') {
    const q = JSON.stringify(v);
    return q.length > MAX_TEXT ? { text: `${q.slice(0, MAX_TEXT - 2)}…"`, kind: 'str', full: q } : { text: q, kind: 'str' };
  }
  if (typeof v === 'number') return { text: String(v), kind: 'num' };
  if (typeof v === 'boolean') return { text: String(v), kind: 'bool' };
  return { text: String(v), kind: 'null' };
}

const isBranch = (x: unknown): boolean => typeof x === 'object' && x !== null;
const width = (parts: Part[]): number => parts.reduce((n, p) => n + p.text.length, 0);

function inlineArray(v: unknown[]): Part[] | null {
  if (v.some(isBranch)) return null;
  const parts: Part[] = [{ text: '[', kind: 'punct' }];
  v.forEach((x, i) => parts.push(scalar(x), ...(i < v.length - 1 ? [{ text: ', ', kind: 'punct' as const }] : [])));
  parts.push({ text: ']', kind: 'punct' });
  return width(parts) <= 34 ? parts : null;
}

/** A short object of scalars (and short arrays) on one line: { type: "string", minLength: 3 }. */
function inlineObject(v: Record<string, unknown>): Part[] | null {
  const parts: Part[] = [{ text: '{ ', kind: 'punct' }];
  const entries = Object.entries(v);
  for (const [i, [k, x]] of entries.entries()) {
    const value = Array.isArray(x) ? inlineArray(x) : isBranch(x) ? null : [scalar(x)];
    if (!value) return null;
    parts.push({ text: `${k}: `, kind: 'key' }, ...value);
    if (i < entries.length - 1) parts.push({ text: ', ', kind: 'punct' });
  }
  parts.push({ text: ' }', kind: 'punct' });
  return width(parts) <= inlineMax ? parts : null;
}

/** Flattens a JSON value into display lines; short arrays and objects stay on one line. */
function flatten(v: unknown, depth: number, key: string | undefined, comma: boolean, out: Line[]): void {
  if (Array.isArray(v)) {
    const one = inlineArray(v);
    if (one) return void out.push({ depth, key, parts: one, comma });
    out.push({ depth, key, parts: [{ text: '[', kind: 'punct' }], comma: false });
    v.forEach((x, i) => flatten(x, depth + 1, undefined, i < v.length - 1, out));
    out.push({ depth, parts: [{ text: ']', kind: 'punct' }], comma });
  } else if (isBranch(v)) {
    const entries = Object.entries(v as Record<string, unknown>);
    if (!entries.length) return void out.push({ depth, key, parts: [{ text: '{}', kind: 'punct' }], comma });
    const one = inlineObject(v as Record<string, unknown>);
    if (one && depth > 0) return void out.push({ depth, key, parts: one, comma });
    out.push({ depth, key, parts: [{ text: '{', kind: 'punct' }], comma: false });
    entries.forEach(([k, x], i) => flatten(x, depth + 1, k, i < entries.length - 1, out));
    out.push({ depth, parts: [{ text: '}', kind: 'punct' }], comma });
  } else {
    out.push({ depth, key, comma, parts: [scalar(v)] });
  }
}

export interface JsonViewOptions {
  /** Keep the "$schema" line (hidden by default: it only says which draft). */
  keepSchemaKey?: boolean;
  /** Widest object kept on one line (default 40 characters; cards need that). */
  inlineMax?: number;
}

/** The identity of a line for diffing: its path of open keys plus its own text. */
function identities(v: unknown, keep: boolean): string[] {
  const lines = toLines(v, keep);
  const path: string[] = [];
  return lines.map((l) => {
    path.length = l.depth;
    const text = l.parts.map((p) => p.text).join('');
    const id = `${path.join('/')}|${l.key ?? ''}|${text}`;
    if (text === '{' || text === '[') path[l.depth] = l.key ?? '·';
    return id;
  });
}

function toLines(v: unknown, keep: boolean): Line[] {
  const value = !keep && v && typeof v === 'object' && '$schema' in v ? Object.fromEntries(Object.entries(v).filter(([k]) => k !== '$schema')) : v;
  const out: Line[] = [];
  flatten(value, 0, undefined, false, out);
  return out;
}

export interface JsonView {
  el: HTMLElement;
  /** Draws `value`. Lines that `against` does not have are marked as new. */
  set(value: unknown, against?: unknown): void;
  /** Draws a failure (for example an exception message) instead of JSON. */
  fail(message: string): void;
}

export function jsonView(parent: HTMLElement, opts: JsonViewOptions = {}): JsonView {
  const el = document.createElement('div');
  el.className = 'zd-js';
  parent.append(el);
  const keep = opts.keepSchemaKey ?? false;
  return {
    el,
    set(value, against) {
      inlineMax = opts.inlineMax ?? 40;
      const lines = toLines(value, keep);
      const ids = identities(value, keep);
      const known = against === undefined ? null : new Set(identities(against, keep));
      el.replaceChildren(
        ...lines.map((l, i) => {
          const row = document.createElement('div');
          row.className = 'zd-js-line';
          row.style.paddingLeft = `${l.depth * 12 + 4}px`;
          if (known && !known.has(ids[i]!)) row.dataset['diff'] = 'new';
          if (l.key !== undefined) {
            const k = document.createElement('span');
            k.className = 'zd-js-key';
            k.textContent = `${l.key}: `;
            row.append(k);
          }
          for (const p of l.parts) {
            const v = document.createElement('span');
            v.className = `zd-js-${p.kind}`;
            v.textContent = p.text;
            if (p.full) v.title = p.full;
            row.append(v);
          }
          if (l.comma) row.append(',');
          return row;
        }),
      );
    },
    fail(message) {
      const row = document.createElement('div');
      row.className = 'zd-js-fail';
      row.textContent = `✗ throws: ${message}`;
      el.replaceChildren(row);
    },
  };
}

/** Runs `make()` into a view: its JSON, or the exception text when it throws. */
export function showJson(view: JsonView, make: () => unknown, against?: unknown): unknown {
  try {
    const json = make();
    view.set(json, against);
    return json;
  } catch (err) {
    view.fail((err as Error).message.split('\n')[0]!);
    return undefined;
  }
}

export interface PairOptions {
  /** The Zod code in full: the left column of the full view. */
  code: string;
  /** One line of it for cards. */
  short: string;
  titles?: readonly [string, string];
  /** Show the "$schema" line (it names the draft, so target tours want it). */
  keepSchemaKey?: boolean;
}

/** The Zod code and the JSON beside it (full view), or one code line above the JSON (card). */
export function schemaPair(stage: Stage, opts: PairOptions): { json: JsonView; call: HTMLElement; setCode(long: string, short: string): void } {
  if (stage.preview) {
    const code = codeLine(stage.root, opts.short);
    const call = codeLine(stage.root, '');
    call.hidden = true;
    return { json: jsonView(stage.root, { keepSchemaKey: opts.keepSchemaKey }), call, setCode: (_long, short) => void (code.textContent = short) };
  }
  const grid = document.createElement('div');
  grid.className = 'zd-js-pair';
  const left = document.createElement('div');
  const right = document.createElement('div');
  for (const [i, box] of [left, right].entries()) {
    const head = document.createElement('div');
    head.className = 'zd-js-head';
    head.textContent = (opts.titles ?? ['Zod schema', 'JSON Schema'])[i]!;
    box.append(head);
    grid.append(box);
  }
  const pre = document.createElement('pre');
  pre.className = 'zd-js-code';
  pre.textContent = opts.code;
  left.append(pre);
  const call = codeLine(right, '');
  call.hidden = true;
  const json = jsonView(right, { keepSchemaKey: opts.keepSchemaKey, inlineMax: 58 });
  stage.root.append(grid);
  return { json, call, setCode: (long) => void (pre.textContent = long) };
}

export interface JsonVariant {
  /** Menu text in the full view. */
  label: string;
  /** The conversion call, shown above the JSON. */
  call: string;
  /** Produces the JSON Schema; a throw is shown as a failure. */
  make: () => unknown;
  say?: string;
  tone?: 'ok' | 'warn' | 'bad' | 'info';
}

export interface JsonTourOptions extends PairOptions {
  /** Mark lines that differ from the first variant's JSON (default true). */
  marks?: boolean;
  ms?: number;
  menu?: string;
}

/** Variants of one conversion over one schema: select in the full view, cycled in a card. */
export function jsonTour(stage: Stage, variants: readonly JsonVariant[], opts: JsonTourOptions): (i: number) => void {
  const { json, call } = schemaPair(stage, opts);
  let base: unknown;
  const show = (v: JsonVariant, i: number): void => {
    call.hidden = false;
    call.textContent = v.call;
    const made = showJson(json, v.make, i === 0 || opts.marks === false ? undefined : base);
    if (i === 0) base = made;
    if (v.say) stage.say(v.say, v.tone ?? 'info');
  };
  const at = stage.cycle(variants, opts.ms ?? 3600, show);
  if (stage.bar && variants.length > 1) {
    select(stage.bar, opts.menu ?? 'Option', variants.map((v, i) => [i, v.label] as const), (i) => at(i));
  }
  return at;
}
