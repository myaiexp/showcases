// history stackSize: how many of ten edits can be undone
import { Graph } from '@antv/g6';
import type { History } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout, slider } from '../../shared/controls.ts';
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
        plugins: [{ type: 'history', key: 'history', stackSize: 3 }],
      }),
    );
    await graph.render();

    const history = graph.getPluginInstance<History>('history');
    const editor = new Editor(graph);
    const tenEdits = async (): Promise<void> => {
      for (let i = 0; i < 10; i++) await editor.recolor();
    };
    const undoAll = (): number => {
      let n = 0;
      while (history.canUndo() && n < 50) {
        history.undo();
        n += 1;
      }
      return n;
    };
    if (stage.bar) {
      const out = readout(el);
      out.textContent = 'stackSize 3. Press "10 edits", then "undo all".';
      slider(stage.bar, 'stackSize', [0, 10, 1], 3, (stackSize) => graph.updatePlugin({ key: 'history', stackSize }));
      button(stage.bar, '10 edits', async () => {
        history.clear();
        await tenEdits();
        out.textContent = `${history.undoStack.length} commands kept`;
      });
      button(stage.bar, 'undo all', () => {
        out.textContent = `undone ${undoAll()} step(s) before the stack ran out`;
      });
    } else {
      stage.every(2400, async (i) => {
        if (i % 2) {
          history.clear();
          await tenEdits();
        } else undoAll();
      });
    }
  });

export default mount;
