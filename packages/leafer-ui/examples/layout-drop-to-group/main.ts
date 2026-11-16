// Layout: dropTo moves a dropped element into a Group
import { DragEvent, DropEvent, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { caption, size } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the green rect onto the blue group. On drop, dropTo(group) re-parents it and it stays where it was released.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const gx = stage.width - S * 1.4, gy = stage.height - S * 1.3 - 20;
  const group = new Group({ x: gx, y: gy });
  const rect = new Rect({ width: S, height: S, fill: '#4B8BFF' });
  const green = new Rect({ x: 20, y: 20, width: S * 0.6, height: S * 0.6, fill: '#32cd79', draggable: true });
  leafer.add(green);
  leafer.add(group);
  group.add(rect);
  const note = caption(stage, leafer);
  const report = (text: string): void => void (note.text = text);
  report('green.parent is the Leafer');
  group.on(DragEvent.ENTER, () => {
    DragEvent.setData({ data: 'drop data' });
    rect.set({ stroke: 'black', strokeWidth: 2 });
  });
  group.on(DragEvent.LEAVE, () => rect.set({ stroke: '' }));
  group.on(DropEvent.DROP, (e: DropEvent) => {
    rect.set({ stroke: '' });
    e.list.forEach((leaf) => leaf.dropTo(group)); // the docs' call
    report(`dropped: green.parent is now the ${group.tag}`);
  });
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const from = { x: 20 + S * 0.3, y: 20 + S * 0.3 };
    const to = { x: gx + S * 0.5, y: gy + S * 0.5 };
    script(stage, async () => {
      green.set({ x: 20, y: 20 });
      leafer.add(green);
      report('green.parent is the Leafer');
      await stage.wait(900);
      await ghost.drag(from, to, 1000);
      await stage.wait(1600);
    });
  }

  return stage.dispose;
};

export default mount;
