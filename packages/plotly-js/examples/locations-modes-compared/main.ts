// scattergeo markers placed by `locations` in all three modes at once: ISO-3, country names and US state codes
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  await loadGeoAssets();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  // scattergeo accepts locations like choropleth does: the marker lands at the region's centre
  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scattergeo', name: "ISO-3", mode: 'markers', locationmode: 'ISO-3', locations: ['BRA', 'AUS', 'RUS', 'ZAF'], marker: { size: 14, color: '#60a5fa' } },
      { type: 'scattergeo', name: 'country names', mode: 'markers', locationmode: 'country names', locations: ['France', 'India', 'Egypt', 'Argentina'], marker: { size: 14, color: '#f59e0b' } },
      { type: 'scattergeo', name: 'USA-states', mode: 'markers', locationmode: 'USA-states', locations: ['CA', 'TX', 'NY', 'WA'], marker: { size: 14, color: '#34d399' } },
    ],
    { template: stage.template, geo: { fitbounds: false, projection: { type: 'natural earth' }, showcountries: true }, legend: { x: 0.01, y: 0.02 }, showlegend: !stage.preview },
    stage.config,
  );

  const vis = (i: number, on: boolean): Promise<void> => restyle(stage.div, { visible: on }, i);
  if (stage.bar) ['ISO-3', 'country names', 'USA-states'].forEach((n, i) => toggle(stage.bar!, n, true, (v) => void vis(i, v)));
  if (stage.preview) stage.every(900, (i) => void restyle(stage.div, { visible: [i % 3 === 0 || i % 3 === 1, i % 3 === 1 || i % 3 === 2, i % 3 === 2 || i % 3 === 0] } as never));

  return () => stage.dispose();
};

export default mount;
