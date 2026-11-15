// A second y axis laid over the first with overlaying: 'y', with its own colour, side and type
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const SIDES = ['right', 'left'] as const;
const TYPES = ['linear', 'log'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const purple = 'rgb(148, 103, 189)';
  await Plotly.newPlot(
    stage.div,
    [
      { x: [1, 2, 3], y: [40, 50, 60], name: 'yaxis data', type: 'scatter' },
      { x: [2, 3, 4], y: [4, 5, 6], name: 'yaxis2 data', yaxis: 'y2', type: 'scatter', line: { color: purple } },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Double Y Axis Example' },
      showlegend: !stage.preview,
      yaxis: { title: { text: 'yaxis title' } },
      yaxis2: { title: { text: 'yaxis2 title', font: { color: purple } }, tickfont: { color: purple }, overlaying: 'y', side: 'right' },
    },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'yaxis2.side', SIDES, 'right', (v) => void relayout(stage.div, { 'yaxis2.side': v }));
    select(stage.bar, 'yaxis2.type', TYPES, 'linear', (v) => void relayout(stage.div, { 'yaxis2.type': v }));
  } else {
    stage.every(1500, (i) => void relayout(stage.div, { 'yaxis2.side': SIDES[i % 2]!, 'yaxis2.type': TYPES[Math.floor(i / 2) % 2]! }));
  }
  return () => stage.dispose();
};

export default mount;
