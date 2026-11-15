// A radar chart: one closed scatterpolar trace filled to itself, values changing in cards
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const theta = ['A', 'B', 'C', 'D', 'E', 'A'];
const sets = [
  [39, 28, 8, 7, 28, 39],
  [12, 40, 30, 15, 6, 12],
  [25, 10, 35, 38, 20, 25],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  // The first value repeats at the end so the polygon closes; fill: 'toself' shades inside it.
  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatterpolar', r: sets[0], theta, fill: 'toself' }],
    { template: stage.template, polar: { radialaxis: { visible: true, range: [0, 50] } }, showlegend: false },
    stage.config,
  );

  const show = (i: number): void => void restyle(stage.div, { r: [sets[i % sets.length]] }, [0]);
  if (stage.bar) {
    let n = 0;
    button(stage.bar, 'Next values', () => show(++n));
  } else stage.every(1200, show);

  return () => stage.dispose();
};

export default mount;
