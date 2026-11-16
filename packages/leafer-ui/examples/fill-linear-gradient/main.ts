// Basics: a linear gradient fill with the default direction
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';
import { color } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the two colours: the fill is reassigned with new stops.' });
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
    fill: {
      type: 'linear', // top centre to bottom centre
      stops: ['#FF4B4B', '#FEB027'],
    },
  });
  leafer.add(rect);

  const paint = (a: string, b: string): void => {
    rect.fill = { type: 'linear', stops: [a, b] };
  };
  if (stage.preview) stage.loop((_dt, t) => paint(`hsl(${(t * 40) % 360}, 90%, 60%)`, `hsl(${(t * 40 + 60) % 360}, 90%, 60%)`));
  else {
    let a = '#ff4b4b';
    let b = '#feb027';
    color(stage.bar!, 'from', a, (v) => paint((a = v), b));
    color(stage.bar!, 'to', b, (v) => paint(a, (b = v)));
  }

  return stage.dispose;
};

export default mount;
