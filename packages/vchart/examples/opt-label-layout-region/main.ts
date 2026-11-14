// labelLayout 'series' versus 'region' on two close lines with labels
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const r = rng(12);
const X = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'];
const base = X.map(() => Math.round(40 + r() * 30));
const a = X.map((x, i) => ({ x, y: base[i] ?? 0, c: 'north' }));
const b = X.map((x, i) => ({ x, y: (base[i] ?? 0) + Math.round(r() * 4) - 2, c: 'south' }));

const mount: Mount = (el, ctx) =>
  mountLive<{ layout: string }>(el, ctx, {
    initial: { layout: 'series' },
    mode: 'rebuild',
    previewMs: 1600,
    step: (s) => ({ layout: s.layout === 'series' ? 'region' : 'series' }),
    build: ({ layout }, preview) => {
      const line = (id: string, color: string, name: string): unknown => ({
        type: 'line',
        dataId: id,
        xField: 'x',
        yField: 'y',
        seriesField: 'c',
        line: { style: { stroke: color } },
        point: { style: { fill: color } },
        label: { visible: true, position: 'top', style: { fill: color, fontSize: preview ? 9 : 12 } },
        name,
      });
      return {
        type: 'common',
        data: [{ id: 'north', values: a }, { id: 'south', values: b }],
        series: [line('north', '#4d7cff', 'north'), line('south', '#ff8a3d', 'south')],
        axes: [{ orient: 'left', type: 'linear', min: 20 }, { orient: 'bottom', type: 'band' }],
        labelLayout: layout,
        legends: { visible: false },
        title: preview ? undefined : { visible: true, text: `labelLayout: '${layout}'`, textStyle: { fontSize: 13 } },
        tooltip: { visible: false },
      } as unknown as ISpec;
    },
    controls: (bar, live) => {
      select(bar, 'labelLayout', ['series', 'region'], (v) => live.set({ layout: v }));
    },
  });

export default mount;
