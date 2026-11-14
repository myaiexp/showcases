// Input → schema → result, side by side: what went in, what came out or why not
import './views.css';
import { diffMarks } from './paths.ts';
import type { Stage } from './stage.ts';
import { valueView } from './value-view.ts';
import { verdictView, type Result } from './verdict.ts';

export interface CheckpointOptions {
  /** The schema in a few characters of code, shown between the panes, e.g. "z.email()". */
  label?: string;
  /** Pane titles. */
  inTitle?: string;
  outTitle?: string;
  /** Type words after each value: helpful wherever Zod changes a type. */
  types?: boolean;
  /** Write each issue's message under its field in the input pane too. */
  messages?: boolean;
  pass?: string;
  fail?: string;
  /** Panes top and bottom instead of left and right. Default: stacked in cards only. */
  stacked?: boolean;
}

export interface Checkpoint {
  el: HTMLElement;
  /**
   * Shows `input` and what the schema made of it. On success the output marks what Zod
   * changed, added or dropped; on failure the input marks each field an issue names.
   */
  show(input: unknown, result: Result): void;
  /** Shows the input with the result still pending ("checking…"), for async parses. */
  pending(input: unknown, text?: string): void;
}

function pane(title: string): { el: HTMLElement; body: HTMLElement } {
  const el = document.createElement('div');
  el.className = 'zd-pane';
  const head = document.createElement('div');
  head.className = 'zd-pane-head';
  head.textContent = title;
  const body = document.createElement('div');
  body.className = 'zd-pane-body';
  el.append(head, body);
  return { el, body };
}

export function checkpoint(parent: HTMLElement, stage: Stage, opts: CheckpointOptions = {}): Checkpoint {
  const el = document.createElement('div');
  const stacked = opts.stacked ?? stage.preview;
  el.className = stacked ? 'zd-check zd-stacked' : 'zd-check';
  const input = pane(opts.inTitle ?? 'Input');
  const output = pane(opts.outTitle ?? 'Result');
  const gate = document.createElement('div');
  gate.className = 'zd-gate';
  const arrow = document.createElement('span');
  arrow.className = 'zd-arrow';
  arrow.textContent = stacked ? '↓' : '→';
  gate.append(arrow);
  if (opts.label) {
    const code = document.createElement('code');
    code.className = 'zd-gate-label';
    code.textContent = opts.label;
    gate.prepend(code);
  }
  el.append(input.el, gate, output.el);
  parent.append(el);

  const reveal = (node: HTMLElement): void => {
    if (stage.disposed) return;
    node.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'ease-out' });
  };

  return {
    el,
    show(value, result) {
      const marks = result.success ? diffMarks(value, result.data) : null;
      input.body.replaceChildren(
        valueView(value, {
          issues: result.success ? undefined : result.error.issues,
          messages: opts.messages,
          marks: marks?.input,
          types: opts.types,
        }),
      );
      // A card has no scrollbar: bring the first marked field into the clipped pane.
      const first = input.body.querySelector<HTMLElement>('[data-mark]');
      input.body.scrollTop = first ? Math.max(0, first.offsetTop - 12) : 0;
      const verdict = verdictView(result, { marks: marks?.output, types: opts.types, pass: opts.pass, fail: opts.fail, max: stage.preview ? 3 : undefined });
      output.body.replaceChildren(verdict);
      output.el.dataset['ok'] = String(result.success);
      reveal(verdict);
      gate.animate([{ color: result.success ? 'var(--green)' : 'var(--red)' }, { color: 'var(--fg-3)' }], { duration: 700 });
    },
    pending(value, text = 'checking…') {
      input.body.replaceChildren(valueView(value, { types: opts.types }));
      const wait = document.createElement('div');
      wait.className = 'zd-pending';
      wait.textContent = text;
      output.body.replaceChildren(wait);
      delete output.el.dataset['ok'];
    },
  };
}
