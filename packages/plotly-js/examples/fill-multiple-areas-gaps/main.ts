// null in lon/lat lifts the pen, so one scattermap trace fills three separate areas; connectgaps joins them
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const land = await landLayers({ detail: '110m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scattermap',
        mode: 'lines',
        fill: 'toself',
        fillcolor: 'rgba(96,165,250,0.4)',
        line: { color: '#60a5fa' },
        lon: [-10, -10, 8, 8, -10, null, 30, 30, 50, 50, 30, null, 100, 100, 80, 80, 100],
        lat: [30, 6, 6, 30, 30, null, 20, 30, 30, 20, 20, null, 40, 50, 50, 40, 40],
      },
    ],
    {
      template: stage.template,
      map: { style: darkMapStyle(), layers: land as never, center: { lon: 40, lat: 20 }, zoom: 1.5 },
      showlegend: false,
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const set = (v: boolean): Promise<void> => restyle(stage.div, { connectgaps: v });
  if (stage.bar) toggle(stage.bar, 'connectgaps', false, (v) => void set(v));
  if (stage.preview) stage.every(1500, (i) => void set(i % 2 === 1));

  return () => stage.dispose();
};

export default mount;
