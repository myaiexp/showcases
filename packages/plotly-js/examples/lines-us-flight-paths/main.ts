// 178 flight paths as separate scattergeo lines, opacity from passenger count; a floor slider hides quiet routes
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { flightPaths } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const [, routes] = await Promise.all([loadGeoAssets(), flightPaths()]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  const max = Math.max(...routes.map((r) => r.count));

  await Plotly.newPlot(
    stage.div,
    routes.map((r) => ({
      type: 'scattergeo' as const,
      locationmode: 'USA-states' as const,
      lon: [r.from[0], r.to[0]],
      lat: [r.from[1], r.to[1]],
      mode: 'lines' as const,
      line: { width: 1, color: '#f87171' },
      opacity: r.count / max,
      hoverinfo: 'text' as const,
      text: `${r.a} to ${r.b}: ${r.count}`,
    })),
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Feb. 2011 American Airline flight paths' },
      showlegend: false,
      geo: {
        scope: 'north america',
        fitbounds: false,
        projection: { type: 'azimuthal equal area' },
        showland: true,
        landcolor: '#2a2f3a',
        countrycolor: '#4b5263',
      },
    },
    stage.config,
  );

  const floor = (n: number): Promise<void> =>
    restyle(stage.div, { visible: routes.map((r) => r.count >= n) } as Record<string, unknown>);
  if (stage.bar) slider(stage.bar, 'Minimum flights', [0, 400, 10], 0, (v) => void floor(v));
  if (stage.preview) stage.every(900, (i) => void floor(((i * 40) % 440) as number));

  return () => stage.dispose();
};

export default mount;
