// Data: group.remove(child) takes one child out
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/shapes.ts';
import { lineUp } from '../../shared/layout-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'remove(child) on a Group takes that child out; rect.remove() with no argument does the same for the rect itself.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = stage.preview ? 40 : 70;
  const colors = ['#32cd79', '#FEB027', '#FF4B4B', '#4B8BFF'];
  const group = new Group();
  leafer.add(group);
  const fill = (): void => {
    group.clear();
    lineUp(stage, group, colors.map((fill) => new Rect({ width: S, height: S, fill })));
  };
  fill();
  const note = caption(stage, leafer);
  const step = (): void => {
    const first = group.children[0];
    if (first) {
      group.remove(first);
      note.text = `group.remove(child)  ->  ${group.children.length} left`;
    } else fill(), (note.text = 'refilled');
  };
  if (stage.bar) button(stage.bar, 'remove the first child', step);
  else stage.every(1000, step);

  return stage.dispose;
};

export default mount;
