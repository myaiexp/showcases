// get_min_max, dimensions, num_rows, column_paths and get_config of a View
import type { Mount } from '@/types.ts';
import type { ViewConfigUpdate } from '@perspective-dev/client';
import { worker, uniqueName, createViewer } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const GROUPS: Record<string, string[]> = { none: [], Region: ['Region'], 'Region, State': ['Region', 'State'] };
const SPLITS: Record<string, string[]> = { none: [], Segment: ['Segment'], 'Ship Mode': ['Ship Mode'] };

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const table = s.own(await client.table(orders(), { name: uniqueName('orders') }));
  const name = await table.get_name();

  const viewer = createViewer(el, ctx, { height: 280, previewHeight: 110 });
  await viewer.load(client);
  s.ownViewer(viewer);
  const out = output(el, ctx.preview ? 80 : 260);
  out.box.style.margin = ctx.preview ? '4px 0 0' : '8px 0 0';
  let view: Awaited<ReturnType<typeof table.view>> | null = null;
  s.later(async () => {
    await view?.delete();
  });

  const run = async (group: string[], split: string[]): Promise<void> => {
    const config: ViewConfigUpdate = { group_by: group, split_by: split, columns: ['Sales', 'Profit'], aggregates: { Sales: 'sum', Profit: 'sum' } };
    await view?.delete();
    view = await table.view(config);
    await viewer.restore({ ...config, table: name, plugin: 'Datagrid', settings: false });
    // advanced.md: get_min_max covers the leaf values of a column, dimensions() counts the
    // rows and columns of the View (group_by header rows included) and of the Table.
    const [sMin, sMax] = await view.get_min_max('Sales');
    const [pMin, pMax] = await view.get_min_max('Profit');
    const dims = (await view.dimensions()) as Record<string, number>;
    out.set(
      `get_min_max("Sales"):  [${show(sMin)}, ${show(sMax)}]\nget_min_max("Profit"): [${show(pMin)}, ${show(pMax)}]\n` +
        `dimensions(): ${show(dims, 600)}\nnum_rows(): ${await view.num_rows()}   num_columns(): ${await view.num_columns()}\n` +
        (ctx.preview ? '' : `\ncolumn_paths(): ${show(await view.column_paths(), 500)}\n\nget_config(): ${show(await view.get_config(), 700)}`),
    );
  };

  if (ctx.preview) {
    const steps: Array<[string[], string[]]> = [[[], []], [['Region'], []], [['Region'], ['Segment']], [['Region', 'State'], []]];
    let i = 0;
    s.every(2400, () => run(...steps[++i % steps.length]!));
    await run(...steps[0]!);
    return s.dispose();
  }

  let group = 'none';
  let split = 'none';
  const bar = controlBar(el);
  select(bar, 'group_by', Object.keys(GROUPS), (v) => void ((group = v), run(GROUPS[group]!, SPLITS[split]!)));
  select(bar, 'split_by', Object.keys(SPLITS), (v) => void ((split = v), run(GROUPS[group]!, SPLITS[split]!)));
  el.prepend(bar);
  await run([], []);
  return s.dispose();
};

export default mount;
