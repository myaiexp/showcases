// A date axis from timestamp strings; tickformat sets how dates are written
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const FORMATS = ['', '%b %d, %Y', '%Y-%m-%d %H:%M', '%B', '%d/%m/%y'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [{ x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'], y: [1, 3, 6], type: 'scatter' }],
    { template: stage.template, xaxis: { type: 'date', tickformat: '', dtick: 'M1' } },
    stage.config,
  );

  const set = (f: (typeof FORMATS)[number]): void => void Plotly.relayout(stage.div, { 'xaxis.tickformat': f });
  if (stage.bar) select(stage.bar, 'xaxis.tickformat', FORMATS, '', set);
  else stage.every(1300, (i) => set(FORMATS[i % FORMATS.length] ?? ''));

  return () => stage.dispose();
};

export default mount;
