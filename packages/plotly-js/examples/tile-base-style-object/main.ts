// map.style takes a MapLibre style object: swap base colours and land fills with one relayout
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { earthquakes } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

// The docs pick base maps by name ('dark', 'light', 'carto-darkmatter', ...) or by style URL;
// both fetch tiles, so here each "style" is a source-less style object plus matching land layers.
const looks = {
  night: { bg: '#0b0f16', fill: '#1d2430', line: '#344055' },
  slate: { bg: '#1c2433', fill: '#2f3b52', line: '#51617f' },
  ink: { bg: '#10141b', fill: '#232a36', line: '#3b4454' },
  forest: { bg: '#0d1a17', fill: '#1d3a30', line: '#2f5a4a' },
  dusk: { bg: '#1a1426', fill: '#34274d', line: '#54407a' },
} as const;
type Look = keyof typeof looks;
const names = Object.keys(looks) as Look[];

const mount: Mount = async (el, ctx) => {
  const [quakes, ...layerSets] = await Promise.all([
    earthquakes(stage_every(ctx.preview)),
    ...names.map((n) => landLayers({ detail: '110m', fill: looks[n].fill, line: looks[n].line })),
  ]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const layersOf = (n: Look): Record<string, unknown>[] => layerSets[names.indexOf(n)] as Record<string, unknown>[];

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattermap',
        mode: 'markers',
        lon: quakes.lon,
        lat: quakes.lat,
        marker: { size: 4, color: quakes.mag, colorscale: 'YlOrRd', cmin: 5.5, cmax: 8, opacity: 0.7 },
        hoverinfo: 'text',
        text: quakes.mag.map((m) => `M${m}`),
      },
    ],
    {
      template: stage.template,
      margin: { t: 0, b: 0, l: 0, r: 0 },
      map: { style: darkMapStyle(looks.night.bg), layers: layersOf('night') as never, zoom: 1.3, center: { lon: 60, lat: 20 } },
    },
    stage.config,
  );

  const apply = (n: Look): Promise<void> =>
    relayout(stage.div, { 'map.style': darkMapStyle(looks[n].bg), 'map.layers': layersOf(n) });
  if (stage.bar) select(stage.bar, 'Style', names, 'night', (v) => void apply(v));
  if (stage.preview) stage.every(1500, (i) => void apply(pick(names, i)));

  return () => stage.dispose();
};

function stage_every(preview: boolean): number {
  return preview ? 12 : 3;
}

export default mount;
