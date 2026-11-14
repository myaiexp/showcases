// Line series anti-overlap: markOverlap, pointDis and pointDisMul thin out the point symbols
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { walk } from '../../shared/components-data.ts';

interface S { overlap: boolean; dis: number; mul: number }

const rows = walk(120, 5);

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { overlap: false, dis: 0, mul: 1 },
    previewMs: 1500,
    step: (_s, i) => [
      { overlap: true, dis: 0, mul: 1 },
      { overlap: false, dis: 0, mul: 1 },
      { overlap: false, dis: 30, mul: 1 },
      { overlap: false, dis: 0, mul: 3 },
    ][i % 4] as S,
    build: (s) =>
      ({
        type: 'line',
        data: [{ id: 'd', values: rows }],
        xField: 'x',
        yField: 'y',
        point: { visible: true, style: { size: 10 } },
        markOverlap: s.overlap,
        // pointDis wins over pointDisMul when it is set (line.md § pointDis).
        ...(s.dis > 0 ? { pointDis: s.dis } : {}),
        pointDisMul: s.mul,
        axes: [{ orient: 'left', type: 'linear' }, { orient: 'bottom', label: { autoHide: true } }],
      }) as never,
    controls: (bar, live) => {
      select(bar, 'markOverlap', ['false', 'true'], (v) => live.set({ overlap: v === 'true' }));
      slider(bar, 'pointDis (px, 0 = unset)', [0, 60, 5], live.state.dis, (v) => live.set({ dis: v }));
      slider(bar, 'pointDisMul', [1, 6, 0.5], live.state.mul, (v) => live.set({ mul: v }));
    },
  });

export default mount;
