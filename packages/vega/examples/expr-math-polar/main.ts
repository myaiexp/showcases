// Math functions: hypot, atan2, asin, acos and atan turn a point into a radius and an angle
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { exprMarks, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const rows: ExprRow[] = [
  { expr: 'format(hypot(px, py), ".3f")', label: 'hypot(px, py)' },
  { expr: 'format(atan2(py, px) * 180 / PI, ".1f")', label: 'atan2(py, px) in degrees' },
  { expr: 'format(atan(py / px) * 180 / PI, ".1f")', label: 'atan(py / px) in degrees' },
  { expr: 'format(asin(py / hypot(px, py)) * 180 / PI, ".1f")', label: 'asin(py / r) in degrees' },
  { expr: 'format(acos(px / hypot(px, py)) * 180 / PI, ".1f")', label: 'acos(px / r) in degrees' },
  { expr: 'format(hypot(px, py) * cos(atan2(py, px)), ".3f")', label: 'r * cos(angle): back to px' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 220,
    height: 220,
    padding: 8,
    signals: [
      { name: 'px', value: 3, bind: { input: 'range', min: -5, max: 5, step: 0.25 } },
      { name: 'py', value: 2, bind: { input: 'range', min: -5, max: 5, step: 0.25 } },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [-5, 5], range: 'width' },
      { name: 'y', type: 'linear', domain: [-5, 5], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', offset: 0, tickCount: 5 },
      { orient: 'left', scale: 'y', tickCount: 5 },
    ],
    marks: [
      {
        // The circle of radius hypot(px, py), centred on the origin.
        type: 'symbol',
        encode: {
          update: {
            x: { scale: 'x', value: 0 },
            y: { scale: 'y', value: 0 },
            size: { signal: 'PI * pow(hypot(px, py) * 22, 2)' },
            fill: { value: 'transparent' },
            stroke: { value: '#667' },
            strokeDash: { value: [3, 3] },
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { scale: 'x', value: 0 },
            y: { scale: 'y', value: 0 },
            x2: { scale: 'x', signal: 'px' },
            y2: { scale: 'y', signal: 'py' },
            stroke: { value: 'orange' },
            strokeWidth: { value: 2 },
          },
        },
      },
      {
        type: 'arc',
        encode: {
          update: {
            x: { scale: 'x', value: 0 },
            y: { scale: 'y', value: 0 },
            innerRadius: { value: 26 },
            outerRadius: { value: 28 },
            // Arc angles run clockwise from 12 o'clock; atan2 runs counter-clockwise from 3 o'clock.
            startAngle: { signal: 'PI / 2' },
            endAngle: { signal: 'PI / 2 - atan2(py, px)' },
            fill: { value: '#8fb8de' },
          },
        },
      },
      {
        type: 'symbol',
        encode: {
          update: {
            x: { scale: 'x', signal: 'px' },
            y: { scale: 'y', signal: 'py' },
            size: { value: 100 },
            fill: { value: 'steelblue' },
          },
        },
      },
      {
        type: 'group',
        encode: { enter: { x: { value: 250 }, y: { value: 70 } } },
        marks: exprMarks(rows, { labelWidth: 210, resultWidth: 60 }),
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { px: 3, py: 2 },
      { px: -2.5, py: 3.5 },
      { px: -4, py: -1 },
      { px: 1.5, py: -4 },
      { px: 4.5, py: 0.5 },
    ],
    1200,
  );
  return () => stage.dispose();
};

export default mount;
