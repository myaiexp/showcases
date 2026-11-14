// undo and redo buttons kept in sync with the history stacks
import { Graph, HistoryEvent } from '@antv/g6';
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
        autoFit: 'center',
        plugins: [{ type: 'history', key: 'history' }],
      }),
    );
    await graph.render();

    const history = graph.getPluginInstance<History>('history');
    const editor = new Editor(graph);
    if (stage.bar) {
      const out = readout(el);
      button(stage.bar, 'add node', () => editor.add());
      button(stage.bar, 'recolour', () => editor.recolor());
      const undo = button(stage.bar, 'undo', () => history.undo());
      const redo = button(stage.bar, 'redo', () => history.redo());
      button(stage.bar, 'undoAndCancel', () => history.undoAndCancel());
      const sync = (): void => {
        undo.disabled = !history.canUndo();
        redo.disabled = !history.canRedo();
        out.textContent = `HistoryEvent.CHANGE -> undo ${undo.disabled ? 'off' : 'on'}, redo ${redo.disabled ? 'off' : 'on'}`;
      };
      history.on(HistoryEvent.CHANGE, sync);
      sync();
    } else {
      // Nothing to click in a card: replay edits and undo steps.
      const script = [() => editor.add(), () => editor.recolor(), () => history.undo(), () => history.redo(), () => history.undo(), () => history.undo()];
      stage.every(1100, (i) => script[i % script.length]!());
    }
  });

export default mount;
