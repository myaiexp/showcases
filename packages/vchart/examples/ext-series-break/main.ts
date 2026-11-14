// Axis breaks on a bar chart, with and without the series break component that marks the bars
import type { Mount } from '@/types.ts';
import { appendSeriesBreakConfig, registerSeriesBreak } from '@visactor/vchart-extension';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';

registerSeriesBreak();

const values = [
  { city: 'Aurora', sales: 320 },
  { city: 'Bergen', sales: 540 },
  { city: 'Cusco', sales: 28400 },
  { city: 'Dakar', sales: 610 },
  { city: 'Essen', sales: 31200 },
  { city: 'Faro', sales: 450 },
];

function build(withSeriesBreak: boolean, preview: boolean): ISpec {
  const spec = {
    type: 'bar',
    animation: false,
    data: [{ id: 'sales', values }],
    xField: 'city',
    yField: 'sales',
    axes: [
      {
        orient: 'left',
        // breaks must be an array; the range is cut from the axis and the bars crossing it.
        breaks: [{ range: [1000, 28000] }],
        nice: false,
        tick: { tickMode: 'd3' },
        domainLine: { visible: true },
      },
      { orient: 'bottom', label: { visible: true } },
    ],
    bar: { style: { fillOpacity: 0.85 } },
  } as unknown as ISpec;
  // Reads the axis breaks from the spec and adds the component: call it after the axes are set.
  if (withSeriesBreak) appendSeriesBreakConfig(spec);
  return spec;
}

const mount: Mount = (el, ctx) =>
  mountLive<{ on: boolean }>(el, ctx, {
    initial: { on: true },
    build: (s, p) => build(s.on, p),
    controls(bar, live) {
      select(bar, 'series break', ['on', 'off'], (v) => live.set({ on: v === 'on' }));
    },
    step: (_, i) => ({ on: i % 2 === 0 }),
    previewMs: 2000,
    mode: 'rebuild',
  });

export default mount;
