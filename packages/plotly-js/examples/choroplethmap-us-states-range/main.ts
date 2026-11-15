// choroplethmap over all 50 states with fixed zmin/zmax, so the colour domain is the reader's choice
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { STATE_CODES, stateValues } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers, usStatesGeoJSON } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const [states, land] = await Promise.all([usStatesGeoJSON(), landLayers({ detail: '110m' })]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  // seeded stand-in numbers for the docs' hard-coded list (values near 130-180)
  const z = stateValues(5, 130, 180);

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'choroplethmap',
        name: 'US states',
        geojson: states as never,
        locations: [...STATE_CODES],
        z,
        zmin: 25,
        zmax: 280,
        colorbar: { y: 0, yanchor: 'bottom', title: { text: 'US states', side: 'right' }, thickness: 12 },
      },
    ],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: land as never, center: { lon: -98, lat: 39 }, zoom: stage.preview ? 1.9 : 2.8 },
      margin: { t: 0, b: 0 },
    },
    stage.config,
  );

  const set = (u: Record<string, unknown>): Promise<void> => restyle(stage.div, u);
  if (stage.bar) {
    slider(stage.bar, 'zmin', [0, 150, 5], 25, (v) => void set({ zmin: v }));
    slider(stage.bar, 'zmax', [160, 400, 5], 280, (v) => void set({ zmax: v }));
  }
  if (stage.preview) stage.every(600, (i) => void set({ zmax: 200 + 80 * Math.sin(i / 4), zmin: 100 - 75 * Math.sin(i / 4) }));

  return () => stage.dispose();
};

export default mount;
