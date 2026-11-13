// One restoreWorkspace() call: three panels arranged by a layout tree
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders, REGIONS } from '../../shared/data.ts';
import { every } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('superstore');
  const table = await client.table(orders(), { name });

  const viewer = createViewer(el, ctx, { height: 620 });
  await viewer.load(client);

  // layout.md § Building a grid dashboard: `panels` defines each panel's view under an
  // id of our choosing, and `layout` places those ids. A vertical split's first child is
  // a horizontal split, so two panels share the top row and one spans the bottom.
  await viewer.restoreWorkspace({
    layout: {
      type: 'split-layout',
      orientation: 'vertical',
      sizes: [0.55, 0.45],
      children: [
        {
          type: 'split-layout',
          orientation: 'horizontal',
          sizes: [0.5, 0.5],
          children: [
            { type: 'tab-layout', tabs: ['sales'] },
            { type: 'tab-layout', tabs: ['regions'] },
          ],
        },
        { type: 'tab-layout', tabs: ['grid'] },
      ],
    },
    panels: {
      sales: {
        table: name,
        title: 'Sales by Sub-Category',
        plugin: 'Y Bar',
        group_by: ['Sub-Category'],
        split_by: ['Segment'],
        sort: [['Sales', 'desc']],
        columns: ['Sales'],
      },
      regions: {
        table: name,
        title: 'Sales by Region',
        plugin: 'Treemap',
        group_by: ['Region', 'State'],
        columns: ['Sales', 'Profit'],
      },
      grid: {
        table: name,
        title: 'Profit by Region',
        plugin: 'Datagrid',
        group_by: ['Region', 'State'],
        split_by: ['Category'],
        columns: ['Sales', 'Profit'],
      },
    },
  });

  // A card steps a global filter through the regions so every panel redraws together.
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(2600, () => {
      const region = REGIONS[i++ % REGIONS.length]!;
      void viewer.restoreWorkspace({ global_filters: [['Region', '==', region]] });
    });
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
