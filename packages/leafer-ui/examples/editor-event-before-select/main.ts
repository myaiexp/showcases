// EditorEvent: BEFORE_SELECT fires before the selection changes
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditorEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot } from '../../shared/editor-kit.ts';
import { logLines } from '../../shared/interaction-demo.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the rects and read the pair of events per change." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const log = logLines(stage, 4, true);

  const nm = (v: unknown): string => (Array.isArray(v) ? v.map((r) => r.name).join('+') : v ? (v as { name: string }).name : 'none');
  app.editor.on(EditorEvent.BEFORE_SELECT, (e: EditorEvent) => log('BEFORE_SELECT ' + nm(e.oldValue) + ' -> ' + nm(e.value)));
  app.editor.on(EditorEvent.SELECT, (e: EditorEvent) => log('SELECT list ' + e.editor.list.map((r) => r.name).join('+')));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(900);
      await ghost.tap(spot(rect2).x, spot(rect2).y, { shiftKey: true });
      await stage.wait(900);
      await ghost.tap(130, 185);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
