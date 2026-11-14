// Issue paths as text (items[0].qty), lookup keys, and an input/output diff
import type { Mark } from './value-view.ts';

/** The part of a Zod issue the views read. */
export interface Issue {
  path: readonly PropertyKey[];
  message: string;
  code?: string;
}

/** A stable lookup key for a path. */
export function pathKey(path: readonly PropertyKey[]): string {
  return JSON.stringify(path.map((p) => (typeof p === 'symbol' ? p.toString() : p)));
}

/** A path as a reader would write it: items[0].qty, or "(whole value)" for []. */
export function pathText(path: readonly PropertyKey[]): string {
  if (!path.length) return '(whole value)';
  let out = '';
  for (const p of path) {
    if (typeof p === 'number') out += `[${p}]`;
    else if (typeof p === 'symbol') out += `[${p.toString()}]`;
    else out += out ? `.${p}` : p;
  }
  return out;
}

function plainObject(v: unknown): v is Record<PropertyKey, unknown> {
  return v !== null && typeof v === 'object' && (Array.isArray(v) || Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null);
}

function same(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  return false;
}

/**
 * What Zod did to the data: fields it changed or added (marks for the output view) and
 * fields it dropped (marks for the input view). Walks plain objects and arrays.
 */
export function diffMarks(input: unknown, output: unknown): { input: Map<string, Mark>; output: Map<string, Mark> } {
  const inMarks = new Map<string, Mark>();
  const outMarks = new Map<string, Mark>();
  // Cyclic data (a category listing itself) would recurse forever: walk each pair once.
  const seen = new WeakSet<object>();
  const walk = (a: unknown, b: unknown, path: PropertyKey[]): void => {
    if (plainObject(a) && plainObject(b) && Array.isArray(a) === Array.isArray(b)) {
      if (seen.has(a)) return;
      seen.add(a);
      const keys = new Set<PropertyKey>([...Reflect.ownKeys(a), ...Reflect.ownKeys(b)]);
      if (Array.isArray(a)) keys.delete('length');
      for (const k of keys) {
        const p = [...path, Array.isArray(a) && typeof k === 'string' ? Number(k) : k];
        const inA = Object.prototype.hasOwnProperty.call(a, k) && a[k] !== undefined;
        const inB = Object.prototype.hasOwnProperty.call(b, k);
        if (inA && !inB) inMarks.set(pathKey(p), 'gone');
        else if (!inA && inB) outMarks.set(pathKey(p), 'new');
        else walk(a[k], b[k], p);
      }
      return;
    }
    if (!same(a, b) && !(plainObject(a) && plainObject(b))) outMarks.set(pathKey(path), 'changed');
  };
  walk(input, output, []);
  return { input: inMarks, output: outMarks };
}
