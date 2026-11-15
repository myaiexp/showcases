// Object functions: merge layers defaults, a theme and an override, and the result styles a rectangle
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const themes = [{}, { fill: 'orange', r: 4 }, { fill: '#7ad39a', w: 150 }];
const overrides = [{}, { r: 30 }, { h: 110, opacity: 0.5 }, { fill: '#d977c9', w: 220, h: 40 }];

const rows: ExprRow[] = [
  { head: 'style = merge(defaults, theme, override)' },
  'style.fill',
  'style.w',
  'style.h',
  'style.r',
  'style.opacity',
  'defaults.w',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 150,
    padding: 8,
    signals: [
      { name: 'defaults', value: { fill: 'steelblue', w: 100, h: 70, r: 0, opacity: 1 } },
      { name: 'themes', value: themes },
      { name: 'overrides', value: overrides },
      { name: 'themePick', value: 0, bind: { input: 'select', options: [0, 1, 2], labels: ['no theme', 'orange, r 4', 'green, w 150'] } },
      { name: 'overPick', value: 0, bind: { input: 'select', options: [0, 1, 2, 3], labels: ['no override', 'r 30', 'h 110, opacity .5', 'pink, w 220, h 40'] } },
      // Later arguments win: override beats theme beats defaults, and the inputs are left untouched.
      { name: 'style', update: 'merge(defaults, themes[themePick], overrides[overPick])' },
    ],
    marks: [
      {
        type: 'rect',
        encode: {
          update: {
            x: { value: 0 },
            y: { signal: '(130 - style.h) / 2' },
            width: { signal: 'style.w' },
            height: { signal: 'style.h' },
            cornerRadius: { signal: 'style.r' },
            fill: { signal: 'style.fill' },
            fillOpacity: { signal: 'style.opacity' },
          },
        },
      },
      { type: 'group', encode: { enter: { x: { value: 250 }, y: { value: 10 } } }, marks: exprMarks(rows, { labelWidth: 120, resultWidth: 70 }) },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { themePick: 0, overPick: 0 },
      { themePick: 1, overPick: 0 },
      { themePick: 1, overPick: 1 },
      { themePick: 2, overPick: 2 },
      { themePick: 0, overPick: 3 },
      { themePick: 2, overPick: 3 },
    ],
    1100,
  );
  return () => stage.dispose();
};

export default mount;
