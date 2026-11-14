// timebar position, size and padding
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { timeData, timebarSeries } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(
    el,
    ctx,
    async (stage) => {
      const graph = stage.keep(
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: timeData(),
          node: { style: { size: stage.preview ? 10 : 20, fill: '#7e3feb' } },
          edge: { style: { stroke: '#8b9baf' } },
          layout: { type: 'grid', cols: 5 },
          autoFit: 'view',
          // Room above and below, so the bar clears the graph in either position.
          padding: stage.preview ? [60, 10, 60, 10] : [120, 10, 120, 10],
          plugins: [
            {
              type: 'timebar',
              key: 'timebar',
              data: timebarSeries(),
              position: 'bottom',
              width: stage.preview ? 220 : 450,
              height: stage.preview ? 40 : 80,
              padding: [20, 20, 10, 20],
            },
          ],
        }),
      );
      await graph.render();

      const up = (o: Record<string, unknown>): void => graph.updatePlugin({ key: 'timebar', ...o });
      if (stage.bar) {
        select(stage.bar, 'position', ['bottom', 'top'], 'bottom', (position) => up({ position }));
        slider(stage.bar, 'width', [200, 800, 10], 450, (width) => up({ width }));
        slider(stage.bar, 'height', [40, 140, 5], 80, (height) => up({ height }));
        slider(stage.bar, 'padding', [0, 40, 2], 20, (p) => up({ padding: [p, p, 10, p] }));
      } else {
        stage.every(1400, (i) => up({ position: i % 2 ? 'top' : 'bottom', width: 180 + (i % 3) * 30 }));
      }
    },
    { height: 520 },
  );

export default mount;
