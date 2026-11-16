// Selection: an ActiveSelection of several objects moves them together
import { ActiveSelection, Canvas, Point } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'setActiveObject(new ActiveSelection([...], { canvas })) selects several objects at once. Drag or scale the selection: every member follows. Discarding it keeps the members where they ended up.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const { red, blue, green, all } = trio();
  canvas.add(...all);
  const say = status(stage);

  const report = (): void => {
    const a = canvas.getActiveObject();
    say(a ? `${stage.preview ? 'selection' : a.type} · members [${canvas.getActiveObjects().map(who).join(', ')}]` : 'nothing selected');
  };
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);

  // the selection needs the canvas it belongs to
  const select = (objects: typeof all): void => {
    canvas.setActiveObject(new ActiveSelection(objects, { canvas }));
    canvas.requestRenderAll();
  };
  report();

  if (stage.bar) {
    button(stage.bar, 'red + blue', () => select([red, blue]));
    button(stage.bar, 'blue + green', () => select([blue, green]));
    button(stage.bar, 'all three', () => select(all));
    button(stage.bar, 'discardActiveObject()', () => {
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    });
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      select([red, blue]);
      await stage.wait(500);
      const c = new Point(130, 110);
      await ghost.drag(c, c.add(new Point(40, 50)), 600);
      await stage.wait(300);
      canvas.discardActiveObject();
      select([blue, green]);
      await stage.wait(900);
      canvas.discardActiveObject();
      red.set({ left: 80, top: 110 });
      blue.set({ left: 180, top: 110 });
      green.set({ left: 280, top: 110 });
      all.forEach((o) => o.setCoords());
      canvas.requestRenderAll();
    }, 300);
  }

  return stage.dispose;
};

export default mount;
