// DropEvent: dropping a dragged square into a group, with data attached on enter
import { DragEvent, DropEvent, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the green square onto the blue one. It joins the group, and e.data arrives with the drop.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = Math.min(stage.width * 0.22, stage.height * 0.3);
  const group = new Group({ x: stage.width - s * 1.6 - 14, y: stage.height - s * 1.7 - 12 });
  const target = new Rect({ width: s * 1.6, height: s * 1.6, fill: '#4B8BFF', cornerRadius: 10 });
  const drag = new Rect({ x: 22, y: stage.height - s * 1.5 - 12, width: s, height: s, fill: GREEN, cornerRadius: 8, draggable: true });
  group.add(target);
  leafer.add([group, drag]);

  group.on(DragEvent.ENTER, () => {
    DragEvent.setData({ data: 'drop data' }); // reset by the engine after the drop
    target.set({ stroke: 'black', strokeWidth: 3 });
  });
  group.on(DragEvent.LEAVE, () => target.set({ stroke: '' }));
  group.on(DropEvent.DROP, (e: DropEvent) => {
    log(`drop: data = ${JSON.stringify(e.data)}, ${e.list.length} dragged`);
    e.list.forEach((leaf) => leaf.dropTo(group)); // keeps its place on screen, changes parent
    log(`group now has ${group.children.length} children`);
    target.set({ stroke: '' });
  });

  const restart = (): void => {
    drag.dropTo(leafer);
    drag.set({ x: 22, y: stage.height - s * 1.5 - 12 });
  };
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      restart();
      await stage.wait(500);
      await ghost.drag({ x: 22 + s / 2, y: drag.y! + s / 2 }, { x: group.x! + s * 0.8, y: group.y! + s * 0.8 }, 1100);
      await stage.wait(1500);
    });
  }
  return stage.dispose;
};

export default mount;
