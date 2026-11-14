// Control panel under the canvas: sliders, selects, buttons, checks, readouts
//
// Styled inline with base.css tokens, so an example needs no style.css just for its
// controls. Previews skip panels (cards take no pointer input), so call this only when
// !ctx.preview. Everything is removed with the panel element.

export interface Panel {
  /** The panel element, already appended to the mount element. */
  el: HTMLElement;
  slider(label: string, min: number, max: number, step: number, value: number, onInput: (v: number) => void): HTMLInputElement;
  select<T extends string>(label: string, options: readonly T[], value: T, onChange: (v: T) => void): HTMLSelectElement;
  button(label: string, onClick: () => void): HTMLButtonElement;
  check(label: string, checked: boolean, onChange: (on: boolean) => void): HTMLInputElement;
  /** A text line for live values; set its textContent. */
  readout(text?: string): HTMLElement;
  /** Starts a new row of controls. */
  row(): void;
}

const decimals = (step: number): number => (step >= 1 ? 0 : Math.min(4, String(step).split('.')[1]?.length ?? 2));

export function createPanel(el: HTMLElement): Panel {
  const panel = document.createElement('div');
  Object.assign(panel.style, {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
    padding: 'var(--space-2) var(--space-3)',
    background: 'var(--bg-surface)',
    color: 'var(--fg-2)',
    fontSize: '0.85rem',
    boxSizing: 'border-box',
  });
  el.append(panel);

  let current: HTMLElement;
  const row = (): void => {
    current = document.createElement('div');
    Object.assign(current.style, { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-2) var(--space-4)' });
    panel.append(current);
  };
  row();

  const labelled = (text: string): HTMLLabelElement => {
    const label = document.createElement('label');
    Object.assign(label.style, { display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' });
    label.append(text);
    current.append(label);
    return label;
  };

  return {
    el: panel,
    row,
    slider(label, min, max, step, value, onInput) {
      const wrap = labelled(label);
      const input = document.createElement('input');
      const out = document.createElement('output');
      Object.assign(input, { type: 'range', min: String(min), max: String(max), step: String(step), value: String(value) });
      input.style.accentColor = 'var(--accent)';
      out.style.minWidth = '3.5em';
      out.style.fontVariantNumeric = 'tabular-nums';
      out.textContent = value.toFixed(decimals(step));
      input.addEventListener('input', () => {
        const v = Number(input.value);
        out.textContent = v.toFixed(decimals(step));
        onInput(v);
      });
      wrap.append(input, out);
      return input;
    },
    select(label, options, value, onChange) {
      const wrap = labelled(label);
      const sel = document.createElement('select');
      for (const o of options) sel.add(new Option(o, o, o === value, o === value));
      sel.addEventListener('change', () => onChange(sel.value as (typeof options)[number]));
      wrap.append(sel);
      return sel;
    },
    button(label, onClick) {
      const b = document.createElement('button');
      b.className = 'btn';
      b.textContent = label;
      b.addEventListener('click', onClick);
      current.append(b);
      return b;
    },
    check(label, checked, onChange) {
      const wrap = labelled('');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = checked;
      input.addEventListener('change', () => onChange(input.checked));
      wrap.prepend(input);
      wrap.append(label);
      return input;
    },
    readout(text = '') {
      const span = document.createElement('span');
      span.style.fontVariantNumeric = 'tabular-nums';
      span.style.color = 'var(--fg-1)';
      span.textContent = text;
      current.append(span);
      return span;
    },
  };
}
