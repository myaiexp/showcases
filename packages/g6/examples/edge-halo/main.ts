// Edge halo: halo, haloStroke, haloLineWidth and haloStrokeOpacity
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

interface Opts {
  halo: boolean;
  stroke: string;
  width: number;
  opacity: number;
}
const edgeOf = (o: Opts): EdgeOptions => ({
  style: { lineWidth: 2, stroke: '#69B1FF', halo: o.halo, haloStroke: o.stroke, haloLineWidth: o.width, haloStrokeOpacity: o.opacity },
});
const STEPS: Opts[] = [
  { halo: true, stroke: '#1890FF', width: 6, opacity: 0.3 },
  { halo: true, stroke: '#FF4D4F', width: 16, opacity: 0.5 },
  { halo: false, stroke: '#1890FF', width: 6, opacity: 0.3 },
  { halo: true, stroke: '#52C41A', width: 10, opacity: 0.8 },
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
      toggle(stage.bar, 'halo', o.halo, (v) => ((o.halo = v), void apply()));
      select(stage.bar, 'haloStroke', ['#1890FF', '#FF4D4F', '#52C41A'], o.stroke, (v) => ((o.stroke = v), void apply()));
      slider(stage.bar, 'haloLineWidth', [0, 30, 1], o.width, (v) => ((o.width = v), void apply()));
      slider(stage.bar, 'haloStrokeOpacity', [0, 1, 0.05], o.opacity, (v) => ((o.opacity = v), void apply()));
    } else {
      stage.every(1300, (i) => (Object.assign(o, STEPS[i % STEPS.length]), apply()));
    }
  });

export default mount;
