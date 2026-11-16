// Layout managers: a FitContentLayout subclass that adds padding
import { Canvas, Circle, FitContentLayout, Group, LayoutManager, Point, Rect, Triangle, type FabricObject, type LayoutStrategyResult, type StrictLayoutContext } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, GREEN, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

/** Fits the members like FitContentLayout, then grows the box by `padding` on every side. */
class PaddedLayout extends FitContentLayout {
  padding: number;
  constructor(padding = 24) {
    super();
    this.padding = padding;
  }
  // calcBoundingBox is the method a strategy overrides: it returns the new centre and size
  override calcBoundingBox(objects: FabricObject[], context: StrictLayoutContext): LayoutStrategyResult | undefined {
    const result = super.calcBoundingBox(objects, context);
    if (!result) return result;
    return { ...result, size: result.size.add(new Point(this.padding * 2, this.padding * 2)) };
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'A custom strategy adds padding to the group box. The slider changes it, then triggerLayout() re-measures; dragging a member re-fits with the padding kept.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const strategy = new PaddedLayout(24);
  const group = new Group(
    [new Rect({ left: 125, top: 120, width: 64, height: 64, fill: RED }), new Circle({ left: 200, top: 120, radius: 30, fill: BLUE }), new Triangle({ left: 268, top: 120, width: 56, height: 56, fill: GREEN })],
    { layoutManager: new LayoutManager(strategy), subTargetCheck: true, interactive: true, backgroundColor: 'rgba(100, 100, 255, 0.16)' },
  );
  canvas.add(group);
  const say = status(stage);
  const report = (): void => say(`padding ${Math.round(strategy.padding)}px · box ${Math.round(group.width)} × ${Math.round(group.height)}`);

  const pad = (v: number): void => {
    strategy.padding = v;
    group.triggerLayout();
    group.setCoords();
    canvas.requestRenderAll();
    report();
  };
  canvas.on('object:modified', report);
  report();

  if (stage.bar) slider(stage.bar, 'padding', 0, 60, 1, 24, pad, (v) => `${v}px`);
  else stage.loop((_dt, t) => pad(26 + Math.sin(t * 1.5) * 24));

  return stage.dispose;
};

export default mount;
