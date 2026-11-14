// Full-view inputs for Chart.js examples: buttons, selects, sliders, log
/** The row above the chart that holds an example's controls. Never built in a card. */
export function controlBar(el: HTMLElement): HTMLDivElement {
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 14px',
    alignItems: 'center',
    width: '100%',
    padding: '0 0 10px',
    fontSize: '13px',
  });
  el.append(bar);
  return bar;
}

function labelled(bar: HTMLElement, label: string, ...parts: HTMLElement[]): HTMLLabelElement {
  const wrap = document.createElement('label');
  Object.assign(wrap.style, { display: 'flex', gap: '6px', alignItems: 'center' });
  wrap.append(label, ...parts);
  bar.append(wrap);
  return wrap;
}

export function button(bar: HTMLElement, label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.addEventListener('click', onClick);
  bar.append(b);
  return b;
}

export function select<T extends string>(
  bar: HTMLElement,
  label: string,
  values: readonly T[],
  value: T,
  onChange: (v: T) => void,
): HTMLSelectElement {
  const sel = document.createElement('select');
  for (const v of values) sel.add(new Option(v, v, v === value, v === value));
  sel.addEventListener('change', () => onChange(sel.value as T));
  labelled(bar, label, sel);
  return sel;
}

export function slider(
  bar: HTMLElement,
  label: string,
  [min, max, step]: readonly [number, number, number],
  value: number,
  onInput: (v: number) => void,
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  const out = document.createElement('output');
  out.style.minWidth = '3ch';
  out.style.fontVariantNumeric = 'tabular-nums';
  out.textContent = input.value;
  input.addEventListener('input', () => {
    out.textContent = input.value;
    onInput(Number(input.value));
  });
  labelled(bar, label, input, out);
  return input;
}

export function toggle(bar: HTMLElement, label: string, value: boolean, onChange: (v: boolean) => void): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = value;
  input.addEventListener('change', () => onChange(input.checked));
  labelled(bar, label, input);
  return input;
}

/** A small scrolling text log under the chart, newest line first. */
export function log(el: HTMLElement, lines = 6): (text: string) => void {
  const pre = document.createElement('pre');
  Object.assign(pre.style, {
    width: '100%',
    margin: '8px 0 0',
    font: '12px ui-monospace, monospace',
    color: 'var(--fg-2)',
    minHeight: `${lines * 1.4}em`,
    whiteSpace: 'pre-wrap',
  });
  el.append(pre);
  const kept: string[] = [];
  return (text) => {
    kept.unshift(text);
    kept.length = Math.min(kept.length, lines);
    pre.textContent = kept.join('\n');
  };
}
