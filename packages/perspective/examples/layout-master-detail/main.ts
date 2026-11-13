// A master panel's selection filters the detail panels through global_filters
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders, REGIONS } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('superstore');
  const table = await client.table(orders(), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 520 });
  await viewer.load(client);
  await viewer.restoreWorkspace({
    panels: {
      regions: { table: name, title: 'Regions (master)', plugin: 'Datagrid', group_by: ['Region'], columns: ['Sales'] },
      categories: { table: name, title: 'Sub-Categories', plugin: 'X Bar', group_by: ['Sub-Category'], columns: ['Sales'], sort: [['Sales', 'desc']] },
      orders: { table: name, title: 'Orders', plugin: 'Datagrid', columns: ['Order ID', 'Region', 'State', 'Sales'] },
    },
    layout: {
      type: 'split-layout',
      orientation: 'horizontal',
      sizes: [0.25, 0.4, 0.35],
      children: [
        { type: 'tab-layout', tabs: ['regions'] },
        { type: 'tab-layout', tabs: ['categories'] },
        { type: 'tab-layout', tabs: ['orders'] },
      ],
    },
    // layout.md § Master/detail: a master is a filter source. Selecting a row in it
    // writes that row's group-by values into global_filters, which every detail panel
    // applies on top of its own filter.
    masters: ['regions'],
  });

  const out = ctx.preview ? null : output(el, 110);
  // events.md § Global filter events: fires whenever the cross-filter set changes.
  const onFilters = (event: Event): void => {
    out?.log(`perspective-global-filter-update → ${JSON.stringify((event as CustomEvent).detail)}`);
  };
  viewer.addEventListener('perspective-global-filter-update', onFilters);

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(2400, () => {
      const region = REGIONS[i++ % REGIONS.length]!;
      void viewer.restoreWorkspace({ global_filters: [['Region', '==', region]] });
    });
  } else {
    out!.log('Click a region in the left grid: the bars and the order list follow. The master itself is never filtered.');
    // Both fields can be set directly, without re-creating the panels.
    button(bar!, 'global_filters: West', () => void viewer.restoreWorkspace({ global_filters: [['Region', '==', 'West']] }));
    button(bar!, 'global_filters: null', () => void viewer.restoreWorkspace({ global_filters: null }));
    button(bar!, 'masters: null', () => void viewer.restoreWorkspace({ masters: null }));
    button(bar!, 'masters: ["regions"]', () => void viewer.restoreWorkspace({ masters: ['regions'] }));
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    viewer.removeEventListener('perspective-global-filter-update', onFilters);
    dispose();
  };
};

export default mount;
