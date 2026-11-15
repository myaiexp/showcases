// Box traces coloured through marker.color, one colour per sample
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const a = [1, 2, 3, 4, 4, 4, 8, 9, 10];
const b = [2, 3, 3, 3, 3, 5, 6, 6, 7];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { y: a, type: 'box', name: 'Sample A', marker: { color: 'rgb(214,12,140)' } },
      { y: b, type: 'box', name: 'Sample B', marker: { color: 'rgb(0,128,128)' } },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Colored Box Plot' } },
    stage.config,
  );

  const swap = (on: boolean): void =>
    void Plotly.restyle(stage.div, { 'marker.color': on ? ['rgb(0,128,128)', 'rgb(214,12,140)'] : ['rgb(214,12,140)', 'rgb(0,128,128)'] });
  if (stage.bar) toggle(stage.bar, 'swap colours', false, swap);
  else stage.every(1300, (i) => swap(i % 2 === 1));

  return () => stage.dispose();
};

export default mount;
