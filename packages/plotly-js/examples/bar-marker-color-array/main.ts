// bar marker.color as an array: one colour per bar
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const features = ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'];
const grey = 'rgba(204,204,204,1)';
const red = 'rgba(222,45,38,0.8)';
const colorsFor = (hot: number): string[] => features.map((_, i) => (i === hot ? red : grey));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  const trace1: Data = { x: features, y: [20, 14, 23, 25, 22], marker: { color: colorsFor(1) }, type: 'bar' };

  await Plotly.newPlot(
    stage.div,
    [trace1],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Least Used Feature' } },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'Highlighted bar', features, 'Feature B', (f) => void restyle(stage.div, { 'marker.color': [colorsFor(features.indexOf(f))] }));
  if (stage.preview) stage.every(900, (i) => {
    void restyle(stage.div, { 'marker.color': [colorsFor(i % 5)] });
  });

  return () => stage.dispose();
};

export default mount;
