// Groups: wrap a selection in a Group, then removeAll() to ungroup
import { ActiveSelection, Canvas, Group } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { trio, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Select several shapes (drag a marquee or shift-click), group them, rotate the group, then ungroup: the members keep the transform they picked up.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...trio().all);
  const say = status(stage);

  const isGroup = (o: unknown): o is Group => o instanceof Group && !(o instanceof ActiveSelection);
  const report = (): void => {
    const a = canvas.getActiveObject();
    say(`${canvas.getObjects().length} on canvas · ${a ? (isGroup(a) ? `group of ${a.size()}` : a instanceof ActiveSelection ? `selection of ${a.size()}` : who(a)) : 'none'}`);
  };
  canvas.on('selection:created', report);
  canvas.on('selection:updated', report);
  canvas.on('selection:cleared', report);

  // objects must leave the canvas before they enter a group, or they would be drawn twice
  const group = (): void => {
    const objects = canvas.getActiveObjects();
    if (objects.length < 2) return;
    canvas.discardActiveObject();
    canvas.remove(...objects);
    const g = new Group(objects);
    canvas.add(g);
    canvas.setActiveObject(g);
    canvas.requestRenderAll();
  };
  // removeAll() hands the members back with the group's transform applied to them
  const ungroup = (): void => {
    const g = canvas.getActiveObject();
    if (!isGroup(g)) return;
    canvas.discardActiveObject();
    const objects = g.removeAll();
    canvas.remove(g);
    canvas.add(...objects);
    canvas.setActiveObject(new ActiveSelection(objects, { canvas }));
    canvas.requestRenderAll();
  };
  const selectAll = (): void => {
    canvas.discardActiveObject();
    canvas.setActiveObject(new ActiveSelection(canvas.getObjects(), { canvas }));
    canvas.requestRenderAll();
  };
  report();

  if (stage.bar) {
    button(stage.bar, 'select all', selectAll);
    button(stage.bar, 'group the selection', group);
    button(stage.bar, 'ungroup', ungroup);
  } else {
    stage.repeat(async () => {
      selectAll();
      await stage.wait(700);
      group();
      await stage.wait(700);
      const g = canvas.getActiveObject();
      if (g) {
        g.set({ angle: 22, scaleX: 0.8, scaleY: 0.8 });
        g.setCoords();
        canvas.requestRenderAll();
      }
      await stage.wait(900);
      ungroup();
      await stage.wait(1000);
      canvas.discardActiveObject();
      canvas.remove(...canvas.getObjects());
      canvas.add(...trio().all);
      report();
    }, 200);
  }

  return stage.dispose;
};

export default mount;
