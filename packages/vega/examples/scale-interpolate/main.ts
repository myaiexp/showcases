// interpolate picks the colour space a two-colour range is blended in, one strip per method
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const methods = ['rgb', 'hsl', 'hsl-long', 'lab', 'hcl', 'hcl-long', 'cubehelix', 'cubehelix-long', 'rgb gamma 2.2'];
  type Scales = NonNullable<Spec['scales']>;
  type Marks = NonNullable<Spec['marks']>;
  // interpolate is read once at parse time: it takes a literal, not a signal, so one scale per method.
  const ramps: Scales = methods.map((m, i) => ({
    name: 'c' + i, type: 'linear', domain: [0, 59], range: ['yellow', 'blue'],
    interpolate: m.endsWith('gamma 2.2') ? { type: 'rgb', gamma: 2.2 } : m,
  })) as Scales; // the method names are plain strings here, which the enum type rejects
  const rows: Marks = methods.map((m, i) => ({
    type: 'rect', from: { data: 'cols' },
    encode: { update: {
      x: { scale: 'x', field: 'n' }, width: { scale: 'x', band: 1 },
      y: { scale: 'row', value: m }, height: { scale: 'row', band: 1 },
      fill: { scale: 'c' + i, field: 'n' }, opacity: { signal: `focus === '${m}' ? 1 : 0.5` },
    } },
  }));

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    signals: [{ name: 'focus', value: 'rgb', bind: { input: 'select', options: methods } }],
    data: [{ name: 'cols', transform: [{ type: 'sequence', start: 0, stop: 60, as: 'n' }] }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'cols', field: 'n' }, range: 'width' },
      { name: 'row', type: 'band', domain: methods, range: 'height', paddingInner: 0.15 },
      ...ramps,
    ],
    axes: [{ orient: 'left', scale: 'row', ticks: false, domain: false, labelFontSize: 9 }],
    marks: rows,
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, methods.map((focus) => ({ focus })), 1000);
  return () => stage.dispose();
};

export default mount;
