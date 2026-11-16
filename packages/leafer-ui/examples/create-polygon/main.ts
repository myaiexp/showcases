// Basics: a Polygon with six sides and rounded corners
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A hexagon with sides: 6 and cornerRadius: 10.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const polygon = new Polygon({
    x: u(100),
    y: u(50),
    width: u(120),
    height: u(120),
    sides: 6,
    cornerRadius: 10,
    fill: GREEN,
  });
  leafer.add(polygon);

  if (stage.preview) stage.loop((_dt, t) => (polygon.cornerRadius = 4 + (Math.sin(t * 2) + 1) * 10));

  return stage.dispose;
};

export default mount;
