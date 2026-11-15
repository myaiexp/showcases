// An SPC chart with a sideways histogram of its values on a second axis pair
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { SPC_Y, spcColumns, spcTraces } from './traces.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const histo = (n: number) => ({
    type: 'histogram' as const,
    y: SPC_Y.slice(0, n),
    name: 'Distribution',
    orientation: 'h' as const,
    marker: { color: '#60a5fa', line: { color: 'white', width: 1 } },
    xaxis: 'x2',
    yaxis: 'y2',
  });

  await Plotly.newPlot(
    stage.div,
    [...spcTraces(9), histo(9)],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Basic SPC Chart' },
      xaxis: { domain: [0, 0.7], zeroline: false },
      yaxis: { range: [-10, 10], zeroline: false },
      xaxis2: { domain: [0.8, 1] },
      yaxis2: { anchor: 'x2', showticklabels: false, range: [-10, 10] },
    },
    stage.config,
  );

  const reveal = (n: number): void => {
    const t = spcColumns(n);
    void Plotly.restyle(stage.div, { x: [...t.map((d) => d.x), undefined], y: [...t.map((d) => d.y), SPC_Y.slice(0, n)] } as never);
  };
  if (stage.bar) slider(stage.bar, 'points shown', [1, 9, 1], 9, reveal);
  else stage.every(700, (i) => reveal(1 + (i % 9)));

  return () => stage.dispose();
};

export default mount;
