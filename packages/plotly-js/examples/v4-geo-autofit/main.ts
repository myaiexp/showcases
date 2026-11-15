// v4 geo subplots default to fitbounds 'locations': the view hugs the plotted countries
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const SETS: Record<string, string[]> = {
  'Canada, Mexico': ['CAN', 'MEX'],
  'Nordics': ['FIN', 'SWE', 'NOR', 'DNK', 'ISL'],
  'Southern Africa': ['ZAF', 'NAM', 'BWA', 'ZWE', 'MOZ'],
};
const NAMES = Object.keys(SETS);

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });
  let fitbounds: false | undefined;
  let current = NAMES[0]!;

  const draw = (): Promise<unknown> => {
    const locations = SETS[current]!;
    return Plotly.react(
      stage.div,
      [{ type: 'choropleth', locations, z: locations.map((_, i) => i + 1), colorscale: 'Viridis', showscale: false }],
      // Nothing about the view is set, so v4 fits it; fitbounds: false gives the whole world.
      { template: stage.template, margin: { l: 0, r: 0, t: 0, b: 0 }, geo: { fitbounds, showocean: true, showland: true } },
      stage.config,
    );
  };
  await draw();

  if (stage.bar) {
    select(stage.bar, 'locations', NAMES, current, (n) => {
      current = n;
      void draw();
    });
    select(stage.bar, 'geo.fitbounds', ["default ('locations')", 'false'], "default ('locations')", (v) => {
      fitbounds = v === 'false' ? false : undefined;
      void draw();
    });
  }
  if (stage.preview)
    stage.every(2400, (i) => {
      current = NAMES[i % NAMES.length]!;
      void draw();
    });

  return () => stage.dispose();
};

export default mount;
