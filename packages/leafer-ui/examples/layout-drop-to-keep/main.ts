// Layout: dropTo keeps the world position, add does not
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption, size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ['group.add(rect)', 'rect.dropTo(group)'], hint: 'The group is scaled 1.6 and rotated 25 degrees. add() keeps the rect\'s numbers, so it jumps; dropTo() recomputes them so it stays.' });
  const S = size(stage) * 0.3;
  const items = stage.panes.map((pane) => {
    const leafer = stage.own(new Leafer({ view: pane.view }), pane);
    const group = new Group({ x: pane.width * 0.55, y: pane.height * 0.2, scale: 1.6, rotation: 25 });
    group.add(new Rect({ width: S, height: S, fill: '#4B8BFF', opacity: 0.5, hittable: false }));
    const rect = new Rect({ x: pane.width * 0.15, y: pane.height * 0.45, width: S * 0.8, height: S * 0.8, fill: '#32cd79' });
    leafer.add(group);
    leafer.add(rect);
    return { leafer, group, rect, note: caption(stage, leafer), home: { x: rect.x!, y: rect.y! } };
  });
  const drop = (): void => {
    items.forEach((it, i) => {
      it.rect.remove();
      it.rect.set({ ...it.home, scale: 1, rotation: 0 });
      it.leafer.add(it.rect);
      stage.after(500, () => {
        if (i === 0) it.group.add(it.rect);
        else it.rect.dropTo(it.group);
        it.note.text = `rect.scale ${(it.rect.scaleX as number).toFixed(2)}  rotation ${Math.round(it.rect.rotation!)}`;
      });
    });
  };
  drop();
  if (stage.bar) button(stage.bar, 'drop again', drop);
  else stage.every(3000, drop);

  return stage.dispose;
};

export default mount;
