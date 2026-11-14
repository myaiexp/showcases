// Combo halo: haloStroke, haloLineWidth, haloStrokeOpacity and a blur haloFilter
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { single } from '../../shared/combo-data.ts';

interface Opts {
  halo: boolean;
  stroke: string;
  width: number;
  opacity: number;
  blur: boolean;
}
const comboOf = (o: Opts): ComboOptions => ({
  style: {
    padding: 20,
    fill: '#999',
    fillOpacity: 0.12,
    halo: o.halo,
    haloStroke: o.stroke,
    haloLineWidth: o.width,
    haloStrokeOpacity: o.opacity,
    haloFilter: o.blur ? 'blur(2px)' : 'none',
  },
});
const STEPS: Opts[] = [
  { halo: true, stroke: '#1783FF', width: 8, opacity: 0.3, blur: false },
  { halo: true, stroke: '#FF4D4F', width: 12, opacity: 0.5, blur: true },
  { halo: false, stroke: '#1783FF', width: 8, opacity: 0.3, blur: false },
  { halo: true, stroke: '#52C41A', width: 16, opacity: 0.4, blur: false },
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const o = { ...STEPS[0]! };
    const graph = stage.keep(
      new Graph({ container: stage.container, theme: 'dark', autoFit: 'view', padding: 36, data: single(), combo: comboOf(o) }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(o));
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'halo', o.halo, (v) => ((o.halo = v), void apply()));
      select(stage.bar, 'haloStroke', ['#1783FF', '#FF4D4F', '#52C41A'], o.stroke, (v) => ((o.stroke = v), void apply()));
      slider(stage.bar, 'haloLineWidth', [0, 30, 1], o.width, (v) => ((o.width = v), void apply()));
      slider(stage.bar, 'haloStrokeOpacity', [0, 1, 0.05], o.opacity, (v) => ((o.opacity = v), void apply()));
      toggle(stage.bar, 'haloFilter blur(2px)', o.blur, (v) => ((o.blur = v), void apply()));
    } else {
      stage.every(1300, (i) => (Object.assign(o, STEPS[i % STEPS.length]), apply()));
    }
  });

export default mount;
