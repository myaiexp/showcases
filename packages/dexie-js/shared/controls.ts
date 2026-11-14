// Full-view inputs for Dexie examples: buttons, fields, selects, sliders
import type { Stage } from './stage.ts';

/** A button whose async handler reports errors in the scene (see Stage.action). */
export function button(stage: Stage, label: string, onClick: () => unknown, primary = false): HTMLButtonElement {
  const b = document.createElement('button');
  b.className = primary ? 'btn btn-primary' : 'btn';
  b.textContent = label;
  b.addEventListener('click', stage.action(onClick));
  stage.bar?.append(b);
  return b;
}

/** A labelled text field; Enter calls `onEnter` when given. */
export function textField(
  stage: Stage,
  label: string,
  value = '',
  onEnter?: (v: string) => unknown,
  width = 120,
): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.className = 'dx-field';
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.style.width = `${width}px`;
  if (onEnter) {
    const go = stage.action(() => onEnter(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') go();
    });
  }
  wrap.append(label, input);
  stage.bar?.append(wrap);
  return input;
}

export function numberField(stage: Stage, label: string, value: number, min?: number, max?: number): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.className = 'dx-field';
  const input = document.createElement('input');
  input.type = 'number';
  input.value = String(value);
  if (min !== undefined) input.min = String(min);
  if (max !== undefined) input.max = String(max);
  input.style.width = '64px';
  wrap.append(label, input);
  stage.bar?.append(wrap);
  return input;
}

export function select<T extends string>(
  stage: Stage,
  label: string,
  options: readonly T[],
  onChange: (v: T) => unknown,
  value: T = options[0]!,
): HTMLSelectElement {
  const wrap = document.createElement('label');
  wrap.className = 'dx-field';
  const sel = document.createElement('select');
  for (const o of options) sel.add(new Option(o, o));
  sel.value = value;
  const go = (): void => stage.action(() => onChange(sel.value as T))();
  sel.addEventListener('change', go);
  wrap.append(label, sel);
  stage.bar?.append(wrap);
  return sel;
}

export function slider(
  stage: Stage,
  label: string,
  min: number,
  max: number,
  value: number,
  onInput: (v: number) => unknown,
  step = 1,
): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.className = 'dx-field';
  const text = document.createElement('span');
  const input = document.createElement('input');
  Object.assign(input, { type: 'range', min: String(min), max: String(max), step: String(step) });
  input.value = String(value);
  const show = (): void => {
    text.textContent = `${label} ${input.value}`;
  };
  input.addEventListener('input', () => {
    show();
    stage.action(() => onInput(Number(input.value)))();
  });
  show();
  wrap.append(text, input);
  stage.bar?.append(wrap);
  return input;
}

export function checkbox(stage: Stage, label: string, checked: boolean, onChange: (v: boolean) => unknown): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.className = 'dx-field';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => stage.action(() => onChange(input.checked))());
  wrap.append(input, label);
  stage.bar?.append(wrap);
  return input;
}
