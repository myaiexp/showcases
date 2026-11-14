// A grid of the seven primitive schemas against mixed values: who accepts what
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { leaf } from '../../shared/value-view.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const SCHEMAS = [
  { name: 'string', schema: z.string() },
  { name: 'number', schema: z.number() },
  { name: 'bigint', schema: z.bigint() },
  { name: 'boolean', schema: z.boolean() },
  { name: 'symbol', schema: z.symbol() },
  { name: 'undefined', schema: z.undefined() },
  { name: 'null', schema: z.null() },
];

const VALUES: { value: unknown; note?: string }[] = [
  { value: 'hello' },
  { value: '42', note: 'text, not a number' },
  { value: 42 },
  { value: 42n },
  { value: true },
  { value: Symbol('id') },
  { value: undefined },
  { value: null },
  { value: Number.NaN, note: 'NaN is not a number to Zod' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const table = document.createElement('table');
  table.className = 'pm-grid';
  const head = table.createTHead().insertRow();
  head.insertCell();
  for (const s of SCHEMAS) head.insertCell().textContent = stage.preview ? s.name.slice(0, 4) : s.name;
  const body = table.createTBody();
  const rows = VALUES.map(({ value }) => {
    const tr = body.insertRow();
    tr.insertCell().append(leaf(value));
    return SCHEMAS.map((s) => {
      const td = tr.insertCell();
      td.textContent = s.schema.safeParse(value).success ? '✓' : '·';
      td.dataset['ok'] = String(s.schema.safeParse(value).success);
      return td;
    });
  });
  stage.root.append(table);

  // Walk a spotlight down the rows, so the reader sees one value at a time.
  const trs = [...body.rows];
  const show = (i: number): void => {
    trs.forEach((tr, j) => tr.classList.toggle('pm-on', j === i));
    const { value, note } = VALUES[i]!;
    const hits = SCHEMAS.filter((_, c) => rows[i]![c]!.dataset['ok'] === 'true').map((s) => `z.${s.name}()`);
    const word = typeof value === 'string' ? JSON.stringify(value) : value === undefined ? 'a missing value' : String(typeof value === 'symbol' ? 'a symbol' : value);
    stage.say(`${word} is accepted only by ${hits.join(', ')}${note ? ` (${note})` : ''}`, 'info');
  };
  const at = stage.cycle(VALUES, stage.preview ? 1500 : 2200, (_v, i) => show(i), true);
  if (!stage.preview) {
    trs.forEach((tr, i) => tr.addEventListener('mouseenter', () => at(i)));
  }
  return stage.dispose;
};

export default mount;
