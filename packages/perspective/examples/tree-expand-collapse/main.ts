// view.expand(), collapse() and set_depth() on a group_by tree
import type { Mount } from '@/types.ts';
import { worker, uniqueName } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output } from '../../shared/controls.ts';
import { scope } from '../../shared/scope.ts';

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const table = s.own(await client.table(orders(300), { name: uniqueName('tree') }));
  // advanced.md: a group_by View is a tree, and rows can be expanded or collapsed. v5.9.1:
  // set_depth(0) leaves the Total and the first level of groups visible (num_rows 5 here),
  // where the docs describe depth 0 as fully collapsed.
  const view = s.own(
    await table.view({ group_by: ['Region', 'State'], columns: ['Sales'], aggregates: { Sales: 'sum' } }),
  );

  const out = output(el, ctx.preview ? 200 : 300);
  out.box.style.margin = '0';
  const render = async (what: string): Promise<void> => {
    const rows = (await view.to_json()) as Array<{ __ROW_PATH__: string[]; Sales: number }>;
    const lines = rows.map((r, i) => {
      const path = r.__ROW_PATH__;
      const label = path.length ? path[path.length - 1] : 'Total';
      return `${String(i).padStart(2)}  ${'    '.repeat(path.length)}${label}  ${Math.round(r.Sales).toLocaleString('en')}`;
    });
    out.set(`${what}\nnum_rows(): ${rows.length}\n\n${lines.join('\n')}`);
  };

  if (ctx.preview) {
    const steps: Array<[string, () => Promise<unknown>]> = [
      ['set_depth(0)', () => view.set_depth(0)],
      ['set_depth(1)', () => view.set_depth(1)],
      ['set_depth(2)', () => view.set_depth(2)],
      ['collapse(1)', () => view.collapse(1)],
      ['expand(1)', () => view.expand(1)],
    ];
    let i = 0;
    s.every(1500, async () => {
      const [label, op] = steps[i++ % steps.length]!;
      await op();
      await render(label);
    });
    await render('Created with group_by: ["Region", "State"]');
    return s.dispose();
  }

  let row = 1;
  const rowInput = document.createElement('input');
  Object.assign(rowInput, { type: 'number', value: '1', min: '0' });
  rowInput.style.width = '64px';
  rowInput.addEventListener('input', () => (row = Number(rowInput.value)));
  const bar = controlBar(el);
  const act = (label: string, op: () => Promise<unknown>) => button(bar, label, () => void op().then(() => render(label)));
  bar.append('row index', rowInput);
  act('collapse(row)', () => view.collapse(row));
  act('expand(row)', () => view.expand(row));
  for (const d of [0, 1, 2]) act(`set_depth(${d})`, () => view.set_depth(d));
  el.prepend(bar);
  await render('Created with group_by: ["Region", "State"]');
  return s.dispose();
};

export default mount;
