// minimap position as presets and as relative coordinates
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubData } from '../../shared/plugin-data.ts';

const POSITIONS: Record<string, string | [number, number]> = {
  'right-bottom': 'right-bottom',
  'left-bottom': 'left-bottom',
  'right-top': 'right-top',
  'left-top': 'left-top',
  '[0.5, 0.5]': [0.5, 0.5],
  '[1, 0]': [1, 0],
};

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
        behaviors: ['drag-canvas', 'zoom-canvas'],
        autoFit: 'view',
        padding: 30,
        plugins: [{ type: 'minimap', key: 'minimap', size: stage.preview ? [90, 60] : [200, 130], position: 'right-bottom' }],
      }),
    );
    await graph.render();

    const names = Object.keys(POSITIONS);
    if (stage.bar) {
      select(stage.bar, 'position', names, 'right-bottom', (n) => graph.updatePlugin({ key: 'minimap', position: POSITIONS[n] }));
    } else {
      stage.every(1300, (i) => graph.updatePlugin({ key: 'minimap', position: POSITIONS[names[i % names.length]!] }));
    }
  });

export default mount;
