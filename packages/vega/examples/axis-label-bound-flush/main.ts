// Wide labels at the first and last tick overflow the scale range
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount } from '../../shared/guides-kit.ts';

const spec: Spec = {
  width: 360,
  height: 80,
  padding: { left: 50, right: 50, top: 30, bottom: 30 },
  signals: [
    { name: 'bound', value: false },
    { name: 'flush', value: false },
    { name: 'flushOff', value: 0 },
  ],
  scales: [{ name: 'x', type: 'linear', domain: [0, 1000000], range: 'width', nice: false }],
  axes: [
    { orient: 'top', scale: 'x', format: ',d', tickCount: 4, labelBound: { signal: 'bound' }, title: { signal: "'labelBound: ' + bound" } },
    { orient: 'bottom', scale: 'x', format: ',d', tickCount: 4, labelFlush: { signal: 'flush' }, labelFlushOffset: { signal: 'flushOff' }, title: { signal: "'labelFlush: ' + flush + ', offset ' + flushOff" } },
  ],
  marks: [
    // The view range is drawn so the overflow is easy to see
    {
      type: 'rect',
      encode: {
        enter: { x: { value: 0 }, y: { value: 0 }, width: { signal: 'width' }, height: { signal: 'height' }, fill: { value: '#ffffff' }, fillOpacity: { value: 0.06 } },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { bound: false, flush: false, flushOff: 0 },
      { bound: true, flush: true, flushOff: 0 },
      { bound: 30, flush: 30, flushOff: 6 },
    ],
    1600,
  );
});
