// Browser functions: containerSize, windowSize and screen read the page, drawn as three nested bars
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rows: ExprRow[] = [
  'containerSize()',
  'box',
  'windowSize()',
  'screen().width + " x " + screen().height',
  'isArray(containerSize())',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const bars = [
    ['container', 'containerSize()[0]', 'steelblue'],
    ['window', 'windowSize()[0]', 'orange'],
    ['screen', 'screen().width', '#7ad39a'],
  ] as const;

  const spec: Spec = {
    width: 440,
    height: 190,
    padding: 8,
    signals: [
      // container:resize fires when the element holding this view changes size (the chart's own
      // size must not depend on it, or the two would chase each other).
      { name: 'box', value: [0, 0], on: [{ events: 'container:resize', update: 'containerSize()' }] },
      { name: 'wide', update: 'max(screen().width || 0, windowSize()[0] || 0, containerSize()[0] || 0, 1)' },
    ],
    marks: [
      ...bars.flatMap(([label, expr, color], i) => [
        {
          type: 'rect' as const,
          encode: {
            update: {
              x: { value: 0 },
              y: { value: i * 30 },
              height: { value: 22 },
              width: { signal: `440 * (${expr} || 0) / wide` },
              fill: { value: color },
              fillOpacity: { value: 0.75 },
            },
          },
        },
        {
          type: 'text' as const,
          encode: {
            update: {
              x: { value: 6 },
              y: { value: i * 30 + 12 },
              baseline: { value: 'middle' as const },
              text: { signal: `'${label} ' + round(${expr} || 0) + ' px'` },
              fill: { value: '#fff' },
              fontSize: { value: 11 },
            },
          },
        },
      ]),
      { type: 'group', encode: { enter: { x: { value: 0 }, y: { value: 100 } } }, marks: exprMarks(rows, { labelWidth: 250, resultWidth: 190 }) },
    ],
  };

  await stage.render(spec);
  return () => stage.dispose();
};

export default mount;
