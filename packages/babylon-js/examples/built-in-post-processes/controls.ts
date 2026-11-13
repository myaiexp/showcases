// Small DOM helpers for the control panel: sliders, colour inputs, toggles and buttons

/** A wrapping row under the canvas; remove it in the example's cleanup. */
export function createPanel(el: HTMLElement): HTMLDivElement {
  const panel = document.createElement('div');
  panel.className = 'panel';
  el.append(panel);
  return panel;
}

function field(panel: HTMLElement, text: string): HTMLLabelElement {
  const label = document.createElement('label');
  label.className = 'field';
  label.append(text);
  panel.append(label);
  return label;
}

export function addSlider(
  panel: HTMLElement,
  text: string,
  [min, max, step]: [number, number, number],
  value: number,
  onInput: (value: number) => void,
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  input.addEventListener('input', () => onInput(Number(input.value)));
  field(panel, text).append(input);
  return input;
}

export function addColor(panel: HTMLElement, text: string, value: string, onInput: (hex: string) => void): void {
  const input = document.createElement('input');
  input.type = 'color';
  input.value = value;
  input.addEventListener('input', () => onInput(input.value));
  field(panel, text).append(input);
}

export function addToggle(panel: HTMLElement, text: string, checked: boolean, onChange: (on: boolean) => void): void {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));
  field(panel, text).prepend(input);
}

export function addButton(panel: HTMLElement, text: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.classList.add('btn');
  button.type = 'button';
  button.textContent = text;
  button.addEventListener('click', onClick);
  panel.append(button);
  return button;
}
