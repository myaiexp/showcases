// filter: pick a column, an operator valid for its type, and an operand
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

// selection_and_ordering.md: the operators each column type accepts.
const STRING_OPS = ['==', '!=', '>', '>=', '<', '<=', 'begins with', 'not begins with', 'contains', 'not contains', 'ends with', 'not ends with', 'matches', 'not matches', 'in', 'not in', 'is not null', 'is null'];
const NUMERIC_OPS = ['==', '!=', '>', '>=', '<', '<=', 'is not null', 'is null'];
const COLUMNS: Record<string, { ops: string[]; operand: string }> = {
  'Sub-Category': { ops: STRING_OPS, operand: 'er' },
  State: { ops: STRING_OPS, operand: 'a' },
  Sales: { ops: NUMERIC_OPS, operand: '1000' },
  Quantity: { ops: NUMERIC_OPS, operand: '5' },
};
const NO_OPERAND = ['is null', 'is not null'];

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 90);
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', columns: ['Order ID', 'State', 'Sub-Category', 'Quantity', 'Sales'], settings: false });

  let column = 'Sub-Category';
  let op = 'contains';
  const input = document.createElement('input');
  const apply = async (): Promise<void> => {
    input.hidden = NO_OPERAND.includes(op);
    const raw = input.value;
    const isNumber = column === 'Sales' || column === 'Quantity';
    // "in" and "not in" take an array of operands; the rest take one in the column's type.
    const operand = op === 'in' || op === 'not in' ? raw.split(',').map((s) => s.trim()) : isNumber ? Number(raw) : raw;
    const filter = [NO_OPERAND.includes(op) ? [column, op] : [column, op, operand]];
    try {
      await viewer.restore({ filter: filter as [string, string, string][] });
      out?.set(JSON.stringify({ filter }));
    } catch (err) {
      out?.set(`rejected: ${String(err)}`);
    }
  };
  if (bar) {
    const opSel = select(bar, 'operator', COLUMNS[column]!.ops, (v) => ((op = v), void apply()));
    opSel.value = op;
    select(bar, 'column', Object.keys(COLUMNS), (v) => {
      column = v;
      const spec = COLUMNS[v]!;
      opSel.replaceChildren(...spec.ops.map((o) => new Option(o, o)));
      if (!spec.ops.includes(op)) op = '==';
      opSel.value = op;
      input.value = spec.operand;
      void apply();
    }).value = column;
    input.value = COLUMNS[column]!.operand;
    input.placeholder = 'operand';
    input.addEventListener('change', () => void apply());
    bar.append(input);
  } else input.value = 'er';
  await apply();

  const stop = ctx.preview
    ? cycle(viewer, [
        { filter: [['Sub-Category', 'contains', 'er']] },
        { filter: [['Sales', '>', 1500]] },
        { filter: [['State', 'begins with', 'k']] },
        { filter: [['Sub-Category', 'in', ['Chairs', 'Phones', 'Paper']]] },
      ])
    : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
