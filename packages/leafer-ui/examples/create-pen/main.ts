// Basics: a Pen drawing two differently styled shapes
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { bob, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One Pen, two styles: a red shape with a hole, a yellow dot.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const pen = new Pen();

  pen.setStyle({ fill: '#FF4B4B', windingRule: 'evenodd' });
  pen.roundRect(0, 0, 100, 100, 30).arc(50, 50, 25);

  pen.setStyle({ x: 50, y: 50, fill: '#FEB027' });
  pen.arc(0, 0, 20);

  pen.set({ x: u(100), y: u(50), scale: stage.preview ? 0.9 : 1.4 });
  leafer.add(pen);

  if (stage.preview) bob(stage, pen);

  return stage.dispose;
};

export default mount;
