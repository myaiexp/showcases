// Live-control scaffolding for config examples: labelled inputs bound to a state object, a serialised redraw, and liveDiagram on top
import type { Cleanup, MountContext } from '@/types.ts';
import { diagramBox, statusLine } from './playground.ts';
import { renderInto } from './setup.ts';

export type State = Record<string, string | number | boolean>;

export interface Control {
  key: string;
  label: string;
  kind: 'range' | 'select' | 'check' | 'color';
  min?: number;
  max?: number;
  step?: number;
  options?: readonly string[];
}

/** Builds one labelled input per control into `row`; edits write into `state` and call onChange. */
export function buildControls(row: HTMLElement, specs: readonly Control[], state: State, onChange: () => void): void {
  for (const c of specs) {
    const label = document.createElement('label');
    label.textContent = `${c.label} `;
    let input: HTMLInputElement | HTMLSelectElement;
    if (c.kind === 'color') {
      // A colour is only sent to Mermaid while its "set" box is ticked; otherwise the theme's
      // own (often derived) value applies. The box lives in state under `${key}?`.
      const on = document.createElement('input');
      on.type = 'checkbox';
      on.checked = Boolean(state[`${c.key}?`]);
      on.setAttribute('aria-label', `${c.label} set`);
      const pick = document.createElement('input');
      pick.type = 'color';
      pick.value = String(state[c.key]);
      pick.setAttribute('aria-label', c.label);
      on.addEventListener('change', () => {
        state[`${c.key}?`] = on.checked;
        onChange();
      });
      pick.addEventListener('input', () => {
        state[c.key] = pick.value;
        state[`${c.key}?`] = on.checked = true;
        onChange();
      });
      label.prepend(on, ' ');
      label.append(pick);
      row.append(label);
      continue;
    }
    if (c.kind === 'select') {
      const sel = document.createElement('select');
      for (const o of c.options ?? []) sel.append(new Option(o || '(none)', o));
      sel.value = String(state[c.key]);
      sel.addEventListener('change', () => {
        state[c.key] = sel.value;
        onChange();
      });
      input = sel;
    } else {
      const inp = document.createElement('input');
      if (c.kind === 'range') {
        inp.type = 'range';
        inp.min = String(c.min);
        inp.max = String(c.max);
        inp.step = String(c.step ?? 1);
        inp.value = String(state[c.key]);
        const out = document.createElement('output');
        out.textContent = String(state[c.key]);
        inp.addEventListener('input', () => {
          state[c.key] = Number(inp.value);
          out.textContent = inp.value;
          onChange();
        });
        label.append(inp, ' ', out);
        row.append(label);
        inp.setAttribute('aria-label', c.label);
        continue;
      }
      inp.type = 'checkbox';
      inp.checked = Boolean(state[c.key]);
      inp.addEventListener('change', () => {
        state[c.key] = inp.checked;
        onChange();
      });
      input = inp;
    }
    input.setAttribute('aria-label', c.label);
    label.append(input);
    row.append(label);
  }
}

/** Serialised renderer: edits during a render mark it dirty and one more render follows. */
export function makeDrawer(
  code: () => string,
  box: HTMLElement,
  signal: AbortSignal,
  report: (t: string, e?: boolean) => void,
  /** What the status line says after a successful render; defaults to "Rendered". */
  describe: (code: string) => string = () => 'Rendered',
): { draw: () => Promise<void>; stop: () => void } {
  let busy = false;
  let dirty = false;
  let ticket = 0;
  const draw = async (): Promise<void> => {
    if (busy) {
      dirty = true;
      return;
    }
    busy = true;
    do {
      dirty = false;
      const mine = ++ticket;
      const staging = document.createElement('div');
      const text = code();
      try {
        await renderInto(staging, text, signal, box);
        if (mine === ticket && !signal.aborted) {
          box.replaceChildren(...staging.childNodes);
          report(describe(text));
        }
      } catch (err) {
        if (!signal.aborted) report(err instanceof Error ? err.message : String(err), true);
      }
    } while (dirty && !signal.aborted);
    busy = false;
  };
  return { draw, stop: () => void ticket++ };
}

export interface LiveOptions {
  controls: readonly Control[];
  /** Starting values, one per control key. */
  initial: State;
  /** Builds the full diagram definition (frontmatter included) from the current values. */
  build: (values: State) => string;
  /** Value sets a preview card steps through, one every `interval` ms. */
  presets: readonly State[];
  interval?: number;
}

/**
 * A diagram that re-renders as its config controls change, with the frontmatter it built
 * shown under it. A card has no controls, so it steps through the presets instead.
 */
export function liveDiagram(el: HTMLElement, { preview, signal }: MountContext, opts: LiveOptions): Cleanup {
  const values: State = { ...opts.initial };
  const box = diagramBox(el, preview);
  const report = preview ? () => undefined : statusLine(el);
  const frontmatter = (code: string): string => code.match(/^---\n[\s\S]*?\n---/)?.[0] ?? 'No frontmatter';
  const { draw, stop } = makeDrawer(() => opts.build(values), box, signal, report, frontmatter);
  let timer = 0;

  if (preview) {
    let i = 0;
    const next = (): void => {
      Object.assign(values, opts.presets[i++ % opts.presets.length]);
      void draw();
      timer = window.setTimeout(next, opts.interval ?? 3200);
    };
    next();
  } else {
    const row = document.createElement('div');
    row.className = 'mm-row';
    buildControls(row, opts.controls, values, () => void draw());
    el.insertBefore(row, box);
    void draw();
  }
  return () => {
    stop();
    clearTimeout(timer);
  };
}
