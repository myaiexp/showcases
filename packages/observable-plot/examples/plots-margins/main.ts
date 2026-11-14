// Margins: marginTop, marginRight, marginBottom, marginLeft on bars
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

interface Margins {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}
const DEFAULT: Margins = { marginTop: 20, marginRight: 20, marginBottom: 30, marginLeft: 40 };
const CARD: Margins[] = [DEFAULT, { marginTop: 40, marginRight: 50, marginBottom: 10, marginLeft: 10 }, { marginTop: 5, marginRight: 5, marginBottom: 40, marginLeft: 60 }];

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<Margins>(el, ctx, {
    initial: DEFAULT,
    render: ({ marginTop, marginRight, marginBottom, marginLeft }, { width, height }) =>
      Plot.plot({
        width,
        height,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        grid: true,
        marks: [
          // A faint outline extended over the margins shows where the outer box ends.
          Plot.frame({
            strokeOpacity: 0.5,
            insetTop: -marginTop,
            insetRight: -marginRight,
            insetBottom: -marginBottom,
            insetLeft: -marginLeft,
          }),
          Plot.barY(alphabet, { x: 'letter', y: 'frequency', fill: 'green' }),
          Plot.frame(),
        ],
      }),
    step: (_s, i) => CARD[i % CARD.length] as Margins,
    controls: (bar, live) => {
      for (const key of ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'] as const) {
        slider(bar, `${key}: `, [0, 60, 1], DEFAULT[key], (v) => live.set({ [key]: v }));
      }
    },
  });
};

export default mount;
