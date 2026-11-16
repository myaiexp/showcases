// Basics: updating data from JSON with group.set()
import { Leafer, Group, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the green square, created by group.set(json).' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const group = new Group();
  leafer.add(group);

  const json = {
    x: u(20),
    y: u(20),
    children: [{ tag: 'Rect', x: u(100), y: u(50), width: u(120), height: u(100), fill: GREEN, draggable: true }],
  };
  group.set(json);

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(180), y: u(130) }, { x: u(210), y: u(160) });

  return stage.dispose;
};

export default mount;
