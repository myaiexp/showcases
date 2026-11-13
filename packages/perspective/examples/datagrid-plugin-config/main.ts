// Datagrid plugin_config: zebra rows, row height, font, alignment and word wrap
import type { Mount } from '@/types.ts';
import type { ViewerConfigUpdate } from '../../shared/setup.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output, every } from '../../shared/controls.ts';

type PluginConfig = NonNullable<ViewerConfigUpdate['plugin_config']>;

// Each key is a DatagridPluginConfig field from the plugin's type declarations.
const PRESETS: Record<string, PluginConfig> = {
  default: {},
  'zebra every 2 rows': { zebra_rows: 2, zebra_color: '#1f2a36' },
  'tall rows, large font': { row_height: 34, font_size: 15 },
  'bold italic serif': { bold: true, italic: true, font_family: 'serif' },
  'centre aligned': { align: 'center' },
  'word wrap, tight columns': { word_wrap: true, row_height: 40 },
  'zebra every 3 rows, monospace': { zebra_rows: 3, zebra_color: '#2a1d18', font_family: 'monospace' },
};

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(80), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 380 });
  const out = ctx.preview ? null : output(el, 70);
  await viewer.load(client);
  await viewer.restore({
    table: name,
    plugin: 'Datagrid',
    columns: ['Order ID', 'State', 'Sub-Category', 'Sales', 'Profit'],
    // Narrow fixed widths so word_wrap has something to wrap.
    columns_config: { 'Sub-Category': { column_size_override: 70 }, State: { column_size_override: 80 } },
  });

  // plugin_config is the plugin-level slot of a restore() update; a column's own
  // columns_config entry (bold, align, font_size …) overrides it per column.
  // An update merges key by key into the stored plugin_config, so null resets it to the
  // plugin's defaults before each preset.
  const apply = async (label: string): Promise<void> => {
    const plugin_config = PRESETS[label]!;
    await viewer.restore({ plugin_config: null });
    await viewer.restore({ plugin_config });
    out?.set(`plugin_config = ${JSON.stringify(plugin_config)}`);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    const labels = Object.keys(PRESETS);
    let i = 0;
    stop = every(2000, () => void apply(labels[++i % labels.length]!));
  } else {
    select(bar!, 'plugin_config', Object.keys(PRESETS), (label) => void apply(label));
    await apply('default');
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
