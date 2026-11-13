// Control-bar inputs shared by the examples: a labelled slider and a select
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
  wrap.style.display = 'flex';
  wrap.style.gap = '6px';
  wrap.style.alignItems = 'center';
  wrap.style.fontSize = '13px';
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

export function select(
  bar: HTMLElement,
  label: string,
  options: string[],
  onChange: (v: string) => void,
): HTMLSelectElement {
  const wrap = document.createElement('label');
  wrap.style.display = 'flex';
  wrap.style.gap = '6px';
  wrap.style.alignItems = 'center';
  wrap.style.fontSize = '13px';
  const sel = document.createElement('select');
  for (const o of options) sel.add(new Option(o, o));
  sel.addEventListener('change', () => onChange(sel.value));
  wrap.append(label, sel);
  bar.append(wrap);
  return sel;
}
