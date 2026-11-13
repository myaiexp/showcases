// Page-wide defaults: setColumnConfigDefaults() and setPluginConfigDefaults()
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';
import { DEFAULTS, type DefaultSlot } from './defaults.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('orders');
  const table = await client.table(orders(80), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 340 });
  const out = ctx.preview ? null : output(el, 200);
  await viewer.load(client);
  await viewer.restore({
    table: name,
    plugin: 'Datagrid',
    columns: ['Order ID', 'Order Date', 'Region', 'Sales', 'Profit', 'Quantity'],
  });

  if (ctx.preview) {
    // The defaults are page-wide and would restyle every other card on the gallery page,
    // so a card shows the same formats as this viewer's own columns_config instead.
    let on = false;
    const stop = every(2400, () => {
      on = !on;
      void viewer.restore({
        columns_config: on ? { Sales: DEFAULTS[0]!.defaults, Profit: DEFAULTS[0]!.defaults, 'Order Date': DEFAULTS[1]!.defaults } : null,
        plugin_config: on ? DEFAULTS[2]!.defaults : null,
      });
    });
    const dispose = teardown([viewer], [table]);
    return () => {
      stop();
      dispose();
    };
  }

  // config_defaults.md: static methods on the element class, for every viewer on the page.
  const Viewer = customElements.get('perspective-viewer');
  const set = (slot: DefaultSlot, on: boolean): void => {
    const value = on ? slot.defaults : null;
    if (slot.kind === 'plugin') Viewer.setPluginConfigDefaults(value, slot.options);
    else Viewer.setColumnConfigDefaults(value, slot.options);
  };
  const show = async (): Promise<void> => {
    // Defaults should be set before restore(); re-restoring the same plugin re-renders.
    await viewer.restore({ plugin: 'Datagrid' });
    const { columns_config, plugin_config } = await viewer.save();
    out!.set(
      `getColumnConfigDefaults() → ${JSON.stringify(Viewer.getColumnConfigDefaults())}\n` +
        `getPluginConfigDefaults() → ${JSON.stringify(Viewer.getPluginConfigDefaults())}\n\n` +
        `save() leaves out values equal to a default:\ncolumns_config ${JSON.stringify(columns_config)}\nplugin_config ${JSON.stringify(plugin_config)}`,
    );
  };

  const active = new Set<DefaultSlot>();
  for (const slot of DEFAULTS) {
    const b = button(bar!, `${slot.label}: off`, () => {
      const on = !active.has(slot);
      if (on) active.add(slot);
      else active.delete(slot);
      set(slot, on);
      b.textContent = `${slot.label}: ${on ? 'on' : 'off'}`;
      void show();
    });
  }
  // A column's own stored config outranks every default.
  button(bar!, 'Sales own format', () => {
    void viewer.restore({ columns_config: { Sales: { number_format: { maximumFractionDigits: 0, minimumFractionDigits: 0 } } } }).then(show);
  });
  await show();

  const dispose = teardown([viewer], [table]);
  return () => {
    // null removes every default set with these options, so other examples start clean.
    for (const slot of active) set(slot, false);
    dispose();
  };
};

export default mount;
