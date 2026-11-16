// Data: waitParentChange keeps running as the parent changes
import { Group, Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the rect between the groups: the callback stays queued and runs every time.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const w = stage.width / 2;
  const cy = stage.height / 2 - 20;
  const groups = ['left', 'right'].map((name, i) => {
    const g = new Group({ x: i * w, name });
    g.add(new Rect({ x: 8, y: cy - S / 2 - 12, width: w - 16, height: S + 24, stroke: '#aaa', strokeWidth: 1.5, dashPattern: [6, 4], hittable: false }));
    g.add(new Text({ x: 8, y: cy - S / 2 - 34, text: `${name} group`, fill: '#666', fontSize: stage.preview ? 11 : 13, hittable: false }));
    leafer.add(g);
    return g;
  });
  const rect = new Rect({ x: (w - S) / 2, y: cy - S / 2, width: S, height: S, fill: '#32cd79' });
  const note = caption(stage, leafer);
  let runs = 0;
  rect.waitParentChange(() => {
    // the docs: the function stays in the listener queue
    runs++;
    rect.fill = rect.parent?.name === 'left' ? '#32cd79' : '#FEB027';
    note.text = `waitParentChange ran ${runs}x, parent: ${rect.parent?.name}`;
  });
  groups[0]!.add(rect);
  const swap = (): void => void groups[rect.parent === groups[0] ? 1 : 0]!.add(rect);
  if (stage.bar) button(stage.bar, 'move to the other group', swap);
  else stage.every(1300, swap);

  return stage.dispose;
};

export default mount;
