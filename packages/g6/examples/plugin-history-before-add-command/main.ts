// history beforeAddCommand that lets only node removals into the stack
import { Graph, HistoryEvent } from '@antv/g6';
import type { Command, History } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { Editor, editorData } from '../../shared/plugin-edit.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: editorData(),
        node: { style: { fill: '#7e3feb', size: 26 } },
        edge: { style: { stroke: '#8b9baf' } },
        autoFit: 'center',
        plugins: [
          {
            type: 'history',
            key: 'history',
            // Only commands that removed something enter the queue.
            beforeAddCommand: (cmd: Command) =>
              (cmd.current.remove?.nodes?.length ?? 0) > 0 ||
              (cmd.current.remove?.combos?.length ?? 0) > 0 ||
              (cmd.current.remove?.edges?.length ?? 0) > 0,
          },
        ],
      }),
    );
    await graph.render();

    const history = graph.getPluginInstance<History>('history');
    const editor = new Editor(graph);
    let recorded = 0;
    history.on(HistoryEvent.ADD, () => (recorded += 1));
    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `commands recorded: ${recorded}  canUndo ${String(history.canUndo())}`;
      };
      show();
      const run = (fn: () => unknown) => async (): Promise<void> => {
        await fn();
        show();
      };
      button(stage.bar, 'add node', run(() => editor.add()));
      button(stage.bar, 'recolour', run(() => editor.recolor()));
      button(stage.bar, 'remove node', run(() => editor.remove()));
      button(stage.bar, 'undo', run(() => history.undo()));
    } else {
      const script = [() => editor.add(), () => editor.recolor(), () => editor.remove(), () => history.undo()];
      stage.every(1100, (i) => script[i % script.length]!());
    }
  });

export default mount;
