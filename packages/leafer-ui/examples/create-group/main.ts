// Basics: a Group holding a Rect and an Ellipse
import { Leafer, Group, Rect, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the green square; the ring drifts with the group.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({ width: u(100), height: u(100), fill: GREEN, draggable: true });
  const ellipse = new Ellipse({ x: u(50), y: u(50), width: u(100), height: u(100), innerRadius: 0.5, fill: '#FEB027' });

  const group = new Group({ x: u(50), y: u(30) });
  group.add([rect, ellipse]);
  leafer.add(group);

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(100), y: u(60) }, { x: u(160), y: u(100) });

  return stage.dispose;
};

export default mount;
