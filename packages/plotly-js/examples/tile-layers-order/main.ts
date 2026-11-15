// How map layers stack: base style, then traces, then layers; `below` moves a layer under the traces
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { precipitation } from '../../shared/map-kit.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const [land, rain] = await Promise.all([landLayers({ detail: '110m', fill: '#2f3a4d', line: '#55627a' }), precipitation()]);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });
  // 'below: traces' puts the land under the points; '' (the default) puts it above them.
  const stack = (below: string): Record<string, unknown>[] => land.map((l) => ({ ...l, below }));

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattermap',
        mode: 'markers',
        lon: rain.lon,
        lat: rain.lat,
        text: rain.z.map(String),
        marker: { color: 'fuchsia', size: 4 },
      },
    ],
    {
      template: stage.template,
      dragmode: 'zoom',
      margin: { r: 0, t: 0, b: 0, l: 0 },
      showlegend: false,
      // map.style is the lowest layer, the traces come next, map.layers on top unless `below` says otherwise.
      map: { style: darkMapStyle(), layers: stack('traces') as never, center: { lat: 38, lon: -90 }, zoom: stage.preview ? 2 : 3 },
    },
    stage.config,
  );

  const set = (below: string): Promise<void> => relayout(stage.div, { 'map.layers': stack(below) });
  if (stage.bar) select(stage.bar, 'Land layer is', ['below traces', 'above traces'] as const, 'below traces', (v) => void set(v === 'below traces' ? 'traces' : ''));
  if (stage.preview) stage.every(1800, (i) => void set(i % 2 ? '' : 'traces'));

  return () => stage.dispose();
};

export default mount;
