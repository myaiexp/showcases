// Slider rows for the animation-group example: label, range input and live value
export interface Slider {
  row: HTMLElement;
  input: HTMLInputElement;
}

export function slider(label: string, min: number, max: number, value: number, onInput: (v: number) => void): Slider {
  const row = document.createElement('label');
  const text = document.createElement('span');
  const input = document.createElement('input');
  const out = document.createElement('output');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = '0.05';
  input.value = String(value);
  text.textContent = label;
  out.textContent = value.toFixed(2);
  input.oninput = () => {
    out.textContent = Number(input.value).toFixed(2);
    onInput(Number(input.value));
  };
  row.append(text, input, out);
  return { row, input };
}
