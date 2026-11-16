// Basics: a Rect with a dashed stroke set at creation
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A dashed outline from stroke, strokeWidth and dashPattern.' });
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
    stroke: GREEN,
    strokeWidth: 2,
    dashPattern: [6, 6], // draw a dashed line
  });
  leafer.add(rect);

  stage.loop((_dt, t) => (rect.dashOffset = -t * 12)); // march the dashes

  return stage.dispose;
};

export default mount;
