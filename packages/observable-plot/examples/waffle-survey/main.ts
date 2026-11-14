// A proportion waffle: Syrian teens survey, circles via rx and a percent label
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { mountStatic } from '../../shared/plot.ts';

const survey = [
  { question: 'don’t go out after dark', yes: 96 },
  { question: 'do no activities other than school', yes: 89 },
  { question: 'engage in political discussion and social movements, including online', yes: 10 },
  { question: 'would like to do activities but are prevented by safety concerns', yes: 73 },
];

const mount: Mount = (el, ctx) =>
  mountStatic(el, ctx, ({ width, height }) =>
    Plot.plot({
      width,
      height: height ?? 260,
      axis: null,
      label: null,
      marginTop: 20,
      marginBottom: height ? 34 : 70,
      title: height ? undefined : 'Subdued',
      subtitle: height ? undefined : 'Of 120 surveyed Syrian teenagers:',
      marks: [
        height ? null : Plot.axisFx({ lineWidth: 10, anchor: 'bottom', dy: 20 }),
        Plot.waffleY({ length: 1 }, { y: 120, fillOpacity: 0.4, rx: '100%' }),
        Plot.waffleY(survey, { fx: 'question', y: 'yes', rx: '100%', fill: 'orange' }),
        Plot.text(survey, {
          fx: 'question',
          text: (d) => (d.yes / 120).toLocaleString('en-US', { style: 'percent' }),
          frameAnchor: 'bottom',
          lineAnchor: 'top',
          dy: 6,
          fill: 'orange',
          fontSize: height ? 16 : 24,
          fontWeight: 'bold',
        }),
      ],
    }),
  );

export default mount;
