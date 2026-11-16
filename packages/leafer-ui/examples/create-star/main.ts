// Basics: a Star with eight corners and rounded tips
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'An eight-point star, innerRadius 0.5.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const star = new Star({
    x: u(100),
    y: u(50),
    width: u(120),
    height: u(120),
    innerRadius: 0.5,
    corners: 8,
    cornerRadius: 5,
    fill: GREEN,
  });
  leafer.add(star);

  if (stage.preview) stage.loop((_dt, t) => (star.rotation = t * 30));

  return stage.dispose;
};

export default mount;
