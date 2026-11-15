// Animation controls beside the slider: a log/linear y axis and a continent spotlight
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('gapminderDataFiveYear.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 540 });
  const years = [...new Set(rows.map((r) => r.year!))];
  const continents = [...new Set(rows.map((r) => r.continent!))];
  const slice = (year: string, c: string): object => {
    const r = rows.filter((d) => d.year === year && d.continent === c);
    return { x: r.map((d) => Number(d.lifeExp)), y: r.map((d) => Number(d.gdpPercap)), text: r.map((d) => d.country), ids: r.map((d) => d.country), marker: { size: r.map((d) => Number(d.pop)) } };
  };
  const frames = years.map((y) => ({ name: y, data: continents.map((c) => slice(y, c)) }));
  const steps = years.map((y) => ({ method: 'animate', label: y, args: [[y], { mode: 'immediate', transition: { duration: 300 }, frame: { duration: 300, redraw: false } }] }));

  await Plotly.newPlot(stage.div, {
    data: continents.map((c) => ({ name: c, mode: 'markers', ...(slice(years[0]!, c) as object), marker: { sizemode: 'area', sizeref: 200000, size: rows.filter((d) => d.year === years[0] && d.continent === c).map((d) => Number(d.pop)) } })),
    layout: {
      template: stage.template,
      xaxis: { range: [30, 85], title: stage.preview ? undefined : { text: 'Life Expectancy' } },
      yaxis: { type: 'log', title: stage.preview ? undefined : { text: 'GDP per Capita' } },
      hovermode: 'closest',
      margin: stage.preview ? undefined : { b: 110 },
      showlegend: !stage.preview,
      sliders: stage.preview ? [] : [{ pad: { t: 50 }, currentvalue: { prefix: 'Year: ', font: { size: 18 } }, steps }],
    } as unknown as Partial<Layout>,
    frames,
    config: stage.config,
  } as never);

  if (stage.bar) {
    select(stage.bar, 'GDP axis', ['log', 'linear'], 'log', (v) => void relayout(stage.div, { 'yaxis.type': v }));
    select(stage.bar, 'spotlight', ['all', ...continents], 'all', (v) => void restyle(stage.div, { opacity: continents.map((c) => (v === 'all' || v === c ? 1 : 0.12)) }));
    const opts = { mode: 'immediate', fromcurrent: true, transition: { duration: 300 }, frame: { duration: 500, redraw: false } } as never;
    button(stage.bar, 'Play', () => void Plotly.animate(stage.div, null as never, opts).catch(() => {}));
    button(stage.bar, 'Pause', () => void Plotly.animate(stage.div, [null] as never, opts).catch(() => {}));
  }
  if (stage.preview) {
    stage.every(800, (i) => {
      if (i % 10 === 1) void relayout(stage.div, { 'yaxis.type': Math.floor(i / 10) % 2 ? 'log' : 'linear' });
      void Plotly.animate(stage.div, [years[i % years.length]!], { mode: 'immediate', transition: { duration: 500 }, frame: { duration: 500, redraw: false } }).catch(() => {});
    });
  }

  return () => stage.dispose();
};

export default mount;
