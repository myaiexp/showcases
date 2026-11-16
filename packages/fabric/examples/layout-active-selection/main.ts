// Layout managers: one ActiveSelection across two groups re-fits both
import { Canvas, Circle, Group, Point, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { BLUE, GOLD, GREEN, nameIt, RED, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Click the red square, shift-click the blue circle in the other group, then drag the pair: the selection has its own layout manager that tells each parent group to re-fit.',
  });
  const canvas = stage.own(new Canvas(stage.el));

  const build = (): { a: Group; b: Group } => {
    const opts = { subTargetCheck: true, interactive: true };
    const a = nameIt(new Group([nameIt(new Rect({ left: 70, top: 110, width: 50, height: 50, fill: RED }), 'red'), nameIt(new Triangle({ left: 130, top: 125, width: 44, height: 40, fill: GREEN }), 'green')], { ...opts, backgroundColor: 'rgba(233, 75, 60, 0.12)' }), 'group A');
    const b = nameIt(new Group([nameIt(new Circle({ left: 235, top: 110, radius: 26, fill: BLUE }), 'blue'), nameIt(new Rect({ left: 290, top: 125, width: 40, height: 40, fill: GOLD }), 'gold')], { ...opts, backgroundColor: 'rgba(59, 125, 216, 0.12)' }), 'group B');
    return { a, b };
  };
  let { a, b } = build();
  canvas.add(a, b);
  const say = status(stage, 'nothing selected');

  const report = (): void => {
    const sel = canvas.getActiveObject();
    const members = canvas.getActiveObjects();
    say(
      sel
        ? `${stage.preview ? 'selection' : sel.type} of ${members.length}: ${members.map((m) => (stage.preview ? who(m) : `${who(m)} (${who(m.parent)})`)).join(', ')}${stage.preview ? '' : `\nlayout manager: ${(sel as Group).layoutManager?.constructor.name ?? '-'}`}`
        : 'nothing selected',
    );
  };
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      canvas.remove(a, b);
      ({ a, b } = build());
      canvas.add(a, b);
      canvas.discardActiveObject();
      await stage.wait(500);
      await ghost.click(new Point(70, 110));
      await ghost.click(new Point(235, 110), { shiftKey: true });
      await stage.wait(300);
      await ghost.drag(new Point(235, 110), new Point(215, 190), 800);
      await stage.wait(900);
      await ghost.click(new Point(330, 30));
      await stage.wait(600);
    }, 200);
  }

  return stage.dispose;
};

export default mount;
