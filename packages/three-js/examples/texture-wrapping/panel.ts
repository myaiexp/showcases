// Control-panel helpers: labelled sliders, checkboxes and selects built with h()
import { h } from '@/ui/dom.ts';

export interface SliderOpts {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onInput: (value: number) => void;
  /** Formats the readout next to the slider. */
  format?: (value: number) => string;
}

export interface SliderControl {
  row: HTMLElement;
  input: HTMLInputElement;
  /** Set the value from code and refresh the readout (does not call onInput). */
  set: (value: number) => void;
}

export function slider(o: SliderOpts): SliderControl {
  const fmt = o.format ?? ((v: number) => v.toFixed(2));
  const input = h('input', {
    type: 'range',
    min: String(o.min),
    max: String(o.max),
    step: String(o.step),
    value: String(o.value),
  });
  const out = h('output', {}, fmt(o.value));
  input.addEventListener('input', () => {
    const v = Number(input.value);
    out.textContent = fmt(v);
    o.onInput(v);
  });
  const row = h('label', { class: 'row' }, h('span', {}, o.label), input, out);
  return {
    row,
    input,
    set: (v) => {
      input.value = String(v);
      out.textContent = fmt(v);
    },
  };
}

export function checkbox(label: string, checked: boolean, onChange: (on: boolean) => void): HTMLElement {
  const input = h('input', { type: 'checkbox' });
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));
  return h('label', { class: 'row check' }, input, h('span', {}, label));
}

export function select(
  label: string,
  options: readonly string[],
  value: string,
  onChange: (value: string) => void,
): HTMLElement {
  const sel = h('select', {}, ...options.map((o) => h('option', { value: o }, o)));
  sel.value = value;
  sel.addEventListener('change', () => onChange(sel.value));
  return h('label', { class: 'row' }, h('span', {}, label), sel);
}
