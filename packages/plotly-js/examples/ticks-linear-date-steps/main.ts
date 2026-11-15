// A date axis with tickmode linear: tick0 as a date, dtick in milliseconds or "M<n>"
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const DAY = 24 * 60 * 60 * 1000;
const STEPS = {
  '30 days (30 * DAY ms)': 30 * DAY,
  '14 days': 14 * DAY,
  '7 days': 7 * DAY,
  'one month ("M1")': 'M1',
  'three months ("M3")': 'M3',
} as const;
const NAMES = Object.keys(STEPS) as (keyof typeof STEPS)[];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        x: ['2000-01', '2000-02', '2000-03', '2000-04', '2000-05', '2000-06', '2000-07', '2000-08', '2000-09', '2000-10', '2000-11', '2000-12', '2001-01'],
        y: [-36.5, -26.6, -43.6, -52.3, -71.5, -81.4, -80.5, -82.2, -76, -67.3, -46.1, -35, -40],
        type: 'scatter',
      },
    ],
    { template: stage.template, xaxis: { tickmode: 'linear', tick0: '1999-12-15', dtick: 30 * DAY } },
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'xaxis.dtick', NAMES, pick(NAMES, 0), (v) => void relayout(stage.div, { 'xaxis.dtick': STEPS[v] }));
  if (stage.preview) stage.every(1400, (i) => void relayout(stage.div, { 'xaxis.dtick': STEPS[pick(NAMES, i)] }));
  return () => stage.dispose();
};

export default mount;
