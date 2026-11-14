// Full-view inputs for Wretch examples: toggles, selects, sliders, files

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

/**
 * "Open a file…" button plus dropping a file anywhere on `dropZone`. The file never
 * leaves the browser: it goes straight to `onFile`.
 */
export function filePicker(bar: HTMLElement, dropZone: HTMLElement, onFile: (file: File) => void, accept = ''): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.className = 'wr-file-input';
  input.addEventListener('change', () => {
    const f = input.files?.[0];
    if (f) onFile(f);
  });
  button(bar, 'Open a file…', () => input.click());
  bar.append(input);
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('wr-drop');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('wr-drop'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('wr-drop');
    const f = e.dataTransfer?.files[0];
    if (f) onFile(f);
  });
  return input;
}
