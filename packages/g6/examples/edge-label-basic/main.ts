// Edge label basics: labelText, labelFill, labelFontSize and the label switch
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

interface Opts {
  label: boolean;
  fill: string;
  size: number;
}
const edgeOf = (o: Opts): EdgeOptions => ({
  style: { stroke: '#5CACEE', label: o.label, labelText: 'Edge Label', labelFill: o.fill, labelFontSize: o.size, labelPlacement: 'center' },
});
const STEPS: Opts[] = [
  { label: true, fill: '#ffffff', size: 12 },
  { label: true, fill: '#FFC53D', size: 20 },
  { label: false, fill: '#ffffff', size: 12 },
  { label: true, fill: '#95DE64', size: 16 },
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
      toggle(stage.bar, 'label', o.label, (v) => ((o.label = v), void apply()));
      select(stage.bar, 'labelFill', ['#ffffff', '#FFC53D', '#95DE64'], o.fill, (v) => ((o.fill = v), void apply()));
      slider(stage.bar, 'labelFontSize', [8, 32, 1], o.size, (v) => ((o.size = v), void apply()));
    } else {
      stage.every(1300, (i) => (Object.assign(o, STEPS[i % STEPS.length]), apply()));
    }
  });

export default mount;
