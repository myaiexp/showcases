// Control-bar inputs for the full view: buttons, sliders, selects, checks
function labelled(text: string): HTMLLabelElement {
  const wrap = document.createElement('label');
  wrap.style.display = 'flex';
  wrap.style.gap = '6px';
  wrap.style.alignItems = 'center';
  wrap.style.fontSize = '13px';
  wrap.append(text);
  return wrap;
}

/** A centred, wrapping row under the stage. */
export function controlBar(el: HTMLElement): HTMLDivElement {
  const bar = document.createElement('div');
  bar.style.display = 'flex';
  bar.style.flexWrap = 'wrap';
  bar.style.gap = '8px 14px';
  bar.style.alignItems = 'center';
  bar.style.justifyContent = 'center';
  bar.style.marginTop = '12px';
  bar.style.width = '100%';
  el.append(bar);
  return bar;
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

/** A range input whose label shows the current value. */
export function slider(
  bar: HTMLElement,
  label: string,
  min: number,
  max: number,
  step: number,
  value: number,
  onInput: (v: number) => void,
): HTMLInputElement {
  const wrap = labelled('');
  const text = document.createElement('span');
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
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
  initial?: T,
): HTMLSelectElement {
  const wrap = labelled(label);
  const sel = document.createElement('select');
  for (const o of options) sel.add(new Option(o, o));
  if (initial !== undefined) sel.value = initial;
  sel.addEventListener('change', () => onChange(sel.value as T));
  wrap.append(sel);
  bar.append(wrap);
  return sel;
}

export function check(bar: HTMLElement, label: string, value: boolean, onChange: (v: boolean) => void): HTMLInputElement {
  const wrap = labelled('');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = value;
  input.addEventListener('change', () => onChange(input.checked));
  wrap.prepend(input);
  wrap.append(label);
  bar.append(wrap);
  return input;
}

/** A line of monospace text under the stage, for readouts and event logs. */
export function readout(el: HTMLElement, initial = ''): HTMLDivElement {
  const line = document.createElement('div');
  line.style.marginTop = '10px';
  line.style.fontFamily = 'var(--font-mono, monospace)';
  line.style.fontSize = '13px';
  line.style.color = 'var(--fg-2)';
  line.style.textAlign = 'center';
  line.style.minHeight = '1.4em';
  line.style.width = '100%';
  line.style.whiteSpace = 'pre-wrap';
  line.textContent = initial;
  el.append(line);
  return line;
}
