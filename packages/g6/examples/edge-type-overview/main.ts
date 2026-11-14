// The six built-in edge types between the same kind of node pair
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const TYPES = ['line', 'polyline', 'quadratic', 'cubic', 'cubic-vertical', 'cubic-horizontal'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    // Three rows of two pairs; each pair's right node sits lower so bends are visible.
    const nodes = TYPES.flatMap((t, i) => {
      const x = (i % 2) * 150;
      const y = Math.floor(i / 2) * 60;
      return [
        { id: `${t}-s`, style: { x, y } },
        { id: `${t}-t`, style: { x: x + 100, y: y + 30 } },
      ];
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes,
          edges: TYPES.map((t) => ({ id: t, type: t, source: `${t}-s`, target: `${t}-t` })),
        },
        node: { style: { size: 10, fill: '#8b9baf' } },
        edge: {
          style: {
            lineWidth: 2,
            stroke: '#7e8ff0',
            endArrow: true,
            labelText: (d) => String(d.id),
            labelFontSize: 9,
            labelBackground: true,
            labelOffsetY: -4,
          },
        },
      }),
    );
    await graph.render();
    // Light one edge at a time; setElementState with a map replaces each listed edge's states.
    if (stage.preview) {
      stage.every(900, (i) =>
        graph.setElementState(Object.fromEntries(TYPES.map((t, k) => [t, k === i % TYPES.length ? ['active'] : []]))),
      );
    }
  });

export default mount;
