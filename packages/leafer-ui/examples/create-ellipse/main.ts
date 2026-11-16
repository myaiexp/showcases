// Basics: an Ellipse cut into a sector ring
import { Leafer, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'startAngle -60, endAngle 180, innerRadius 0.5.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const ellipse = new Ellipse({
    x: u(100),
    y: u(50),
    width: u(120),
    height: u(120),
    startAngle: -60,
    endAngle: 180,
    innerRadius: 0.5,
    fill: GREEN,
  });
  leafer.add(ellipse);

  if (stage.preview) stage.loop((_dt, t) => (ellipse.endAngle = 120 + Math.sin(t * 2) * 60));

  return stage.dispose;
};

export default mount;
