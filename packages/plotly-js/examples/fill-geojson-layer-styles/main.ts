// A GeoJSON MultiPolygon in map.layers drawn as fill, line or circle, with colour and opacity
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle } from '../../shared/tiles.ts';

const kinds = ['fill', 'line', 'circle'] as const;
type Kind = (typeof kinds)[number];

// A stretch of Montreal's waterfront from the docs' snippet (the docs layer sits `below: "water"`,
// a layer name only the hosted styles have; the blank style has none, so it goes below the traces).
const ring = [
  [-73.606352888, 45.507489991], [-73.606133883, 45.506876], [-73.605905904, 45.50677398], [-73.603533905, 45.505698946],
  [-73.602475870, 45.506856969], [-73.600031904, 45.505696003], [-73.599379992, 45.505389066], [-73.599119902, 45.505632008],
  [-73.598896977, 45.505514039], [-73.598783894, 45.505617001], [-73.591308727, 45.516246185], [-73.591380782, 45.516280145],
  [-73.596778656, 45.51869006], [-73.60279677, 45.521348046], [-73.612239983, 45.525564037], [-73.612422919, 45.525642061],
  [-73.617229085, 45.527751983], [-73.617279234, 45.52777416], [-73.617304713, 45.527741334], [-73.617492052, 45.527498362],
  [-73.617533258, 45.527512253], [-73.618074188, 45.526759105], [-73.618271651, 45.526500673], [-73.61844632, 45.526287943],
  [-73.618968507, 45.52569856], [-73.619388002, 45.52521675], [-73.619532966, 45.525064183], [-73.619686662, 45.52488929],
  [-73.619787038, 45.524770086], [-73.619925742, 45.524584939], [-73.619954486, 45.52455769], [-73.620122362, 45.524377961],
  [-73.620201713, 45.524298907], [-73.620775593, 45.52365088],
];
const source = { type: 'FeatureCollection', features: [{ type: 'Feature', geometry: { type: 'MultiPolygon', coordinates: [[ring]] } }] };

const layerOf = (kind: Kind, color: string, opacity: number): Record<string, unknown> => ({
  source,
  type: kind,
  below: 'traces',
  color,
  opacity,
  ...(kind === 'line' ? { line: { width: 3 } } : {}),
  ...(kind === 'circle' ? { circle: { radius: 6 } } : {}),
});

const mount: Mount = async (el, ctx) => {
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 450 });
  let kind: Kind = 'fill';
  let color = 'teal';
  let opacity = 1;

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scattermap', mode: 'markers', lon: [-73.605], lat: [45.51], marker: { size: 20, color: ['cyan'] } }],
    {
      template: stage.template,
      map: { style: darkMapStyle(), center: { lon: -73.6, lat: 45.515 }, zoom: stage.preview ? 11 : 12, layers: [layerOf(kind, color, opacity)] as never },
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const apply = (): Promise<void> => relayout(stage.div, { 'map.layers': [layerOf(kind, color, opacity)] });
  if (stage.bar) {
    select(stage.bar, 'layer type', kinds, kind, (v) => void ((kind = v), apply()));
    select(stage.bar, 'color', ['teal', 'orange', 'hotpink', 'limegreen'] as const, color, (v) => void ((color = v), apply()));
    slider(stage.bar, 'opacity', [0.1, 1, 0.1], opacity, (v) => void ((opacity = v), apply()));
  }
  if (stage.preview) stage.every(1300, (i) => void ((kind = pick(kinds, i)), apply()));

  return () => stage.dispose();
};

export default mount;
