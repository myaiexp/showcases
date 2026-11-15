// Full-view inputs for cosmos.gl examples: buttons, sliders, toggles, selects
export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

export function addButton(bar: HTMLElement, label: string, onClick: () => void, signal: AbortSignal): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.addEventListener('click', onClick, { signal });
  bar.append(b);
  return b;
}

export function addSlider(
  bar: HTMLElement,
  label: string,
  min: number,
  max: number,
  step: number,
  value: number,
  onInput: (v: number) => void,
  signal: AbortSignal,
): HTMLInputElement {
  const wrap = document.createElement('label');
  const name = document.createElement('span');
  name.textContent = label;
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  const out = document.createElement('output');
  const decimals = step >= 1 ? 0 : Math.min(4, Math.ceil(-Math.log10(step)));
  out.textContent = value.toFixed(decimals);
  input.addEventListener(
    'input',
    () => {
      const v = Number(input.value);
      out.textContent = v.toFixed(decimals);
      onInput(v);
    },
    { signal },
  );
  wrap.append(name, input, out);
  bar.append(wrap);
  return input;
}

export function addToggle(
  bar: HTMLElement,
  label: string,
  checked: boolean,
  onChange: (on: boolean) => void,
  signal: AbortSignal,
): HTMLInputElement {
  const wrap = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked), { signal });
  const name = document.createElement('span');
  name.textContent = label;
  wrap.append(input, name);
  bar.append(wrap);
  return input;
}

export function addSelect<T extends string>(
  bar: HTMLElement,
  label: string,
  options: readonly SelectOption<T>[],
  value: T,
  onChange: (v: T) => void,
  signal: AbortSignal,
): HTMLSelectElement {
  const wrap = document.createElement('label');
  const name = document.createElement('span');
  name.textContent = label;
  const select = document.createElement('select');
  for (const o of options) {
    const opt = document.createElement('option');
    opt.value = o.value;
    opt.textContent = o.label;
    select.append(opt);
  }
  select.value = value;
  select.addEventListener(
    'change',
    () => {
      const picked = options.find((o) => o.value === select.value);
      if (picked) onChange(picked.value);
    },
    { signal },
  );
  wrap.append(name, select);
  bar.append(wrap);
  return select;
}
