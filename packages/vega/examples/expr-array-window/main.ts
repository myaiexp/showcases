// Array functions: clampRange keeps a window's span inside bounds; inrange, span and extent read it
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps, normals, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const gauss = normals(rng(17));
const values = Array.from({ length: 24 }, (_, i) => ({ i, v: Math.round(50 + 30 * Math.sin(i / 3.5) + gauss() * 8) }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 190,
    padding: 8,
    signals: [
      { name: 'centre', value: 12, bind: { input: 'range', min: -6, max: 30, step: 1 } },
      { name: 'size', value: 8, bind: { input: 'range', min: 2, max: 30, step: 1 } },
      // The wanted window may hang off the data; clampRange slides it back without changing its span.
      { name: 'wanted', update: '[centre - size / 2, centre + size / 2]' },
      { name: 'win', update: 'clampRange(wanted, 0, 23)' },
    ],
    data: [
      { name: 'table', values },
      { name: 'inside', source: 'table', transform: [{ type: 'filter', expr: 'inrange(datum.i, win)' }] },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'i' }, range: 'width', padding: 0.15 },
      { name: 'y', domain: [0, 100], range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x', values: [0, 5, 10, 15, 20, 23] },
      { orient: 'left', scale: 'y', tickCount: 5 },
    ],
    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'x', field: 'i' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'v' },
            y2: { scale: 'y', value: 0 },
            fill: { signal: 'inrange(datum.i, win) ? "orange" : "steelblue"' },
            fillOpacity: { signal: 'inrange(datum.i, win) ? 1 : 0.5' },
          },
        },
      },
      {
        // The window as asked for, which may stick out past the bars.
        type: 'rect',
        encode: {
          update: {
            x: { signal: "(wanted[0] + 0.5) * (width / 24)" },
            x2: { signal: "(wanted[1] + 0.5) * (width / 24)" },
            y: { value: -4 },
            height: { value: 3 },
            fill: { value: '#ddd' },
          },
        },
      },
      {
        // The window after clampRange.
        type: 'rect',
        encode: {
          update: {
            x: { signal: '(win[0] + 0.5) * (width / 24)' },
            x2: { signal: '(win[1] + 0.5) * (width / 24)' },
            y: { value: -9 },
            height: { value: 3 },
            fill: { value: 'orange' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { signal: 'width', offset: 0 },
            y: { value: -14 },
            align: { value: 'right' },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            text: {
              signal:
                "'wanted [' + wanted[0] + ', ' + wanted[1] + ']  clamped [' + win[0] + ', ' + win[1] + ']  span ' + span(win) + '  inside ' + length(data('inside')) + ', extent of values ' + extent(pluck(data('inside'), 'v'))",
            },
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
      { centre: 12, size: 8 },
      { centre: -2, size: 10 },
      { centre: 27, size: 12 },
      { centre: 6, size: 30 },
      { centre: 18, size: 5 },
    ],
    1300,
  );
  return () => stage.dispose();
};

export default mount;
