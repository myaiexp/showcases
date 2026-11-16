// Basics: leafer.add(json) builds a Group and its children
import { Leafer, Rect, Group } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The group and its rect are created from JSON; drag the rect.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const json = {
    tag: 'Group',
    x: u(20),
    y: u(20),
    children: [{ tag: 'Rect', x: u(100), y: u(50), width: u(100), height: u(100), fill: GREEN, draggable: true }],
  };
  leafer.add(json);

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(170), y: u(120) }, { x: u(230), y: u(150) });

  return stage.dispose;
};

export default mount;
