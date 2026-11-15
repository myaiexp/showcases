// arrowref data against paper: whether an arrow's angle follows the axes' scale or stays fixed
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout, restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const x: number[] = [];
  const y: number[] = [];
  const u: number[] = [];
  const v: number[] = [];
  for (let i = 0; i < 7; i += 1) {
    for (let j = 0; j < 7; j += 1) {
      x.push(i);
      y.push(j);
      u.push(1);
      v.push(1); // every arrow points up and right at 45 degrees in data units
    }
  }

  await Plotly.newPlot(
    stage.div,
    [{ type: 'quiver', x, y, u, v, arrowref: 'data', marker: { color: '#22d3ee', line: { width: 2 } } }],
    { template: stage.template, xaxis: { range: [-1, 7] }, yaxis: { range: [-1, 7] } },
    stage.config,
  );

  // Stretching the y axis changes what 45 degrees looks like when u and v are data units.
  // With 'paper' they are pixels, and the angle never moves.
  const stretch = (r: number): void => void relayout(stage.div, { 'yaxis.range': [-1, -1 + 8 * r] });
  if (stage.bar) {
    select(stage.bar, 'arrowref', ['data', 'paper'] as const, 'data', (m) => void restyle(stage.div, { arrowref: m }, [0]));
    slider(stage.bar, 'y range stretch', [0.4, 3, 0.1], 1, stretch);
  } else {
    stage.every(120, (i) => {
      void restyle(stage.div, { arrowref: i % 70 < 35 ? 'data' : 'paper' }, [0]);
      stretch(1.6 + 1.2 * Math.sin(i / 8));
    });
  }

  return () => stage.dispose();
};

export default mount;
