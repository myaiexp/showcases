// The node option: type, style, and style per state, with hover and selected states
import { Graph, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(7, 'n', 80),
        node: {
          type: 'circle',
          style: {
            fill: '#e6f7ff',
            stroke: '#91d5ff',
            lineWidth: 1,
            r: 20,
            labelText: (d) => d.id,
            labelFill: '#fff',
          },
          // 'hover' is not built in: it is just a name the example sets itself.
          state: {
            hover: { lineWidth: 3, stroke: '#69c0ff' },
            selected: { fill: '#bae7ff', stroke: '#1890ff', lineWidth: 3, halo: false },
          },
        },
        autoFit: 'view',
        behaviors: ['click-select'],
      }),
    );
    await graph.render();

    if (stage.bar) {
      graph.on('node:pointerenter', (e: IElementEvent) => void graph.setElementState(e.target.id, 'hover'));
      graph.on('node:pointerleave', (e: IElementEvent) => void graph.setElementState(e.target.id, []));
    } else {
      stage.every(900, (i) => {
        const id = `n${i % 7}`;
        const prev = `n${(i + 6) % 7}`;
        return graph.setElementState({ [prev]: [], [id]: i % 2 ? 'selected' : 'hover' });
      });
    }
  });

export default mount;
