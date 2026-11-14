// tooltip title option and the onOpenChange callback
import { Graph, Tooltip } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { elementEvent } from '../../shared/plugin-drive.ts';
import { hubData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const out = stage.bar ? readout(el) : null;
    let opens = 0;
    if (out) out.textContent = 'Hover an element.';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 36,
        plugins: [
          {
            type: 'tooltip',
            key: 'tip',
            title: 'Element details',
            onOpenChange: (open: boolean) => {
              if (open) opens += 1;
              if (out) out.textContent = `onOpenChange(${String(open)})  opened ${opens} time(s)`;
            },
          },
        ],
      }),
    );
    await graph.render();

    if (stage.preview) {
      const tip = graph.getPluginInstance<Tooltip>('tip');
      const ids = ['node-0', 'node-3', 'node-5'];
      stage.every(1300, (i) => (i % 2 ? tip.show(elementEvent(graph, ids[(i >> 1) % ids.length]!)) : tip.hide()));
    }
  });

export default mount;
