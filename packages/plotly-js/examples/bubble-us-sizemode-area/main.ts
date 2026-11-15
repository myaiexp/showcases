// Bubble area proportional to population: marker.sizemode 'area' with sizeref and sizemin
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { usCities } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const [, cities] = await Promise.all([loadGeoAssets(), usCities()]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const ref = (k: number): number => (2 * Math.max(...cities.pop)) / (60 * 60) / k;

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattergeo',
        lat: cities.lat,
        lon: cities.lon,
        hoverinfo: 'text',
        text: cities.name.map((n, i) => `${n} pop: ${cities.pop[i]}`),
        marker: { size: cities.pop, sizemode: 'area', sizeref: ref(1), sizemin: 2, color: '#34d399', opacity: 0.6, line: { width: 0.5, color: '#0b0f16' } },
      },
    ],
    {
      template: stage.template,
      showlegend: false,
      geo: { scope: 'usa', projection: { type: 'albers usa' }, showland: true, landcolor: '#2a2f3a', subunitcolor: '#4b5263', countrycolor: '#4b5263' },
    },
    stage.config,
  );

  const set = (u: Record<string, unknown>): Promise<void> => restyle(stage.div, u);
  if (stage.bar) {
    slider(stage.bar, 'sizeref (bigger = smaller bubbles)', [0.3, 3, 0.1], 1, (v) => void set({ 'marker.sizeref': ref(1 / v) }));
    slider(stage.bar, 'sizemin', [0, 12, 1], 2, (v) => void set({ 'marker.sizemin': v }));
    select(stage.bar, 'sizemode', ['area', 'diameter'] as const, 'area', (v) =>
      void set({ 'marker.sizemode': v, 'marker.sizeref': v === 'area' ? ref(1) : Math.max(...cities.pop) / 60 }),
    );
  }
  if (stage.preview) stage.every(500, (i) => void set({ 'marker.sizeref': ref(0.5 + (1 + Math.sin(i / 3)) / 2) }));

  return () => stage.dispose();
};

export default mount;
