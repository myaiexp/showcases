// Color functions: rgb, hsl, lab and hcl each build a row of swatches from one lightness-like slider
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const N = 24;
// t runs 0..1 along the row. Each space gets the same slider through its own channel.
const spaces = [
  ['rgb', 'rgb(255 * t, 255 * level, 128)'],
  ['hsl', 'hsl(360 * t, 0.9, level)'],
  ['lab', 'lab(100 * level, -90 + 180 * t, 50)'],
  ['hcl', 'hcl(360 * t, 55, 100 * level)'],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 160,
    padding: 8,
    signals: [{ name: 'level', value: 0.6, bind: { input: 'range', min: 0.1, max: 0.95, step: 0.01 } }],
    data: [
      {
        name: 'cells',
        transform: [
          { type: 'sequence', start: 0, stop: N, as: 'i' },
          { type: 'formula', as: 't', expr: `datum.i / ${N - 1}` },
        ],
      },
    ],
    marks: spaces.flatMap(([name, expr], row) => [
      {
        type: 'rect' as const,
        from: { data: 'cells' },
        encode: {
          update: {
            x: { signal: `datum.i * ${(440 - 0) / N}` },
            width: { value: 440 / N - 1 },
            y: { value: row * 40 },
            height: { value: 30 },
            // A color function returns an object that prints as a CSS rgb() string.
            fill: { signal: `"" + ${expr.replace(/\bt\b/g, 'datum.t')}` },
          },
        },
      },
      {
        type: 'text' as const,
        encode: {
          enter: { x: { value: 0 }, y: { value: row * 40 + 38 }, text: { value: expr }, fill: { value: '#a6acb8' }, fontSize: { value: 10.5 }, font: { value: 'ui-monospace, monospace' } },
        },
      },
    ]),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'level', [0.6, 0.25, 0.9, 0.4, 0.75], 1100);
  return () => stage.dispose();
};

export default mount;
