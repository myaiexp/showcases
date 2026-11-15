// A carpet trace from y alone, then with a and b parameter values: what each input changes
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const y = [2, 3.5, 4, 3, 4.5, 5, 5.5, 6.5, 7.5, 8, 8.5, 10];
const a = [4, 4, 4, 4.5, 4.5, 4.5, 5, 5, 5, 6, 6, 6];
const b = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3];
const modes = ['y only', 'a, b and y'] as const;
type Mode = (typeof modes)[number];

// With y alone, a and b count 0, 1, 2…; with a and b the grid is labelled and unevenly spaced.
const trace = (mode: Mode): Data => (mode === 'y only' ? { type: 'carpet', y } : { type: 'carpet', a, b, y });

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(stage.div, [trace('y only')], { template: stage.template }, stage.config);

  const show = (m: Mode): void => void Plotly.react(stage.div, [trace(m)], { template: stage.template }, stage.config).catch(() => {});
  if (stage.bar) select(stage.bar, 'inputs', modes, 'y only', show);
  else stage.every(1500, (i) => show(pick(modes, i)));

  return () => stage.dispose();
};

export default mount;
