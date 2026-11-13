// table.view(config): columns, aggregates, group_by and filter
import type { Mount } from '@/types.ts';
import type { ViewConfigUpdate } from '@perspective-dev/client';
import { worker, uniqueName, createViewer, cycle } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';
import { scope, show } from '../../shared/scope.ts';

const GROUPS: Record<string, string[]> = { none: [], Region: ['Region'], 'Region > State': ['Region', 'State'] };
const AGGS = ['sum', 'avg', 'count', 'max', 'min'];
const FILTERS: Record<string, ViewConfigUpdate['filter']> = {
  'all categories': [],
  'Furniture, Technology': [['Category', 'in', ['Furniture', 'Technology']]],
  'Sales > 1000': [['Sales', '>', 1000]],
};

const mount: Mount = async (el, ctx) => {
  const s = scope();
  const client = await worker();
  const table = s.own(await client.table(orders(), { name: uniqueName('orders') }));
  const name = await table.get_name();

  const viewer = createViewer(el, ctx, { height: 300 });
  await viewer.load(client);
  await viewer.restore({ table: name, plugin: 'Datagrid', columns: ['Sales'], group_by: ['Region'], aggregates: { Sales: 'sum' }, settings: false });
  s.ownViewer(viewer);

  if (ctx.preview) {
    const config = (g: string[], agg: string, filter: ViewConfigUpdate['filter']): ViewConfigUpdate => ({ group_by: g, aggregates: { Sales: agg }, filter });
    const stop = cycle(viewer, [
      config(['Region'], 'sum', []),
      config(['Region', 'State'], 'sum', []),
      config(['Region'], 'avg', FILTERS['Furniture, Technology']),
      config(['Region'], 'count', FILTERS['Sales > 1000']),
    ]);
    s.stop(stop);
    return s.dispose();
  }

  const out = output(el, 200);
  let group = 'none';
  let agg = 'sum';
  let filter = 'all categories';
  let view: Awaited<ReturnType<typeof table.view>> | null = null;

  // querying.md: one Table can feed any number of Views; a View's config never changes, so
  // a new query means a new View. The previous one is deleted first.
  const run = async (): Promise<void> => {
    const config: ViewConfigUpdate = {
      columns: ['Sales'],
      aggregates: { Sales: agg as 'sum' },
      group_by: GROUPS[group],
      filter: FILTERS[filter],
    };
    await view?.delete();
    view = await table.view(config);
    await viewer.restore({ ...config, settings: false });
    const rows = await view.to_json({ end_row: 8 });
    out.set(`table.view(${show(config, 600)})\n\nnum_rows(): ${await view.num_rows()}\nschema(): ${show(await view.schema())}\n\nto_json() first rows:\n${rows.map((r) => JSON.stringify(r)).join('\n')}`);
  };
  s.later(async () => {
    await view?.delete();
  });
  const bar = controlBar(el);
  select(bar, 'group_by', Object.keys(GROUPS), (v) => void ((group = v), run()));
  select(bar, 'Sales aggregate', AGGS, (v) => void ((agg = v), run()));
  select(bar, 'filter', Object.keys(FILTERS), (v) => void ((filter = v), run()));
  el.prepend(bar);
  await run();
  return s.dispose();
};

export default mount;
