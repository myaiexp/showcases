// histfunc: the same x and y binned by count, then by sum (or avg, min, max)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const x = ['Apples', 'Apples', 'Apples', 'Oranges', 'Bananas'];
const y = ['5', '10', '3', '10', '5'];
const FUNCS = ['sum', 'avg', 'min', 'max', 'count'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { histfunc: 'count', y, x, type: 'histogram', name: 'count' },
      { histfunc: 'sum', y, x, type: 'histogram', name: 'sum' },
    ],
    { template: stage.template },
    stage.config,
  );

  const set = (f: (typeof FUNCS)[number]): void => void Plotly.restyle(stage.div, { histfunc: f, name: f }, [1]);
  if (stage.bar) select(stage.bar, 'second trace histfunc', FUNCS, 'sum', set);
  else stage.every(1200, (i) => set(FUNCS[i % FUNCS.length] ?? 'sum'));

  return () => stage.dispose();
};

export default mount;
