// pointerEvents and cursor decide where a node answers the mouse
import { Graph, type IElementEvent, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const MODES = ['auto', 'stroke', 'none'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: {
          nodes: MODES.map((m, i) => ({ id: m, style: { x: 50 + i * 100, y: 60 } })),
        },
        node: {
          style: {
            size: 60,
            lineWidth: 6,
            stroke: '#F6BD16',
            fill: '#2a3550',
            labelText: (d: NodeData) => `pointerEvents: ${d.id}`,
            // 'stroke' answers only on the ring; 'none' never answers.
            pointerEvents: (d: NodeData) => d.id as (typeof MODES)[number],
            cursor: (d: NodeData) => (d.id === 'auto' ? 'pointer' : d.id === 'stroke' ? 'crosshair' : 'default'),
          },
          state: { selected: { stroke: '#61DDAA' } },
        },
        behaviors: [],
      }),
    );
    await graph.render();

    if (stage.bar) {
      const log = readout(stage.container.parentElement ?? stage.container);
      log.textContent = 'Click the fill and the ring of each node.';
      graph.on('node:click', (e: IElementEvent) => {
        const id = e.target.id;
        void graph.setElementState({ auto: [], stroke: [], none: [], [id]: ['selected'] });
        log.textContent = `clicked ${id}`;
      });
    } else {
      // A card has no pointer, so the cycle stands in for clicks: 'none' never gets one.
      stage.every(1000, (i) => graph.setElementState({ auto: [], stroke: [], none: [], [MODES[i % 2]!]: ['selected'] }));
    }
  });

export default mount;
