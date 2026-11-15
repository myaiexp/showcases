// Multi-hue sequential schemes as continuous ramps, one row lit at a time
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const names = ["viridis","magma","inferno","plasma","cividis","turbo","bluegreen","bluepurple","goldgreen","goldorange","goldred","greenblue","orangered","purplebluegreen","purpleblue","purplered","redpurple","yellowgreenblue","yellowgreen","yelloworangebrown","yelloworangered","darkblue","darkgold","darkgreen","darkmulti","darkred","lightgreyred","lightgreyteal","lightmulti","lightorange","lighttealblue"];
  type Scales = NonNullable<Spec['scales']>;
  type Marks = NonNullable<Spec['marks']>;
  // One linear scale per scheme: the colour at position u of the scheme, u from 0 to 1.
  const schemes: Scales = names.map((n) => ({ name: n, type: 'linear', domain: [0, 1], range: { scheme: n } }));
  const rows: Marks = names.map((n) => ({
    type: 'rect', from: { data: 'cols' },
    encode: { update: {
      x: { scale: 'x', field: 'n' }, width: { scale: 'x', band: 1 },
      y: { scale: 'row', value: n }, height: { scale: 'row', band: 1 },
      fill: { scale: n, field: 'u' }, opacity: { signal: `focus === '${n}' ? 1 : 0.5` },
    } },
  }));

  const spec: Spec = {
    width: 420, height: 340, padding: 5,
    signals: [{ name: 'focus', value: "viridis", bind: { input: 'select', options: names } }],
    data: [{
      name: 'cols',
      transform: [{ type: 'sequence', start: 0, stop: 60, as: 'n' }, { type: 'formula', as: 'u', expr: 'datum.n / 59' }],
    }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'cols', field: 'n' }, range: 'width' },
      { name: 'row', type: 'band', domain: names, range: 'height', paddingInner: 0.15 },
      ...schemes,
    ],
    axes: [{ orient: 'left', scale: 'row', ticks: false, domain: false, labelFontSize: 9 }],
    marks: rows,
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, names.map((focus) => ({ focus })), 600);
  return () => stage.dispose();
};

export default mount;
