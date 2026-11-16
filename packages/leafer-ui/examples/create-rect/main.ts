// Basics: a Rect with a different radius on each corner
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, bob, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Corner radii [0, 40, 20, 40].' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(100),
    y: u(50),
    width: u(120),
    height: u(120),
    fill: GREEN,
    cornerRadius: [0, 40, 20, 40],
  });
  leafer.add(rect);

  if (stage.preview) bob(stage, rect);

  return stage.dispose;
};

export default mount;
