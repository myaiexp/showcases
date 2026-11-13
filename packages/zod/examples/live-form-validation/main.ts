// Signup form validated live by a Zod schema, cycling samples in previews
import type { Mount } from '@/types.ts';
import { FIELDS, SAMPLES, validate, type FieldName, type FormValues } from './schema.ts';
import './style.css';

const LABELS: Record<FieldName, { label: string; hint: string; placeholder: string }> = {
  username: { label: 'Username', hint: '3-20 chars, letters / numbers / underscore', placeholder: 'ada_lovelace' },
  email: { label: 'Email', hint: '', placeholder: 'ada@example.com' },
  age: { label: 'Age', hint: 'whole number, 13 or older', placeholder: '29' },
  website: { label: 'Website', hint: 'optional', placeholder: 'https://ada.dev' },
};

const mount: Mount = (el, { preview }) => {
  const root = document.createElement('div');
  root.className = preview ? 'root preview' : 'root';
  el.append(root);
  const form = document.createElement('form');
  form.className = 'form';
  form.noValidate = true;
  const rows = {} as Record<FieldName, { box: HTMLElement; input: HTMLInputElement; err: HTMLElement }>;
  for (const name of FIELDS) {
    const box = document.createElement('div');
    box.className = 'field';
    const label = document.createElement('label');
    label.textContent = LABELS[name].label;
    if (LABELS[name].hint) {
      const hint = document.createElement('span');
      hint.className = 'hint';
      hint.textContent = ` - ${LABELS[name].hint}`;
      label.append(hint);
    }
    const input = document.createElement('input');
    input.className = 'input';
    input.name = name;
    input.autocomplete = 'off';
    input.placeholder = LABELS[name].placeholder;
    if (preview) input.readOnly = true;
    const err = document.createElement('span');
    err.className = 'error';
    box.append(label, input, err);
    form.append(box);
    rows[name] = { box, input, err };
  }
  const verdict = document.createElement('div');
  verdict.className = 'verdict';
  root.append(form, verdict);

  let touched = preview;
  const render = (): void => {
    const values = {} as FormValues;
    for (const name of FIELDS) values[name] = rows[name].input.value;
    const { data, errors } = validate(values);
    for (const name of FIELDS) {
      const { box, input, err } = rows[name];
      const msg = errors[name];
      const hasValue = input.value.trim() !== '';
      box.classList.remove('valid', 'invalid');
      err.textContent = '';
      if (msg && (hasValue || touched)) {
        box.classList.add('invalid');
        err.textContent = msg;
      } else if (!msg && hasValue) box.classList.add('valid');
    }
    verdict.replaceChildren();
    if (!touched) {
      verdict.className = 'verdict';
      verdict.textContent = 'Start typing to validate against the schema...';
    } else if (data) {
      verdict.className = 'verdict ok';
      verdict.append('Valid, parsed output:');
      const pre = document.createElement('pre');
      pre.textContent = JSON.stringify(data, null, 2);
      verdict.append(pre);
    } else {
      verdict.className = 'verdict bad';
      const n = Object.keys(errors).length;
      verdict.textContent = `${n} issue${n === 1 ? '' : 's'}: fix the highlighted field${n === 1 ? '' : 's'}.`;
    }
  };

  let timer: ReturnType<typeof setInterval> | undefined;
  if (preview) {
    let i = 0;
    const show = (): void => {
      const sample = SAMPLES[i++ % SAMPLES.length];
      if (!sample) return;
      for (const name of FIELDS) rows[name].input.value = sample[name];
      render();
    };
    show();
    timer = setInterval(show, 2200);
  } else {
    form.addEventListener('input', () => {
      touched = true;
      render();
    });
    render();
  }
  return () => clearInterval(timer);
};

export default mount;
