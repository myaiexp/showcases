// Refinements kit: schemas side by side over one input, each column its own issue list
import './refine-versus.css';
import type { MountContext } from '@/types.ts';
import { drive, type Sample } from './drive.ts';
import { inline } from './inline-compare.ts';
import { pathText } from './paths.ts';
import { createStage } from './stage.ts';
import type { Result } from './verdict.ts';
import { plural } from './widgets.ts';

export interface VersusColumn {
  /** Column heading, e.g. "abort: true". */
  title: string;
  /** The schema in a few lines of code, shown under the heading. */
  code: string;
  schema: { safeParse(input: unknown): Result };
}

export interface VersusConfig {
  columns: readonly VersusColumn[];
  samples: readonly Sample[];
  hint?: string;
  /** What to say once every column has answered. */
  say?: (results: readonly Result[], input: unknown) => string;
  /** Show each issue's code (custom, too_big...) as a small tag. */
  codes?: boolean;
  /** Full view: edit the sample as JSON. Off for values JSON cannot hold. */
  editor?: boolean;
  /** Card: ms per sample. */
  ms?: number;
  /** Card: issues listed per column before "+ n more". Default 2. */
  cardIssues?: number;
}

/** The issue rows of a failed result: where, what, and optionally the issue code. */
export function issueRows(issues: readonly { path: readonly PropertyKey[]; message: string; code?: string }[], max: number, codes: boolean): HTMLElement {
  const ul = document.createElement('ul');
  ul.className = 'rv-issues';
  for (const issue of issues.slice(0, max)) {
    const li = document.createElement('li');
    if (codes && issue.code) {
      const tag = document.createElement('span');
      tag.className = 'rv-code';
      tag.textContent = issue.code;
      li.append(tag);
    }
    const text = document.createElement('span');
    text.className = 'rv-msg';
    const why = issue.message.replace(/^Invalid input: /, '');
    text.textContent = issue.path.length ? `${pathText(issue.path)}: ${why}` : why;
    text.title = issue.message;
    li.append(text);
    ul.append(li);
  }
  if (issues.length > max) {
    const li = document.createElement('li');
    li.className = 'rv-more';
    li.textContent = `+ ${issues.length - max} more`;
    ul.append(li);
  }
  return ul;
}

/** One input, several schemas: a card steps through the samples, the full view has buttons and a JSON editor. */
export function versus(el: HTMLElement, ctx: MountContext, cfg: VersusConfig): () => void {
  const stage = createStage(el, ctx, { hint: cfg.hint });
  const input = document.createElement('div');
  input.className = 'rv-input';
  const grid = document.createElement('div');
  grid.className = 'rv-grid';
  grid.style.gridTemplateColumns = `repeat(${cfg.columns.length}, minmax(0, 1fr))`;
  stage.root.append(input, grid);
  const bodies = cfg.columns.map((col) => {
    const box = document.createElement('div');
    box.className = 'rv-col';
    const head = document.createElement('div');
    head.className = 'rv-head';
    head.textContent = col.title;
    const code = document.createElement('code');
    code.className = 'rv-codeblock';
    code.textContent = col.code;
    const body = document.createElement('div');
    body.className = 'rv-body';
    box.append(head, code, body);
    grid.append(box);
    return { box, body };
  });

  const render = (value: unknown): void => {
    input.textContent = '';
    const tag = document.createElement('span');
    tag.className = 'rv-tag';
    tag.textContent = 'input';
    input.append(tag, inline(value));
    const results = cfg.columns.map((col) => col.schema.safeParse(value));
    results.forEach((r, i) => {
      const { box, body } = bodies[i]!;
      box.dataset['ok'] = String(r.success);
      const stamp = document.createElement('div');
      stamp.className = 'rv-stamp';
      if (r.success) {
        stamp.textContent = '✓ passes';
        body.replaceChildren(stamp);
        if (inline(r.data) !== inline(value)) {
          const out = document.createElement('div');
          out.className = 'rv-out';
          out.textContent = `→ ${inline(r.data)}`;
          body.append(out);
        }
      } else {
        stamp.textContent = `✗ ${plural(r.error.issues.length, 'issue')}`;
        body.replaceChildren(stamp, issueRows(r.error.issues, stage.preview ? (cfg.cardIssues ?? 2) : Infinity, cfg.codes ?? false));
      }
      if (!stage.disposed) body.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 260 });
    });
    const ok = results.filter((r) => r.success).length;
    stage.say(cfg.say ? cfg.say(results, value) : `${ok} of ${results.length} schemas accept it`, ok === results.length ? 'ok' : ok === 0 ? 'bad' : 'warn');
  };
  drive(stage, cfg.samples, render, { ms: cfg.ms ?? 3000, ...(cfg.editor === false ? {} : { editor: stage.root }) });
  return stage.dispose;
}
