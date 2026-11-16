// Basics: a linear gradient stroke
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The border is a gradient stroke.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(100),
    y: u(30),
    width: u(120),
    height: u(120),
    strokeWidth: 12,
    stroke: {
      type: 'linear', // top centre to bottom centre
      stops: ['#FF4B4B', '#FEB027'],
    },
  });
  leafer.add(rect);

  stage.loop((_dt, t) => {
    rect.stroke = { type: 'linear', stops: [`hsl(${(t * 40) % 360}, 90%, 60%)`, `hsl(${(t * 40 + 60) % 360}, 90%, 60%)`] };
  });

  return stage.dispose;
};

export default mount;
