// Small DOM helpers for the example's control row (built with createElement, no innerHTML)
export function controlsRow(parent: HTMLElement): HTMLDivElement {
  const row = document.createElement('div');
  row.className = 'controls';
  parent.append(row);
  return row;
}

export function button(label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.addEventListener('click', onClick);
  return b;
}

export function checkbox(label: string, checked: boolean, onChange: (value: boolean) => void): HTMLLabelElement {
  const wrap = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));
  wrap.append(input, ` ${label}`);
  return wrap;
}

export function slider(
  label: string,
  [min, max, step, value]: [number, number, number, number],
  onInput: (value: number) => void,
): HTMLLabelElement {
  const wrap = document.createElement('label');
  const readout = document.createElement('span');
  readout.textContent = String(value);
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  input.addEventListener('input', () => {
    readout.textContent = input.value;
    onInput(Number(input.value));
  });
  wrap.append(`${label} `, input, ' ', readout);
  return wrap;
}
