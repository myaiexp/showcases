// The bins property gives a scale bin boundaries, which axes use for their ticks
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 90, padding: 5,
    signals: [
      { name: 'step', value: 20, bind: { input: 'select', options: [5, 10, 20, 25, 50] } },
      { name: 'binSpec', update: '{start: 0, stop: 100, step: step}' },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width', bins: { signal: 'binSpec' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x', grid: true, gridOpacity: 0.5 }],
    marks: [{
      type: 'text', encode: { update: { x: { signal: 'width / 2' }, y: { value: 30 }, align: { value: 'center' }, text: { signal: "'bin step ' + step" }, fill: { value: '#ddd' } } },
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ step: 20 }, { step: 10 }, { step: 25 }, { step: 5 }, { step: 50 }], 1500);
  return () => stage.dispose();
};

export default mount;
