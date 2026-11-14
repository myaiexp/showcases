// Any value drawn as a typed tree, the fields an issue points at marked red
import './views.css';
import { pathKey, type Issue } from './paths.ts';

/** How a field is flagged: rejected, changed by Zod, added by Zod, or dropped by Zod. */
export type Mark = 'bad' | 'changed' | 'new' | 'gone';

export interface ValueViewOptions {
  /** Issues to pin: each marks the field its path names (messages too, with `messages`). */
  issues?: readonly Issue[];
  /** Write each issue's message under the field it names. Off: the field only turns red. */
  messages?: boolean;
  /** Extra flags by path, e.g. from diffMarks(). */
  marks?: ReadonlyMap<string, Mark>;
  /** Show a plain type word ("text", "number") after each value. */
  types?: boolean;
}

/** The plain-English name of a value's type, as a reader without code would say it. */
export function typeWord(v: unknown): string {
  if (v === null) return 'null';
  if (v === undefined) return 'missing';
  if (typeof v === 'string') return 'text';
  if (typeof v === 'number') return Number.isNaN(v) ? 'not a number' : 'number';
  if (typeof v === 'boolean') return 'yes/no';
  if (typeof v === 'bigint') return 'bigint';
  if (typeof v === 'symbol') return 'symbol';
  if (typeof v === 'function') return 'function';
  if (v instanceof Date) return 'date';
  if (Array.isArray(v)) return 'list';
  if (v instanceof Map) return 'map';
  if (v instanceof Set) return 'set';
  if (typeof File !== 'undefined' && v instanceof File) return 'file';
  if (v instanceof Promise) return 'promise';
  if (v instanceof URL) return 'URL';
  if (v instanceof Uint8Array) return 'bytes';
  return 'object';
}

function isBranch(v: unknown): v is object {
  if (v === null || typeof v !== 'object') return false;
  if (v instanceof Date || v instanceof Promise || v instanceof URL || v instanceof Uint8Array) return false;
  if (typeof File !== 'undefined' && v instanceof File) return false;
  return true;
}

function entries(v: object): [PropertyKey, unknown][] {
  if (Array.isArray(v)) return v.map((x, i) => [i, x]);
  if (v instanceof Map) return [...v.entries()].map(([k, x]) => [k as PropertyKey, x]);
  if (v instanceof Set) return [...v.values()].map((x, i) => [i, x]);
  return Reflect.ownKeys(v).map((k) => [k, (v as Record<PropertyKey, unknown>)[k]]);
}

/** One value as an inline chip: "text" in quotes, numbers bare, null and missing dimmed. */
export function leaf(v: unknown, types = false): HTMLElement {
  const span = document.createElement('span');
  const word = typeWord(v);
  span.className = 'zd-leaf';
  span.dataset['type'] = word;
  span.textContent = leafText(v);
  if (types && word !== 'missing') {
    const t = document.createElement('span');
    t.className = 'zd-type';
    t.textContent = word;
    const wrap = document.createElement('span');
    wrap.className = 'zd-leaf-wrap';
    wrap.append(span, t);
    return wrap;
  }
  return span;
}

/** One value as text: a list or object is written inline (see inlineText). */
export function leafText(v: unknown, depth = 0): string {
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'bigint') return `${v}n`;
  if (typeof v === 'symbol') return v.toString();
  if (typeof v === 'function') return `ƒ ${v.name || 'function'}`;
  if (v === undefined) return 'missing';
  if (v instanceof Date) {
    if (Number.isNaN(v.getTime())) return 'Invalid Date';
    // A date at UTC midnight is a calendar day: print just the day so it fits a card.
    return v.toISOString().replace('T00:00:00.000Z', '').replace('.000Z', 'Z');
  }
  if (v instanceof Promise) return 'Promise';
  if (v instanceof URL) return `URL ${v.href}`;
  if (v instanceof Uint8Array) return `bytes [${[...v.slice(0, 8)].join(' ')}${v.length > 8 ? ' …' : ''}]`;
  if (typeof File !== 'undefined' && v instanceof File) return `file ${v.name} (${v.size} B)`;
  if (v instanceof Error) return `${v.constructor.name}("${v.message}")`;
  if (v !== null && typeof v === 'object') return inlineText(v, depth);
  return String(v);
}

/** A list, object, Map or Set written on one line, nested up to three levels: ["a", 2]. */
function inlineText(v: object, depth: number): string {
  if (depth > 2) return '…';
  const part = (x: unknown): string => leafText(x, depth + 1);
  if (Array.isArray(v)) return `[${v.map(part).join(', ')}]`;
  if (v instanceof Set) return `Set {${[...v].map(part).join(', ')}}`;
  if (v instanceof Map) return `Map {${[...v].map(([k, x]) => `${part(k)} → ${part(x)}`).join(', ')}}`;
  const entries = Reflect.ownKeys(v).map((k) => `${typeof k === 'symbol' ? `[${k.toString()}]` : k}: ${part((v as Record<PropertyKey, unknown>)[k])}`);
  return entries.length ? `{ ${entries.join(', ')} }` : '{}';
}

function keyText(k: PropertyKey, parent: object): string {
  if (Array.isArray(parent) || parent instanceof Set) return `${String(k)}`;
  if (parent instanceof Map) return leafText(k);
  return typeof k === 'symbol' ? `[${k.toString()}]` : String(k);
}

/** Draws `value` into a new element. */
export function valueView(value: unknown, opts: ValueViewOptions = {}): HTMLElement {
  const root = document.createElement('div');
  root.className = 'zd-value';
  const bad = new Map<string, string[]>();
  for (const issue of opts.issues ?? []) {
    // An unrecognized_keys issue names its keys beside the path of their object.
    const keys = (issue as { keys?: readonly string[] }).keys;
    const paths = keys?.length ? keys.map((k) => [...issue.path, k]) : [issue.path];
    for (const p of paths) {
      const k = pathKey(p);
      bad.set(k, [...(bad.get(k) ?? []), issue.message]);
    }
  }
  const marks = opts.marks ?? new Map<string, Mark>();
  const seen = new WeakSet<object>();

  const flag = (row: HTMLElement, path: readonly PropertyKey[]): void => {
    const k = pathKey(path);
    const msgs = bad.get(k);
    if (msgs) {
      row.dataset['mark'] = 'bad';
      if (opts.messages) {
        for (const m of msgs) {
          const msg = document.createElement('div');
          msg.className = 'zd-msg';
          msg.textContent = m;
          row.after(msg);
        }
      }
    } else if (marks.has(k)) row.dataset['mark'] = marks.get(k)!;
  };

  const branch = (v: object, path: PropertyKey[], into: HTMLElement): void => {
    if (seen.has(v)) {
      into.append(leaf('↺ (refers back to itself)'));
      return;
    }
    seen.add(v);
    const list = document.createElement('div');
    list.className = 'zd-branch';
    into.append(list);
    const present = new Set<string>();
    for (const [k, child] of entries(v)) {
      const childPath = [...path, k];
      present.add(pathKey(childPath));
      row(k, child, childPath, list, v);
    }
    // Issues about keys the value lacks (a required field left out) get a ghost row.
    for (const k of bad.keys()) {
      const p = JSON.parse(k) as PropertyKey[];
      if (p.length === path.length + 1 && pathKey(p.slice(0, -1)) === pathKey(path) && !present.has(k)) {
        row(p[p.length - 1]!, undefined, p, list, v);
      }
    }
  };

  const row = (k: PropertyKey, child: unknown, path: PropertyKey[], list: HTMLElement, parent: object): void => {
    const r = document.createElement('div');
    r.className = 'zd-row';
    const key = document.createElement('span');
    key.className = 'zd-key';
    key.textContent = parent instanceof Set ? '•' : `${keyText(k, parent)}:`;
    r.append(key);
    list.append(r);
    if (isBranch(child) && entries(child).length) {
      r.append(bracket(child));
      const nest = document.createElement('div');
      nest.className = 'zd-nest';
      list.append(nest);
      flag(r, path);
      branch(child, path, nest);
    } else {
      r.append(leaf(child, opts.types));
      flag(r, path);
    }
  };

  if (isBranch(value) && entries(value).length) {
    const head = document.createElement('div');
    head.className = 'zd-row zd-root';
    head.append(bracket(value));
    root.append(head);
    flag(head, []);
    branch(value, [], root);
  } else {
    const r = document.createElement('div');
    r.className = 'zd-row zd-root';
    r.append(leaf(value, opts.types));
    root.append(r);
    flag(r, []);
  }
  return root;
}

function bracket(v: object): HTMLElement {
  const b = document.createElement('span');
  b.className = 'zd-bracket';
  const n = entries(v).length;
  b.textContent = Array.isArray(v)
    ? `list of ${n}`
    : v instanceof Map
      ? `Map of ${n}`
      : v instanceof Set
        ? `Set of ${n}`
        : 'object';
  return b;
}
