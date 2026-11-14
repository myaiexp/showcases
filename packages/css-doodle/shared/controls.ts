// Full-view inputs for css-doodle examples: toggles, selects, sliders, text

export function checkbox(bar: HTMLElement, label: string, checked: boolean, onChange: (v: boolean) => void): HTMLInputElement {
  const wrap = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));
  wrap.append(input, label);
  bar.append(wrap);
  return input;
}

/** A select over `options`, shown by their labels. */
export function select<T>(
  bar: HTMLElement,
  label: string,
  options: readonly (readonly [T, string])[],
  onChange: (v: T) => void,
  value: T = options[0]![0],
): HTMLSelectElement {
  const wrap = document.createElement('label');
  const sel = document.createElement('select');
  options.forEach(([v, text], i) => {
    sel.add(new Option(text, String(i), false, v === value));
  });
  sel.addEventListener('change', () => onChange(options[Number(sel.value)]![0]));
  wrap.append(label, sel);
  bar.append(wrap);
  return sel;
}

export function button(bar: HTMLElement, label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'btn';
  b.textContent = label;
  b.addEventListener('click', onClick);
  bar.append(b);
  return b;
}

export function slider(
  bar: HTMLElement,
  label: string,
  min: number,
  max: number,
  step: number,
  value: number,
  onInput: (v: number) => void,
  format: (v: number) => string = String,
): HTMLInputElement {
  const wrap = document.createElement('label');
  const text = document.createElement('span');
  const input = document.createElement('input');
  Object.assign(input, { type: 'range', min: String(min), max: String(max), step: String(step) });
  input.value = String(value);
  const show = (): void => {
    text.textContent = `${label} ${format(Number(input.value))}`;
  };
  input.addEventListener('input', () => {
    show();
    onInput(Number(input.value));
  });
  show();
  wrap.append(text, input);
  bar.append(wrap);
  return input;
}

export function textInput(bar: HTMLElement, label: string, value: string, onInput: (v: string) => void, size = 6): HTMLInputElement {
  const wrap = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'text';
  input.size = size;
  input.value = value;
  input.spellcheck = false;
  input.addEventListener('input', () => onInput(input.value));
  wrap.append(label, input);
  bar.append(wrap);
  return input;
}

/** A colour picker. `onInput` gets the colour as [r, g, b, a] in 0..1, the shape vec4 uniforms take. */
export function colorInput(bar: HTMLElement, label: string, hex: string, onInput: (rgba: [number, number, number, number]) => void): HTMLInputElement {
  const wrap = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'color';
  input.value = hex;
  input.addEventListener('input', () => onInput(hexToRgba(input.value)));
  wrap.append(label, input);
  bar.append(wrap);
  return input;
}

/** '#ff8800' as [1, 0.53, 0, 1]. */
export function hexToRgba(hex: string): [number, number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255, 1];
}

/** A plain-text readout in the bar; returns a setter. */
export function readout(bar: HTMLElement, initial = ''): (text: string) => void {
  const span = document.createElement('span');
  span.className = 'cd-readout';
  span.textContent = initial;
  bar.append(span);
  return (text) => {
    span.textContent = text;
  };
}
