// Small DOM helpers for building the control rows of this example
export const controlRow = (parent: HTMLElement): HTMLElement => {
  const row = document.createElement('div');
  row.className = 'controls';
  parent.append(row);
  return row;
};

export const button = (parent: HTMLElement, label: string, onClick: () => void): HTMLButtonElement => {
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  parent.append(btn);
  return btn;
};

export interface SliderOptions {
  min: number;
  max: number;
  step: number;
  value: number;
}

/** A labelled range input with a live value readout. */
export const slider = (
  parent: HTMLElement,
  label: string,
  opts: SliderOptions,
  onInput: (value: number) => void,
): HTMLInputElement => {
  const wrap = document.createElement('label');
  wrap.className = 'slider';
  const name = document.createElement('span');
  name.textContent = label;
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(opts.min);
  input.max = String(opts.max);
  input.step = String(opts.step);
  input.value = String(opts.value);
  const out = document.createElement('output');
  out.textContent = input.value;
  input.addEventListener('input', () => {
    out.textContent = input.value;
    onInput(Number(input.value));
  });
  wrap.append(name, input, out);
  parent.append(wrap);
  return input;
};

/** Marks the one active button of a group. */
export const setActive = (buttons: HTMLButtonElement[], active: number): void => {
  buttons.forEach((b, i) => b.classList.toggle('btn-primary', i === active));
};
