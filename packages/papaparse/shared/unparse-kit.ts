// Helpers for JSON to CSV examples: JSON editor, grid, spreadsheet picture
import Papa from 'papaparse';
import { scanCsv } from './csv-scan.ts';
import './unparse-kit.css';

/** Bytes the text takes in a UTF-8 file. */
export const byteLength = (text: string): number => new TextEncoder().encode(text).length;

/** Papa.unparse can throw on input it does not understand: keep the card alive. */
export function attempt(fn: () => string): { text: string; error?: string } {
  try {
    return { text: fn() };
  } catch (err) {
    return { text: '', error: err instanceof Error ? err.message : String(err) };
  }
}

/** JSON with one array item per line, so a table of rows stays readable. */
export function pretty(value: unknown): string {
  if (!Array.isArray(value)) return JSON.stringify(value, null, 2);
  return `[\n${value.map((item) => `  ${JSON.stringify(item)}`).join(',\n')}\n]`;
}

export interface JsonEditor {
  el: HTMLElement;
  set(value: unknown): void;
}

/** A textarea of JSON; `onChange` runs with the parsed value whenever the text is valid. */
export function jsonEditor(value: unknown, onChange: (value: unknown) => void, rows = 8): JsonEditor {
  const el = document.createElement('div');
  el.className = 'pp-json';
  const ta = document.createElement('textarea');
  ta.rows = rows;
  ta.spellcheck = false;
  ta.setAttribute('aria-label', 'Data as JSON');
  ta.value = pretty(value);
  const status = document.createElement('div');
  status.className = 'pp-json-status';
  ta.addEventListener('input', () => {
    try {
      const v: unknown = JSON.parse(ta.value);
      status.textContent = '';
      status.classList.remove('pp-bad');
      onChange(v);
    } catch {
      status.textContent = 'Not valid JSON yet: the CSV keeps its last good version.';
      status.classList.add('pp-bad');
    }
  });
  el.append(ta, status);
  return {
    el,
    set(v) {
      ta.value = pretty(v);
      status.textContent = '';
    },
  };
}

/**
 * A table whose cells are text inputs. `head` cells are fixed labels (pass [] for none);
 * `onChange` gets all the body rows as strings after every keystroke.
 */
export function editableGrid(head: readonly string[], rows: readonly (readonly unknown[])[], onChange: (rows: string[][]) => void): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'pp-table-wrap';
  const table = document.createElement('table');
  table.className = 'pp-table pp-grid';
  if (head.length) {
    const tr = document.createElement('tr');
    for (const h of head) tr.append(Object.assign(document.createElement('th'), { textContent: h }));
    const thead = document.createElement('thead');
    thead.append(tr);
    table.append(thead);
  }
  const body = document.createElement('tbody');
  const read = (): string[][] => [...body.rows].map((tr) => [...tr.querySelectorAll('input')].map((i) => i.value));
  for (const row of rows) {
    const tr = document.createElement('tr');
    for (const v of row) {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.value = String(v);
      input.size = Math.max(4, input.value.length);
      input.spellcheck = false;
      input.addEventListener('input', () => {
        input.size = Math.max(4, input.value.length);
        onChange(read());
      });
      td.append(input);
      tr.append(td);
    }
    body.append(tr);
  }
  table.append(body);
  wrap.append(table);
  return wrap;
}

/**
 * Maps each physical line of `Papa.unparse(rows, config)` output (header excluded: pass an
 * array of arrays) to the row it belongs to, since a value with a line break takes two.
 */
export function lineRows(rows: readonly (readonly unknown[])[], config: Papa.UnparseConfig = {}): number[] {
  const map: number[] = [];
  rows.forEach((row, r) => {
    const piece = Papa.unparse([row as unknown[]], { ...config, header: false });
    const count = scanCsv(piece, { delimiter: config.delimiter, quoteChar: config.quoteChar }).length;
    for (let i = 0; i < count; i++) map.push(r);
  });
  return map;
}

/** Why Papa wraps `value` in quotes on its own (the rules in the library's `safe()`), or null. */
export function whyQuoted(value: unknown, delimiter = ',', quoteChar = '"'): string | null {
  if (typeof value !== 'string') return null;
  if (value.includes(delimiter)) return 'it has the separator in it';
  if (value.includes(quoteChar)) return 'it has a quote mark in it';
  if (/[\r\n]/.test(value)) return 'it has a line break in it';
  if (value.startsWith(' ')) return 'it starts with a space';
  if (value.endsWith(' ')) return 'it ends with a space';
  return null;
}

export type SheetKind = 'formula' | 'number' | 'text';

/** What a spreadsheet does with a cell it reads from a CSV file. */
export function sheetKind(cell: string): SheetKind {
  if (cell.startsWith("'")) return 'text'; // the leading ' makes it plain text
  if (/^[+-]?\d+(\.\d+)?$/.test(cell)) return 'number';
  if (/^[=+\-@\t\r]/.test(cell)) return 'formula';
  return 'text';
}

/** A tiny spreadsheet (A, B, C… and row numbers) opening `csv`, flagging cells that would run. */
export function sheetView(csv: string, title = 'Opened in a spreadsheet'): HTMLElement {
  const box = document.createElement('div');
  const label = document.createElement('div');
  label.className = 'pp-sheet-title';
  label.textContent = title;
  // Papa.parse stands in for the spreadsheet reading the file.
  const rows = Papa.parse<string[]>(csv).data;
  const width = Math.max(1, ...rows.map((r) => r.length));
  const table = document.createElement('table');
  table.className = 'pp-sheet';
  const head = document.createElement('tr');
  head.append(document.createElement('th'));
  for (let c = 0; c < width; c++) head.append(Object.assign(document.createElement('th'), { textContent: String.fromCharCode(65 + c) }));
  table.append(head);
  rows.forEach((row, r) => {
    const tr = document.createElement('tr');
    tr.append(Object.assign(document.createElement('th'), { textContent: String(r + 1) }));
    for (let c = 0; c < width; c++) {
      const td = document.createElement('td');
      const v = row[c] ?? '';
      td.textContent = v;
      const kind = sheetKind(v);
      if (kind === 'formula') td.className = 'pp-sheet-run';
      else if (kind === 'number') td.className = 'pp-sheet-num';
      else if (v.startsWith("'")) td.className = 'pp-sheet-safe';
      tr.append(td);
    }
    table.append(tr);
  });
  box.append(label, table);
  return box;
}
