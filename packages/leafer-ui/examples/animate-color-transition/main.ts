// Fun: a style animation that swings back and forth
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The rect slides, squares its corners and changes colour, then swings back.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(20),
    y: u(100),
    cornerRadius: u(50),
    width: u(100),
    height: u(100),
    fill: '#32cd79',
    animation: {
      style: { x: stage.preview ? 140 : 500, cornerRadius: 0, fill: '#ffcd00' }, // the end style
      duration: 1,
      swing: true, // play forward, then back
    },
  });
  leafer.add(rect);

  return stage.dispose;
};

export default mount;
