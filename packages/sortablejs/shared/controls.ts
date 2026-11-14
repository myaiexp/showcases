// Full-view inputs for Sortable examples: buttons, sliders, selects, logs
const ROW = 'display:flex;gap:6px;align-items:center;font-size:13px';

/** A wrapping row of controls appended to `parent`. */
export function bar(parent: HTMLElement): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;justify-content:center;padding:8px 0';
  parent.append(div);
  return div;
}

export function button(parent: HTMLElement, label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'btn';
  b.textContent = label;
  b.addEventListener('click', onClick);
  parent.append(b);
  return b;
}

export function slider(
  parent: HTMLElement,
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
  parent.append(wrap);
  return input;
}

export function select<T extends string>(
  parent: HTMLElement,
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
  parent.append(wrap);
  return sel;
}

export function checkbox(parent: HTMLElement, label: string, checked: boolean, onChange: (v: boolean) => void): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.style.cssText = ROW;
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));
  wrap.append(input, label);
  parent.append(wrap);
  return input;
}

/** A line of monospace status text; set `.textContent` to update it. */
export function readout(parent: HTMLElement, text = ''): HTMLDivElement {
  const div = document.createElement('div');
  div.style.cssText = 'font:12px/1.4 ui-monospace,monospace;color:var(--fg-2);white-space:pre-wrap;text-align:center';
  div.textContent = text;
  parent.append(div);
  return div;
}

/** A scrolling log that keeps the newest `max` lines on top. */
export function log(parent: HTMLElement, max = 8): { add(line: string): void; clear(): void; el: HTMLDivElement } {
  const div = document.createElement('div');
  div.style.cssText =
    'font:12px/1.5 ui-monospace,monospace;color:var(--fg-2);background:var(--bg-surface);border:1px solid var(--border);' +
    'border-radius:6px;padding:6px 10px;min-height:3em;width:100%;max-width:420px;box-sizing:border-box;overflow:hidden';
  parent.append(div);
  return {
    el: div,
    add(line) {
      const row = document.createElement('div');
      row.textContent = line;
      div.prepend(row);
      while (div.childElementCount > max) div.lastElementChild!.remove();
    },
    clear() {
      div.replaceChildren();
    },
  };
}
