// Editor history: drag.start and drag.end as undo points
import { App, DragEvent, type IUI } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, actions, pair, pull, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move or resize the rects, then press undo and redo." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  type Layout = { x?: number; y?: number; width?: number; height?: number; rotation?: number; skewX?: number; skewY?: number; scaleX?: number; scaleY?: number };
  type Step = { before: [IUI, Layout][]; after: [IUI, Layout][] };
  const grab = (): [IUI, Layout][] => app.editor.list.map((el) => [el, { x: el.x, y: el.y, width: el.width, height: el.height, rotation: el.rotation, skewX: el.skewX, skewY: el.skewY, scaleX: el.scaleX as number, scaleY: el.scaleY as number }]);
  const undone: Step[] = [];
  const done: Step[] = [];
  let before: [IUI, Layout][] = [];
  app.editor.on(DragEvent.START, () => (before = grab())); // timing point 1
  app.editor.on(DragEvent.END, () => {
    // timing point 2: keep the step if anything changed
    const after = grab();
    if (JSON.stringify(before.map(([, d]) => d)) === JSON.stringify(after.map(([, d]) => d))) return;
    done.push({ before, after });
    undone.length = 0;
  });
  const apply = (list: [IUI, Layout][]): void => {
    list.forEach(([el, data]) => el.set(data));
    app.editor.updateEditBox();
  };
  const undo = (): void => void (done.length && (undone.push(done.pop()!), apply(undone[undone.length - 1]!.before)));
  const redo = (): void => void (undone.length && (done.push(undone.pop()!), apply(done[done.length - 1]!.after)));
  watch(stage, () => 'history: ' + done.length + ' undo / ' + undone.length + ' redo');
  actions(stage, [{ name: 'undo', run: undo }, { name: 'redo', run: redo }], { card: false });
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      done.length = undone.length = 0;
      rect1.set({ x: g.a.x, y: g.a.y, width: g.size, height: g.size });
      app.editor.select(rect1);
      await stage.wait(700);
      await pull(app, ghost, rect1, [0.5, 0.5], [30, 24], undefined, 800);
      await stage.wait(500);
      await pull(app, ghost, rect1, [1, 1], [18, 14], undefined, 800);
      await stage.wait(700);
      undo();
      await stage.wait(800);
      undo();
      await stage.wait(800);
      redo();
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
