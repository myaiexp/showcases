// toolbar plugin whose getItems is async, then replaced through updatePlugin
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const SETS = [
  ['zoom-in', 'zoom-out', 'auto-fit'],
  ['undo', 'redo', 'reset', 'export'],
];

// The docs fetch the items from a server; a timer stands in so nothing is requested.
const loadItems = (set: number) => async (): Promise<{ id: string; value: string }[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return SETS[set % SETS.length]!.map((id) => ({ id, value: id }));
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: [48, 24, 24, 24],
        plugins: [{ type: 'toolbar', key: 'toolbar', getItems: loadItems(0) }],
      }),
    );
    await graph.render();

    let set = 0;
    const swap = (): void => {
      set += 1;
      graph.updatePlugin({ key: 'toolbar', getItems: loadItems(set) });
    };
    if (stage.bar) button(stage.bar, 'load other items', swap);
    else stage.every(2200, swap);
  });

export default mount;
