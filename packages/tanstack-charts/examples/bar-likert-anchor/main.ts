// barX layout: stack({ order, anchor }) centres the Neutral segment on zero
import { barX, colorLegend, defineChart, mountChart, stack } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleOrdinal } from '@tanstack/charts/scales/ordinal';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const responses = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
const counts = [
  ['Easy to learn', [4, 9, 14, 38, 35]],
  ['Fast', [2, 6, 18, 40, 34]],
  ['Well documented', [12, 22, 20, 30, 16]],
  ['Stable', [6, 14, 24, 33, 23]],
].flatMap(([question, row]) =>
  responses.map((response, i) => ({ question: question as string, response, count: (row as number[])[i]! })),
);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (anchored: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [
        barX(counts, {
          x: 'count',
          y: 'question',
          z: 'response',
          color: 'response',
          layout: stack(anchored ? { order: responses, anchor: { series: 'Neutral', fraction: 0.5 } } : { order: responses }),
        }),
      ],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Respondents' } },
        y: { scale: () => scaleBand<string>().padding(0.25) },
      },
      color: {
        scale: scaleOrdinal(responses, ['#dc2626', '#fb923c', '#a1a1aa', '#60a5fa', '#2563eb']),
        legend: colorLegend(),
      },
    });

  const options = { definition: chart(true), height: stage.height, initialWidth: 640, ariaLabel: 'Survey responses, diverging around Neutral' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (on: boolean): void => host.update({ ...options, definition: chart(on) });

  if (stage.bar) checkbox(stage.bar, 'anchor at Neutral', true, show);
  else stage.cycle([true, false], 2500, show);
  return () => stage.dispose();
};

export default mount;
