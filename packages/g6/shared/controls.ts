// Full-view inputs for the G6 examples: selects, sliders, toggles, buttons, readout
/** The row above the graph that holds an example's controls. Never built in a card. */
export function controlBar(el: HTMLElement): HTMLDivElement {
  const bar = document.createElement('div');
  bar.className = 'g6-bar';
  el.append(bar);
  return bar;
}

function labelled(bar: HTMLElement, label: string, input: HTMLElement, after?: HTMLElement): HTMLLabelElement {
  const wrap = document.createElement('label');
  wrap.append(label, input);
  if (after) wrap.append(after);
  bar.append(wrap);
  return wrap;
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

export function button(bar: HTMLElement, label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.addEventListener('click', onClick);
  bar.append(b);
  return b;
}

/** A small text line under the graph, for event logs and other read-outs. */
export function readout(el: HTMLElement): HTMLPreElement {
  const pre = document.createElement('pre');
  pre.className = 'g6-readout';
  el.append(pre);
  return pre;
}
