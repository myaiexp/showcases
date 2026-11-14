// Edge stroke, lineWidth, opacity and strokeOpacity on one edge
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

interface Opts {
  stroke: string;
  lineWidth: number;
  opacity: number;
  strokeOpacity: number;
}
const edgeOf = (o: Opts): EdgeOptions => ({ style: { ...o } });
const STEPS: Opts[] = [
  { stroke: '#5B8FF9', lineWidth: 2, opacity: 1, strokeOpacity: 1 },
  { stroke: '#F5222D', lineWidth: 8, opacity: 1, strokeOpacity: 1 },
  { stroke: '#52C41A', lineWidth: 6, opacity: 0.4, strokeOpacity: 1 },
  { stroke: '#FAAD14', lineWidth: 6, opacity: 1, strokeOpacity: 0.3 },
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
      select(stage.bar, 'stroke', ['#5B8FF9', '#F5222D', '#52C41A', '#FAAD14'], o.stroke, (v) => ((o.stroke = v), void apply()));
      slider(stage.bar, 'lineWidth', [1, 20, 1], o.lineWidth, (v) => ((o.lineWidth = v), void apply()));
      slider(stage.bar, 'opacity', [0, 1, 0.05], o.opacity, (v) => ((o.opacity = v), void apply()));
      slider(stage.bar, 'strokeOpacity', [0, 1, 0.05], o.strokeOpacity, (v) => ((o.strokeOpacity = v), void apply()));
    } else {
      stage.every(1400, (i) => (Object.assign(o, STEPS[i % STEPS.length]), apply()));
    }
  });

export default mount;
