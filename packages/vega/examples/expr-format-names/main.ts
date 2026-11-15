// Formatting functions: monthAbbrevFormat and dayAbbrevFormat label two rings; the long names go in the middle
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const cx = 130;
  const ring = (n: number, r: number): { x: string; y: string } => ({
    x: `${cx} + ${r} * cos(-PI / 2 + datum.i / ${n} * 2 * PI)`,
    y: `${cx} + ${r} * sin(-PI / 2 + datum.i / ${n} * 2 * PI)`,
  });

  const spec: Spec = {
    width: 260,
    height: 260,
    padding: 8,
    signals: [
      { name: 'monthPick', value: 4, bind: { input: 'range', min: 0, max: 11, step: 1 } },
      { name: 'dayPick', value: 2, bind: { input: 'range', min: 0, max: 6, step: 1 } },
    ],
    data: [
      { name: 'months', transform: [{ type: 'sequence', start: 0, stop: 12, as: 'i' }] },
      { name: 'days', transform: [{ type: 'sequence', start: 0, stop: 7, as: 'i' }] },
    ],
    marks: [
      {
        type: 'text',
        from: { data: 'months' },
        encode: {
          update: {
            x: { signal: ring(12, 115).x },
            y: { signal: ring(12, 115).y },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            text: { signal: 'monthAbbrevFormat(datum.i)' },
            fill: { signal: 'datum.i === monthPick ? "orange" : "#8c93a1"' },
            fontSize: { signal: 'datum.i === monthPick ? 15 : 12' },
            fontWeight: { signal: 'datum.i === monthPick ? "bold" : "normal"' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'days' },
        encode: {
          update: {
            x: { signal: ring(7, 68).x },
            y: { signal: ring(7, 68).y },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            text: { signal: 'dayAbbrevFormat(datum.i)' },
            fill: { signal: 'datum.i === dayPick ? "steelblue" : "#8c93a1"' },
            fontSize: { signal: 'datum.i === dayPick ? 14 : 11' },
            fontWeight: { signal: 'datum.i === dayPick ? "bold" : "normal"' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: cx },
            y: { value: cx - 9 },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            text: { signal: 'monthFormat(monthPick)' },
            fill: { value: 'orange' },
            fontSize: { value: 13 },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: cx },
            y: { value: cx + 9 },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            text: { signal: 'dayFormat(dayPick)' },
            fill: { value: '#8fb8de' },
            fontSize: { value: 12 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { monthPick: 4, dayPick: 2 },
      { monthPick: 8, dayPick: 5 },
      { monthPick: 11, dayPick: 0 },
      { monthPick: 1, dayPick: 3 },
      { monthPick: 6, dayPick: 6 },
    ],
    1100,
  );
  return () => stage.dispose();
};

export default mount;
