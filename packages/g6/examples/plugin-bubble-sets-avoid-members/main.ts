// bubble-sets avoidMembers: a node the contour is kept away from
import { Graph } from '@antv/g6';
import type { BubbleSets } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hullData } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: hullData(),
        node: { style: { fill: '#ffd666' } },
        edge: { style: { stroke: '#8b9baf' } },
        behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
        autoFit: 'view',
        padding: 24,
        plugins: [
          { type: 'bubble-sets', key: 'bubbles', members: ['node-1', 'node-3'], avoidMembers: [], label: false, fill: '#f04864', stroke: '#f04864', fillOpacity: 0.15 },
        ],
      }),
    );
    await graph.render();

    const set = graph.getPluginInstance<BubbleSets>('bubbles');
    // node-2 sits between the two members, so avoiding it bends the contour away.
    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `getAvoidMember() -> ${JSON.stringify(set.getAvoidMember())}`;
      };
      show();
      button(stage.bar, 'addAvoidMember(node-2)', () => (set.addAvoidMember('node-2'), show()));
      button(stage.bar, 'removeAvoidMember(node-2)', () => (set.removeAvoidMember('node-2'), show()));
    } else {
      stage.every(1500, (i) => (i % 2 ? set.addAvoidMember('node-2') : set.removeAvoidMember('node-2')));
    }
  });

export default mount;
