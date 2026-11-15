// scattermap with fill 'toself': a polygon from lon/lat, with fillcolor, line and marker styled apart
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { darkMapStyle, landLayers } from '../../shared/tiles.ts';

const fills = ['rgba(255,165,0,0.35)', 'rgba(52,211,153,0.4)', 'rgba(96,165,250,0.4)', 'rgba(244,114,182,0.45)'] as const;

const mount: Mount = async (el, ctx) => {
  const land = await landLayers({ detail: '50m' });
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 450 });
  const quad = (w: number): { lon: number[]; lat: number[] } => ({ lon: [-74, -70, -70 - w, -74 - w * 0.5], lat: [47, 47, 45, 45] });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'scattermap', fill: 'toself', lon: [-74, -70, -70, -74], lat: [47, 47, 45, 45], marker: { size: 10, color: 'orange' }, fillcolor: fills[0] }],
    {
      template: stage.template,
      // the docs use 'open-street-map'; the blank dark style plus land layers stands in
      map: { style: darkMapStyle(), layers: land as never, center: { lon: -73, lat: 46 }, zoom: stage.preview ? 4 : 5 },
      showlegend: false,
      margin: { t: 0, b: 0, l: 0, r: 0 },
    },
    stage.config,
  );

  const reshape = (w: number): Promise<void> => restyle(stage.div, { lon: [quad(w).lon], lat: [quad(w).lat] });
  if (stage.bar) {
    select(stage.bar, 'fillcolor', fills, fills[0], (v) => void restyle(stage.div, { fillcolor: v }));
    slider(stage.bar, 'Skew the base (degrees)', [0, 4, 0.1], 0, (v) => void reshape(v));
  }
  if (stage.preview) stage.every(300, (i) => void reshape(2 + 2 * Math.sin(i / 4)));

  return () => stage.dispose();
};

export default mount;
