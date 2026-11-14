// plot.scale and plot.legend: read a color scale, draw its legend
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) => {
    const plot = Plot.plot({
      width,
      height,
      marks: [Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'species' })],
    });
    if (preview) return plot;
    const color = plot.scale('color');
    const wrap = document.createElement('div');
    const note = document.createElement('pre');
    note.className = 'op-readout';
    // The scale object holds the domain and range Plot inferred.
    note.textContent = `plot.scale("color").domain = ${JSON.stringify(color?.domain)}\nplot.scale("color").range = ${JSON.stringify(color?.range)}`;
    // A standalone legend for the same scale, placed above the plot.
    const legend = plot.legend('color');
    wrap.append(...(legend ? [legend] : []), plot, note);
    return wrap;
  });
};

export default mount;
