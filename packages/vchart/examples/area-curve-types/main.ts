// Area curves: line.style.curveType is shared with the area mark
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { HOURS } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = HOURS.map((time, i) => ({ time, value: [12, 30, 18, 42, 28, 55, 36, 60, 44, 26, 34][i] }));
const CURVES = ['linear', 'monotone', 'basis', 'step', 'stepBefore', 'stepAfter'];

const mount: Mount = (el, ctx) =>
  mountLive<{ curve: string }>(el, ctx, {
    initial: { curve: 'monotone' },
    build: ({ curve }) =>
      ({
        type: 'area',
        data: [{ id: 'data', values }],
        xField: 'time',
        yField: 'value',
        point: { visible: curve.startsWith('step') },
        line: { style: { curveType: curve } },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'line.style.curveType', CURVES, (curve) => live.set({ curve })).value = 'monotone';
    },
    step: (_s, i) => ({ curve: CURVES[i % CURVES.length] ?? 'linear' }),
    previewMs: 1300,
  });

export default mount;
