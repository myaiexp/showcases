// grid-line plugin border options
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const STYLES = ['solid', 'dashed', 'dotted', 'double'];

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
        plugins: [{ type: 'grid-line', key: 'grid', stroke: '#22304f', border: true, borderStroke: '#1890ff', borderLineWidth: 3, borderStyle: 'solid' }],
      }),
    );
    await graph.render();

    if (stage.bar) {
      toggle(stage.bar, 'border', true, (border) => graph.updatePlugin({ key: 'grid', border }));
      select(stage.bar, 'borderStyle', STYLES, 'solid', (borderStyle) => graph.updatePlugin({ key: 'grid', borderStyle }));
      slider(stage.bar, 'borderLineWidth', [1, 10, 1], 3, (borderLineWidth) => graph.updatePlugin({ key: 'grid', borderLineWidth }));
    } else {
      stage.every(1200, (i) =>
        graph.updatePlugin({ key: 'grid', border: i % 5 !== 4, borderStyle: STYLES[i % STYLES.length], borderLineWidth: 2 + (i % 3) * 2 }),
      );
    }
  });

export default mount;
