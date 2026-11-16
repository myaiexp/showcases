// EditTool: registerEditTool() with an alias and changeTag
import { App, Rect, RectData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditTool } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, spot, watch } from '../../shared/editor-kit.ts';



class ShowcaseAliasBase extends EditTool {
  override get tag(): string {
    return 'ShowcaseAliasBase';
  }
  override onCreate(): void {
    this.editConfig = { stroke: '#2a7de1' }; // blue, so the aliased tool is easy to spot
  }
}
// registerEditTool(aliasName, changeTag): store the class under another name and rename its tag too
ShowcaseAliasBase.registerEditTool('ShowcaseAliasTool', true);

// A Rect subclass with its own data class, so setEditOuter changes only this class (it rewrites the shared data class otherwise).
class AliasRectData extends RectData {}
class AliasRect extends Rect {
  override get __tag(): string {
    return 'AliasRect';
  }
}
AliasRect.registerUI();
AliasRect.registerData(AliasRectData as never);
AliasRect.setEditOuter('ShowcaseAliasTool');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select the rect and read the tool tag." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const a = new AliasRect({ editable: true, fill: '#FEB027', cornerRadius: 20, x: g.a.x, y: g.a.y, width: g.size, height: g.size });
  app.tree.add(a);
  watch(stage, () => 'editTool.tag: ' + (app.editor.editTool?.tag ?? 'none'));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(a).x, spot(a).y);
      await stage.wait(1500);
      await ghost.tap(130, 185);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
