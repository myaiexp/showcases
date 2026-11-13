// addPanel(), removePanel() and setActivePanel(), with the layout events
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';

const PANEL_KINDS = [
  { plugin: 'Y Bar', group_by: ['Region'], columns: ['Sales'] },
  { plugin: 'Treemap', group_by: ['Category', 'Sub-Category'], columns: ['Sales'] },
  { plugin: 'Y Line', group_by: ['Order Date'], columns: ['Quantity'] },
  { plugin: 'Datagrid', group_by: ['Segment'], columns: ['Sales', 'Profit'] },
];

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('superstore');
  const table = await client.table(orders(), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 440 });
  const out = ctx.preview ? null : output(el, 130);
  await viewer.load(client);
  await viewer.restore({ table: name, title: 'Panel 1', plugin: 'Datagrid', columns: ['Region', 'Sales'] });

  // events.md § Layout events: two separate facts, which panels exist and which is active.
  const onLayout = (e: Event): void => out?.log(`perspective-layout-update → panels ${JSON.stringify((e as CustomEvent).detail.panels)}`);
  const onActive = (e: Event): void => out?.log(`perspective-active-panel-update → ${JSON.stringify((e as CustomEvent).detail.panel)}`);
  viewer.addEventListener('perspective-layout-update', onLayout);
  viewer.addEventListener('perspective-active-panel-update', onActive);

  let added = 1;
  // addPanel() needs the new panel's table and returns its generated id; each new panel
  // is placed as a new column.
  const add = async (): Promise<void> => {
    const kind = PANEL_KINDS[added % PANEL_KINDS.length]!;
    added += 1;
    const id = await viewer.addPanel({ table: name, title: `Panel ${added}`, ...kind });
    out?.log(`addPanel() → "${id}"`);
  };
  // The last remaining panel cannot be removed; removePanel() then resolves as a no-op.
  const removeLast = async (): Promise<void> => {
    const ids = viewer.getPanelNames() as string[];
    if (ids.length > 1) await viewer.removePanel(ids[ids.length - 1]!);
  };
  const activateFirst = async (): Promise<void> => {
    const [first] = viewer.getPanelNames() as string[];
    if (first) await viewer.setActivePanel(first);
    out?.log(`getActivePanel() → ${JSON.stringify(viewer.getActivePanel())}`);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let growing = true;
    stop = every(1800, () => {
      const count = (viewer.getPanelNames() as string[]).length;
      if (count >= 3) growing = false;
      if (count <= 1) growing = true;
      void (growing ? add() : removeLast());
    });
  } else {
    button(bar!, 'addPanel()', () => void add());
    button(bar!, 'removePanel(last)', () => void removeLast());
    button(bar!, 'setActivePanel(first)', () => void activateFirst());
    button(bar!, 'getPanelNames()', () => out!.log(`getPanelNames() → ${JSON.stringify(viewer.getPanelNames())}`));
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    viewer.removeEventListener('perspective-layout-update', onLayout);
    viewer.removeEventListener('perspective-active-panel-update', onActive);
    dispose();
  };
};

export default mount;
