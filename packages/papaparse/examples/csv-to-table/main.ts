// Parses editable CSV with Papa Parse into a table with typed cells
import Papa from 'papaparse';
import type { Mount } from '@/types.ts';
import './style.css';

const SAMPLE_CSV = `name,role,commits,active
Ada Lovelace,Engineer,128,true
Grace Hopper,Compiler Lead,342,true
Alan Turing,Researcher,87,false
Katherine Johnson,Mathematician,256,true`;

type Row = Record<string, unknown>;

const pill = (label: string, value: string, err = false): HTMLSpanElement => {
  const span = document.createElement('span');
  span.className = err ? 'pill err' : 'pill';
  const b = document.createElement('b');
  b.textContent = value;
  span.append(b, ` ${label}`);
  return span;
};

const typedCell = (value: unknown): HTMLTableCellElement => {
  const td = document.createElement('td');
  const span = document.createElement('span');
  if (value === null || value === undefined || value === '') {
    span.className = 'type-null';
    span.textContent = '(empty)';
  } else if (typeof value === 'number') {
    span.className = 'type-num';
    span.textContent = String(value);
  } else if (typeof value === 'boolean') {
    span.className = 'type-bool';
    span.textContent = String(value);
  } else {
    span.textContent = String(value);
  }
  td.append(span);
  return td;
};

const mount: Mount = (stage, { preview }) => {
  const el = document.createElement('div');
  el.className = 'root';
  stage.append(el);
  const input = document.createElement('textarea');
  input.className = 'csv-input';
  input.spellcheck = false;
  input.value = SAMPLE_CSV;
  const meta = document.createElement('div');
  meta.className = 'meta-bar';
  const wrap = document.createElement('div');
  wrap.className = 'table-wrap';
  const table = document.createElement('table');
  table.className = 'csv';
  wrap.append(table);
  if (!preview) el.append(input);
  el.append(meta, wrap);

  const render = (): void => {
    const result = Papa.parse<Row>(input.value, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
    const fields = result.meta.fields ?? [];
    const delim = result.meta.delimiter === '\t' ? '\\t' : result.meta.delimiter;
    const pills = [
      pill('rows', String(result.data.length)),
      pill('columns', String(fields.length)),
      pill('delimiter', delim),
    ];
    if (result.errors.length) pills.push(pill('error(s)', String(result.errors.length), true));
    meta.replaceChildren(...pills);

    const thead = document.createElement('thead');
    const htr = document.createElement('tr');
    for (const f of fields) {
      const th = document.createElement('th');
      th.textContent = f;
      htr.append(th);
    }
    thead.append(htr);
    const tbody = document.createElement('tbody');
    for (const row of result.data) {
      const tr = document.createElement('tr');
      for (const f of fields) tr.append(typedCell(row[f]));
      tbody.append(tr);
    }
    table.replaceChildren(thead, tbody);
  };

  input.addEventListener('input', render);
  render();
  return () => input.removeEventListener('input', render);
};

export default mount;
