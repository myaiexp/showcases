// Parsed rows as a table with each cell coloured by its type
import { visible } from './csv-view.ts';
import './table.css';

export interface TableOptions {
  /** Column order for rows that are objects. Default: every key, in first-seen order. */
  fields?: readonly string[];
  /** Show at most this many rows, then "+N more rows". */
  maxRows?: number;
  /** Extra class for row `i`, e.g. 'pp-bad', 'pp-hit', 'pp-new'. */
  rowClass?: (row: unknown, i: number) => string | undefined;
  /** Extra class for one cell; `col` is the field name or the column index. */
  cellClass?: (value: unknown, i: number, col: string | number) => string | undefined;
  /** Text shown when there are no rows. */
  empty?: string;
  /** Row numbers down the left. Default true. */
  numbered?: boolean;
}

type Cell = string | number | boolean | null | undefined | Date | readonly unknown[] | object;

/** A cell for one value, classed by its JavaScript type. */
export function valueCell(value: unknown, tag: 'td' | 'span' = 'td'): HTMLElement {
  const cell = document.createElement(tag);
  const v = value as Cell;
  if (v === null || v === undefined) {
    cell.className = 'pp-v-null';
    cell.textContent = v === null ? 'null' : '—';
  } else if (typeof v === 'number' || typeof v === 'bigint') {
    cell.className = 'pp-v-num';
    cell.textContent = String(v);
  } else if (typeof v === 'boolean') {
    cell.className = 'pp-v-bool';
    cell.textContent = String(v);
  } else if (v instanceof Date) {
    cell.className = 'pp-v-date';
    cell.textContent = isNaN(v.getTime()) ? 'Invalid Date' : v.toISOString().slice(0, 10);
  } else if (Array.isArray(v)) {
    cell.className = 'pp-v-arr';
    cell.textContent = `[${v.map((x) => JSON.stringify(x)).join(', ')}]`;
  } else if (typeof v === 'object') {
    cell.className = 'pp-v-arr';
    cell.textContent = JSON.stringify(v);
  } else if (v === '') {
    cell.className = 'pp-v-empty';
    cell.textContent = '(empty)';
  } else {
    cell.className = 'pp-v-str';
    cell.textContent = visible(String(v));
  }
  return cell;
}

const isRecord = (r: unknown): r is Record<string, unknown> => typeof r === 'object' && r !== null && !Array.isArray(r);

/** Renders Papa's `data`: an array of arrays (no header) or of objects (header: true). */
export function dataTable(data: readonly unknown[], opts: TableOptions = {}): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'pp-table-wrap';
  if (data.length === 0) {
    const none = document.createElement('div');
    none.className = 'pp-none';
    none.textContent = opts.empty ?? 'no rows';
    wrap.append(none);
    return wrap;
  }
  const numbered = opts.numbered ?? true;
  const keyed = data.some(isRecord);
  let cols: (string | number)[];
  if (keyed) {
    const seen = new Set<string>(opts.fields ?? []);
    if (!opts.fields) for (const r of data) if (isRecord(r)) for (const k of Object.keys(r)) seen.add(k);
    cols = [...seen];
  } else {
    const width = Math.max(...data.map((r) => (Array.isArray(r) ? r.length : 1)));
    cols = Array.from({ length: width }, (_, i) => i);
  }

  const table = document.createElement('table');
  table.className = 'pp-table';
  const head = document.createElement('tr');
  if (numbered) head.append(document.createElement('th'));
  for (const c of cols) {
    const th = document.createElement('th');
    if (typeof c === 'number') {
      th.className = 'pp-col-pos';
      th.textContent = `[${c}]`;
    } else {
      th.textContent = visible(c);
      if (c === '__parsed_extra') th.className = 'pp-col-extra';
    }
    head.append(th);
  }
  const thead = document.createElement('thead');
  thead.append(head);
  const tbody = document.createElement('tbody');
  const shown = opts.maxRows ? data.slice(0, opts.maxRows) : data;
  shown.forEach((row, i) => {
    const tr = document.createElement('tr');
    const extra = opts.rowClass?.(row, i);
    if (extra) tr.className = extra;
    if (numbered) {
      const n = document.createElement('td');
      n.className = 'pp-rownum';
      n.textContent = String(i);
      tr.append(n);
    }
    for (const c of cols) {
      const has = keyed ? isRecord(row) && c in row : Array.isArray(row) && (c as number) < row.length;
      const value = keyed ? (row as Record<string, unknown>)[c as string] : (row as unknown[])[c as number];
      const td = has ? valueCell(value) : document.createElement('td');
      if (!has) td.className = 'pp-v-missing';
      const cls = opts.cellClass?.(value, i, c);
      if (cls) td.classList.add(...cls.split(' '));
      tr.append(td);
    }
    tbody.append(tr);
  });
  table.append(thead, tbody);
  wrap.append(table);
  if (opts.maxRows && data.length > opts.maxRows) {
    const more = document.createElement('div');
    more.className = 'pp-more';
    more.textContent = `+${data.length - opts.maxRows} more rows`;
    wrap.append(more);
  }
  return wrap;
}

/** A small key to the cell colours. */
export function typeLegend(kinds: readonly ('str' | 'num' | 'bool' | 'empty' | 'null')[] = ['str', 'num', 'bool', 'empty']): HTMLElement {
  const names = { str: 'text', num: 'number', bool: 'true/false', empty: 'empty', null: 'null' };
  const box = document.createElement('div');
  box.className = 'pp-legend';
  for (const k of kinds) {
    const s = document.createElement('span');
    s.className = `pp-v-${k}`;
    s.textContent = names[k];
    box.append(s);
  }
  return box;
}
