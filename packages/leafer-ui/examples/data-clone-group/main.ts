// Data: clone copies a Group with its children
import { Ellipse, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption, size } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'clone({ x }) copies the group and its children, so the copy no longer follows the original.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const dot = new Ellipse({ x: S * 0.55, y: S * 0.55, width: S * 0.6, height: S * 0.6, fill: '#FEB027' });
  const group = new Group({ x: 20, y: 30, children: [new Rect({ width: S, height: S, fill: '#32cd79' }), dot] });
  leafer.add(group);
  const copy = group.clone({ x: stage.width - S - 20 }); // new data on top of the copy
  leafer.add(copy);
  const note = caption(stage, leafer);
  note.text = 'original on the left, clone on the right';
  const change = (): void => {
    dot.fill = dot.fill === '#FEB027' ? '#FF4B4B' : '#FEB027';
    note.text = "only the original's dot changed colour";
  };
  if (stage.bar) button(stage.bar, "change the original's dot", change);
  else stage.every(1500, change);

  return stage.dispose;
};

export default mount;
