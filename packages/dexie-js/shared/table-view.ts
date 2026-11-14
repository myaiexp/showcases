// A live grid of a Dexie table: adds flash green, changes amber, deletes red
import { liveQuery, type Table } from 'dexie';
import { fmt, keyId, readPath } from './format.ts';
import type { Stage } from './stage.ts';

export interface Column {
  field: string;
  label?: string;
  /** CSS grid track, e.g. '2fr' or '48px'. Default '1fr'. */
  width?: string;
  format?: (value: unknown, row: Row) => string;
}

export type Row = Record<string, unknown>;
export type Tone = 'hit' | 'dim' | 'warn' | 'bad' | 'new';

export interface TableViewOptions {
  /** Heading over the grid; defaults to the table's name. */
  title?: string;
  columns: readonly (string | Column)[];
  /** Follow this table: every committed change re-renders the grid (liveQuery). */
  table?: Table;
  /** Overrides how the grid reads the rows it follows (e.g. include a hidden filter). */
  read?: () => Promise<Row[]>;
  /** Row identity. Defaults to the table's primary key path, else 'id'. */
  key?: string | readonly string[] | ((row: Row) => unknown);
  /** Header badges come from table.schema; set false to hide them. */
  badges?: boolean;
}

export interface TableView {
  el: HTMLElement;
  /** Renders `rows`, animating only what differs from the last render. */
  show(rows: readonly object[]): void;
  /** Re-reads the followed table and renders it; resolves when the grid shows it. */
  refresh(): Promise<void>;
  /** Highlights the rows whose keys (or predicate) match; others dim with `dimRest`. */
  mark(match: readonly unknown[] | ((row: Row) => boolean), tone?: Tone, dimRest?: boolean): void;
  unmark(): void;
  /** Sets the small text right of the title (row count by default). */
  note(text: string | null): void;
}

export function tableView(stage: Stage, parent: HTMLElement, opts: TableViewOptions): TableView {
  const cols: Column[] = opts.columns.map((c) => (typeof c === 'string' ? { field: c } : c));
  const schema = opts.table?.schema;
  const keyOpt = opts.key ?? schema?.primKey.keyPath ?? 'id';
  const keyOf = (row: Row): string =>
    keyId(typeof keyOpt === 'function' ? keyOpt(row) : readPath(row, keyOpt as string | string[]));

  const el = document.createElement('div');
  el.className = 'dx-table';
  const head = document.createElement('div');
  head.className = 'dx-table-head';
  const title = document.createElement('span');
  title.className = 'dx-table-title';
  title.textContent = opts.title ?? opts.table?.name ?? 'table';
  const noteEl = document.createElement('span');
  noteEl.className = 'dx-table-note';
  head.append(title, noteEl);

  const grid = `grid-template-columns:${cols.map((c) => c.width ?? '1fr').join(' ')}`;
  const header = document.createElement('div');
  header.className = 'dx-tr dx-th';
  header.style.cssText = grid;
  for (const c of cols) {
    const cell = document.createElement('span');
    cell.textContent = c.label ?? c.field;
    const badge = opts.badges === false ? null : badgeFor(c.field, schema);
    if (badge) {
      const b = document.createElement('i');
      b.className = `dx-badge dx-badge-${badge.kind}`;
      b.textContent = badge.text;
      b.title = badge.title;
      cell.prepend(b);
    }
    header.append(cell);
  }
  const body = document.createElement('div');
  body.className = 'dx-tbody';
  const empty = document.createElement('div');
  empty.className = 'dx-empty';
  empty.textContent = 'empty';
  body.append(empty);
  el.append(head, header, body);
  parent.append(el);

  const rowsByKey = new Map<string, { el: HTMLElement; cells: HTMLElement[]; texts: string[]; row: Row }>();
  let userNote: string | null | undefined;
  let marked: { match: readonly unknown[] | ((row: Row) => boolean); tone: Tone; dimRest: boolean } | null = null;

  const applyMarks = (): void => {
    const ids = marked && Array.isArray(marked.match) ? new Set(marked.match.map(keyId)) : null;
    for (const [id, r] of rowsByKey) {
      const hit = marked ? (ids ? ids.has(id) : (marked.match as (row: Row) => boolean)(r.row)) : false;
      r.el.dataset.tone = hit ? marked!.tone : marked?.dimRest ? 'dim' : '';
    }
  };

  const show = (records: readonly object[]): void => {
    const rows = records as readonly Row[];
    const seen = new Set<string>();
    let prev: HTMLElement | null = null;
    for (const row of rows) {
      const id = keyOf(row);
      seen.add(id);
      const texts = cols.map((c) => (c.format ? c.format(readPath(row, c.field), row) : fmt(readPath(row, c.field))));
      let r = rowsByKey.get(id);
      if (!r) {
        const rowEl = document.createElement('div');
        rowEl.className = 'dx-tr';
        rowEl.style.cssText = grid;
        const cells = texts.map((t) => {
          const cell = document.createElement('span');
          setCell(cell, t);
          rowEl.append(cell);
          return cell;
        });
        r = { el: rowEl, cells, texts, row };
        rowsByKey.set(id, r);
        flash(rowEl, 'var(--dx-new)');
      } else {
        r.row = row;
        texts.forEach((t, i) => {
          if (t === r!.texts[i]) return;
          setCell(r!.cells[i]!, t);
          flash(r!.cells[i]!, 'var(--dx-changed)');
        });
        r.texts = texts;
      }
      const after: ChildNode | null = prev ? prev.nextSibling : body.firstChild;
      if (after !== r.el) body.insertBefore(r.el, after);
      prev = r.el;
    }
    for (const [id, r] of rowsByKey) {
      if (seen.has(id)) continue;
      rowsByKey.delete(id);
      leave(r.el);
    }
    empty.style.display = rows.length ? 'none' : '';
    noteEl.textContent = userNote ?? `${rows.length} row${rows.length === 1 ? '' : 's'}`;
    applyMarks();
  };

  const read = opts.read ?? (opts.table ? () => opts.table!.toArray() as Promise<Row[]> : null);
  const refresh = async (): Promise<void> => {
    if (read) show(await read());
  };
  if (read) {
    const sub = liveQuery(read).subscribe({ next: show, error: stage.fail });
    stage.onDispose(() => sub.unsubscribe());
  }

  return {
    el,
    show,
    refresh,
    mark(match, tone = 'hit', dimRest = true) {
      marked = { match, tone, dimRest };
      applyMarks();
    },
    unmark() {
      marked = null;
      applyMarks();
    },
    note(text) {
      userNote = text;
      noteEl.textContent = text ?? `${rowsByKey.size} row${rowsByKey.size === 1 ? '' : 's'}`;
    },
  };
}

function setCell(cell: HTMLElement, text: string): void {
  cell.textContent = text || '–';
  cell.classList.toggle('dx-missing', !text);
}

function flash(target: HTMLElement, color: string): void {
  target.animate([{ backgroundColor: color }, { backgroundColor: 'transparent' }], { duration: 1400, easing: 'ease-out' });
}

function leave(rowEl: HTMLElement): void {
  rowEl.dataset.tone = '';
  const anim = rowEl.animate(
    [
      { backgroundColor: 'var(--dx-gone)', opacity: 1, maxHeight: '24px' },
      { backgroundColor: 'var(--dx-gone)', opacity: 0.6, maxHeight: '24px', offset: 0.6 },
      { backgroundColor: 'transparent', opacity: 0, maxHeight: '0px' },
    ],
    { duration: 900, easing: 'ease-in' },
  );
  anim.onfinish = () => rowEl.remove();
  anim.oncancel = () => rowEl.remove();
}

interface Badge {
  kind: 'pk' | 'ix' | 'multi' | 'unique' | 'compound';
  text: string;
  title: string;
}

function badgeFor(field: string, schema: Table['schema'] | undefined): Badge | null {
  if (!schema) return null;
  const pk = schema.primKey;
  if (pk.keyPath === field || (Array.isArray(pk.keyPath) && pk.keyPath.includes(field))) {
    return { kind: 'pk', text: pk.auto ? '++' : 'key', title: pk.auto ? 'auto-incremented primary key' : 'primary key' };
  }
  const idx = schema.indexes.find((i) => i.keyPath === field);
  if (idx?.multi) return { kind: 'multi', text: '*', title: 'multi-entry index' };
  if (idx?.unique) return { kind: 'unique', text: '&', title: 'unique index' };
  if (idx) return { kind: 'ix', text: 'ix', title: 'indexed: can be queried with where()' };
  if (schema.indexes.some((i) => Array.isArray(i.keyPath) && i.keyPath.includes(field))) {
    return { kind: 'compound', text: '+', title: 'part of a compound index' };
  }
  return null;
}
