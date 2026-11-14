// Combo fill, stroke, lineWidth and fillOpacity on a one-combo graph
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

interface Opts {
  fill: string;
  stroke: string;
  lineWidth: number;
  fillOpacity: number;
}
const comboOf = (o: Opts): ComboOptions => ({ style: { ...o } });
const STEPS: Opts[] = [
  { fill: '#5B8FF9', stroke: '#E8E8E8', lineWidth: 2, fillOpacity: 0.2 },
  { fill: '#F5222D', stroke: '#FFA39E', lineWidth: 6, fillOpacity: 0.5 },
  { fill: '#52C41A', stroke: '#B7EB8F', lineWidth: 1, fillOpacity: 0.9 },
  { fill: '#FAAD14', stroke: '#FFFFFF', lineWidth: 4, fillOpacity: 0.1 },
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const o = { ...STEPS[0]! };
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 20, data: single(), combo: comboOf(o) }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(o));
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'fill', ['#5B8FF9', '#F5222D', '#52C41A', '#FAAD14'], o.fill, (v) => ((o.fill = v), void apply()));
      select(stage.bar, 'stroke', ['#E8E8E8', '#FFA39E', '#B7EB8F', '#FFFFFF'], o.stroke, (v) => ((o.stroke = v), void apply()));
      slider(stage.bar, 'lineWidth', [0, 12, 1], o.lineWidth, (v) => ((o.lineWidth = v), void apply()));
      slider(stage.bar, 'fillOpacity', [0, 1, 0.05], o.fillOpacity, (v) => ((o.fillOpacity = v), void apply()));
    } else {
      stage.every(1300, (i) => (Object.assign(o, STEPS[i % STEPS.length]), apply()));
    }
  });

export default mount;
