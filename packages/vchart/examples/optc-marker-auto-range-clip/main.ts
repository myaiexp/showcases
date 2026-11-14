// Base marker options autoRange and clip: what happens to a marker outside the axis range
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { groupedRows } from '../../shared/components-data.ts';

interface S { autoRange: boolean; clip: boolean }

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { autoRange: false, clip: false },
    mode: 'rebuild',
    previewMs: 1600,
    step: (_s, i) => ({ autoRange: i % 4 >= 2, clip: i % 2 === 1 }),
    build: (s) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: groupedRows(['A', 'B', 'C', 'D', 'E'], ['Sales'], 15) }],
        xField: 'x',
        yField: 'y',
        axes: [{ orient: 'left', type: 'linear', min: 0, max: 100, nice: false }, { orient: 'bottom' }],
        markLine: [
          {
            y: 130,
            autoRange: s.autoRange,
            clip: s.clip,
            line: { style: { stroke: '#f87171', lineWidth: 2, lineDash: [6, 4] } },
            endSymbol: { visible: false },
            label: { visible: true, text: 'target 130', position: 'insideStartTop', style: { fill: '#f87171' } },
          },
        ],
      }) as never,
    controls: (bar, live) => {
      select(bar, 'autoRange', ['false', 'true'], (v) => live.set({ autoRange: v === 'true' }));
      select(bar, 'clip', ['false', 'true'], (v) => live.set({ clip: v === 'true' }));
    },
  });

export default mount;
