// Chart plugin_config: facets, legend, zero baseline and line width via restore()
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown, cycle } from '../../shared/setup.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output } from '../../shared/controls.ts';

type PluginConfig = Record<string, string | number | boolean>;

const base = (plugin: string): ViewerConfigUpdate => ({
  plugin,
  group_by: ['Month'],
  split_by: ['Category'],
  columns: ['Sales'],
  expressions: { Month: `bucket("Order Date", 'M')` },
  sort: [['Month', 'asc']],
});

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(), { name });
  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 420 });
  const out = ctx.preview ? null : output(el, 130);
  await viewer.load(client);

  // Keys come from the plugin's PluginConfig type: facet_mode, legend_mode, include_zero,
  // line_width_px and so on. Which keys apply depends on the active plugin.
  const config: PluginConfig = { facet_mode: 'overlay', legend_mode: 'auto', include_zero: false, line_width_px: 2 };
  let plugin = 'Y Line';
  await viewer.restore({ table: name, settings: false, ...base(plugin), plugin_config: config });
  const apply = async (): Promise<void> => {
    await viewer.restore({ ...base(plugin), plugin_config: config });
    out?.set(JSON.stringify({ plugin, plugin_config: config }, null, 2));
  };
  const set = (key: string, value: string | number | boolean) => {
    config[key] = value;
    void apply();
  };
  if (bar) {
    select(bar, 'plugin', ['Y Line', 'Y Bar', 'Y Area', 'Y Scatter'], (v) => ((plugin = v), void apply()));
    select(bar, 'facet_mode', ['overlay', 'grid'], (v) => set('facet_mode', v));
    select(bar, 'legend_mode', ['auto', 'sidebar', 'floating', 'none'], (v) => set('legend_mode', v));
    select(bar, 'include_zero', ['false', 'true'], (v) => set('include_zero', v === 'true'));
    select(bar, 'line_width_px', ['1', '2', '4', '6'], (v) => set('line_width_px', Number(v))).value = '2';
  }
  await apply();

  const steps: PluginConfig[] = [
    // Every step names every key: a plugin_config update merges into the stored one.
    { facet_mode: 'overlay', legend_mode: 'auto', include_zero: false, line_width_px: 2 },
    { facet_mode: 'grid', legend_mode: 'auto', include_zero: false, line_width_px: 2 },
    { facet_mode: 'overlay', legend_mode: 'auto', include_zero: true, line_width_px: 6 },
    { facet_mode: 'overlay', legend_mode: 'none', include_zero: false, line_width_px: 1 },
  ];
  const stop = ctx.preview ? cycle(viewer, steps.map((plugin_config) => ({ ...base('Y Line'), plugin_config })), 2800) : () => {};
  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
