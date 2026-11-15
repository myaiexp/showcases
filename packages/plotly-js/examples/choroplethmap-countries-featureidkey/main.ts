// choroplethmap on world countries, matched through featureidkey: 'properties.name'
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/stat-data.ts';
import { countriesGeoJSON, darkMapStyle } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const countries = await countriesGeoJSON('110m');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  // Features carry numeric ids; locations here are the names in properties.name instead.
  const names = countries.features.map((f) => f.properties.name);
  const draw = (seed: number): number[] => {
    const r = rng(seed);
    return names.map(() => Math.round(r() * 100));
  };

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'choroplethmap',
        geojson: countries as never,
        featureidkey: 'properties.name',
        locations: names,
        z: draw(1),
        colorscale: 'Viridis',
        marker: { line: { width: 0.4, color: '#0b0f16' } },
        colorbar: { thickness: 10 },
      },
    ],
    {
      template: stage.template,
      map: { style: darkMapStyle(), center: { lon: 10, lat: 25 }, zoom: stage.preview ? 0.6 : 1.1 },
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const seeds = { 'draw 1': 1, 'draw 2': 2, 'draw 3': 3 } as const;
  const set = (seed: number): Promise<void> => restyle(stage.div, { z: [draw(seed)] });
  if (stage.bar) select(stage.bar, 'Seeded values', Object.keys(seeds) as (keyof typeof seeds)[], 'draw 1', (v) => void set(seeds[v]));
  if (stage.preview) stage.every(1500, (i) => void set(i + 1));

  return () => stage.dispose();
};

export default mount;
