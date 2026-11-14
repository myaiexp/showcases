// A custom focus state on combos, applied from data and toggled by click
import { Graph, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: [
            { id: 'n1', combo: 'c1', style: { x: 70, y: 90 } },
            { id: 'n2', combo: 'c2', style: { x: 210, y: 90 } },
          ],
          // c1 starts in the focus state straight from the data.
          combos: [
            { id: 'c1', states: ['focus'] },
            { id: 'c2' },
          ],
        },
        combo: {
          style: { padding: 20, cursor: 'pointer', labelText: (d) => d.id },
          state: { focus: { lineWidth: 3, stroke: 'orange', fill: 'orange', fillOpacity: 0.2 } },
        },
      }),
    );
    await graph.render();
    if (stage.bar) {
      graph.on('combo:click', (e: IElementEvent) => {
        const on = graph.getElementState(e.target.id).includes('focus');
        void graph.setElementState(e.target.id, on ? [] : ['focus']);
      });
    } else {
      stage.every(1000, (i) => graph.setElementState({ c1: i % 2 ? [] : ['focus'], c2: i % 2 ? ['focus'] : [] }));
    }
  });

export default mount;
