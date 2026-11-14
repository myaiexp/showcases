// markLine coordinates + process: aggregate the points, or fit a regression line
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { rng } from '../../shared/components-data.ts';

const r = rng(14);
const POINTS = Array.from({ length: 40 }, (_, i) => ({ x: i * 2.5 + r() * 4, y: Math.round(10 + i * 1.6 + (r() - 0.5) * 36) }));
const MODES = ['regression', 'y average', 'y median', 'y standardDeviation'];

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: string }>(el, ctx, {
    initial: { mode: 'regression' },
    mode: 'rebuild',
    previewMs: 1800,
    step: (s) => ({ mode: MODES[(MODES.indexOf(s.mode) + 1) % MODES.length] as string }),
    build: (s) => {
      // Every point is passed in; process says how they are reduced (mark-line.md § process).
      const coordinates = POINTS.map((p) => ({ x: p.x, y: p.y }));
      const process = s.mode === 'regression' ? { xy: 'regression' } : { y: s.mode.slice(2) };
      return {
        type: 'scatter',
        data: [{ id: 'd', values: POINTS }],
        xField: 'x',
        yField: 'y',
        point: { style: { size: 8, fillOpacity: 0.7 } },
        axes: [
          { orient: 'bottom', type: 'linear' },
          { orient: 'left', type: 'linear', min: 0, max: 100 },
        ],
        markLine: [
          {
            coordinates,
            process,
            line: { style: { stroke: '#fbbf24', lineWidth: 2.5 } },
            endSymbol: { visible: false },
            label: { visible: true, position: 'middle', text: s.mode, style: { fill: '#fbbf24' } },
          },
        ],
      } as never;
    },
    controls: (bar, live) => {
      select(bar, 'process', MODES, (v) => live.set({ mode: v }));
    },
  });

export default mount;
