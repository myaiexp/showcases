// Multi-axis synchronisation: sync.zeroAlign and sync.tickAlign
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const X = ['A', 'B', 'C', 'D', 'E', 'F'];
const bars = X.map((x, i) => ({ x, y: [120, -80, 200, -40, 150, 60][i] }));
const line = X.map((x, i) => ({ x, y: [4, 9, -3, 12, 7, 15][i], type: 'rate' }));
const MODES = ['none', 'zeroAlign', 'tickAlign'] as const;
interface State { mode: (typeof MODES)[number] }

const build = ({ mode }: State): ISpec =>
  ({
    type: 'common',
    seriesField: 'color',
    data: [{ id: 'id0', values: bars }, { id: 'id1', values: line }],
    series: [
      { type: 'bar', id: 'bar', dataIndex: 0, stack: false, label: { visible: true }, xField: 'x', yField: 'y' },
      { type: 'line', id: 'line', dataIndex: 1, label: { visible: true }, seriesField: 'type', xField: 'x', yField: 'y', stack: false },
    ],
    axes: [
      { id: 'axisLeft', orient: 'left', seriesId: ['bar'] },
      {
        orient: 'right',
        seriesId: ['line'],
        grid: { visible: false },
        nice: false,
        zero: false,
        ...(mode === 'none' ? {} : { sync: { axisId: 'axisLeft', [mode]: true } }),
      },
      { orient: 'bottom', type: 'band' },
    ],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { mode: 'zeroAlign' },
    build,
    mode: 'rebuild',
    previewMs: 2000,
    step: (s) => ({ mode: MODES[(MODES.indexOf(s.mode) + 1) % MODES.length] ?? 'none' }),
    controls: (bar, live) => {
      select(bar, 'right axis sync', MODES, (v) => live.set({ mode: v as State['mode'] })).value = 'zeroAlign';
    },
  });

export default mount;
