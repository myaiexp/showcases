// resolveLayout: screen-space bins computed after scales and plot bounds are final
import { createMark, defineChart, mountChart } from '@tanstack/charts';
import type { SceneNode } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cloud, type Pt } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cloud(4000, 21);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Resize the cell: the bins are recomputed from final pixel positions, and each cell shows its count in its opacity.' });
  const readout = stage.preview ? null : stage.readout();

  const screenBins = (cell: number) =>
    createMark<Pt, number, number>(({ markIndex }) => ({
      id: `screen-bins-${markIndex}`,
      // Initial channels set the x and y domains; resolveLayout cannot change them.
      channels: { x: { scale: 'x', values: rows.map((r) => r.x) }, y: { scale: 'y', values: rows.map((r) => r.y) } },
      resolveLayout({ chart, scales }) {
        const counts = new Map<string, number>();
        for (const r of rows) {
          const cx = Math.floor((scales.x!.map(r.x) - chart.x) / cell);
          const cy = Math.floor((scales.y!.map(r.y) - chart.y) / cell);
          const k = `${cx},${cy}`;
          counts.set(k, (counts.get(k) ?? 0) + 1);
        }
        const max = Math.max(...counts.values());
        return {
          render({ chart: c, theme }) {
            const nodes: SceneNode[] = [...counts].map(([k, n]) => {
              const [cx, cy] = k.split(',').map(Number) as [number, number];
              return { kind: 'rect', key: `bin-${k}`, x: c.x + cx * cell, y: c.y + cy * cell, width: cell - 1, height: cell - 1, style: { fill: theme.palette[0]!, fillOpacity: 0.12 + 0.88 * (n / max) } };
            });
            if (readout) readout.textContent = `${rows.length} rows in ${counts.size} cells of ${cell} px, busiest cell ${max}`;
            return { nodes };
          },
        };
      },
    }));

  const options = (cell: number) => ({
    definition: defineChart({
      marks: [screenBins(cell)],
      scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Screen-space bins',
  });
  const host = stage.own(mountChart(stage.box, options(16)));
  if (stage.bar) slider(stage.bar, 'cell', 6, 40, 2, 16, (v) => host.update(options(v)), (v) => `${v}px`);
  else stage.cycle([10, 18, 30], 1800, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
