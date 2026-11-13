// Y Bar, X Bar, Y Line, Y Area and Y Scatter: group_by axis, split_by series
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

const PLUGINS = ['Y Bar', 'X Bar', 'Y Line', 'Y Area', 'Y Scatter'];
const AXES: Record<string, ViewerConfigUpdate> = {
  Category: { group_by: ['Category'], expressions: {} },
  'Sub-Category': { group_by: ['Sub-Category'], expressions: {} },
  // A datetime group_by gives a time axis; bucket() from expressions.md rolls dates into months.
  Month: { group_by: ['Month'], expressions: { Month: `bucket("Order Date", 'M')` }, sort: [['Month', 'asc']] },
};

interface State {
  plugin: string;
  axis: string;
  split: string;
  metrics: string;
}

/**
 * viewer-charts README: each chart reads the same config as the grid. For the Y charts,
 * group_by is the X axis (the Y axis for X Bar), split_by the series, and each entry of
 * columns a value drawn on the Y axis.
 */
const configFor = (s: State): ViewerConfigUpdate => ({
  plugin: s.plugin,
  ...AXES[s.axis]!,
  sort: AXES[s.axis]!.sort ?? [],
  split_by: s.split === 'none' ? [] : [s.split],
  columns: s.metrics === 'Sales' ? ['Sales'] : ['Sales', 'Profit'],
});

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 420 });
  const out = ctx.preview ? null : output(el, 110);
  await viewer.load(client);

  const state: State = { plugin: 'Y Bar', axis: 'Category', split: 'Region', metrics: 'Sales' };
  await viewer.restore({ table: name, settings: false, ...configFor(state) });
  const apply = async (): Promise<void> => {
    await viewer.restore(configFor(state));
    const { group_by, split_by, columns } = await viewer.getViewConfig();
    out?.set(JSON.stringify({ plugin: state.plugin, group_by, split_by, columns }, null, 2));
  };
  if (bar) {
    select(bar, 'plugin', PLUGINS, (v) => ((state.plugin = v), void apply()));
    select(bar, 'group_by', Object.keys(AXES), (v) => ((state.axis = v), void apply()));
    select(bar, 'split_by', ['none', 'Region', 'Segment'], (v) => ((state.split = v), void apply())).value = state.split;
    select(bar, 'columns', ['Sales', 'Sales + Profit'], (v) => ((state.metrics = v), void apply()));
  }
  await apply();

  const stop = ctx.preview ? cycle(viewer, PLUGINS.map((plugin) => configFor({ ...state, plugin })), 2400) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
