// Expression constants: PI, E, LN2, SQRT2 and the rest, used live in formulas and drawn
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rows: ExprRow[] = [
  'format(PI, ".6f")',
  'format(E, ".6f")',
  'format(LN2, ".6f")',
  'format(LN10, ".6f")',
  'format(LOG2E, ".6f")',
  'format(LOG10E, ".6f")',
  'format(SQRT2, ".6f")',
  'format(SQRT1_2, ".6f")',
  'MAX_VALUE',
  'MIN_VALUE',
  'NaN === NaN',
  'isNaN(NaN)',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 470,
    height: 220,
    padding: 8,
    // The angle is a multiple of PI; the dot on the unit circle is placed with cos/sin of PI * turn.
    signals: [{ name: 'turn', value: 0.25, bind: { input: 'range', min: 0, max: 2, step: 0.05 } }],
    marks: [
      ...exprMarks(rows, { labelWidth: 150, resultWidth: 150 }),
      {
        type: 'symbol',
        encode: {
          enter: { x: { value: 380 }, y: { value: 110 }, size: { value: 2 * 70 * 70 * 3.1416 }, fill: { value: 'transparent' }, stroke: { value: '#666' } },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { value: 380 },
            y: { value: 110 },
            x2: { signal: '380 + 70 * cos(PI * turn)' },
            y2: { signal: '110 - 70 * sin(PI * turn)' },
            stroke: { value: '#ffb454' },
          },
        },
      },
      {
        type: 'symbol',
        encode: {
          update: {
            x: { signal: '380 + 70 * cos(PI * turn)' },
            y: { signal: '110 - 70 * sin(PI * turn)' },
            size: { value: 90 },
            fill: { value: 'steelblue' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 380 },
            y: { value: 205 },
            align: { value: 'center' },
            text: { signal: 'format(turn, ".2f") + " × PI = " + format(PI * turn, ".3f") + " rad"' },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'turn', [0.25, 0.5, 1, 1.5, 1.75, 2, 0.75], 900);
  return () => stage.dispose();
};

export default mount;
