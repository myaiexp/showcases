// Small DOM helpers for example controls and readouts: elements, buttons, checkboxes, sliders
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls = '',
  text = '',
  parent?: HTMLElement,
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  parent?.append(e);
  return e;
}

export function btn(text: string, fn: () => void, parent: HTMLElement): HTMLButtonElement {
  const b = h('button', 'btn', text, parent);
  b.addEventListener('click', fn);
  return b;
}

export function check(text: string, fn: (on: boolean) => void, parent: HTMLElement): HTMLInputElement {
  const label = h('label', 'chk', '', parent);
  const input = h('input', '', '', label);
  input.type = 'checkbox';
  input.addEventListener('change', () => fn(input.checked));
  label.append(text);
  return input;
}

export function slider(
  text: string,
  min: number,
  max: number,
  step: number,
  value: number,
  fn: (v: number) => void,
  parent: HTMLElement,
): HTMLInputElement {
  const label = h('label', 'chk', text, parent);
  const input = h('input', '', '', label);
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  input.addEventListener('input', () => fn(Number(input.value)));
  return input;
}
