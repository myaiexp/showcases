// Several data updates are merged and painted by one draw()
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 2, 55] : [5, 3, 80];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 50, 55),
        node: { style: { size: 22, fill: '#5b8ff9' } },
        edge: { style: { stroke: '#4a5a78', lineWidth: 2 } },
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    let on = false;
    let queued = 0;
    const queue = () => {
      on = !on;
      graph.updateNodeData([{ id: 'n-0-0', style: { fill: on ? '#f5222d' : '#5b8ff9' } }]);
      graph.updateNodeData([{ id: 'n-1-1', style: { fill: on ? '#52c41a' : '#5b8ff9', size: on ? 32 : 22 } }]);
      graph.updateEdgeData([{ id: 'e-h-1-0', style: { stroke: on ? '#faad14' : '#4a5a78', lineWidth: on ? 4 : 2 } }]);
      queued += 3;
      show(`${queued} updates queued, not drawn yet`);
    };
    const flush = async () => {
      await graph.draw();
      queued = 0;
      show('draw(): all queued updates painted');
    };

    if (stage.bar) {
      button(stage.bar, 'queue 3 updates', queue);
      button(stage.bar, 'draw()', () => void flush());
    } else {
      stage.every(1000, (i) => (i % 2 ? flush() : queue()));
    }
  });

export default mount;
