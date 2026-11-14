// Diverging Likert bars from a custom stack offset function and explicit order
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { mountStatic } from '../../shared/plot.ts';

// Which responses are negative (-1), neutral (0) or positive (1).
function Likert(responses: [string, number][]) {
  const map = new Map(responses);
  return {
    order: Array.from(map.keys()),
    // Shifts each stack so its neutral middle sits on zero; mutates the x1 and x2 arrays.
    offset(I: number[][][], X1: number[], X2: number[], Z: string[]) {
      for (const stacks of I) {
        for (const stack of stacks) {
          const k = d3.sum(stack, (i) => ((X2[i] ?? 0) - (X1[i] ?? 0)) * (1 - (map.get(Z[i] ?? '') ?? 0))) / 2;
          for (const i of stack) {
            X1[i] = (X1[i] ?? 0) - k;
            X2[i] = (X2[i] ?? 0) - k;
          }
        }
      }
    },
  };
}

const likert = Likert([
  ['Strongly Disagree', -1],
  ['Disagree', -1],
  ['Neutral', 0],
  ['Agree', 1],
  ['Strongly Agree', 1],
]);

const mount: Mount = async (el, ctx) => {
  const survey = await csv('survey.csv');
  return mountStatic(el, ctx, ({ width, height, preview }) =>
    Plot.plot({
      width,
      height,
      x: { tickFormat: Math.abs },
      color: { domain: likert.order, scheme: 'RdBu', legend: !preview },
      marks: [
        Plot.barX(survey, Plot.groupZ({ x: 'count' }, { fy: 'Question', fill: 'Response', ...likert })),
        Plot.ruleX([0]),
      ],
    }),
  );
};

export default mount;
