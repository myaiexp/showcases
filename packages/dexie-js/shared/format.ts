// Short display text for stored values: dates, arrays, blobs, binary keys, objects

/** One value as a short cell or chip text. */
export function fmt(v: unknown, max = 28): string {
  return clip(raw(v), max);
}

function raw(v: unknown): string {
  if (v === undefined) return '';
  if (v === null) return 'null';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100);
  if (typeof v === 'boolean' || typeof v === 'bigint') return String(v);
  if (v instanceof Date) return fmtDate(v);
  if (typeof Blob !== 'undefined' && v instanceof Blob) return `Blob ${fmtBytes(v.size)}`;
  if (v instanceof ArrayBuffer) return `bytes(${v.byteLength})`;
  if (ArrayBuffer.isView(v)) return `${v.constructor.name}(${v.byteLength})`;
  if (Array.isArray(v)) return `[${v.map((x) => raw(x)).join(', ')}]`;
  if (typeof v === 'object') {
    const parts = Object.entries(v as Record<string, unknown>).map(([k, x]) => `${k}: ${raw(x)}`);
    return `{${parts.join(', ')}}`;
  }
  return String(v);
}

/** A date as 2026-11-14, or with the time when it has one. */
export function fmtDate(d: Date): string {
  if (Number.isNaN(d.getTime())) return 'Invalid Date';
  const day = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  if (d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0) return day;
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function clip(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

/** A stable string identity for any IndexedDB key (numbers, strings, dates, arrays). */
export function keyId(k: unknown): string {
  if (k instanceof Date) return `d:${k.getTime()}`;
  if (Array.isArray(k)) return `a:[${k.map(keyId).join(',')}]`;
  if (ArrayBuffer.isView(k)) return `b:${Array.from(new Uint8Array(k.buffer, k.byteOffset, k.byteLength)).join('.')}`;
  if (k instanceof ArrayBuffer) return `b:${Array.from(new Uint8Array(k)).join('.')}`;
  return `${typeof k}:${String(k)}`;
}

/** Reads a dotted key path ('address.city') or a compound one (['a', 'b']) from an object. */
export function readPath(obj: unknown, path: string | readonly string[] | null | undefined): unknown {
  if (path == null) return undefined;
  if (Array.isArray(path)) return path.map((p) => readPath(obj, p));
  let cur: unknown = obj;
  for (const part of (path as string).split('.')) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}
