// The series break component on a bar, line or area series that crosses a broken axis
import type { Mount } from '@/types.ts';
import { appendSeriesBreakConfig, registerSeriesBreak } from '@visactor/vchart-extension';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';

registerSeriesBreak();

const values = [
  { month: 'Jan', visits: 420 }, { month: 'Feb', visits: 510 }, { month: 'Mar', visits: 480 },
  { month: 'Apr', visits: 9800 }, { month: 'May', visits: 10400 }, { month: 'Jun', visits: 9900 },
  { month: 'Jul', visits: 560 }, { month: 'Aug', visits: 610 },
];

type Kind = 'bar' | 'line' | 'area';

function build(kind: Kind, preview: boolean): ISpec {
  const spec = {
    type: kind,
    animation: false,
    data: [{ id: 'visits', values }],
    xField: 'month',
    yField: 'visits',
    axes: [
      {
        orient: 'left',
        breaks: [{ range: [1000, 9000] }],
        nice: false,
        tick: { tickMode: 'd3' },
        domainLine: { visible: true },
      },
      { orient: 'bottom', label: { visible: true } },
    ],
    line: { style: { lineWidth: 2 } },
    point: { visible: !preview },
  } as unknown as ISpec;
  appendSeriesBreakConfig(spec);
  return spec;
}

const mount: Mount = (el, ctx) =>
  mountLive<{ kind: Kind }>(el, ctx, {
    initial: { kind: 'line' },
    build: (s, p) => build(s.kind, p),
    controls(bar, live) {
      select(bar, 'series type', ['line', 'area', 'bar'], (v) => live.set({ kind: v as Kind })).value = 'line';
    },
    step: (_, i) => ({ kind: (['line', 'area', 'bar'] as const)[i % 3] as Kind }),
    previewMs: 2000,
    mode: 'rebuild',
  });

export default mount;
