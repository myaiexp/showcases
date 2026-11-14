// Arrows at both ends: startArrow and endArrow with their own type and size
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const TYPES = ['triangle', 'circle', 'diamond', 'vee', 'rect', 'triangleRect', 'simple'] as const;
type ArrowType = (typeof TYPES)[number];
interface Opts {
  start: boolean;
  startType: ArrowType;
  startSize: number;
  end: boolean;
  endType: ArrowType;
  endSize: number;
}
const edgeOf = (o: Opts): EdgeOptions => ({
  style: {
    stroke: '#52C41A',
    lineWidth: 2,
    startArrow: o.start,
    startArrowType: o.startType,
    startArrowSize: o.startSize,
    endArrow: o.end,
    endArrowType: o.endType,
    endArrowSize: o.endSize,
  },
});
const STEPS: Opts[] = [
  { start: true, startType: 'circle', startSize: 8, end: true, endType: 'triangle', endSize: 10 },
  { start: true, startType: 'diamond', startSize: 12, end: true, endType: 'vee', endSize: 14 },
  { start: false, startType: 'circle', startSize: 8, end: true, endType: 'rect', endSize: 10 },
  { start: true, startType: 'simple', startSize: 14, end: true, endType: 'triangleRect', endSize: 12 },
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const o = { ...STEPS[0]! };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(1, { gap: 0, top: 60 }),
        edge: edgeOf(o),
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setEdge(edgeOf(o));
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'startArrow', o.start, (v) => ((o.start = v), void apply()));
      select(stage.bar, 'startArrowType', TYPES, o.startType, (v) => ((o.startType = v), void apply()));
      slider(stage.bar, 'startArrowSize', [4, 30, 1], o.startSize, (v) => ((o.startSize = v), void apply()));
      toggle(stage.bar, 'endArrow', o.end, (v) => ((o.end = v), void apply()));
      select(stage.bar, 'endArrowType', TYPES, o.endType, (v) => ((o.endType = v), void apply()));
      slider(stage.bar, 'endArrowSize', [4, 30, 1], o.endSize, (v) => ((o.endSize = v), void apply()));
    } else {
      stage.every(1300, (i) => (Object.assign(o, STEPS[i % STEPS.length]), apply()));
    }
  });

export default mount;
