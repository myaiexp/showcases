// InnerEditor: getEditBoxPoint() and getEditTargetPoint()
import { App, Box, DragEvent, Star, StarData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { InnerEditor } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, spot, watch } from '../../shared/editor-kit.ts';



class ShowcaseRingEditor extends InnerEditor {
  override get tag(): string {
    return 'ShowcaseRingEditor';
  }
  declare handle: Box;
  override onCreate(): void {
    this.view.add((this.handle = new Box()));
    this.eventIds = [
      this.handle.on_(DragEvent.DRAG, (e: DragEvent) => {
        const star = this.editTarget as Star;
        // pointer in the edit box's own pixels -> the element's coordinates
        const point = this.getEditTargetPoint(e.getInnerPoint(this.editBox));
        const half = star.height! / 2;
        star.innerRadius = Math.max(0.1, Math.min(0.95, (half - point.y) / half));
      }),
    ];
  }
  override onLoad(): void {
    this.handle.set({ ...this.editBox.getPointStyle({ fill: '#e4572e' }), cursor: 'ns-resize' });
    this.editBox.add(this.view);
  }
  override onUpdate(): void {
    const star = this.editTarget as Star;
    const half = star.height! / 2;
    // element coordinates -> the edit box's own pixels
    const { x, y } = this.getEditBoxPoint({ x: star.width! / 2, y: half - Number(star.innerRadius) * half });
    this.handle.set({ x, y });
  }
  override onUnload(): void {
    this.editBox.remove(this.view);
  }
  override onDestroy(): void {
    this.handle = null as never;
  }
}
ShowcaseRingEditor.registerInnerEditor();

// A Star subclass with its own data class, so setEditInner changes only this class (it rewrites the shared data class otherwise).
class RingStarData extends StarData {}
class RingStar extends Star {
  override get __tag(): string {
    return 'RingStar';
  }
}
RingStar.registerUI();
RingStar.registerData(RingStarData as never);
RingStar.setEditInner('ShowcaseRingEditor'); // elements of this class open this inner editor on double-click


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Double-click the star and drag the red handle up and down." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const a = new RingStar({ editable: true, fill: '#FEB027', x: g.a.x + 30, y: g.a.y - 6, width: g.size * 1.4, height: g.size * 1.4 });
  app.tree.add(a);
  stage.onDispose(() => app.editor.closeInnerEditor());
  watch(stage, () => 'innerRadius ' + (Math.round(Number(a.innerRadius) * 100) / 100));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.closeInnerEditor();
      app.editor.cancel();
      a.set({ innerRadius: 0.5 });
      await stage.wait(600);
      await ghost.tap(spot(a).x, spot(a).y);
      await stage.wait(700);
      await ghost.doubleTap(spot(a).x, spot(a).y);
      await stage.wait(1000);
      const c = spot(a);
      const half = a.height! / 2;
      const from = { x: c.x, y: c.y - half * 0.5 };
      await ghost.drag(from, { x: from.x, y: c.y - half * 0.85 }, 900);
      await stage.wait(700);
      await ghost.drag({ x: c.x, y: c.y - half * 0.85 }, { x: c.x, y: c.y - half * 0.3 }, 900);
      await stage.wait(900);
      await ghost.tap(130, 192);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
