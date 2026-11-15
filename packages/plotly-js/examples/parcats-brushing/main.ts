// A scatter and a parcats trace linked: selecting points recolours their paths
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const LABELS = ['body-style', 'drive-wheels', 'fuel-type'];

const mount: Mount = async (el, ctx) => {
  const cars = await csv('imports-85.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: ctx.preview ? 200 : 720 });
  const out = stage.preview ? null : readout(el);

  const mpg = unpack(cars, 'highway-mpg');
  const horsepower = unpack(cars, 'horsepower');
  const color = new Array<number>(cars.length).fill(0);

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter', x: horsepower, y: mpg, mode: 'markers', marker: { color: '#9aa3b2', size: stage.preview ? 5 : 8 }, selected: { marker: { color: 'firebrick' } }, unselected: { marker: { opacity: 0.3 } } },
      {
        type: 'parcats',
        domain: { y: [0, 0.4] },
        dimensions: LABELS.map((label) => ({ label, values: unpack(cars, label) })),
        line: { colorscale: [[0, 'gray'], [1, 'firebrick']], cmin: 0, cmax: 1, color, shape: 'hspline' },
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

  // Marks these cars in both traces: the scatter's selectedpoints and the parcats line colour.
  const paint = (picked: number[]): void => {
    const next = new Array<number>(cars.length).fill(0);
    for (const i of picked) next[i] = 1;
    void Plotly.restyle(stage.div, { selectedpoints: [picked.length ? picked : null] }, [0]);
    void Plotly.restyle(stage.div, { 'line.color': [next] }, [1]);
    if (out) out.textContent = `${picked.length} of ${cars.length} cars selected`;
  };
  const fromEvent = (e: { points?: { pointNumber: number }[] } | undefined): void => paint((e?.points ?? []).map((p) => p.pointNumber));
  stage.div.on('plotly_selected', fromEvent);
  stage.div.on('plotly_click', fromEvent);
  if (out) out.textContent = 'Lasso or box-select points in the scatter, or click one.';

  // Cards stand in for the reader's lasso: pick one body style at a time.
  if (stage.preview) {
    const styles = ['sedan', 'hatchback', 'wagon', 'convertible'];
    stage.every(1400, (i) => {
      const s = styles[i % styles.length];
      paint(cars.flatMap((r, k) => (r['body-style'] === s ? [k] : [])));
    });
  }

  return () => stage.dispose();
};

export default mount;
