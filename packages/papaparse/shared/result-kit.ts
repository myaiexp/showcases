// Helpers for result and error examples: which text lines and rows an error belongs to
import type { ParseError, ParseResult } from 'papaparse';
import { scanCsv, type Line } from './csv-scan.ts';
import { visible } from './csv-view.ts';
import './result-kit.css';

/**
 * For each physical line of `text`, the index of the record (CSV row, header included)
 * it belongs to, or -1 for a blank line that `skipEmptyLines` drops. A quoted line break
 * keeps the next line in the same record.
 */
export function recordOfLine(text: string, skipEmptyLines = false): number[] {
  const out: number[] = [];
  let record = 0;
  scanCsv(text).forEach((line, i, all) => {
    const blank = line.pieces.length === 0 && (line.end?.kind === 'nl' || i === all.length - 1);
    if (skipEmptyLines && blank) {
      out.push(-1);
      return;
    }
    out.push(record);
    if (line.end?.kind === 'nl') record++;
  });
  return out;
}

/** The record (CSV row, header included, from 0) an error belongs to, if it has a row. */
export function recordOf(e: ParseError, header: boolean): number | undefined {
  if (e.row === undefined) return undefined;
  return e.type === 'FieldMismatch' && header ? e.row + 1 : e.row;
}

/**
 * Records (header included, counted from 0) that have an error. Papa counts an error's
 * `row` two ways: quote errors count raw records, field-count errors count data rows,
 * which are one behind when a header row is read.
 */
export function problemRecords(errors: readonly ParseError[], header: boolean): Map<number, ParseError[]> {
  const map = new Map<number, ParseError[]>();
  for (const e of errors) {
    const record = recordOf(e, header);
    if (record === undefined) continue;
    map.set(record, [...(map.get(record) ?? []), e]);
  }
  return map;
}

export interface Marks {
  /** For `csvView` / `paint`: red for every line of a record with an error. */
  lineClass: (i: number, line: Line) => string | undefined;
  /** For `dataTable`: red for every data row with an error. */
  rowClass: (row: unknown, i: number) => string | undefined;
  /** Data-row indexes with an error. */
  rows: Set<number>;
  /** The errors of data row `i`. */
  of: (i: number) => ParseError[];
}

/** Marks for a finished parse of `text`; `header` and `skipEmptyLines` as given to Papa. */
export function marks(text: string, result: ParseResult<unknown>, header: boolean, skipEmptyLines = false): Marks {
  const bad = problemRecords(result.errors, header);
  const lines = recordOfLine(text, skipEmptyLines);
  const shift = header ? 1 : 0;
  const rows = new Set([...bad.keys()].map((r) => r - shift));
  return {
    lineClass: (i) => (bad.has(lines[i] ?? -1) ? 'pp-bad' : undefined),
    rowClass: (_row, i) => (rows.has(i) ? 'pp-bad' : undefined),
    rows,
    of: (i) => bad.get(i + shift) ?? [],
  };
}

export interface ErrorListOptions {
  /** One line per error (code and row only): for cards. */
  compact?: boolean;
  /** At most this many, then "+N more". */
  max?: number;
  /** Text when there are no errors. */
  none?: string;
  /** Show the error's `type` before its `code`. */
  type?: boolean;
  /** Replaces the default " row N" after the code. */
  where?: (e: ParseError) => string;
}

/** Errors as a list: the code, the row, and Papa's own message. */
export function errorList(errors: readonly ParseError[], opts: ErrorListOptions = {}): HTMLElement {
  const box = document.createElement('div');
  box.className = 'pp-errs';
  if (errors.length === 0) {
    const ok = document.createElement('div');
    ok.className = 'pp-errs-none';
    ok.textContent = opts.none ?? 'errors: [ ]  (none)';
    box.append(ok);
    return box;
  }
  const shown = opts.max ? errors.slice(0, opts.max) : errors;
  for (const e of shown) {
    const item = document.createElement('div');
    item.className = 'pp-err';
    const code = document.createElement('b');
    code.textContent = opts.type ? `${e.type} / ${e.code}` : e.code;
    const where = document.createElement('span');
    where.className = 'pp-err-row';
    where.textContent = opts.where ? ` ${opts.where(e)}` : e.row === undefined ? '' : ` row ${e.row}`;
    item.append(code, where);
    if (!opts.compact) {
      const msg = document.createElement('div');
      msg.className = 'pp-err-msg';
      msg.textContent = e.message;
      item.append(msg);
    }
    box.append(item);
  }
  if (opts.max && errors.length > opts.max) {
    const more = document.createElement('div');
    more.className = 'pp-err-row';
    more.textContent = `+${errors.length - opts.max} more`;
    box.append(more);
  }
  return box;
}

/** The 1-based line number where record `record` starts, or 0 if there is none. */
export function lineOfRecord(text: string, record: number, skipEmptyLines = false): number {
  return recordOfLine(text, skipEmptyLines).indexOf(record) + 1;
}

/** A titled block: `title` over `nodes`, for showing data, errors and meta together. */
export function section(title: string, ...nodes: Node[]): HTMLElement {
  const box = document.createElement('div');
  box.className = 'pp-sect';
  const t = document.createElement('div');
  t.className = 'pp-sect-title';
  t.textContent = title;
  box.append(t, ...nodes);
  return box;
}

/** `meta` as "key: value" lines, for the keys given (default: all). */
export function metaList(meta: object, keys?: readonly string[]): HTMLElement {
  const box = document.createElement('div');
  box.className = 'pp-meta';
  const entries = Object.entries(meta).filter(([k]) => !keys || keys.includes(k));
  for (const [k, v] of entries) {
    const line = document.createElement('div');
    const key = document.createElement('span');
    key.textContent = `${k}: `;
    const val = document.createElement('b');
    val.textContent = typeof v === 'string' ? `"${visible(v)}"` : JSON.stringify(v);
    line.append(key, val);
    box.append(line);
  }
  return box;
}
