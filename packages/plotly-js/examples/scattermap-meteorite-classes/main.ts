// One scattermap trace per meteorite class, so the legend names and toggles each group of landings
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';
import { gauss, rng } from '../../shared/stat-data.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

// The docs read meteorites_subset.csv from a personal repo; that host stays out, so seeded landings
// scatter around the places meteorites are actually found (deserts, ice fields, plains).
const fields = [
  { lat: 25, lon: 10, sd: 6 }, // Sahara
  { lat: 20, lon: 57, sd: 2.5 }, // Oman
  { lat: -76, lon: 160, sd: 8 }, // Antarctica
  { lat: -24, lon: -69, sd: 2 }, // Atacama
  { lat: -31, lon: 127, sd: 3 }, // Nullarbor
  { lat: 37, lon: -100, sd: 4 }, // Great Plains
  { lat: 47, lon: 10, sd: 5 }, // Europe
];
const classes = ['L6', 'H5', 'L5', 'H6', 'H4', 'LL5', 'LL6', 'L4'] as const;

const mount: Mount = async (el, ctx) => {
  const land = await landLayers({ detail: '110m', fill: '#2a2f3a' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 500 });
  const r = rng(77);
  const g = gauss(r);
  const found = classes.map(() =>
    Array.from({ length: 70 }, () => {
      const f = fields[Math.floor(r() * r() * fields.length)]!;
      return { lat: Math.max(-85, Math.min(85, f.lat + g() * f.sd)), lon: f.lon + g() * f.sd * 1.5 };
    }),
  );

  await Plotly.newPlot(
    stage.div,
    classes.map((c, i) => ({
      type: 'scattermap' as const,
      name: c,
      lat: found[i]!.map((p) => p.lat),
      lon: found[i]!.map((p) => p.lon),
      marker: { size: 6 },
    })),
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Meteorite landing locations (seeded)' },
      dragmode: 'zoom',
      map: { center: { lat: 38, lon: -90 }, domain: { x: [0, 1], y: [0, 1] }, style: darkMapStyle('#191A1A'), layers: land as never, zoom: stage.preview ? 0.4 : 1 },
      margin: stage.preview ? { r: 0, t: 0, b: 0, l: 0 } : { r: 20, t: 40, b: 20, l: 20 },
      paper_bgcolor: '#191A1A',
      plot_bgcolor: '#191A1A',
      showlegend: !stage.preview,
    },
    stage.config,
  );

  if (stage.preview) {
    // spotlight one class at a time: the others go to 'legendonly' (hidden, still in the legend)
    stage.every(1000, (i) => void restyle(stage.div, { visible: classes.map((_, k) => (i % 4 === 0 || k % 4 === i % 4 ? true : 'legendonly')) } as never));
  }

  return () => stage.dispose();
};

export default mount;
