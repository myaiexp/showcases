// An HTML select's change event rebuilds the trace for one country with Plotly.react
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at } from '../../shared/events-kit.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('gapminderDataFiveYear.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 400 });
  const names = unpack(rows, 'country');
  const years = unpackNum(rows, 'year');
  const gdp = unpackNum(rows, 'gdpPercap');
  const countries = [...new Set(names)];

  const plot = (country: string): Promise<unknown> => {
    const keep = names.map((n, i) => (n === country ? i : -1)).filter((i) => i >= 0);
    return Plotly.react(
      stage.div,
      [{ x: keep.map((i) => years[i]!), y: keep.map((i) => gdp[i]!), mode: 'lines+markers', type: 'scatter', marker: { size: 12, opacity: 0.5 } }],
      {
        template: stage.template,
        title: stage.preview ? { text: country } : { text: `GDP per capita: ${country}` },
        xaxis: { title: stage.preview ? undefined : { text: 'year' } },
      },
      stage.config,
    );
  };
  await plot('Afghanistan');

  if (stage.bar) {
    const sel = document.createElement('select');
    for (const c of countries) sel.add(new Option(c, c));
    sel.addEventListener('change', () => void plot(sel.value));
    stage.bar.append('country', sel);
  }
  if (stage.preview) {
    const show = ['Afghanistan', 'China', 'Norway', 'Botswana', 'Japan'];
    stage.every(1400, (i) => void plot(at(show, i)));
  }

  return () => stage.dispose();
};

export default mount;
