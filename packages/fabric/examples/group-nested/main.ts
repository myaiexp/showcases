// Groups: a group inside a group, with parent and triggerLayout
import { Canvas, Circle, FabricText, Group, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { BLUE, GOLD, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The outer group holds a circle and an inner group (two bars and a label). Rotating the inner group and calling triggerLayout() on the outer one re-fits the tinted outer box.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const bar1 = nameIt(new Rect({ left: 170, top: 100, width: 120, height: 22, fill: RED }), 'bar1');
  const bar2 = nameIt(new Rect({ left: 170, top: 140, width: 120, height: 22, fill: GOLD }), 'bar2');
  const label = nameIt(new FabricText('inner', { left: 170, top: 120, fontSize: 18, fontFamily: 'sans-serif', fill: '#2b2a33' }), 'label');
  const inner = nameIt(new Group([bar1, bar2, label], { backgroundColor: 'rgba(233, 75, 60, 0.15)', subTargetCheck: true, interactive: true }), 'inner');
  const disc = nameIt(new Circle({ left: 120, top: 120, radius: 50, fill: BLUE }), 'disc');
  const outer = nameIt(new Group([disc, inner], { backgroundColor: 'rgba(100, 100, 255, 0.12)', subTargetCheck: true, interactive: true }), 'outer');
  canvas.add(outer);
  const say = status(stage);

  const report = (): void => {
    say(
      stage.preview
        ? `bar1 in outer: ${bar1.isDescendantOf(outer)} · active ${who(canvas.getActiveObject())}`
        : `inner.parent ${who(inner.parent)} · bar1.parent ${who(bar1.parent)}\nbar1.isDescendantOf(outer) ${bar1.isDescendantOf(outer)} · outer.contains(bar1) ${outer.contains(bar1)} · deep ${outer.contains(bar1, true)}\nactive: ${who(canvas.getActiveObject())}`,
    );
  };
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);
  // the outer group must be told that something inside it changed shape
  const turn = (deg: number): void => {
    inner.set('angle', deg);
    inner.setCoords();
    outer.triggerLayout();
    outer.setCoords();
    canvas.requestRenderAll();
  };
  report();

  if (stage.bar) {
    slider(stage.bar, 'inner angle', -90, 90, 1, 0, turn, (v) => `${v}°`);
    checkbox(stage.bar, 'interactive (select members)', true, (v) => {
      outer.interactive = v;
      inner.interactive = v;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    });
  } else {
    stage.loop((_dt, t) => turn(Math.sin(t * 0.9) * 70));
  }

  return stage.dispose;
};

export default mount;
