// Full-view inputs for Zephyr3D examples: selects, sliders, toggles, buttons
/**
 * Examples run inside their iframe but their controls sit in the gallery page, so every
 * element is made with the bar's own document (bar.ownerDocument), never the iframe's.
 */

/** The row above the view that holds an example's controls. Never built in a card. */
export function controlBar(el: HTMLElement): HTMLDivElement {
  const bar = el.ownerDocument.createElement('div');
  bar.className = 'z3s-bar';
  el.append(bar);
  return bar;
}

function make<K extends keyof HTMLElementTagNameMap>(bar: HTMLElement, tag: K): HTMLElementTagNameMap[K] {
  return bar.ownerDocument.createElement(tag);
}

function labelled(bar: HTMLElement, label: string, input: HTMLElement, after?: HTMLElement): HTMLLabelElement {
  const wrap = make(bar, 'label');
  wrap.append(label, input);
  if (after) wrap.append(after);
  bar.append(wrap);
  return wrap;
}

export function select<T extends string>(
  bar: HTMLElement,
  label: string,
  values: readonly T[],
  value: T,
  onChange: (v: T) => void,
): HTMLSelectElement {
  const sel = make(bar, 'select');
  for (const v of values) {
    const opt = make(bar, 'option');
    opt.value = v;
    opt.textContent = v;
    opt.selected = v === value;
    sel.append(opt);
  }
  sel.addEventListener('change', () => onChange(sel.value as T));
  labelled(bar, label, sel);
  return sel;
}

export function slider(
  bar: HTMLElement,
  label: string,
  [min, max, step]: readonly [number, number, number],
  value: number,
  onInput: (v: number) => void,
): HTMLInputElement {
  const input = make(bar, 'input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  const out = make(bar, 'output');
  out.textContent = input.value;
  input.addEventListener('input', () => {
    out.textContent = input.value;
    onInput(Number(input.value));
  });
  labelled(bar, label, input, out);
  return input;
}

export function toggle(bar: HTMLElement, label: string, value: boolean, onChange: (v: boolean) => void): HTMLInputElement {
  const input = make(bar, 'input');
  input.type = 'checkbox';
  input.checked = value;
  input.addEventListener('change', () => onChange(input.checked));
  labelled(bar, label, input);
  return input;
}

export function button(bar: HTMLElement, label: string, onClick: () => void): HTMLButtonElement {
  const b = make(bar, 'button');
  b.type = 'button';
  b.textContent = label;
  b.addEventListener('click', onClick);
  bar.append(b);
  return b;
}

/** A colour input; onInput gets r, g, b in 0..1. */
export function color(bar: HTMLElement, label: string, hex: string, onInput: (r: number, g: number, b: number) => void): HTMLInputElement {
  const input = make(bar, 'input');
  input.type = 'color';
  input.value = hex;
  input.addEventListener('input', () => {
    const n = parseInt(input.value.slice(1), 16);
    onInput(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
  });
  labelled(bar, label, input);
  return input;
}
