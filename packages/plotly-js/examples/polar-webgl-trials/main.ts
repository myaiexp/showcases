// Six trials of measured points on a WebGL polar chart, with a light panel and grid drawn below the traces
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const trials: [number, string, number][] = [
  [1, 'rgb(27,158,119)', 15],
  [2, 'rgb(217,95,2)', 20],
  [3, 'rgb(117,112,179)', 12],
  [4, 'rgb(231,41,138)', 22],
  [5, 'rgb(102,166,30)', 19],
  [6, 'rgb(230,171,2)', 10],
];

const mount: Mount = async (el, ctx) => {
  const rows = await csv('hobbs-pearson-trials.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 560 });
  const k = stage.preview ? 0.5 : 1;

  await Plotly.newPlot(
    stage.div,
    trials.map(([n, color, size]) => ({
      type: 'scatterpolargl' as const,
      mode: 'markers' as const,
      r: unpackNum(rows, `trial_${n}_r`),
      theta: unpackNum(rows, `trial_${n}_theta`),
      name: `Trial ${n}`,
      marker: { color, size: size * k, line: { color: 'white' }, opacity: 0.7 },
      cliponaxis: false,
    })),
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Hobbs-Pearson trials' },
      showlegend: !stage.preview,
      // The docs' light-grey panel is kept as a mid-dark one so the white grid stays visible.
      polar: {
        bgcolor: 'rgb(60,64,74)',
        angularaxis: { tickwidth: 2, linewidth: 3, layer: 'below traces', gridcolor: 'white' },
        radialaxis: { side: 'counterclockwise', showline: true, linewidth: 2, tickwidth: 2, gridcolor: 'white', gridwidth: 2 },
      },
    },
    stage.config,
  );

  // Trials take turns: the others dim with marker opacity.
  const focus = (n: number): void => void restyle(stage.div, { 'marker.opacity': trials.map(([t]) => (n === 0 || t === n ? 0.85 : 0.12)) }, [0, 1, 2, 3, 4, 5]);
  if (stage.bar) toggle(stage.bar, 'dim all but trial 1', false, (v) => focus(v ? 1 : 0));
  else stage.every(900, (i) => focus((i % 7) as number));

  return () => stage.dispose();
};

export default mount;
