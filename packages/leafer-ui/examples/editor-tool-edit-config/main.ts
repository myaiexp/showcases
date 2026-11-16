// EditTool: editConfig restyles the editor while the tool is open
import { App, Rect, RectData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditTool } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';



class ShowcaseRedTool extends EditTool {
  override get tag(): string {
    return 'ShowcaseRedTool';
  }
  override onCreate(): void {
    // applies only while this tool is loaded, then the editor's own config is back
    this.editConfig = { stroke: '#e4572e', pointRadius: 0, middlePoint: {} };
  }
}
ShowcaseRedTool.registerEditTool();

// A Rect subclass with its own data class, so setEditOuter changes only this class (it rewrites the shared data class otherwise).
class RedToolRectData extends RectData {}
class RedToolRect extends Rect {
  override get __tag(): string {
    return 'RedToolRect';
  }
}
RedToolRect.registerUI();
RedToolRect.registerData(RedToolRectData as never);
RedToolRect.setEditOuter('ShowcaseRedTool');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select each rect." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const a = new RedToolRect({ editable: true, fill: '#FEB027', cornerRadius: 20, x: g.a.x, y: g.a.y, width: g.size, height: g.size });
  const [, b] = pair(g);
  app.tree.addMany(a, b);
  watch(stage, () => 'editTool: ' + (app.editor.editTool?.tag ?? 'none'));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(a).x, spot(a).y);
      await stage.wait(1300);
      await ghost.tap(spot(b).x, spot(b).y);
      await stage.wait(1300);
    });
  }
  return stage.dispose;
};

export default mount;
