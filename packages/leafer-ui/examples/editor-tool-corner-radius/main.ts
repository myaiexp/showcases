// EditTool: a control point that edits the corner radius
import { App, Box, DragEvent, Rect, RectData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditTool } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, r1, spot, watch } from '../../shared/editor-kit.ts';



class ShowcaseRadiusTool extends EditTool {
  override get tag(): string {
    return 'ShowcaseRadiusTool';
  }
  declare handle: Box;
  override onCreate(): void {
    this.view.add((this.handle = new Box()));
    this.eventIds = [
      this.handle.on_(DragEvent.DRAG, (e: DragEvent) => {
        const rect = this.editTarget as Rect;
        const { x } = e.getInnerPoint(rect); // the pointer in the element's own coordinates
        rect.cornerRadius = Math.max(0, Math.min(x, Math.min(rect.width!, rect.height!) / 2));
      }),
    ];
  }
  override onLoad(): void {
    this.handle.set(this.editBox.getPointStyle({ fill: '#e4572e', cornerRadius: 2, cursor: 'ew-resize' }));
    this.editBox.add(this.view);
  }
  override onUpdate(): void {
    const { boxBounds, worldTransform } = this.editor.element!;
    const radius = Number((this.editTarget as Rect).cornerRadius) || 0;
    this.handle.set({ x: (boxBounds.x + radius) * Math.abs(worldTransform.scaleX), y: (boxBounds.y + 14) * Math.abs(worldTransform.scaleY) });
  }
  override onUnload(): void {
    this.editBox.remove(this.view);
  }
  override onDestroy(): void {
    this.handle = null as never;
  }
}
ShowcaseRadiusTool.registerEditTool();

// A Rect subclass with its own data class, so setEditOuter changes only this class (it rewrites the shared data class otherwise).
class RadiusRectData extends RectData {}
class RadiusRect extends Rect {
  override get __tag(): string {
    return 'RadiusRect';
  }
}
RadiusRect.registerUI();
RadiusRect.registerData(RadiusRectData as never);
RadiusRect.setEditOuter('ShowcaseRadiusTool');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select the rect and drag the red handle sideways." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const a = new RadiusRect({ editable: true, fill: '#FEB027', cornerRadius: 4, x: g.a.x + 30, y: g.a.y, width: g.size * 1.4, height: g.size * 1.2 });
  app.tree.add(a);
  app.editor.select(a);
  watch(stage, () => 'cornerRadius ' + r1(Number(a.cornerRadius)));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      a.set({ cornerRadius: 4 });
      app.editor.select(a);
      await stage.wait(700);
      const p = spot(a, 0, 0);
      await ghost.drag({ x: p.x + 4, y: p.y + 14 }, { x: p.x + g.size * 0.6, y: p.y + 14 }, 1400);
      await stage.wait(1300);
    });
  }
  return stage.dispose;
};

export default mount;
