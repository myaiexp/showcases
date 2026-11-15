// choropleth with locationmode 'USA-states': two-letter codes, any subset of states
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const scales = ['Reds', 'Blues', 'Greens', 'YlOrRd', 'Viridis'] as const;
const sets = {
  'CA TX NY FL IL': { locations: ['CA', 'TX', 'NY', 'FL', 'IL'], z: [95, 88, 92, 85, 78] },
  'Pacific coast': { locations: ['WA', 'OR', 'CA', 'AK', 'HI'], z: [60, 70, 95, 40, 55] },
  'Great Lakes': { locations: ['MN', 'WI', 'MI', 'IL', 'IN', 'OH', 'PA', 'NY'], z: [50, 62, 70, 85, 66, 78, 90, 99] },
} as const;
type SetName = keyof typeof sets;

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'choropleth', locations: [...sets['CA TX NY FL IL'].locations], locationmode: 'USA-states', z: [...sets['CA TX NY FL IL'].z], colorscale: 'Reds', colorbar: { thickness: 12 } }],
    { template: stage.template, title: { text: stage.preview ? '' : 'USA states choropleth' }, geo: { scope: 'usa' } },
    stage.config,
  );

  const names = Object.keys(sets) as SetName[];
  const show = (n: SetName): Promise<void> => restyle(stage.div, { locations: [[...sets[n].locations]], z: [[...sets[n].z]] });
  if (stage.bar) {
    select(stage.bar, 'States', names, names[0]!, (v) => void show(v));
    select(stage.bar, 'colorscale', scales, 'Reds', (v) => void restyle(stage.div, { colorscale: v }));
  }
  if (stage.preview) stage.every(1500, (i) => void show(pick(names, i)));

  return () => stage.dispose();
};

export default mount;
