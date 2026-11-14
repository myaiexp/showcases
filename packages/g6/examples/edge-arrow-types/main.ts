// The seven endArrowType values, one edge each, with a size slider
import { Graph, type EdgeData, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const TYPES = ['triangle', 'circle', 'diamond', 'vee', 'rect', 'triangleRect', 'simple'] as const;
const edgeOf = (size: number): EdgeOptions => ({
  style: {
    stroke: '#69B1FF',
    lineWidth: 2,
    endArrow: true,
    endArrowSize: size,
    endArrowType: (d: EdgeData) => (d.data?.arrow as (typeof TYPES)[number]) ?? 'vee',
    labelText: (d: EdgeData) => String(d.data?.arrow),
    labelFontSize: 9,
    labelPlacement: 'start',
    labelOffsetY: -6,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    // Four edges on the left column, three on the right.
    const nodes = TYPES.flatMap((t, i) => {
      const x = i < 4 ? 0 : 160;
      const y = (i < 4 ? i : i - 4) * 40;
      return [
        { id: `${t}-s`, style: { x, y } },
        { id: `${t}-t`, style: { x: x + 110, y } },
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
          edges: TYPES.map((t) => ({ id: t, source: `${t}-s`, target: `${t}-t`, data: { arrow: t } })),
        },
        node: { style: { size: 6, fill: '#8b9baf' } },
        edge: edgeOf(10),
      }),
    );
    await graph.render();
    const set = async (s: number): Promise<void> => {
      graph.setEdge(edgeOf(s));
      await graph.draw();
    };
    if (stage.bar) slider(stage.bar, 'endArrowSize', [4, 30, 1], 10, (v) => void set(v));
    else stage.every(1200, (i) => set(i % 2 ? 10 : 18));
  });

export default mount;
