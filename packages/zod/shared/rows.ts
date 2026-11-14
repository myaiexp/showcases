// Sample inputs, one row each: the input, ✓ or ✗, and the output or the reason
import './rows.css';
import './views.css';
import { pathText } from './paths.ts';
import type { Stage } from './stage.ts';
import { leaf } from './value-view.ts';
import type { Result } from './verdict.ts';

export interface Row {
  input: unknown;
  result: Result;
  /** Optional words after the verdict, e.g. why this sample is interesting. */
  note?: string;
}

export interface RowsOptions {
  /** Column titles. */
  inTitle?: string;
  outTitle?: string;
  /** Type words after each value. */
  types?: boolean;
  /** Show the output value for passing rows (default), or just ✓. */
  showOutput?: boolean;
}

export interface Rows {
  el: HTMLElement;
  /** Replaces the rows. In a card they arrive one at a time. */
  show(rows: readonly Row[]): void;
  /** Appends one row. */
  add(row: Row): void;
}

export function sampleRows(parent: HTMLElement, stage: Stage, opts: RowsOptions = {}): Rows {
  const el = document.createElement('div');
  el.className = 'zd-rows';
  const head = document.createElement('div');
  head.className = 'zd-rows-head';
  for (const t of [opts.inTitle ?? 'Input', '', opts.outTitle ?? 'Zod says']) {
    const s = document.createElement('span');
    s.textContent = t;
    head.append(s);
  }
  const body = document.createElement('div');
  body.className = 'zd-rows-body';
  el.append(head, body);
  parent.append(el);

  const build = (row: Row): HTMLElement => {
    const r = document.createElement('div');
    r.className = 'zd-sample';
    r.dataset['ok'] = String(row.result.success);
    const icon = document.createElement('span');
    icon.className = 'zd-icon';
    icon.textContent = row.result.success ? '✓' : '✗';
    const out = document.createElement('span');
    out.className = 'zd-out';
    if (row.result.success) {
      if (opts.showOutput !== false) out.append(leaf(row.result.data, opts.types));
    } else {
      const issue = row.result.error.issues[0];
      out.classList.add('zd-reason');
      if (issue) out.textContent = issue.path.length ? `${pathText(issue.path)}: ${issue.message}` : issue.message;
    }
    if (row.note) {
      const note = document.createElement('span');
      note.className = 'zd-note';
      note.textContent = row.note;
      out.append(note);
    }
    const inp = document.createElement('span');
    inp.className = 'zd-in';
    inp.append(leaf(row.input, opts.types));
    r.append(inp, icon, out);
    return r;
  };

  let gen = 0;
  const api: Rows = {
    el,
    show(rows) {
      const mine = ++gen;
      body.replaceChildren();
      if (!stage.preview) {
        for (const row of rows) body.append(build(row));
        return;
      }
      rows.forEach((row, i) => {
        stage.after(i * 380, () => {
          if (mine === gen) api.add(row);
        });
      });
    },
    add(row) {
      const r = build(row);
      body.append(r);
      if (!stage.disposed) r.animate([{ opacity: 0, transform: 'translateX(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'ease-out' });
    },
  };
  return api;
}
