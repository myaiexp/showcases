// restoreWorkspace({ layout }) moves, resizes and stacks existing panels
import type { Mount } from '@/types.ts';
import { worker, uniqueName, createViewer, teardown } from '../../shared/setup.ts';
import { orders } from '../../shared/data.ts';
import { controlBar, button, output, every } from '../../shared/controls.ts';
import { arrangements } from './arrangements.ts';

const mount: Mount = async (el, ctx) => {
  const client = await worker();
  const name = uniqueName('superstore');
  const table = await client.table(orders(), { name });

  const bar = ctx.preview ? null : controlBar(el);
  const viewer = createViewer(el, ctx, { height: 520 });
  await viewer.load(client);
  await viewer.restoreWorkspace({
    panels: {
      bars: { table: name, title: 'Bars', plugin: 'Y Bar', group_by: ['Category'], columns: ['Sales'] },
      tree: { table: name, title: 'Treemap', plugin: 'Treemap', group_by: ['Region', 'State'], columns: ['Sales'] },
      grid: { table: name, title: 'Grid', plugin: 'Datagrid', group_by: ['Segment'], columns: ['Sales', 'Profit'] },
    },
    layout: {
      type: 'split-layout',
      orientation: 'horizontal',
      sizes: [1, 1, 1],
      children: [
        { type: 'tab-layout', tabs: ['bars'] },
        { type: 'tab-layout', tabs: ['tree'] },
        { type: 'tab-layout', tabs: ['grid'] },
      ],
    },
  });

  // layout.md: name the panels by their existing ids. Without `panels`, the call keeps
  // every panel the layout names; nothing is re-created or re-queried.
  const ids = viewer.getPanelNames() as string[];
  const shapes = arrangements(ids);
  const out = ctx.preview ? null : output(el, 120);
  const apply = async (label: string): Promise<void> => {
    await viewer.restoreWorkspace({ layout: shapes[label]! });
    // saveWorkspace() reads the geometry back; nested splits of one orientation flatten.
    const { layout } = await viewer.saveWorkspace();
    out?.set(`${label}\n${JSON.stringify(layout)}`);
  };

  let stop = (): void => {};
  if (ctx.preview) {
    const labels = Object.keys(shapes);
    let i = 0;
    stop = every(2400, () => void apply(labels[++i % labels.length]!));
  } else {
    for (const label of Object.keys(shapes)) button(bar!, label, () => void apply(label));
    // A malformed layout is rejected before anything changes, naming the bad node.
    button(bar!, 'invalid: a panel twice', () => {
      viewer
        .restoreWorkspace({ layout: { type: 'tab-layout', tabs: [ids[0]!, ids[0]!] } })
        .catch((err: unknown) => out!.set(`rejected: ${String(err)}`));
    });
  }

  const dispose = teardown([viewer], [table]);
  return () => {
    stop();
    dispose();
  };
};

export default mount;
