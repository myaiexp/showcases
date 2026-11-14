// grid-line plugin: cell size, line colour and width
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const STROKES = ['#1890ff33', '#ff4d4f55', '#52c41a55', '#ffffff33'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hubData(),
        node: { style: { fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid' },
        autoFit: 'view',
        padding: 24,
        plugins: [{ type: 'grid-line', key: 'grid', stroke: STROKES[0], lineWidth: 2, size: 40 }],
      }),
    );
    await graph.render();

    if (stage.bar) {
      slider(stage.bar, 'size', [10, 80, 5], 40, (size) => graph.updatePlugin({ key: 'grid', size }));
      slider(stage.bar, 'lineWidth', [1, 6, 1], 2, (lineWidth) => graph.updatePlugin({ key: 'grid', lineWidth }));
      select(stage.bar, 'stroke', STROKES, STROKES[0]!, (stroke) => graph.updatePlugin({ key: 'grid', stroke }));
    } else {
      stage.every(1200, (i) =>
        graph.updatePlugin({ key: 'grid', size: [40, 20, 60, 30][i % 4], lineWidth: 1 + (i % 3), stroke: STROKES[i % STROKES.length] }),
      );
    }
  });

export default mount;
