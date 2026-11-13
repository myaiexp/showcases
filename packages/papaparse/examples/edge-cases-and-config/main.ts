// Messy CSV parsed with toggleable Papa Parse options, shown as JSON
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import './style.css';

const MESSY_CSV = `product;price;note
"Widget, deluxe";19.99;"Top seller"
"Gadget";5;"Has a
line break"
"Bundle ""Pro""";49;cheap`;

const DELIMS: readonly [string, string][] = [
  ['', 'auto-detect'],
  [',', 'comma ,'],
  [';', 'semicolon ;'],
  ['\t', 'tab'],
  ['|', 'pipe |'],
];

const pill = (label: string, value: string, err = false): HTMLSpanElement => {
  const span = document.createElement('span');
  span.className = err ? 'pill err' : 'pill';
  const b = document.createElement('b');
  b.textContent = value;
  span.append(label, b);
  return span;
};

const checkbox = (text: string): { label: HTMLLabelElement; box: HTMLInputElement } => {
  const label = document.createElement('label');
  label.className = 'toggle';
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = true;
  label.append(box, ` ${text}`);
  return { label, box };
};

const mount: Mount = (stage, { preview }) => {
  const el = document.createElement('div');
  el.className = 'root';
  stage.append(el);
  const header = checkbox('header');
  const typing = checkbox('dynamicTyping');
  const skip = checkbox('skipEmptyLines');
  const delim = document.createElement('select');
  delim.className = 'ctl-select';
  for (const [value, label] of DELIMS) delim.add(new Option(label, value));

  const input = document.createElement('textarea');
  input.className = 'csv-input';
  input.spellcheck = false;
  input.value = MESSY_CSV;
  const meta = document.createElement('div');
  meta.className = 'meta-bar';
  const out = document.createElement('pre');
  out.className = 'json-out';

  if (!preview) {
    const row = document.createElement('div');
    row.className = 'config-row';
    const field = document.createElement('div');
    field.className = 'field';
    const fl = document.createElement('label');
    fl.textContent = 'delimiter';
    field.append(fl, delim);
    row.append(header.label, typing.label, skip.label, field);
    el.append(row, input);
  }
  el.append(meta, out);

  const render = (): void => {
    const result = Papa.parse(input.value, {
      header: header.box.checked,
      dynamicTyping: typing.box.checked,
      skipEmptyLines: skip.box.checked,
      delimiter: delim.value,
    });
    const used = result.meta.delimiter === '\t' ? '\\t' : result.meta.delimiter;
    const pills = [
      pill('', `${result.data.length} records`),
      pill('detected delimiter ', used || '?'),
    ];
    if (result.errors.length) pills.push(pill('', `${result.errors.length} error(s)`, true));
    meta.replaceChildren(...pills);
    out.textContent = JSON.stringify(result.data, null, 2);
  };

  const inputs: EventTarget[] = [header.box, typing.box, skip.box, delim];
  inputs.forEach((t) => t.addEventListener('change', render));
  input.addEventListener('input', render);
  render();

  return () => {
    inputs.forEach((t) => t.removeEventListener('change', render));
    input.removeEventListener('input', render);
  };
};

export default mount;
