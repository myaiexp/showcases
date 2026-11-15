// Union options as lanes: each option's own verdict for one input, then the union's
import './union-lanes.css';
import { pathText } from './paths.ts';
import type { Stage } from './stage.ts';
import { leaf } from './value-view.ts';
import type { Result } from './verdict.ts';

export interface Lane {
  /** The option in a few characters of code, e.g. "z.string()". */
  label: string;
  schema: { safeParse(input: unknown): Result };
}

export interface LanesOptions {
  /** "first": a union stops at its first match (later lanes are dimmed). "all": every lane is tried (xor). */
  mode?: 'first' | 'all';
  /** The word for the input row. */
  inTitle?: string;
}

export interface Lanes {
  /** Shows `input`, each option's verdict and the union's own result line. */
  show(input: unknown, union: Result, opts?: { matches?: number }): void;
}

export function unionLanes(parent: HTMLElement, stage: Stage, lanes: readonly Lane[], opts: LanesOptions = {}): Lanes {
  const el = document.createElement('div');
  el.className = 'zd-lanes';
  parent.append(el);
  return {
    show(input, union) {
      el.replaceChildren();
      const head = document.createElement('div');
      head.className = 'zd-lane-in';
      head.append(opts.inTitle ?? 'input', leaf(input));
      el.append(head);
      let matched = 0;
      for (const lane of lanes) {
        const skipped = opts.mode !== 'all' && matched > 0;
        const result = lane.schema.safeParse(input);
        if (result.success && !skipped) matched++;
        const row = document.createElement('div');
        row.className = 'zd-lane';
        row.dataset['ok'] = skipped ? 'skip' : String(result.success);
        const code = document.createElement('code');
        code.textContent = lane.label;
        const icon = document.createElement('b');
        icon.textContent = skipped ? '·' : result.success ? '✓' : '✗';
        const msg = document.createElement('span');
        msg.className = 'zd-lane-msg';
        if (skipped) msg.textContent = 'not tried';
        else if (result.success) msg.textContent = 'matches';
        else {
          const i = result.error.issues[0]!;
          msg.textContent = (i.path.length ? `${pathText(i.path)}: ` : '') + i.message.replace(/^Invalid input: /, '');
        }
        row.append(code, icon, msg);
        el.append(row);
      }
      const end = document.createElement('div');
      end.className = 'zd-lane-end';
      end.dataset['ok'] = String(union.success);
      end.textContent = union.success ? '✓ the union accepts it' : `✗ the union rejects it: ${union.error.issues[0]!.message}`;
      el.append(end);
      if (!stage.disposed) el.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 240 });
    },
  };
}
