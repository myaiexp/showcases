// Parcoords with two lines and four axes: tick values, tick text and a brushed range
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'parcoords',
        line: { color: '#60a5fa' },
        dimensions: [
          { range: [1, 5], constraintrange: [1, 2], label: 'A', values: [1, 4] },
          { range: [1, 5], label: 'B', values: [3, 1.5], tickvals: [1.5, 3, 4.5] },
          // tickvals + ticktext replace the numeric ticks with words
          { range: [1, 5], label: 'C', values: [2, 4], tickvals: [1, 2, 4, 5], ticktext: ['text 1', 'text 2', 'text 4', 'text 5'] },
          { range: [1, 5], label: 'D', values: [4, 2] },
        ],
      },
    ],
    { template: stage.template, margin: stage.preview ? { l: 40, r: 40, t: 34, b: 14 } : undefined },
    stage.config,
  );

  // Brushing A keeps one line lit; the other turns grey.
  const brush = (r: [number, number]): void => void restyle(stage.div, { 'dimensions[0].constraintrange': [r] }, [0]);
  if (stage.bar) {
    button(stage.bar, 'Brush A: 1–2', () => brush([1, 2]));
    button(stage.bar, 'Brush A: 3.5–4.5', () => brush([3.5, 4.5]));
    button(stage.bar, 'Brush A: whole axis', () => brush([1, 5]));
  } else {
    const ranges: [number, number][] = [[1, 2], [3.5, 4.5], [1, 5]];
    stage.every(1100, (i) => brush(ranges[i % 3] ?? [1, 5]));
  }

  return () => stage.dispose();
};

export default mount;
