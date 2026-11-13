// Control-panel builders for this example: labelled sliders, selects and checkboxes
import { h } from '@/ui/dom.ts';

export interface Slider {
  row: HTMLElement;
  input: HTMLInputElement;
  /** Move the thumb and the readout without firing onInput. */
  set(value: number): void;
}

export function slider(
  label: string,
  min: number,
  max: number,
  step: number,
  value: number,
  onInput: (value: number) => void,
  digits = 2,
): Slider {
  const input = h('input', {
    type: 'range',
    min: String(min),
    max: String(max),
    step: String(step),
    value: String(value),
  });
  const out = h('output');
  const show = (): void => {
    out.textContent = Number(input.value).toFixed(digits);
  };
  show();
  input.addEventListener('input', () => {
    show();
    onInput(Number(input.value));
  });
  const row = h('label', { class: 'ctl' }, h('span', {}, label), input, out);
  return {
    row,
    input,
    set(v) {
      input.value = String(v);
      show();
    },
  };
}

export function select<T extends string>(
  label: string,
  options: readonly T[],
  value: T,
  onChange: (value: T) => void,
): { row: HTMLElement; input: HTMLSelectElement } {
  const input = h('select');
  for (const o of options) input.append(h('option', { value: o }, o));
  input.value = value;
  input.addEventListener('change', () => onChange(input.value as T));
  return { row: h('label', { class: 'ctl' }, h('span', {}, label), input), input };
}

export function checkbox(
  label: string,
  checked: boolean,
  onChange: (value: boolean) => void,
): { row: HTMLElement; input: HTMLInputElement } {
  const input = h('input', { type: 'checkbox' });
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));
  return { row: h('label', { class: 'ctl check' }, input, h('span', {}, label)), input };
}

export function panel(...rows: HTMLElement[]): HTMLElement {
  return h('div', { class: 'panel' }, ...rows);
}
