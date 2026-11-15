// One scattermap trace in three modes: markers, lines, markers+lines, with sizes and colours per point
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const modes = ['markers+lines', 'markers', 'lines'] as const;

const mount: Mount = async (el, ctx) => {
  const land = await landLayers({ detail: '110m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 480 });

  // The docs draw Maki icons (bus, harbor, airport) with marker.symbol and text labels; icons come
  // from a CDN and labels need glyphs, so circles of different sizes and colours stand in.
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattermap',
        mode: 'markers+lines',
        lon: [-75, -80, -50],
        lat: [45, 20, -20],
        marker: { size: [14, 22, 32], color: ['#fbbf24', '#34d399', '#f87171'] },
        line: { width: 2, color: '#a6acb8' },
        hoverinfo: 'text',
        text: ['first stop', 'second stop', 'third stop'],
      },
    ],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: land as never, zoom: 0.7, center: { lon: -60, lat: 15 } },
      showlegend: false,
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const set = (m: string): Promise<void> => restyle(stage.div, { mode: m });
  if (stage.bar) select(stage.bar, 'mode', modes, 'markers+lines', (v) => void set(v));
  if (stage.preview) stage.every(1300, (i) => void set(pick(modes, i)));

  return () => stage.dispose();
};

export default mount;
