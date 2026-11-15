// domainRaw replaces a data-driven domain with an array from a signal, like a zoom
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 190, padding: 5,
    signals: [
      { name: 'zoom', value: false, bind: { input: 'checkbox', name: 'use domainRaw' } },
      { name: 'from', value: 0, bind: { input: 'range', min: 0, max: 80, step: 1 } },
      { name: 'to', value: 100, bind: { input: 'range', min: 20, max: 100, step: 1 } },
      // null leaves the data-driven domain alone; an array overrides it.
      { name: 'raw', update: 'zoom ? [from, max(to, from + 5)] : null' },
    ],
    data: [{
      name: 'series',
      transform: [
        { type: 'sequence', start: 0, stop: 101, as: 'x' },
        { type: 'formula', as: 'y', expr: 'sin(datum.x / 6) + 0.4 * sin(datum.x / 1.7)' },
      ],
    }],
    scales: [
      { name: 'x', type: 'linear', domain: { data: 'series', field: 'x' }, domainRaw: { signal: 'raw' }, range: 'width' },
      { name: 'y', type: 'linear', domain: [-1.6, 1.6], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.2 }],
    marks: [{
      type: 'group', clip: true,
      encode: { enter: { x: { value: 0 }, y: { value: 0 }, width: { signal: 'width' }, height: { signal: 'height' } } },
      marks: [{
        type: 'line', from: { data: 'series' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, stroke: { value: 'orange' }, strokeWidth: { value: 2 } } },
      }],
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ zoom: false }, { zoom: true, from: 0, to: 100 }, { zoom: true, from: 20, to: 55 }, { zoom: true, from: 60, to: 80 }], 1500);
  return () => stage.dispose();
};

export default mount;
