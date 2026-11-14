// history plugin: edits recorded per draw, undone and redone from buttons
import { Graph } from '@antv/g6';
import type { History } from '@antv/g6';
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
        behaviors: ['drag-element'],
        autoFit: 'center',
        plugins: [{ type: 'history', key: 'history' }],
      }),
    );
    await graph.render();

    const history = graph.getPluginInstance<History>('history');
    const editor = new Editor(graph);
    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `canUndo ${String(history.canUndo())}  canRedo ${String(history.canRedo())}  (dragging a node is recorded too)`;
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
      button(stage.bar, 'redo', run(() => history.redo()));
      button(stage.bar, 'clear', run(() => history.clear()));
    } else {
      const script = [() => editor.add(), () => editor.recolor(), () => history.undo(), () => history.undo(), () => history.redo(), () => editor.remove(), () => history.undo()];
      stage.every(1100, (i) => script[i % script.length]!());
    }
  });

export default mount;
