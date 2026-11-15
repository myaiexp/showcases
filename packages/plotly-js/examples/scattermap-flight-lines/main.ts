// One scattermap line trace per flight route on a dark map, opacity from the route's count
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { flightPaths } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const [routes, land] = await Promise.all([flightPaths(), landLayers({ detail: '110m' })]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 500 });
  const max = Math.max(...routes.map((r) => r.count));

  await Plotly.newPlot(
    stage.div,
    routes.map((r) => ({
      type: 'scattermap' as const,
      lon: [r.from[0], r.to[0]],
      lat: [r.from[1], r.to[1]],
      mode: 'lines' as const,
      line: { width: 1, color: 'red' },
      opacity: r.count / max,
      hoverinfo: 'text' as const,
      text: `${r.a} to ${r.b}: ${r.count}`,
    })),
    {
      template: stage.template,
      dragmode: 'zoom',
      map: { center: { lat: 38.03697222, lon: -90.70916722 }, domain: { x: [0, 1], y: [0, 1] }, style: darkMapStyle('#191A1A'), layers: land as never, zoom: stage.preview ? 1.6 : 2.4 },
      margin: { r: 0, t: 0, b: 0, l: 0, pad: 0 },
      paper_bgcolor: '#191A1A',
      plot_bgcolor: '#191A1A',
      showlegend: false,
    },
    stage.config,
  );

  const width = (w: number): Promise<void> => restyle(stage.div, { 'line.width': w });
  if (stage.bar) slider(stage.bar, 'line.width', [0.5, 6, 0.5], 1, (v) => void width(v));
  if (stage.preview) stage.every(500, (i) => void width(1 + 2.5 * (1 + Math.sin(i / 3)) / 2));

  return () => stage.dispose();
};

export default mount;
