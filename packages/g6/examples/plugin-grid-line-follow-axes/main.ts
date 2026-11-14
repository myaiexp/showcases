// grid-line follow as an object: translate and zoom switched separately
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
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
        behaviors: ['drag-canvas', 'zoom-canvas'],
        autoFit: 'view',
        padding: 40,
        plugins: [{ type: 'grid-line', key: 'grid', stroke: '#2f4b7c', follow: { translate: true, zoom: false } }],
      }),
    );
    await graph.render();

    const follow = { translate: true, zoom: false };
    if (stage.bar) {
      toggle(stage.bar, 'translate', true, (translate) => graph.updatePlugin({ key: 'grid', follow: Object.assign(follow, { translate }) }));
      toggle(stage.bar, 'zoom', false, (zoom) => graph.updatePlugin({ key: 'grid', follow: Object.assign(follow, { zoom }) }));
    } else {
      const modes = [{ translate: true, zoom: false }, { translate: false, zoom: true }, { translate: true, zoom: true }];
      stage.every(1500, async (i) => {
        graph.updatePlugin({ key: 'grid', follow: modes[i % 3] });
        await graph.translateBy([30, 10], { duration: 600 });
        await graph.zoomBy(i % 2 ? 1.3 : 0.77, { duration: 600 });
      });
    }
  });

export default mount;
