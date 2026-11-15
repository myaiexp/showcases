// Two x axes: an overlaying xaxis2 on top reads a second scale for the same plot
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const SIDES = ['top', 'bottom'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const amber = '#f59e0b';
  const days = [0, 1, 2, 3, 4, 5, 6, 7];
  await Plotly.newPlot(
    stage.div,
    [
      { x: days, y: [2, 3, 5, 4, 6, 8, 7, 9], name: 'days', type: 'scatter' },
      // Same weeks as the days, on a scale of hours.
      { x: days.map((d) => d * 24), y: [9, 7, 8, 6, 4, 5, 3, 2], name: 'hours', xaxis: 'x2', type: 'scatter', line: { color: amber } },
    ],
    {
      template: stage.template,
      showlegend: !stage.preview,
      xaxis: { title: { text: stage.preview ? '' : 'days' } },
      xaxis2: { title: { text: stage.preview ? '' : 'hours', font: { color: amber } }, tickfont: { color: amber }, overlaying: 'x', side: 'top' },
    },
    stage.config,
  );

  const side = (s: string): void => void relayout(stage.div, { 'xaxis2.side': s });
  if (stage.bar) select(stage.bar, 'xaxis2.side', SIDES, 'top', side);
  else stage.every(1600, (i) => side(SIDES[i % 2]!));
  return () => stage.dispose();
};

export default mount;
