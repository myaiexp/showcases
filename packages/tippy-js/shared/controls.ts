// Full-view inputs for Tippy.js examples: sliders, selects, toggles, buttons, logs
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

/** A line of monospace status text; set `.textContent` to update it. */
export function readout(parent: HTMLElement, text = ''): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = 'font:12px/1.4 ui-monospace,monospace;color:var(--fg-2);white-space:pre-wrap';
  div.textContent = text;
  parent.append(div);
  return div;
}

/** A scrolling list of timestamped lines, newest at the bottom, keeping the last `max`. */
export function log(parent: HTMLElement, max = 8): { add(line: string): void; clear(): void; el: HTMLElement } {
  const el = document.createElement('div');
  el.style.cssText =
    'font:12px/1.5 ui-monospace,monospace;color:var(--fg-2);white-space:pre;overflow:hidden;min-height:1.5em';
  parent.append(el);
  const t0 = performance.now();
  return {
    el,
    add(line) {
      const row = document.createElement('div');
      row.textContent = `${((performance.now() - t0) / 1000).toFixed(2).padStart(6)}s  ${line}`;
      el.append(row);
      while (el.childElementCount > max) el.firstElementChild?.remove();
    },
    clear() {
      el.replaceChildren();
    },
  };
}
