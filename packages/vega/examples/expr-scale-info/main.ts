// Scale functions: bandspace sizes a chart, and bandwidth, domain and range read the band scale back
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rows: ExprRow[] = [
  'bandspace(n, inner, outer)',
  'format(bandspace(n, inner, outer) * 22, ".0f") + " px tall"',
  'format(bandwidth("y"), ".1f")',
  'length(domain("y"))',
  'range("y")',
  'peek(domain("y"))',
  'scale("y", "r3")',
  'isObject(copy("y"))',
  'isDefined(copy("nope"))',
  'bandwidth("nope")',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 200,
    // The chart's height comes from bandspace(): 22 pixels for each step of the band scale.
    height: { signal: 'bandspace(n, inner, outer) * 22' },
    padding: 8,
    signals: [
      { name: 'n', value: 6, bind: { input: 'range', min: 2, max: 10, step: 1 } },
      { name: 'inner', value: 0.2, bind: { input: 'range', min: 0, max: 0.8, step: 0.1 } },
      { name: 'outer', value: 0.1, bind: { input: 'range', min: 0, max: 0.8, step: 0.1 } },
    ],
    data: [
      {
        name: 'rows',
        transform: [
          { type: 'sequence', start: 1, stop: { signal: 'n + 1' }, as: 'i' },
          { type: 'formula', as: 'name', expr: '"r" + datum.i' },
          { type: 'formula', as: 'v', expr: '30 + (datum.i * 37) % 60' },
        ],
      },
    ],
    scales: [
      { name: 'y', type: 'band', domain: { data: 'rows', field: 'name' }, range: 'height', paddingInner: { signal: 'inner' }, paddingOuter: { signal: 'outer' } },
      { name: 'x', domain: [0, 100], range: 'width' },
    ],
    axes: [{ orient: 'left', scale: 'y' }],
    marks: [
      {
        type: 'rect',
        from: { data: 'rows' },
        encode: {
          update: {
            y: { scale: 'y', field: 'name' },
            height: { scale: 'y', band: 1 },
            x: { value: 0 },
            x2: { scale: 'x', field: 'v' },
            fill: { value: 'steelblue' },
          },
        },
      },
      { type: 'group', encode: { enter: { x: { value: 250 }, y: { value: 0 } } }, marks: exprMarks(rows, { labelWidth: 210, resultWidth: 130 }) },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { n: 6, inner: 0.2, outer: 0.1 },
      { n: 9, inner: 0.5, outer: 0 },
      { n: 4, inner: 0.1, outer: 0.5 },
      { n: 10, inner: 0.7, outer: 0.2 },
    ],
    1300,
  );
  return () => stage.dispose();
};

export default mount;
