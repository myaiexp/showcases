// history batch mode: two draws as one undo step instead of two
import { Graph, HistoryEvent } from '@antv/g6';
import type { History } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

interface Batch {
  startBatch(): void;
  endBatch(): void;
}

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: [{ id: 'base', style: { x: 40, y: 100 } }] },
        node: { style: { fill: '#7e3feb', size: 26, labelText: (d) => d.id, labelFill: '#fff', labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#8b9baf' } },
        autoFit: 'center',
        plugins: [{ type: 'history', key: 'history' }],
      }),
    );
    await graph.render();

    const history = graph.getPluginInstance<History>('history');
    // The batch controller lives on the graph's runtime context, which the typings keep private.
    const batch = (graph as unknown as { context: { batch: Batch } }).context.batch;
    let n = 0;
    let recorded = 0;
    history.on(HistoryEvent.ADD, () => (recorded += 1));

    // One edit = show a node, then draw its edge: two draw() calls.
    const twoDraws = async (): Promise<void> => {
      n += 1;
      const x = 40 + n * 50;
      graph.addNodeData([{ id: `a${n}`, style: { x, y: 60 } }]);
      await graph.draw();
      graph.addEdgeData([{ source: 'base', target: `a${n}` }]);
      await graph.draw();
    };
    const batched = async (): Promise<void> => {
      batch.startBatch();
      await twoDraws();
      batch.endBatch();
    };

    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `commands recorded: ${recorded}  (undo stack ${history.undoStack.length})`;
      };
      show();
      button(stage.bar, 'edit (two draws)', async () => {
        await twoDraws();
        show();
      });
      button(stage.bar, 'edit in a batch', async () => {
        await batched();
        show();
      });
      button(stage.bar, 'undo', () => {
        history.undo();
        show();
      });
    } else {
      // Batched edit, then a single undo reverts both draws at once.
      stage.every(1500, async (i) => {
        if (i % 2) await batched();
        else history.undo();
      });
    }
  });

export default mount;
