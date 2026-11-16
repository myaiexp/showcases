// Layout managers: a LayoutStrategy that arranges members in a sorted row
import { Canvas, Circle, FitContentLayout, Group, LayoutManager, Point, Rect, Triangle, type FabricObject, type LayoutStrategyResult, type StrictLayoutContext } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, GOLD, GREEN, nameIt, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';

class RowLayout extends FitContentLayout {
  gap: number;
  constructor(gap = 14) {
    super();
    this.gap = gap;
  }
  // do not fight the pointer while a member is being dragged; lay out when it is let go
  override shouldPerformLayout(context: StrictLayoutContext): boolean {
    return context.type !== 'object_modifying';
  }
  override calcBoundingBox(objects: FabricObject[], context: StrictLayoutContext): LayoutStrategyResult | undefined {
    // members are placed left to right in the order of their current position
    const ordered = [...objects].sort((a, b) => a.left - b.left);
    // centre the row on the group's own centre so the group does not drift when it re-lays out
    const total = ordered.reduce((sum, o) => sum + o.getScaledWidth(), 0) + this.gap * (ordered.length - 1);
    let x = -total / 2;
    for (const o of ordered) {
      const w = o.getScaledWidth();
      o.set({ left: x + w / 2, top: 0 });
      o.setCoords();
      x += w + this.gap;
    }
    return super.calcBoundingBox(objects, context);
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The strategy places the members in a row. Drag one to another place and let go: the row re-sorts by position and snaps back. The slider sets the gap.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const strategy = new RowLayout(14);
  const build = (): Group => {
    const members: FabricObject[] = [
      nameIt(new Rect({ left: 0, top: 0, width: 56, height: 56, fill: RED }), 'red'),
      nameIt(new Circle({ left: 0, top: 0, radius: 30, fill: BLUE }), 'blue'),
      nameIt(new Triangle({ left: 0, top: 0, width: 60, height: 52, fill: GREEN }), 'green'),
      nameIt(new Rect({ left: 0, top: 0, width: 44, height: 44, fill: GOLD }), 'gold'),
    ];
    return new Group(members, { left: 180, top: 120, layoutManager: new LayoutManager(strategy), subTargetCheck: true, interactive: true, backgroundColor: 'rgba(100, 100, 255, 0.14)' });
  };
  let group = build();
  canvas.add(group);

  const regap = (v: number): void => {
    strategy.gap = v;
    group.triggerLayout();
    group.setCoords();
    canvas.requestRenderAll();
  };

  if (stage.bar) slider(stage.bar, 'gap', 0, 60, 1, 14, regap, (v) => `${v}px`);
  else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      canvas.remove(group);
      group = build();
      canvas.add(group);
      canvas.discardActiveObject();
      await stage.wait(700);
      const first = group.item(0).getCenterPoint();
      const last = group.item(3).getCenterPoint();
      await ghost.drag(first, new Point(last.x + 40, last.y + 25), 900);
      await stage.wait(1200);
      const next = group.item(1).getCenterPoint();
      await ghost.drag(next, new Point(first.x - 60, first.y - 20), 900);
      await stage.wait(1200);
      canvas.discardActiveObject();
    }, 200);
  }

  return stage.dispose;
};

export default mount;
