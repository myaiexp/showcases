// The classic Gapminder animation: one trace per continent, one frame per year, a slider step per frame
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

interface Bucket {
  x: number[];
  y: number[];
  id: string[];
  text: string[];
  marker: { size: number[] };
}

const mount: Mount = async (el, ctx) => {
  const rows = await csv('gapminderDataFiveYear.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 540 });

  // lookup[year][continent]: sort and regroup the rows, as the docs do.
  const lookup: Record<string, Record<string, Bucket>> = {};
  for (const d of rows) {
    const byYear = (lookup[d.year!] ??= {});
    const b = (byYear[d.continent!] ??= { x: [], y: [], id: [], text: [], marker: { size: [] } });
    b.text.push(d.country!);
    b.id.push(d.country!);
    b.x.push(Number(d.lifeExp));
    b.y.push(Number(d.gdpPercap));
    b.marker.size.push(Number(d.pop));
  }
  const years = Object.keys(lookup);
  const continents = Object.keys(lookup[years[0]!]!);

  // Slices keep the frames' data out of the traces' arrays (the docs' note on data references).
  const traces = continents.map((c) => {
    const d = lookup[years[0]!]![c]!;
    return { name: c, x: d.x.slice(), y: d.y.slice(), id: d.id.slice(), text: d.text.slice(), mode: 'markers' as const, marker: { size: d.marker.size.slice(), sizemode: 'area' as const, sizeref: 200000 } };
  });
  const frames = years.map((y) => ({ name: y, data: continents.map((c) => lookup[y]![c]!) }));
  const steps = years.map((y) => ({ method: 'animate', label: y, args: [[y], { mode: 'immediate', transition: { duration: 300 }, frame: { duration: 300, redraw: false } }] }));

  await Plotly.newPlot(stage.div, {
    data: traces,
    layout: {
      template: stage.template,
      xaxis: { title: stage.preview ? undefined : { text: 'Life Expectancy' }, range: [30, 85] },
      yaxis: { title: stage.preview ? undefined : { text: 'GDP per Capita' }, type: 'log' },
      hovermode: 'closest',
      margin: stage.preview ? undefined : { b: 140 },
      showlegend: !stage.preview,
      updatemenus: stage.preview
        ? []
        : [{ x: 0, y: 0, yanchor: 'top', xanchor: 'left', showactive: false, direction: 'left', type: 'buttons', pad: { t: 87, r: 10 }, buttons: [{ method: 'animate', args: [null, { mode: 'immediate', fromcurrent: true, transition: { duration: 300 }, frame: { duration: 500, redraw: false } }], label: 'Play' }, { method: 'animate', args: [[null], { mode: 'immediate', transition: { duration: 0 }, frame: { duration: 0, redraw: false } }], label: 'Pause' }] }],
      sliders: stage.preview ? [] : [{ pad: { l: 130, t: 55 }, currentvalue: { visible: true, prefix: 'Year:', xanchor: 'right', font: { size: 20, color: '#aaa' } }, steps }],
    } as unknown as Partial<Layout>,
    frames,
    config: stage.config,
  } as never);

  if (stage.preview) {
    stage.every(650, (i) => void Plotly.animate(stage.div, [years[i % years.length]!], { mode: 'immediate', transition: { duration: 500 }, frame: { duration: 500, redraw: false } }).catch(() => {}));
  }

  return () => stage.dispose();
};

export default mount;
