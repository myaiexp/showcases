// Waterfall labels: stackLabel position and valueType, a dashed leaderLine
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = [5, 2, -2, 4, -3, 5, 1, -2].map((y, i) => ({ x: `W${i + 1}`, y }));
const POS = ['withChange', 'middle', 'max', 'min'];
const TYPES = ['change', 'absolute'];

const mount: Mount = (el, ctx) =>
  mountLive<{ position: string; valueType: string }>(el, ctx, {
    initial: { position: 'withChange', valueType: 'change' },
    build: ({ position, valueType }) =>
      ({
        type: 'waterfall',
        data: { id: 'data', values },
        xField: 'x',
        yField: 'y',
        stackLabel: { visible: true, position, valueType, style: { fill: '#dddddd' } },
        leaderLine: { style: { stroke: '#e0b04a', lineDash: [4, 3], lineWidth: 2 } },
        legends: { visible: false },
        axes: [{ orient: 'bottom', type: 'band', paddingInner: 0.4 }],
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'stackLabel.position', POS, (position) => live.set({ position }));
      select(bar, 'valueType', TYPES, (valueType) => live.set({ valueType }));
    },
    step: (_s, i) => ({ position: POS[i % POS.length] ?? 'middle', valueType: TYPES[Math.floor(i / 2) % 2] ?? 'change' }),
    previewMs: 1500,
  });

export default mount;
