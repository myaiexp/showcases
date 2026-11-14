// toolbar buttons driving the history plugin: add, delete, undo, redo
import { Graph } from '@antv/g6';
import type { History } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let n = 3;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes: [0, 1, 2].map((i) => ({ id: `n${i}`, style: { x: 80 + i * 90, y: 90 } })),
          edges: [{ source: 'n0', target: 'n1' }, { source: 'n1', target: 'n2' }],
        },
        node: { style: { fill: '#7e3feb', size: 26, labelText: (d) => d.id, labelFill: '#fff' } },
        edge: { style: { stroke: '#8b9baf' } },
        behaviors: ['drag-canvas'],
        autoFit: 'center',
        plugins: [
          { type: 'history', key: 'history' },
          {
            type: 'toolbar',
            position: 'top-left',
            getItems: () => [
              { id: 'edit', value: 'add' },
              { id: 'delete', value: 'remove' },
              { id: 'undo', value: 'undo' },
              { id: 'redo', value: 'redo' },
            ],
            onClick: (value: string) => act(value),
          },
        ],
      }),
    );
    const history = (): History => graph.getPluginInstance<History>('history');
    const act = (value: string): void => {
      if (value === 'add') {
        graph.addNodeData([{ id: `n${n}`, style: { x: 80 + (n % 4) * 60, y: 40 + (n % 3) * 50 } }]);
        graph.addEdgeData([{ source: `n${n - 1}`, target: `n${n}` }]);
        n += 1;
        void graph.draw();
      } else if (value === 'remove' && n > 1) {
        n -= 1;
        graph.removeNodeData([`n${n}`]);
        void graph.draw();
      } else if (value === 'undo') history().undo();
      else if (value === 'redo') history().redo();
    };
    await graph.render();

    if (stage.preview) {
      const script = ['add', 'add', 'undo', 'undo', 'redo', 'remove', 'undo'];
      stage.every(1100, (i) => act(script[i % script.length]!));
    }
  });

export default mount;
