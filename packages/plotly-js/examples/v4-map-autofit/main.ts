// v4 map subplots fit their view to the data unless center, zoom or fitbounds say otherwise
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

// City groups to swap in with restyle: the view re-fits after each data-only update.
const GROUPS: Record<string, { lon: number[]; lat: number[] }> = {
  'US cities': { lon: [-122.4, -73.9, -87.6], lat: [37.8, 40.7, 41.9] },
  'Nordic capitals': { lon: [24.94, 18.07, 10.75, 12.57, -21.94], lat: [60.17, 59.33, 59.91, 55.68, 64.15] },
  'across the antimeridian': { lon: [131.8855, -179, 174.78, -149.9], lat: [43.1, -16.5, -41.29, 61.2] },
};
const NAMES = Object.keys(GROUPS);

const mount: Mount = async (el, ctx) => {
  const layers = await landLayers({ detail: '50m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });
  let fitbounds: false | undefined;

  const draw = (name: string): Promise<unknown> =>
    Plotly.react(
      stage.div,
      [{ type: 'scattermap', ...GROUPS[name], mode: 'markers', marker: { size: 12, color: '#f59e0b' } }],
      // No center and no zoom: v4 frames the points. fitbounds: false keeps the v3 world view.
      { template: stage.template, margin: { l: 0, r: 0, t: 0, b: 0 }, map: { style: darkMapStyle(), layers, fitbounds } },
      stage.config,
    );
  await draw(NAMES[0]!);

  if (stage.bar) {
    let current = NAMES[0]!;
    select(stage.bar, 'points', NAMES, current, (n) => void draw((current = n)));
    select(stage.bar, 'map.fitbounds', ['default (fit)', 'false'], 'default (fit)', (v) => {
      fitbounds = v === 'false' ? false : undefined;
      void draw(current);
    });
  }
  if (stage.preview) stage.every(2600, (i) => void Plotly.restyle(stage.div, { lon: [GROUPS[NAMES[i % 3]!]!.lon], lat: [GROUPS[NAMES[i % 3]!]!.lat] }));

  return () => stage.dispose();
};

export default mount;
