// Side-panel rows for the full view: sliders, colours, toggles, selects, buttons
import { h } from '@/ui/dom.ts';

const fmt = (v: number, step: number): string => (step >= 1 ? String(Math.round(v)) : v.toFixed(step >= 0.1 ? 1 : 2));

export function heading(panel: HTMLElement, text: string): void {
  panel.append(h('h4', {}, text));
}

/** A line of plain text, e.g. what a parameter does according to the docs. */
export function note(panel: HTMLElement, text: string): HTMLElement {
  const p = h('p', { class: 'tt-note' }, text);
  panel.append(p);
  return p;
}

export interface Row<T> {
  /** Shows `v` without firing the change callback. */
  set(v: T): void;
}

export function slider(
  panel: HTMLElement,
  label: string,
  range: { min: number; max: number; step: number; value: number },
  onInput: (v: number) => void,
): Row<number> {
  const input = h('input', {
    type: 'range',
    min: String(range.min),
    max: String(range.max),
    step: String(range.step),
    value: String(range.value),
  });
  const out = h('output', {}, fmt(range.value, range.step));
  input.addEventListener('input', () => {
    out.textContent = fmt(input.valueAsNumber, range.step);
    onInput(input.valueAsNumber);
  });
  panel.append(h('label', { class: 'tt-row' }, h('span', { title: label }, label), input, out));
  return {
    set: (v) => {
      input.value = String(v);
      out.textContent = fmt(v, range.step);
    },
  };
}

/** A colour picker; values are 0xRRGGBB numbers, as the docs write colours. */
export function colour(panel: HTMLElement, label: string, hex: number, onInput: (hex: number) => void): Row<number> {
  const css = (n: number): string => `#${n.toString(16).padStart(6, '0')}`;
  const input = h('input', { type: 'color', value: css(hex) });
  input.addEventListener('input', () => onInput(parseInt(input.value.slice(1), 16)));
  panel.append(h('label', { class: 'tt-row' }, h('span', { title: label }, label), input, h('output')));
  return { set: (v) => void (input.value = css(v)) };
}

export function toggle(panel: HTMLElement, label: string, checked: boolean, onChange: (on: boolean) => void): Row<boolean> {
  const input = h('input', { type: 'checkbox' });
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));
  panel.append(h('label', { class: 'tt-row' }, h('span', { title: label }, label), input, h('output')));
  return { set: (v) => void (input.checked = v) };
}

export function select<T extends string>(
  panel: HTMLElement,
  label: string,
  options: readonly (T | { value: T; label: string })[],
  value: T,
  onChange: (v: T) => void,
): Row<T> {
  const el = h(
    'select',
    {},
    ...options.map((o) => (typeof o === 'string' ? h('option', { value: o }, o) : h('option', { value: o.value }, o.label))),
  );
  el.value = value;
  el.addEventListener('change', () => onChange(el.value as T));
  panel.append(h('label', { class: 'tt-row' }, h('span', { title: label }, label), el, h('output')));
  return { set: (v) => void (el.value = v) };
}

/** A row of buttons; returns them in order. */
export function buttons(panel: HTMLElement, items: readonly [label: string, onClick: () => void][]): HTMLButtonElement[] {
  const row = h('div', { class: 'tt-buttons' });
  const made = items.map(([label, onClick]) => {
    const b = h('button', { class: 'btn', type: 'button' }, label);
    b.addEventListener('click', onClick);
    row.append(b);
    return b;
  });
  panel.append(row);
  return made;
}
