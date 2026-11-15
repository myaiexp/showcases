// scattermap: one marker on a MapLibre tile map, centred and zoomed through layout.map
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const mount: Mount = async (el, ctx) => {
  const layers = await landLayers({ detail: '50m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scattermap', lat: ['45.5017'], lon: ['-73.5673'], mode: 'markers', marker: { size: 14 }, text: ['Montreal'] }],
    {
      template: stage.template,
      autosize: true,
      hovermode: 'closest',
      margin: { l: 0, r: 0, t: 0, b: 0 },
      map: { style: darkMapStyle(), layers, bearing: 0, center: { lat: 45, lon: -73 }, pitch: 0, zoom: stage.preview ? 3 : 5 },
    },
    stage.config,
  );

  return () => stage.dispose();
};

export default mount;
