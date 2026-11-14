// Continuous palette: type 'value' maps a data field through an interpolator to a fill
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const RAMPS = {
  'black to red': (v: number) => `rgb(${Math.round(v * 255)}, 0, 0)`,
  'blue to yellow': (v: number) => `rgb(${Math.round(v * 255)}, ${Math.round(v * 200)}, ${Math.round(255 - v * 255)})`,
  'dark to mint': (v: number) => `rgb(${Math.round(20 + v * 60)}, ${Math.round(40 + v * 190)}, ${Math.round(60 + v * 120)})`,
};
type Ramp = keyof typeof RAMPS;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { ramp: 'black to red' as Ramp, invert: false };
    const palette = () => ({ type: 'value' as const, field: 'value', color: RAMPS[v.ramp], invert: v.invert });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { nodes: Array.from({ length: 6 }, (_, i) => ({ id: `node-${i}`, data: { value: i * 20 } })) },
        layout: { type: 'grid', cols: 6 },
        // The interpolator gets the value rescaled to 0..1 over the data's min and max.
        node: { style: { size: 36, stroke: '#ffffff', lineWidth: 1, labelText: (d) => String(d.data?.value), labelPlacement: 'bottom' }, palette: palette() },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.setNode({ style: { size: 36, stroke: '#ffffff', lineWidth: 1, labelText: (d) => String(d.data?.value), labelPlacement: 'bottom' }, palette: palette() });
      await graph.draw();
    };
    const names = Object.keys(RAMPS) as Ramp[];
    if (stage.bar) {
      select(stage.bar, 'interpolator', names, v.ramp, (x) => ((v.ramp = x), void apply()));
      toggle(stage.bar, 'invert', false, (x) => ((v.invert = x), void apply()));
    } else {
      stage.every(1300, (i) => {
        v.ramp = names[i % names.length]!;
        v.invert = i % 6 >= 3;
        return apply();
      });
    }
  });

export default mount;
