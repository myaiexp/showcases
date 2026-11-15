// choropleth frames: z and locations per year, with the colour range pinned so years compare
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
  const frames = years.map((year) => {
    const r = rows.filter((d) => Number(d.year) === year);
    return { name: String(year), data: [{ z: r.map((d) => Number(d.lifeExp)), locations: r.map((d) => d.iso_alpha), text: r.map((d) => d.iso_alpha) }] };
  });
  const steps = years.map((y) => ({ label: String(y), method: 'animate', args: [[String(y)], { mode: 'immediate', transition: { duration: 300 }, frame: { duration: 300 } }] }));

  await Plotly.newPlot(stage.div, {
    data: [{ type: 'choropleth', locationmode: 'ISO-3', ...frames[0]!.data[0]!, zauto: false, zmin: 30, zmax: 90, colorscale: 'Viridis', showscale: !stage.preview }],
    layout: {
      template: stage.template,
      title: stage.preview ? undefined : { text: 'World Life Expectancy<br>1952 - 2007' },
      margin: stage.preview ? { l: 0, r: 0, t: 0, b: 0 } : { l: 10, r: 10, t: 70, b: 110 },
      geo: { scope: 'world', fitbounds: false, showland: true, showlakes: false, showframe: false },
      updatemenus: stage.preview ? [] : [{ x: 0.1, y: 0, yanchor: 'top', xanchor: 'right', showactive: false, direction: 'left', type: 'buttons', pad: { t: 87, r: 10 }, buttons: [{ method: 'animate', args: [null, { fromcurrent: true, transition: { duration: 200 }, frame: { duration: 500 } }], label: 'Play' }, { method: 'animate', args: [[null], { mode: 'immediate', transition: { duration: 0 }, frame: { duration: 0 } }], label: 'Pause' }] }],
      sliders: stage.preview ? [] : [{ active: 0, steps, x: 0.1, len: 0.9, xanchor: 'left', y: 0, yanchor: 'top', pad: { t: 50, b: 10 }, currentvalue: { visible: true, prefix: 'Year:', xanchor: 'right', font: { size: 20 } }, transition: { duration: 300, easing: 'cubic-in-out' } }],
    } as unknown as Partial<Layout>,
    frames,
    config: stage.config,
  } as never);

  if (stage.preview) {
    stage.every(800, (i) => void Plotly.animate(stage.div, [String(years[i % years.length])], { mode: 'immediate', transition: { duration: 500 }, frame: { duration: 500 } }).catch(() => {}));
  }

  return () => stage.dispose();
};

export default mount;
