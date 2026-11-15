// A scheme given as a colour array is interpolated into a new scheme, in a chosen colour space
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const spaces = ['rgb', 'hsl', 'lab', 'hcl', 'cubehelix'];
  const colors = ['#2b83ba', '#ffffbf', '#d7191c'];
  type Scales = NonNullable<Spec['scales']>;
  type Marks = NonNullable<Spec['marks']>;
  // interpolate is a literal read at parse time (no signals), so each colour space gets its own pair of scales.
  const scales: Scales = spaces.flatMap((s) => [
    { name: 'ramp-' + s, type: 'linear', domain: [0, 59], range: { scheme: colors }, interpolate: s },
    { name: 'pal-' + s, type: 'ordinal', domain: [0, 1, 2, 3, 4, 5, 6], range: { scheme: colors, count: 7 }, interpolate: s },
  ] as Scales);
  const marks: Marks = spaces.flatMap((s) => [
    {
      type: 'rect', from: { data: 'cols' },
      encode: { update: {
        x: { scale: 'xc', field: 'n' }, width: { scale: 'xc', band: 1 },
        y: { scale: 'row', value: s }, height: { scale: 'row', band: 0.45 },
        fill: { scale: 'ramp-' + s, field: 'n' }, opacity: { signal: `focus === '${s}' ? 1 : 0.5` },
      } },
    },
    {
      type: 'rect', from: { data: 'swatches' },
      encode: { update: {
        x: { scale: 'xs', field: 'n' }, width: { scale: 'xs', band: 1 },
        y: { scale: 'row', value: s, offset: 21 }, height: { scale: 'row', band: 0.45 },
        fill: { scale: 'pal-' + s, field: 'n' }, opacity: { signal: `focus === '${s}' ? 1 : 0.5` },
      } },
    },
  ] as Marks);

  const spec: Spec = {
    width: 420, height: 230, padding: 5,
    signals: [{ name: 'focus', value: 'rgb', bind: { input: 'select', options: spaces, name: 'interpolate' } }],
    data: [
      { name: 'cols', transform: [{ type: 'sequence', start: 0, stop: 60, as: 'n' }] },
      { name: 'swatches', transform: [{ type: 'sequence', start: 0, stop: 7, as: 'n' }] },
    ],
    scales: [
      { name: 'xc', type: 'band', domain: { data: 'cols', field: 'n' }, range: 'width' },
      { name: 'xs', type: 'band', domain: { data: 'swatches', field: 'n' }, range: 'width', paddingInner: 0.06 },
      { name: 'row', type: 'band', domain: spaces, range: 'height', paddingInner: 0.1 },
      ...scales,
    ],
    axes: [{ orient: 'left', scale: 'row', ticks: false, domain: false, labelFontSize: 10 }],
    marks,
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, spaces.map((focus) => ({ focus })), 1300);
  return () => stage.dispose();
};

export default mount;
