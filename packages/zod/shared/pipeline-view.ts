// Pipes kit: a value walked through chained stages, each stage's output (or failure) in a row
import './pipeline-view.css';
import type { Stage } from './stage.ts';
import { leaf } from './value-view.ts';
import type { Result } from './verdict.ts';

export interface PipeStage {
  /** The stage in code, e.g. "z.coerce.number()". */
  label: string;
  schema: { safeParse(input: unknown): Result };
}

export interface StepRow {
  label: string;
  result: Result | null;
}

/** Feeds `input` through the stages one by one; stages after the first failure are `null` (never ran). */
export function runStages(input: unknown, stages: readonly PipeStage[]): StepRow[] {
  const rows: StepRow[] = [];
  let value = input;
  let alive = true;
  for (const s of stages) {
    if (!alive) {
      rows.push({ label: s.label, result: null });
      continue;
    }
    const r = s.schema.safeParse(value);
    rows.push({ label: s.label, result: r });
    if (r.success) value = r.data;
    else alive = false;
  }
  return rows;
}

export interface PipelineView {
  show(input: unknown, rows: readonly StepRow[]): void;
}

/** Draws the input, then one row per stage: ✓ and what came out, ✗ and why, or "never ran". */
export function pipelineView(parent: HTMLElement, stage: Stage, opts: { types?: boolean } = {}): PipelineView {
  const el = document.createElement('div');
  el.className = 'pl';
  parent.append(el);
  return {
    show(input, rows) {
      el.replaceChildren();
      const first = document.createElement('div');
      first.className = 'pl-row pl-start';
      const tag = document.createElement('span');
      tag.className = 'pl-label';
      tag.textContent = 'input';
      first.append(tag, document.createElement('span'), leaf(input, opts.types));
      el.append(first);
      rows.forEach((row, i) => {
        const r = document.createElement('div');
        r.className = 'pl-row';
        r.dataset['state'] = row.result === null ? 'skipped' : row.result.success ? 'ok' : 'bad';
        const label = document.createElement('code');
        label.className = 'pl-label';
        label.textContent = row.label;
        label.title = row.label;
        const icon = document.createElement('span');
        icon.className = 'pl-icon';
        const out = document.createElement('span');
        out.className = 'pl-out';
        if (row.result === null) {
          icon.textContent = '–';
          out.textContent = 'never ran';
        } else if (row.result.success) {
          icon.textContent = '✓';
          out.append(leaf(row.result.data, opts.types));
        } else {
          icon.textContent = '✗';
          out.textContent = row.result.error.issues[0]!.message.replace(/^Invalid input: /, '');
        }
        r.append(label, icon, out);
        el.append(r);
        if (!stage.disposed) r.animate([{ opacity: 0, transform: 'translateX(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 240, delay: stage.preview ? 0 : i * 60, fill: 'backwards', easing: 'ease-out' });
      });
    },
  };
}
