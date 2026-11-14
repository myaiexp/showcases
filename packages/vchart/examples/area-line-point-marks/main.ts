// The three marks of an area series, toggled one by one, plus seriesMark for the legend
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { seeded, trends } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = trends(seeded(52), ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ['alpha', 'beta'], 10, 60);
const ON_OFF = ['on', 'off'];
interface S { area: boolean; line: boolean; point: boolean; mark: 'area' | 'line' | 'point' }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { area: true, line: true, point: true, mark: 'area' },
    mode: 'rebuild',
    build: (s) =>
      ({
        type: 'area',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'value',
        seriesField: 'group',
        seriesMark: s.mark,
        area: { visible: s.area, style: { fillOpacity: 0.35 } },
        line: { visible: s.line, style: { lineWidth: 3 } },
        point: { visible: s.point, style: { size: 10 } },
        legends: { visible: !ctx.preview, orient: 'top' },
      }) as ISpec,
    controls: (bar, live) => {
      for (const key of ['area', 'line', 'point'] as const) {
        select(bar, key, ON_OFF, (v) => live.set({ [key]: v === 'on' })).value = 'on';
      }
      select(bar, 'seriesMark', ['area', 'line', 'point'], (v) => live.set({ mark: v as S['mark'] }));
    },
    step: (_s, i) => [
      { area: true, line: true, point: true },
      { area: true, line: false, point: false },
      { area: false, line: true, point: true },
      { area: false, line: false, point: true },
    ][i % 4] ?? {},
    previewMs: 1400,
  });

export default mount;
