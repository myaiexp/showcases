// Brushing with three states: selections paint grey, red or blue in both traces
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack } from '../../shared/data.ts';
import { readout, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const LABELS = ['body-style', 'drive-wheels', 'fuel-type'];
const NAMES = ['None', 'Red', 'Blue'] as const;

const mount: Mount = async (el, ctx) => {
  const cars = await csv('imports-85.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: ctx.preview ? 200 : 720 });
  const out = stage.preview ? null : readout(el);

  const color = new Array<number>(cars.length).fill(0);
  // Three flat bands: grey for 0, firebrick for 1, blue for 2.
  const scale: [number, string][] = [[0, 'gray'], [0.33, 'gray'], [0.33, 'firebrick'], [0.66, 'firebrick'], [0.66, 'blue'], [1, 'blue']];

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatter',
        x: unpack(cars, 'horsepower'),
        y: unpack(cars, 'highway-mpg'),
        mode: 'markers',
        marker: { color: [...color], colorscale: scale, cmin: -0.5, cmax: 2.5, size: stage.preview ? 5 : 8, showscale: !stage.preview, colorbar: { tickvals: [0, 1, 2], ticktext: [...NAMES] } },
      },
      {
        type: 'parcats',
        domain: { y: [0, 0.4] },
        dimensions: LABELS.map((label) => ({ label, values: unpack(cars, label) })),
        line: { colorscale: scale, cmin: -0.5, cmax: 2.5, color: [...color], shape: 'hspline' },
        labelfont: { size: 14 },
      },
    ],
    {
      template: stage.template,
      xaxis: { title: { text: stage.preview ? '' : 'Horsepower' } },
      yaxis: { domain: [0.6, 1], title: { text: stage.preview ? '' : 'MPG' } },
      dragmode: 'lasso',
      hovermode: 'closest',
    },
    stage.config,
  );

  let brush = 1;
  const assign = (picked: number[]): void => {
    for (const i of picked) color[i] = brush;
    void Plotly.restyle(stage.div, { 'marker.color': [[...color]] }, [0]);
    void Plotly.restyle(stage.div, { 'line.color': [[...color]] }, [1]);
    if (out) out.textContent = `${picked.length} cars set to ${NAMES[brush]}; ${color.filter((c) => c === 1).length} red, ${color.filter((c) => c === 2).length} blue`;
  };
  const fromEvent = (e: { points?: { pointNumber: number }[] } | undefined): void => assign((e?.points ?? []).map((p) => p.pointNumber));
  stage.div.on('plotly_selected', fromEvent);
  stage.div.on('plotly_click', fromEvent);

  if (stage.bar) {
    select(stage.bar, 'selection paints', NAMES, 'Red', (v) => (brush = NAMES.indexOf(v)));
    if (out) out.textContent = 'Choose a colour, then lasso points in the scatter.';
  } else {
    const styles = ['sedan', 'hatchback', 'wagon', 'convertible'];
    stage.every(1300, (i) => {
      brush = (i % 2) + 1;
      assign(cars.flatMap((r, k) => (r['body-style'] === styles[i % styles.length] ? [k] : [])));
    });
  }

  return () => stage.dispose();
};

export default mount;
