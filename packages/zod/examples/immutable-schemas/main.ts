// One base schema, two derived ones: each method call returns a new schema
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { leaf } from '../../shared/value-view.ts';
import './style.css';

const base = z.string();
// Each call returns a new schema; `base` itself never changes.
const atLeast3 = base.min(3);
const from3to8 = atLeast3.max(8);

const SCHEMAS = [
  ['base', 'z.string()', base],
  ['.min(3)', 'base.min(3)', atLeast3],
  ['.max(8)', 'atLeast3.max(8)', from3to8],
] as const;

const NAMES = ['al', 'ada', 'grace_h', 'margaret_h', ''];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const table = document.createElement('table');
  table.className = 'grid';
  const head = table.createTHead().insertRow();
  head.insertCell().textContent = 'username';
  for (const [name, code] of SCHEMAS) {
    const th = document.createElement('th');
    const b = document.createElement('b');
    b.textContent = name;
    const c = document.createElement('code');
    c.textContent = code;
    th.append(b, c);
    head.append(th);
  }
  const body = table.createTBody();
  const cells: HTMLTableCellElement[][] = [];
  for (const n of NAMES) {
    const row = body.insertRow();
    row.insertCell().append(leaf(n));
    cells.push(SCHEMAS.map(([, , schema]) => {
      const cell = row.insertCell();
      const ok = schema.safeParse(n).success;
      cell.textContent = ok ? '✓' : '✗';
      cell.dataset['ok'] = String(ok);
      return cell;
    }));
  }
  stage.root.append(table);

  // Light up one column at a time, so each schema's verdicts read as a set.
  stage.cycle(SCHEMAS, 2000, ([, code, schema], col) => {
    cells.forEach((row) => row.forEach((c, i) => c.classList.toggle('on', i === col)));
    const passed = NAMES.filter((n) => schema.safeParse(n).success).length;
    const baseCount = NAMES.filter((n) => base.safeParse(n).success).length;
    stage.say(col === 0 ? `${code} accepts all ${baseCount}` : `${code} accepts ${passed}; base still accepts ${baseCount}`, 'info');
  }, true);
  return stage.dispose;
};

export default mount;
