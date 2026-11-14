// All twelve loopPlacement values, one loop each, around a large node
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const PLACEMENTS = [
  'top', 'top-right', 'right-top', 'right', 'right-bottom', 'bottom-right',
  'bottom', 'bottom-left', 'left-bottom', 'left', 'left-top', 'top-left',
] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [{ id: 'n', style: { x: 140, y: 100 } }],
          edges: PLACEMENTS.map((p) => ({ id: p, source: 'n', target: 'n', data: { p } })),
        },
        node: { style: { size: 60, fill: '#1d2a44' } },
        edge: {
          style: {
            lineWidth: 1.5,
            endArrow: true,
            loopDist: 22,
            loopPlacement: (d) => d.data!.p as (typeof PLACEMENTS)[number],
            stroke: (d) => `hsl(${PLACEMENTS.indexOf(d.data!.p as (typeof PLACEMENTS)[number]) * 30} 70% 60%)`,
            labelText: (d) => String(d.id),
            labelFontSize: 8,
          },
          state: { active: { lineWidth: 4, halo: true } },
        },
      }),
    );
    await graph.render();
    if (stage.preview) {
      stage.every(500, (i) =>
        graph.setElementState(Object.fromEntries(PLACEMENTS.map((p, k) => [p, k === i % PLACEMENTS.length ? ['active'] : []]))),
      );
    }
  });

export default mount;
