// Full-view inputs for Embedding Atlas examples: sliders, selects, toggles
const ROW = 'display:flex;gap:6px;align-items:center;font-size:13px';

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
  wrap.style.cssText = ROW;
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

export function select<T extends string>(
  bar: HTMLElement,
  label: string,
  options: readonly T[],
  onChange: (v: T) => void,
  value: T = options[0]!,
): HTMLSelectElement {
  const wrap = document.createElement('label');
  wrap.style.cssText = ROW;
  const sel = document.createElement('select');
  for (const o of options) sel.add(new Option(o, o));
  sel.value = value;
  sel.addEventListener('change', () => onChange(sel.value as T));
  wrap.append(label, sel);
  bar.append(wrap);
  return sel;
}

export function checkbox(bar: HTMLElement, label: string, checked: boolean, onChange: (v: boolean) => void): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.style.cssText = ROW;
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));
  wrap.append(input, label);
  bar.append(wrap);
  return input;
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

export function textInput(bar: HTMLElement, label: string, value: string, onChange: (v: string) => void): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.style.cssText = ROW;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.style.width = '14em';
  input.addEventListener('change', () => onChange(input.value));
  wrap.append(label, input);
  bar.append(wrap);
  return input;
}

/** A line of monospace status text; set `.textContent` to update it. */
export function readout(parent: HTMLElement, text = ''): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText =
    'font:12px/1.4 ui-monospace,monospace;color:var(--fg-2);white-space:pre-wrap;max-width:100%;overflow-wrap:anywhere';
  div.textContent = text;
  parent.append(div);
  return div;
}

/** A scrolling list of the latest events, newest first, capped at `max` lines. */
export function eventLog(parent: HTMLElement, max = 8): (line: string) => void {
  const box = document.createElement('div');
  box.style.cssText = `font:12px/1.45 ui-monospace,monospace;color:var(--fg-2);width:100%;max-width:680px;
    min-height:${max * 1.45}em;white-space:pre;overflow:hidden`;
  parent.append(box);
  const lines: string[] = [];
  return (line) => {
    lines.unshift(line);
    lines.length = Math.min(lines.length, max);
    box.textContent = lines.join('\n');
  };
}
