// Metadata kit: a log of lines of code and what each returned, played step by step
import './json-schema-view.css';
import type { Stage, Tone } from './stage.ts';

export interface Step {
  /** One line of code. */
  code: string;
  /** Runs when its turn comes (steps may change state); a throw is shown as the result. */
  run: () => unknown;
  /** Colours the result: green for a thing that should be true, red for a failure. */
  tone?: 'ok' | 'bad' | 'warn';
  /** Words in the caption while this step is the newest. */
  say?: string;
  sayTone?: Tone;
}

export interface EvalLogOptions {
  /** Card: ms between steps (default 1100) and the pause before it starts over. */
  ms?: number;
  hold?: number;
  /** Card: how many rows stay on screen (default 4). */
  cardRows?: number;
  /** The caption once every step has run, and its colour (default green). */
  final?: string;
  finalTone?: Tone;
}

/** Compact one-line text for any value, the way a reader would write it. */
export function inline(v: unknown): string {
  if (v === undefined) return 'undefined';
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'function') return 'ƒ';
  if (Array.isArray(v)) return `[${v.map(inline).join(', ')}]`;
  if (v instanceof Date) return `Date(${v.toISOString().slice(0, 10)})`;
  if (v && typeof v === 'object') {
    const entries = Object.entries(v).map(([k, x]) => `${/^[\w$]+$/.test(k) ? k : JSON.stringify(k)}: ${inline(x)}`);
    return entries.length ? `{ ${entries.join(', ')} }` : '{}';
  }
  return String(v);
}

function row(step: Step, stage: Stage): HTMLElement {
  const el = document.createElement('div');
  el.className = 'zd-ev';
  const code = document.createElement('code');
  code.className = 'zd-ev-code';
  code.textContent = step.code;
  const out = document.createElement('div');
  out.className = 'zd-ev-out';
  let tone = step.tone;
  try {
    out.textContent = `→ ${inline(step.run())}`;
  } catch (err) {
    out.textContent = `→ throws: ${(err as Error).message.split('\n')[0]}`;
    tone = 'bad';
  }
  if (tone) out.dataset['tone'] = tone;
  el.title = out.textContent;
  el.append(code, out);
  if (!stage.disposed) el.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'ease-out' });
  return el;
}

/** Plays the steps: all at once in the full view, one by one on a loop in a card. */
export function evalLog(stage: Stage, make: () => Step[], opts: EvalLogOptions = {}): void {
  const box = document.createElement('div');
  box.className = 'zd-evlog';
  stage.root.append(box);
  const add = (step: Step, last: boolean): void => {
    box.append(row(step, stage));
    if (step.say) stage.say(step.say, step.sayTone ?? 'info');
    if (last && opts.final) stage.say(opts.final, opts.finalTone ?? 'ok');
  };
  if (!stage.preview) {
    const steps = make();
    steps.forEach((s, i) => add(s, i === steps.length - 1));
    return;
  }
  const keep = opts.cardRows ?? 4;
  stage.play(async (wait) => {
    box.replaceChildren();
    stage.say('\u00a0');
    const steps = make();
    for (const [i, step] of steps.entries()) {
      await wait(i === 0 ? 300 : (opts.ms ?? 1100));
      add(step, i === steps.length - 1);
      while (box.children.length > keep) box.firstElementChild!.remove();
    }
    await wait(opts.hold ?? 2400);
  });
}
