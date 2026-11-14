// Logical queries drawn: query text, a truth table of clauses, a tree with a lit strip per node
import type Fuse from 'fuse.js';
import type { Stage } from './stage.ts';
import './logical-view.css';

/** Any query Fuse accepts, read loosely for drawing. */
export type LQuery = string | { [key: string]: unknown };

/** Quotes the way the code would: 'old'. */
const quote = (s: unknown): string => `'${String(s)}'`;

/** One-line source of a query: { $and: [{ title: 'old' }, …] }. */
export function compact(q: unknown): string {
  if (typeof q === 'string') return quote(q);
  if (Array.isArray(q)) return `[${q.map(compact).join(', ')}]`;
  if (q && typeof q === 'object') {
    const parts = Object.entries(q).map(([k, v]) => `${k}: ${compact(v)}`);
    return parts.length ? `{ ${parts.join(', ')} }` : '{}';
  }
  return String(q);
}

/** Pretty source over several lines, two-space indent. */
export function pretty(q: unknown, pad = ''): string {
  const inner = `${pad}  `;
  if (typeof q === 'string') return quote(q);
  if (Array.isArray(q)) {
    const flat = compact(q);
    if (flat.length < 50 && !flat.includes('$and') && !flat.includes('$or')) return flat;
    return q.length ? `[\n${q.map((x) => inner + pretty(x, inner)).join(',\n')}\n${pad}]` : '[]';
  }
  if (q && typeof q === 'object') {
    const flat = compact(q);
    if (flat.length < 50 && !flat.includes('$and') && !flat.includes('$or')) return flat;
    return `{\n${Object.entries(q)
      .map(([k, v]) => `${inner}${k}: ${pretty(v, inner)}`)
      .join(',\n')}\n${pad}}`;
  }
  return String(q);
}

export interface QueryText {
  el: HTMLElement;
  set(q: unknown): void;
}

/** The query as code: one line in a card, pretty-printed in the full view. */
export function queryText(parent: HTMLElement, stage: Stage): QueryText {
  const el = document.createElement('pre');
  el.className = 'fz-lq';
  parent.append(el);
  return {
    el,
    set(q) {
      el.textContent = stage.preview ? compact(q) : pretty(q);
    },
  };
}

/** The refIndex of every item the query (or sub-query) keeps. */
export function keptBy<T>(fuse: Fuse<T>, q: LQuery): Map<number, number | undefined> {
  const out = new Map<number, number | undefined>();
  for (const r of fuse.search(q as never)) out.set(r.refIndex, r.score);
  return out;
}

export interface TruthTable {
  el: HTMLElement;
  /** `clauses` are the sets each clause keeps; `result` is what the whole query kept (null = nothing yet). */
  set(clauses: readonly ReadonlyMap<number, unknown>[], result: ReadonlyMap<number, number | undefined> | null): void;
}

/** A row per item, a column per clause, then the verdict of the whole query. */
export function truthTable(parent: HTMLElement, names: readonly string[], heads: readonly string[], resultHead = 'kept'): TruthTable {
  const el = document.createElement('div');
  el.className = 'fz-lt';
  el.style.gridTemplateColumns = `minmax(0, 1.5fr) ${heads.map(() => 'minmax(0, 1fr)').join(' ')} 3.2em`;
  parent.append(el);
  const head = (text: string): HTMLElement => {
    const h = document.createElement('div');
    h.className = 'fz-lt-h';
    h.textContent = text;
    h.title = text;
    return h;
  };
  el.append(head(''), ...heads.map(head), head(resultHead));
  const rows = names.map((name) => {
    const n = document.createElement('div');
    n.className = 'fz-lt-name';
    n.textContent = name;
    const cells = heads.map(() => {
      const c = document.createElement('div');
      c.className = 'fz-lt-c';
      return c;
    });
    const res = document.createElement('div');
    res.className = 'fz-lt-c fz-lt-res';
    el.append(n, ...cells, res);
    return { n, cells, res };
  });
  return {
    el,
    set(clauses, result) {
      rows.forEach((row, i) => {
        clauses.forEach((set, c) => {
          const on = set.has(i);
          row.cells[c]!.textContent = on ? '✓' : '·';
          row.cells[c]!.toggleAttribute('data-on', on);
        });
        const kept = result?.has(i) ?? false;
        row.res.textContent = result ? (kept ? '✓' : '·') : '';
        row.res.toggleAttribute('data-on', kept);
        row.n.classList.toggle('fz-lt-dim', result !== null && !kept);
      });
    },
  };
}

interface TreeRow {
  depth: number;
  label: string;
  op: string | null;
  query: LQuery;
}

const isNode = (q: LQuery): q is Record<string, unknown> => typeof q === 'object' && q !== null;

/** Flattens a query into the rows of its tree, parents first. */
export function treeRows(q: LQuery, depth = 0, out: TreeRow[] = []): TreeRow[] {
  if (!isNode(q) || '$path' in q) {
    out.push({ depth, op: null, label: typeof q === 'string' ? quote(q) : compact(q).replace(/^\{ | \}$/g, ''), query: q });
    return out;
  }
  for (const op of ['$and', '$or'] as const) {
    if (Array.isArray(q[op])) {
      out.push({ depth, op: op.slice(1).toUpperCase(), label: '', query: q });
      for (const child of q[op] as LQuery[]) treeRows(child, depth + 1, out);
      return out;
    }
  }
  const entries = Object.entries(q);
  if (entries.length === 1) {
    out.push({ depth, op: null, label: compact(q).replace(/^\{ | \}$/g, ''), query: q });
  } else {
    out.push({ depth, op: 'AND', label: '(implicit)', query: q });
    for (const [k, v] of entries) treeRows({ [k]: v }, depth + 1, out);
  }
  return out;
}

export interface QueryTree {
  el: HTMLElement;
  /** Shows the tree of `q`; each node carries a strip with one cell per item, lit where the node kept it. */
  set(q: LQuery, onFollow?: (i: number) => void): void;
  /** Outlines one item's cells in every strip. */
  follow(i: number): void;
}

export function queryTree<T>(parent: HTMLElement, fuse: Fuse<T>, names: readonly string[]): QueryTree {
  const el = document.createElement('div');
  el.className = 'fz-tree';
  parent.append(el);
  let followed = 0;
  const api: QueryTree = {
    el,
    set(q, onFollow) {
      el.replaceChildren(
        ...treeRows(q).map((row) => {
          const kept = keptBy(fuse, row.query);
          const node = document.createElement('div');
          node.className = 'fz-tn';
          node.style.marginLeft = `${row.depth * 14}px`;
          const label = document.createElement('span');
          label.className = 'fz-tn-label';
          if (row.op) {
            const op = document.createElement('span');
            op.className = 'fz-tn-op';
            op.textContent = row.op;
            label.append(op, row.label ? ` ${row.label}` : '');
          } else label.textContent = row.label;
          label.title = label.textContent ?? '';
          const strip = document.createElement('span');
          strip.className = 'fz-tn-strip';
          names.forEach((name, i) => {
            const c = document.createElement('span');
            c.className = 'fz-tn-cell';
            c.title = name;
            c.toggleAttribute('data-on', kept.has(i));
            if (i === followed) c.setAttribute('data-follow', '');
            if (onFollow) c.addEventListener('click', () => onFollow(i));
            strip.append(c);
          });
          node.append(label, strip);
          return node;
        }),
      );
    },
    follow(i) {
      followed = i;
      for (const strip of el.querySelectorAll('.fz-tn-strip')) {
        [...strip.children].forEach((c, k) => c.toggleAttribute('data-follow', k === i));
      }
    },
  };
  return api;
}
