// InnerEditor: onCreate, onLoad, onUpdate and onUnload
import { App, Star, StarData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { InnerEditor } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, spot, watch } from '../../shared/editor-kit.ts';



const counts = { onCreate: 0, onLoad: 0, onUpdate: 0, onUnload: 0 };

class ShowcaseLifeEditor extends InnerEditor {
  override get tag(): string {
    return 'ShowcaseLifeEditor';
  }
  override onCreate(): void {
    counts.onCreate++;
  }
  override onLoad(): void {
    counts.onLoad++;
  }
  override onUpdate(): void {
    counts.onUpdate++;
  }
  override onUnload(): void {
    counts.onUnload++;
  }
}
ShowcaseLifeEditor.registerInnerEditor();

// A Star subclass with its own data class, so setEditInner changes only this class (it rewrites the shared data class otherwise).
class LifeStarData extends StarData {}
class LifeStar extends Star {
  override get __tag(): string {
    return 'LifeStar';
  }
}
LifeStar.registerUI();
LifeStar.registerData(LifeStarData as never);
LifeStar.setEditInner('ShowcaseLifeEditor'); // elements of this class open this inner editor on double-click


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Double-click the star, then click outside, and watch the counters." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  Object.assign(counts, { onCreate: 0, onLoad: 0, onUpdate: 0, onUnload: 0 });
  const a = new LifeStar({ editable: true, fill: '#FEB027', x: g.a.x, y: g.a.y, width: g.size, height: g.size });
  app.tree.add(a);
  stage.onDispose(() => app.editor.closeInnerEditor());
  watch(stage, () => 'onCreate ' + counts.onCreate + '  onLoad ' + counts.onLoad + '\nonUpdate ' + counts.onUpdate + '  onUnload ' + counts.onUnload + '\ninnerEditing ' + app.editor.innerEditing);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(a).x, spot(a).y);
      await stage.wait(700);
      await ghost.doubleTap(spot(a).x, spot(a).y);
      await stage.wait(1300);
      await ghost.tap(130, 185);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
