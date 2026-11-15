// Routes grouped into three traces by passenger volume, so width and colour carry the tier and the legend names it
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { loadGeoAssets } from '../../shared/geo.ts';
import { flightPaths } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';

const tiers = [
  { name: 'under 100 flights', test: (n: number) => n < 100, width: 0.8, color: '#60a5fa' },
  { name: '100 to 250 flights', test: (n: number) => n >= 100 && n < 250, width: 1.8, color: '#fbbf24' },
  { name: '250 or more', test: (n: number) => n >= 250, width: 3.2, color: '#f87171' },
];

const mount: Mount = async (el, ctx) => {
  const [, routes] = await Promise.all([loadGeoAssets(), flightPaths()]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  // one trace per tier: a null between segments lifts the pen, so a trace holds many separate lines
  await Plotly.newPlot(
    stage.div,
    tiers.map((t) => {
      const mine = routes.filter((r) => t.test(r.count));
      return {
        type: 'scattergeo' as const,
        name: t.name,
        mode: 'lines' as const,
        lon: mine.flatMap((r) => [r.from[0], r.to[0], null]),
        lat: mine.flatMap((r) => [r.from[1], r.to[1], null]),
        line: { width: t.width, color: t.color },
      };
    }),
    {
      template: stage.template,
      showlegend: !stage.preview,
      legend: { x: 0.02, y: 0.05 },
      geo: { scope: 'usa', projection: { type: 'albers usa' }, showland: true, landcolor: '#2a2f3a', subunitcolor: '#4b5263', countrycolor: '#4b5263' },
    },
    stage.config,
  );

  const vis = (i: number, on: boolean): Promise<void> => restyle(stage.div, { visible: on }, i);
  if (stage.bar) tiers.forEach((t, i) => toggle(stage.bar!, t.name, true, (v) => void vis(i, v)));
  if (stage.preview) stage.every(1000, (i) => void restyle(stage.div, { visible: [i % 3 !== 0, i % 3 !== 1, true] } as never));

  return () => stage.dispose();
};

export default mount;
