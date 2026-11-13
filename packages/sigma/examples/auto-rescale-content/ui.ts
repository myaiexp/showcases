// Tiny DOM helpers for the control row shown under the stage in the full view
export function controlRow(parent: HTMLElement): HTMLElement {
  const row = document.createElement('div');
  row.className = 'controls';
  parent.append(row);
  return row;
}

function field(row: HTMLElement, text: string): HTMLLabelElement {
  const label = document.createElement('label');
  label.className = 'field';
  const caption = document.createElement('span');
  caption.textContent = text;
  label.append(caption);
  row.append(label);
  return label;
}

export function addSelect(
  row: HTMLElement,
  text: string,
  options: readonly string[],
  initial: string,
  onChange: (value: string) => void,
): HTMLSelectElement {
  const select = document.createElement('select');
  for (const option of options) {
    const node = document.createElement('option');
    node.value = option;
    node.textContent = option;
    select.append(node);
  }
  select.value = initial;
  select.addEventListener('change', () => onChange(select.value));
  field(row, text).append(select);
  return select;
}

export function addRange(
  row: HTMLElement,
  text: string,
  [min, max, step]: readonly [number, number, number],
  initial: number,
  onChange: (value: number) => void,
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(initial);
  const readout = document.createElement('output');
  readout.textContent = String(initial);
  input.addEventListener('input', () => {
    readout.textContent = input.value;
    onChange(Number(input.value));
  });
  field(row, text).append(input, readout);
  return input;
}

export function addButton(row: HTMLElement, text: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  button.addEventListener('click', onClick);
  row.append(button);
  return button;
}

export function addColor(
  row: HTMLElement,
  text: string,
  initial: string,
  onChange: (value: string) => void,
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'color';
  input.value = initial;
  input.addEventListener('input', () => onChange(input.value));
  field(row, text).append(input);
  return input;
}
