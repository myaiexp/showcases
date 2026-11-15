// Split violins: smokers on the left half, non-smokers on the right
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('violin_data.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });

  const half = (smoker: 'Yes' | 'No', side: 'negative' | 'positive', color: string) => {
    const mine = rows.filter((r) => r.smoker === smoker);
    return {
      type: 'violin' as const,
      x: unpack(mine, 'day'),
      y: unpackNum(mine, 'total_bill'),
      legendgroup: smoker,
      scalegroup: smoker,
      name: smoker,
      side,
      box: { visible: true },
      line: { color, width: 2 },
      meanline: { visible: true },
    };
  };

  await Plotly.newPlot(
    stage.div,
    [half('Yes', 'negative', '#60a5fa'), half('No', 'positive', '#34d399')],
    { template: stage.template, title: { text: stage.preview ? '' : 'Split Violin Plot' }, yaxis: { zeroline: false }, violingap: 0, violingroupgap: 0, violinmode: 'overlay' },
    stage.config,
  );

  const sides = (split: boolean): void => void Plotly.restyle(stage.div, { side: split ? ['negative', 'positive'] : ['both', 'both'] } as never);
  if (stage.bar) toggle(stage.bar, 'split (side negative / positive)', true, sides);
  else stage.every(1700, (i) => sides(i % 2 === 0));

  return () => stage.dispose();
};

export default mount;
