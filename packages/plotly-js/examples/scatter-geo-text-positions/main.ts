// Labelled cities on a Europe geo map: a textposition select moves every label around its marker
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const positions = ['top center', 'top right', 'middle right', 'bottom right', 'bottom center', 'bottom left', 'middle left', 'top left'] as const;

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattergeo',
        mode: 'markers+text',
        lon: [2.35, 13.4, 12.5, -3.7, -0.13, 4.9, 18.07, 23.72],
        lat: [48.86, 52.52, 41.9, 40.42, 51.5, 52.37, 59.33, 37.98],
        text: ['Paris', 'Berlin', 'Rome', 'Madrid', 'London', 'Amsterdam', 'Stockholm', 'Athens'],
        textposition: 'top center',
        textfont: { size: stage.preview ? 9 : 12, color: '#e6e8ee' },
        marker: { size: 9, color: '#60a5fa', line: { width: 1, color: '#0b0f16' } },
      },
    ],
    {
      template: stage.template,
      showlegend: false,
      geo: { scope: 'europe', resolution: 50, showland: true, landcolor: '#2a2f3a', countrycolor: '#4b5263', coastlinecolor: '#4b5263', fitbounds: false },
    },
    stage.config,
  );

  const set = (v: string): Promise<void> => restyle(stage.div, { textposition: v });
  if (stage.bar) select(stage.bar, 'textposition', positions, 'top center', (v) => void set(v));
  if (stage.preview) stage.every(900, (i) => void set(pick(positions, i)));

  return () => stage.dispose();
};

export default mount;
