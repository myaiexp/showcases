// A safeParse result for a reader: ✓ and the output, or ✗ and the issues
import { pathText, type Issue } from './paths.ts';
import { valueView, type Mark } from './value-view.ts';

/** The shape safeParse, safeDecode and friends return, with only the parts the views read. */
export type Result = { success: true; data: unknown } | { success: false; error: { issues: readonly Issue[] } };

/** The issues as rows: where (path) and what (message). */
export function issueList(issues: readonly Issue[], max = Infinity): HTMLElement {
  const ul = document.createElement('ul');
  ul.className = 'zd-issues';
  for (const issue of issues.slice(0, max)) {
    const li = document.createElement('li');
    const where = document.createElement('span');
    where.className = 'zd-where';
    where.textContent = pathText(issue.path);
    const what = document.createElement('span');
    what.className = 'zd-what';
    what.textContent = issue.message;
    li.append(where, what);
    ul.append(li);
  }
  if (issues.length > max) {
    const li = document.createElement('li');
    li.className = 'zd-more';
    li.textContent = `+ ${issues.length - max} more`;
    ul.append(li);
  }
  return ul;
}

export interface VerdictOptions {
  /** Flags on the output, e.g. diffMarks(input, data).output. */
  marks?: ReadonlyMap<string, Mark>;
  types?: boolean;
  /** At most this many issues; the rest are counted. */
  max?: number;
  /** Words for the two outcomes. */
  pass?: string;
  fail?: string;
}

/** The verdict header (✓ / ✗) and its body. */
export function verdictView(result: Result, opts: VerdictOptions = {}): HTMLElement {
  const box = document.createElement('div');
  box.className = 'zd-verdict';
  box.dataset['ok'] = String(result.success);
  const head = document.createElement('div');
  head.className = 'zd-stamp';
  if (result.success) {
    head.textContent = `✓ ${opts.pass ?? 'Valid'}`;
    box.append(head, valueView(result.data, { marks: opts.marks, types: opts.types }));
  } else {
    const n = result.error.issues.length;
    head.textContent = `✗ ${opts.fail ?? 'Rejected'}${n > 1 ? `: ${n} issues` : ''}`;
    box.append(head, issueList(result.error.issues, opts.max));
  }
  return box;
}
