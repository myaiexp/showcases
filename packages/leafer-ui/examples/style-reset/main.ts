// Basics: reset the style, or reset to a new style
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Watch the rect disappear (reset) and come back (reset with a new style).' });
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
    stroke: '#1a7a45',
    strokeWidth: 4,
  });
  leafer.add(rect);

  let step = 0;
  stage.every(1100, () => {
    step = (step + 1) % 3;
    if (step === 1) rect.reset(); // back to defaults: no size, no fill
    else if (step === 2) rect.reset({ x: u(100), y: u(50), width: u(120), height: u(120), stroke: 'blue', strokeWidth: 4 }); // reset to a new style
    else rect.reset({ x: u(100), y: u(50), width: u(120), height: u(120), fill: GREEN, stroke: '#1a7a45', strokeWidth: 4 });
  });

  return stage.dispose;
};

export default mount;
