// domain, ticks, labels and grid are booleans, and signals can drive them
import type { Spec } from 'vega';
import { cycleSteps } from '../../shared/cards.ts';
import { guideMount, points } from '../../shared/guides-kit.ts';

// The type definitions only allow literal booleans here, but the parser accepts signal references.
const sig = (name: string): boolean => ({ signal: name }) as unknown as boolean;

const spec: Spec = {
  width: 360,
  height: 180,
  padding: 5,
  signals: [
    { name: 'domainOn', value: true, bind: { input: 'checkbox', name: 'domain' } },
    { name: 'ticksOn', value: true, bind: { input: 'checkbox', name: 'ticks' } },
    { name: 'labelsOn', value: true, bind: { input: 'checkbox', name: 'labels' } },
    { name: 'gridOn', value: false, bind: { input: 'checkbox', name: 'grid' } },
  ],
  data: [{ name: 'pts', values: points(22, 5) }],
  scales: [
    { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
    { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
  ],
  axes: [
    { orient: 'bottom', scale: 'x', domain: sig('domainOn'), ticks: sig('ticksOn'), labels: sig('labelsOn'), grid: sig('gridOn'), gridOpacity: 0.2 },
    { orient: 'left', scale: 'y', domain: sig('domainOn'), ticks: sig('ticksOn'), labels: sig('labelsOn'), grid: sig('gridOn'), gridOpacity: 0.2 },
  ],
  marks: [
    {
      type: 'symbol',
      from: { data: 'pts' },
      encode: {
        enter: { fill: { value: 'steelblue' }, size: { value: 50 } },
        update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' } },
      },
    },
  ],
};

export default guideMount(spec, (stage, view) => {
  cycleSteps(
    stage,
    view,
    [
      { domainOn: true, ticksOn: true, labelsOn: true, gridOn: false },
      { domainOn: false, ticksOn: true, labelsOn: true, gridOn: false },
      { domainOn: true, ticksOn: false, labelsOn: true, gridOn: false },
      { domainOn: true, ticksOn: true, labelsOn: false, gridOn: false },
      { domainOn: false, ticksOn: false, labelsOn: false, gridOn: true },
    ],
    1200,
  );
});
