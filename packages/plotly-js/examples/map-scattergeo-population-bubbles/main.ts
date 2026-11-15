// scattergeo frames update marker size and colour per country while locations stay put
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const [rows] = await Promise.all([csv('gapminder_with_codes.csv'), loadGeoAssets()]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });
  const years = Array.from({ length: 12 }, (_, i) => 1952 + i * 5);
  const first = rows.filter((d) => Number(d.year) === 1952);
  const frames = years.map((year) => {
    const r = rows.filter((d) => Number(d.year) === year);
    return { name: String(year), data: [{ locations: r.map((d) => d.iso_alpha), text: r.map((d) => `${d.country}: ${d.lifeExp}`), marker: { size: r.map((d) => Number(d.pop)), color: r.map((d) => Number(d.lifeExp)) } }] };
  });
  const steps = years.map((y) => ({ label: String(y), method: 'animate', args: [[String(y)], { mode: 'immediate', transition: { duration: 400 }, frame: { duration: 400 } }] }));

  await Plotly.newPlot(stage.div, {
    data: [{
      type: 'scattergeo', mode: 'markers', locationmode: 'ISO-3',
      locations: first.map((d) => d.iso_alpha), text: first.map((d) => `${d.country}: ${d.lifeExp}`),
      marker: { size: first.map((d) => Number(d.pop)), sizemode: 'area', sizeref: 2 * 1.3e9 / 45 ** 2, sizemin: 3, color: first.map((d) => Number(d.lifeExp)), cmin: 30, cmax: 85, colorscale: 'Viridis', showscale: !stage.preview, opacity: 0.8, line: { width: 0 } },
    }],
    layout: {
      template: stage.template,
      margin: stage.preview ? { l: 0, r: 0, t: 0, b: 0 } : { l: 10, r: 10, t: 20, b: 110 },
      geo: { showframe: false, showcountries: true, projection: { type: 'natural earth' } },
      updatemenus: stage.preview ? [] : [{ x: 0.1, y: 0, yanchor: 'top', xanchor: 'right', showactive: false, direction: 'left', type: 'buttons', pad: { t: 87, r: 10 }, buttons: [{ method: 'animate', args: [null, { fromcurrent: true, transition: { duration: 300 }, frame: { duration: 700 } }], label: 'Play' }, { method: 'animate', args: [[null], { mode: 'immediate', transition: { duration: 0 }, frame: { duration: 0 } }], label: 'Pause' }] }],
      sliders: stage.preview ? [] : [{ steps, x: 0.1, len: 0.9, xanchor: 'left', y: 0, yanchor: 'top', pad: { t: 50, b: 10 }, currentvalue: { prefix: 'Year: ', xanchor: 'right', font: { size: 20 } } }],
    } as unknown as Partial<Layout>,
    frames,
    config: stage.config,
  } as never);

  if (stage.preview) {
    stage.every(900, (i) => void Plotly.animate(stage.div, [String(years[i % years.length])], { mode: 'immediate', transition: { duration: 600 }, frame: { duration: 600 } }).catch(() => {}));
  }

  return () => stage.dispose();
};

export default mount;
