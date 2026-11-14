// A custom focus state on edges adds an orange halo; click an edge to toggle it
import { Graph, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = rows(3, { gap: 50 });
    data.edges![1]!.states = ['focus'];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data,
        edge: {
          style: { lineWidth: 2, stroke: '#69B1FF', cursor: 'pointer' },
          // Any name works as a state; this one is applied from the data and on click.
          state: { focus: { halo: true, haloLineWidth: 6, haloStroke: 'orange', haloStrokeOpacity: 0.6 } },
        },
      }),
    );
    await graph.render();
    if (stage.bar) {
      graph.on('edge:click', (e: IElementEvent) => {
        const on = graph.getElementState(e.target.id).includes('focus');
        void graph.setElementState(e.target.id, on ? [] : ['focus']);
      });
    } else {
      stage.every(1000, (i) => graph.setElementState({ e0: i % 3 === 0 ? ['focus'] : [], e1: i % 3 === 1 ? ['focus'] : [], e2: i % 3 === 2 ? ['focus'] : [] }));
    }
  });

export default mount;
