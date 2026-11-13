// Control-bar inputs for the full view: sliders, selects, buttons, readouts
const ROW = 'display:flex;gap:6px;align-items:center;font-size:13px';

/** A wrapping row of controls under the canvas. */
export function controlBar(el: HTMLElement): HTMLDivElement {
  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;width:100%;padding:8px 4px 0';
  el.append(bar);
  return bar;
}

export function slider(
  bar: HTMLElement,
  label: string,
  min: number,
  max: number,
  step: number,
  value: number,
  onInput: (v: number) => void,
): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.style.cssText = ROW;
  const text = document.createElement('span');
  const input = document.createElement('input');
  Object.assign(input, { type: 'range', min: String(min), max: String(max), step: String(step) });
  input.value = String(value);
  const show = (): void => {
    text.textContent = `${label} ${Number(input.value)}`;
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

/** A label pinned over the top-left of a stage, for cards and status lines. */
export function overlay(el: HTMLElement, text = ''): HTMLDivElement {
  el.style.position = 'relative';
  const div = document.createElement('div');
  div.style.cssText =
    'position:absolute;left:8px;top:6px;font:12px/1.3 ui-monospace,monospace;color:#e8ecf2;text-shadow:0 1px 2px #000;pointer-events:none;white-space:pre';
  div.textContent = text;
  el.append(div);
  return div;
}
