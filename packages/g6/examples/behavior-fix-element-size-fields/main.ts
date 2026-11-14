// fix-element-size node: which shapes and fields of a node keep their size
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { overlay } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const configs = {
  'whole node': undefined,
  'label only': [{ shape: 'label' }],
  'key lineWidth only': [{ shape: 'key', fields: ['lineWidth'] }],
  'key and label': [{ shape: 'key' }, { shape: 'label' }],
};
type Cfg = keyof typeof configs;
const names = Object.keys(configs) as Cfg[];
const nodes = [['a', 100, 100], ['b', 260, 100], ['c', 180, 200], ['d', 340, 200]] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: nodes.map(([id, x, y]) => ({ id, style: { x, y, labelText: `node ${id}` } })),
          edges: ([['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd']] as [string, string][]).map(([source, target]) => ({ source, target })),
        },
        node: { style: { size: 28, lineWidth: 4, stroke: '#ffa940', labelPlacement: 'bottom', labelFill: '#ddd' } },
        behaviors: ['zoom-canvas', 'drag-canvas', { type: 'fix-element-size', key: 'fix', enable: true }],
        autoFit: 'view',
        padding: 30,
      }),
    );
    await graph.render();
    // node: undefined would be ignored by updateBehavior, so the behavior is rebuilt each time.
    const apply = (c: Cfg) =>
      graph.setBehaviors(['zoom-canvas', 'drag-canvas', { type: 'fix-element-size', key: 'fix', enable: true, ...(configs[c] ? { node: configs[c] } : {}) }]);
    if (stage.bar) {
      readout(el).textContent = 'Zoom out and compare: the whole node, its label, or only its border width stays constant.';
      select(stage.bar, 'node', names, 'whole node', apply);
    } else {
      const say = overlay(stage);
      stage.every(1800, async (i) => {
        if (i % 2 === 1) {
          const c = names[Math.floor((i - 1) / 2) % names.length]!;
          apply(c);
          say(`node: ${c}`);
          await graph.zoomTo(0.4, { duration: 800 });
        } else await graph.zoomTo(1, { duration: 800 });
      });
    }
  });

export default mount;
