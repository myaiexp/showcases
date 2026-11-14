// updatePlugin finds a plugin by key and merges new options into it
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

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
        // Without a key, updatePlugin has nothing to look the plugin up by.
        plugins: [{ type: 'grid-line', key: 'main-grid', size: 20, stroke: '#2f4b7c' }],
      }),
    );
    await graph.render();

    const colours = ['#2f4b7c', '#ff4d4f', '#52c41a', '#faad14'];
    if (stage.bar) {
      slider(stage.bar, 'size', [10, 80, 5], 20, (size) => graph.updatePlugin({ key: 'main-grid', size }));
      select(stage.bar, 'stroke', colours, colours[0]!, (stroke) => graph.updatePlugin({ key: 'main-grid', stroke }));
    } else {
      const sizes = [20, 40, 60, 30];
      stage.every(1300, (i) =>
        graph.updatePlugin({ key: 'main-grid', size: sizes[i % sizes.length], stroke: colours[i % colours.length] }),
      );
    }
  });

export default mount;
