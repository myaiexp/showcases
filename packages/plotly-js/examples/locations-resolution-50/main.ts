// Small states exist only in the 50m map data: at geo.resolution 110 their locations are skipped
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  // FRA, ESP, ITA, DEU exist at both resolutions; AND, MCO, LIE, MLT carry a dagger in the docs' ISO table
  // (50m only). The geo range is fixed so the view does not change when locations drop out.
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'choropleth',
        locationmode: 'ISO-3',
        locations: ['FRA', 'ESP', 'ITA', 'DEU', 'AND', 'MCO', 'LIE', 'MLT'],
        z: [1, 2, 3, 4, 8, 8, 8, 8],
        colorscale: 'Portland',
        showscale: false,
        marker: { line: { color: '#e6e8ee', width: 0.6 } },
      },
    ],
    {
      template: stage.template,
      geo: { resolution: 110, scope: 'europe', fitbounds: false, lonaxis: { range: [-12, 22] }, lataxis: { range: [34, 55] }, projection: { type: 'mercator' } },
    },
    stage.config,
  );

  const set = (r: string): Promise<void> => relayout(stage.div, { 'geo.resolution': Number(r) });
  if (stage.bar) select(stage.bar, 'geo.resolution', ['110', '50'] as const, '110', (v) => void set(v));
  if (stage.preview) stage.every(1700, (i) => void set(i % 2 ? '50' : '110'));

  return () => stage.dispose();
};

export default mount;
