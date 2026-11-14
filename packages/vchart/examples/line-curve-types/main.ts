// Curve types: line.style.curveType from linear through smooth curves to step lines
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { HOURS } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = HOURS.map((x, i) => ({ x, value: [8, 22, 14, 40, 31, 55, 38, 62, 47, 30, 36][i] }));
const CURVES = ['linear', 'monotone', 'basis', 'catmullRom', 'step', 'stepBefore', 'stepAfter'];

const mount: Mount = (el, ctx) =>
  mountLive<{ curve: string }>(el, ctx, {
    initial: { curve: 'monotone' },
    build: ({ curve }) =>
      ({
        type: 'line',
        data: [{ id: 'data', values }],
        xField: 'x',
        yField: 'value',
        line: { style: { curveType: curve, lineWidth: 3 } },
        point: { style: { size: 8 } },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'curveType', CURVES, (curve) => live.set({ curve })).value = 'monotone';
    },
    step: (_s, i) => ({ curve: CURVES[i % CURVES.length] ?? 'linear' }),
    previewMs: 1300,
  });

export default mount;
