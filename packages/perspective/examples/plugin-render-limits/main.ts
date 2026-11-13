// A plugin's max_cells / max_columns limits, set through getPlugin()
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, select, output, every } from '../../shared/controls.ts';

const PLUGIN = 'Treemap';
const LIMITS = ['50', '200', '1000', '100000'];

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(2000), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx);
  const out = ctx.preview ? null : output(el, 80);
  await viewer.load(client);
  // getPlugin() looks the plugin up on the active panel, which restore({ table }) creates.
  await viewer.restore({ table: name });

  // plugin_settings.md: each plugin asks the user to opt in before rendering a View
  // larger than its limits. getPlugin(name) returns that plugin's element.
  const plugin = viewer.getPlugin(PLUGIN) as { max_cells: number; max_columns: number };
  const defaults = { max_cells: plugin.max_cells, max_columns: plugin.max_columns };

  // The limit applies when the plugin renders, so set it first, then restore() with
  // the plugin name to render under the new limit.
  const render = async (maxCells: number): Promise<void> => {
    plugin.max_cells = maxCells;
    await viewer.restore({ plugin: PLUGIN, group_by: ['State', 'Sub-Category', 'Ship Mode'], columns: ['Sales'] });
    out?.set(`max_cells = ${plugin.max_cells}, max_columns = ${plugin.max_columns} (defaults ${JSON.stringify(defaults)})\nThe treemap has up to 12 states × 12 sub-categories × 4 ship modes = 576 leaf groups.`);
  };
  await render(Number(LIMITS[1]));

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 1;
    stop = every(2600, () => void render(Number(LIMITS[++i % LIMITS.length])));
  } else {
    select(bar!, 'max_cells', LIMITS, (v) => void render(Number(v))).value = LIMITS[1]!;
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    // The setting lives on the plugin element; put the defaults back for later mounts.
    Object.assign(plugin, defaults);
    dispose();
  };
};

export default mount;
