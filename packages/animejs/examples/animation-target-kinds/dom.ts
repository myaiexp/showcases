// Small DOM builders shared by this example: labelled readouts, buttons, sliders
export const h = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className = '',
  text = '',
  parent?: HTMLElement,
): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  parent?.append(node);
  return node;
};

/** A label plus a value cell; returns the value element. */
export const readout = (parent: HTMLElement, label: string, initial = '0'): HTMLElement => {
  const box = h('div', 'readout', '', parent);
  h('span', 'label', label, box);
  return h('span', 'value', initial, box);
};

export const button = (parent: HTMLElement, label: string, onClick: () => void, primary = false): HTMLButtonElement => {
  const b = h('button', primary ? 'btn btn-primary' : 'btn', label, parent);
  b.addEventListener('click', onClick);
  return b;
};

export const slider = (
  parent: HTMLElement,
  label: string,
  min: number,
  max: number,
  value: number,
  step: number,
  onInput: (v: number) => void,
): HTMLInputElement => {
  const row = h('label', 'slider', '', parent);
  h('span', 'label', label, row);
  const input = h('input', '', '', row);
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  input.addEventListener('input', () => onInput(+input.value));
  return input;
};
