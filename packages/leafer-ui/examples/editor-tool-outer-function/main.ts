// Editor: setEditOuter() can take a function
import { App, Rect, RectData, type IUI } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditTool } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, spot, watch } from '../../shared/editor-kit.ts';



class ShowcaseRoundedTool extends EditTool {
  override get tag(): string {
    return 'ShowcaseRoundedTool';
  }
  override onCreate(): void {
    this.editConfig = { stroke: '#e4572e', pointRadius: 0 };
  }
}
ShowcaseRoundedTool.registerEditTool();

// A Rect subclass with its own data class, so setEditOuter changes only this class (it rewrites the shared data class otherwise).
class PickRectData extends RectData {}
class PickRect extends Rect {
  override get __tag(): string {
    return 'PickRect';
  }
}
PickRect.registerUI();
PickRect.registerData(PickRectData as never);
// a function chooses the tool per element
PickRect.setEditOuter((rect: IUI) => (rect.cornerRadius ? 'ShowcaseRoundedTool' : 'EditTool'));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select the rounded rect and the square one." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const a = new PickRect({ editable: true, fill: '#FEB027', cornerRadius: 20, x: g.a.x, y: g.a.y, width: g.size, height: g.size });
  const b = new PickRect({ editable: true, fill: '#FFE04B', x: g.b.x, y: g.b.y, width: g.size, height: g.size });
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
